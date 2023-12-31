#nullable disable
using System.Net.Sockets;
using Ecommerce.EventBusRabbitMq.Abstractions;
using Microsoft.Extensions.Logging;
using Polly;
using Polly.Retry;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;

namespace Ecommerce.EventBusRabbitMq;

public class RabbitMQPersistentConnection : IRabbitMQPersistentConnection
{
  private readonly ILogger<RabbitMQPersistentConnection> _logger;
  private readonly IConnectionFactory _connectionFactory;
  private IConnection _connection;
  private readonly int _retryCount;
  private readonly Object _locker = new();
  public bool Disposed;
  public bool IsConnected => _connection is {IsOpen: true} && !Disposed;

  public RabbitMQPersistentConnection(IConnectionFactory connectionFactory, ILogger<RabbitMQPersistentConnection> logger, int retryCount = 5)
  {
    _connectionFactory = connectionFactory ?? throw new ArgumentNullException(nameof(connectionFactory));
    _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    _retryCount = retryCount;
  }

  public IModel CreateModel()
  {
    if(!IsConnected)
      throw new InvalidOperationException("No RabbitMQ connections are available to perform this action");

    return _connection.CreateModel();
  }

  public bool TryConnect()
  {
    _logger.LogInformation("RabbitMQ Client is trying to connect");

    lock(_locker)
    {
      var policy = RetryPolicy.Handle<SocketException>().Or<BrokerUnreachableException>()
        .WaitAndRetry(_retryCount, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)), (ex, time) => 
        {
          _logger.LogWarning(ex, "RabbitMQ Client could not connect after {TimeOut}s", $"{time.TotalSeconds:n1}");
        });
      
      policy.Execute(() => 
      {
        _connection = _connectionFactory.CreateConnection();
      });

      if(IsConnected)
      {
        _connection.ConnectionShutdown += OnConnectionShutdown;
        _connection.CallbackException += OnCallbackException;
        _connection.ConnectionBlocked += OnConnectionBlocked;
        
        _logger.LogInformation($"RabbitMQ Client acquired a persistent connection to '{_connection.Endpoint.HostName}' and is subscribed to failure events");
        
        return true;
      }
      else
      {
        _logger.LogCritical("Fatal error: RabbitMQ connections could not be created and opened");

        return false;
      }
    }
  }

  private void OnConnectionShutdown(Object sender, ShutdownEventArgs eventArgs)
  {
    if(Disposed) 
      return;
    
    _logger.LogInformation("A RabbitMQ connection is on shutdown. Trying to re-connect...");

    TryConnect();
  }

  private void OnCallbackException(Object sender, CallbackExceptionEventArgs eventArgs)
  {
    if (Disposed) 
      return;

    _logger.LogWarning("A RabbitMQ connection throw exception. Trying to re-connect...");

    TryConnect();
  }

  private void OnConnectionBlocked(Object sender, ConnectionBlockedEventArgs eventArgs)
  {
    if (Disposed) 
      return;

    _logger.LogWarning("A RabbitMQ connection is shutdown. Trying to re-connect...");

    TryConnect();
  }

  public void Dispose()
  {
    if(Disposed)
      return;
    
    Disposed = true;

    try
    {
      _connection.ConnectionShutdown -= OnConnectionShutdown;
      _connection.CallbackException -= OnCallbackException;
      _connection.ConnectionBlocked -= OnConnectionBlocked;
      _connection.Dispose();
    }
    catch (IOException ex)
    {
      _logger.LogCritical(ex.ToString());
    }
  }
}