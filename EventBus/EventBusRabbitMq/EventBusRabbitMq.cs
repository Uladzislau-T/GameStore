#nullable disable
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using Ecommerce.EventBus;
using Ecommerce.EventBus.Abstractions;
using Ecommerce.EventBus.Extensions;
using Ecommerce.EventBusRabbitMq.Abstractions;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Polly;
using Polly.Retry;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;

namespace Ecommerce.EventBusRabbitMq;

public class EventBusRabbitMq : IEventBus, IDisposable
{
  const string BROKER_NAME = "E-commerceEventBus";

  private readonly ILogger<EventBusRabbitMq> _logger;
  private readonly IEventBusSubscriptionsManager _subsManager;
  private readonly IRabbitMQPersistentConnection _persistentConnection;
  private readonly IServiceProvider _serviceProvider;
  private IModel _consumerChannel;
  private string _queueName;
  private int _retryCount;

  public EventBusRabbitMq(ILogger<EventBusRabbitMq> logger, IEventBusSubscriptionsManager subsManager, IRabbitMQPersistentConnection persistentConnection,
    IServiceProvider serviceProvider, string queueName, int retryCount = 5)
  {
    _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    _subsManager = subsManager ?? new EventBusSubscriptionsManager();
    _persistentConnection = persistentConnection ?? throw new ArgumentNullException(nameof(persistentConnection));
    _queueName = queueName;
    _retryCount = retryCount;
    _consumerChannel = CreateConsumerChannel();
    _serviceProvider = serviceProvider;    
  }

  public void Publish(IntegrationEvent @event)
  {
    if (!_persistentConnection.IsConnected)
    {
      _persistentConnection.TryConnect();
    }

    var policy = RetryPolicy.Handle<BrokerUnreachableException>()
      .Or<SocketException>()
      .WaitAndRetry(_retryCount, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)), (ex, time) =>
      {
        _logger.LogWarning(ex, $"Could not publish event: {@event.Id} after {time.TotalSeconds:n1}s");
      });

    var eventName = @event.GetType().Name;

    _logger.LogInformation($"Creating RabbitMQ channel to publish event: {@event.Id} ({eventName})");
    using var channel = _persistentConnection.CreateModel();
    _logger.LogInformation($"Declaring RabbitMQ exchange to publish event: {@event.Id}");

    channel.ExchangeDeclare(exchange: BROKER_NAME, type: "direct");

    var indentedOption = new JsonSerializerOptions() {WriteIndented = true};
    var body = JsonSerializer.SerializeToUtf8Bytes(@event, @event.GetType(), indentedOption);

    policy.Execute(() => 
    {
      var properties = channel.CreateBasicProperties();
      properties.DeliveryMode = 2;

      _logger.LogInformation($"Publishing event to RabbitMQ: {@event.Id}");

      channel.BasicPublish(
        exchange: BROKER_NAME,
        routingKey: eventName,
        mandatory: true, //message will be returned to publisher for error handling  
        basicProperties: properties,
        body: body);
    });
  }

  public void Subscribe<T, TH>()
    where T : IntegrationEvent
    where TH : IIntegrationEventHandler<T>
  {
    var eventName = typeof(T).Name;
    SubscribeInternal(eventName);

    _logger.LogInformation("Subscribing to event {EventName} with {EventHandler}", eventName, typeof(TH).GetGenericTypeName());

    _subsManager.AddSubscription<T, TH>();
    StartBasicConsume();
  }

  public void SubscribeInternal(string eventName)
  {
    var containsKey = _subsManager.HasSubscriptionsForEvent(eventName);
    if(!containsKey)
    {
      if (!_persistentConnection.IsConnected)
      {
        _persistentConnection.TryConnect();
      }

      _consumerChannel.QueueBind(queue: _queueName,
                              exchange: BROKER_NAME,
                              routingKey: eventName);
    }
  }

  public void Unsubscribe<T, TH>()
    where T : IntegrationEvent
    where TH : IIntegrationEventHandler<T>
  {
    throw new NotImplementedException();
  }

  private IModel CreateConsumerChannel()
  {
    if (!_persistentConnection.IsConnected)
    {
        _persistentConnection.TryConnect();
    }

    _logger.LogInformation("Create RabbitMQ consumer channel");

    var channel = _persistentConnection.CreateModel();

    channel.ExchangeDeclare(exchange: BROKER_NAME,
                            type: "direct");

    channel.QueueDeclare(queue: _queueName, 
                          durable:true, 
                          exclusive:false, 
                          autoDelete:false, 
                          arguments:null);


    channel.CallbackException += (sender, eventArgs) =>
    {
      _logger.LogWarning(eventArgs.Exception, "Recreating RabbitMQ consumer channel");

      _consumerChannel.Dispose();
      _consumerChannel = CreateConsumerChannel();
      StartBasicConsume();

    };

    return channel;
  }

  private void StartBasicConsume()
  {
    _logger.LogTrace("Starting RabbitMQ basic consume");

    if (_consumerChannel != null)
    {
      var consumer = new AsyncEventingBasicConsumer(_consumerChannel);

      consumer.Received += ConsumerReceived;

      _consumerChannel.BasicConsume(
        queue: _queueName,
        autoAck: false,
        consumer: consumer);
    }
    else
    {
        _logger.LogError("StartBasicConsume can't call on _consumerChannel == null");
    }
  }

  private async Task ConsumerReceived(object sender, BasicDeliverEventArgs eventArgs)
  {
    var eventName = eventArgs.RoutingKey;
    var message = Encoding.UTF8.GetString(eventArgs.Body.AsSpan());
    try
    {
      await ProcessEvent(eventName, message);
    }
    catch (Exception ex)
    {
      _logger.LogWarning(ex, $"Error Processing message \"{message}\"");
    }

                                                          // Even on exception we take the message off the queue.
                                                          // in a REAL WORLD app this should be handled with a Dead Letter Exchange (DLX). 
                                                          // For more information see: https://www.rabbitmq.com/dlx.html
    _consumerChannel.BasicAck(eventArgs.DeliveryTag, multiple: false);
  }

  private async Task ProcessEvent(string eventName, string message)
  {
    _logger.LogTrace($"Processing RabbitMQ event: {eventName}");

    if(_subsManager.HasSubscriptionsForEvent(eventName))
    {
      await using var scope = _serviceProvider.CreateAsyncScope();
      var subscriptions = _subsManager.GetHandlersForEvent(eventName);
      foreach (var subscription in subscriptions)
      {
        var handler = scope.ServiceProvider.GetRequiredService(subscription.HandlerType);
        if(handler == null)
          continue;
        
        var eventType = _subsManager.GetEventTypeByName(eventName);

        var caseInsensitiveOption = new JsonSerializerOptions() {PropertyNameCaseInsensitive = true};
        var integrationEvent = JsonSerializer.Deserialize(message, eventType, options: caseInsensitiveOption);
        var exactType = typeof(IIntegrationEventHandler<>).MakeGenericType(eventType);

        await Task.Yield();
        await (Task)exactType.GetMethod("Handle").Invoke(handler, new object[] {integrationEvent});
      }
    }
    else
    {
       _logger.LogWarning($"No subscription for RabbitMQ event: {eventName}");
    }
  } 

  public void Dispose()
    {
      if (_consumerChannel != null)
      {
          _consumerChannel.Dispose();
      }

      _subsManager.Clear();
    }
}
