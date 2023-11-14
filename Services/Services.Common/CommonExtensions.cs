using Ecommerce.EventBus;
using Ecommerce.EventBus.Abstractions;
using Ecommerce.EventBusRabbitMq;
using Ecommerce.EventBusRabbitMq.Abstractions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;

namespace Services.Common;

public static class CommonExtensions
{
  public static WebApplicationBuilder AddServiceDefaults(this WebApplicationBuilder builder)
  {
    builder.Services.AddEventBus(builder.Configuration);
    // Add the accessor
    // builder.Services.AddHttpContextAccessor();

    builder.Services.AddProfiler();

    return builder;
  }

  public static IServiceCollection AddProfiler(this IServiceCollection services)
  {
    services.AddMiniProfiler(options => 
    {
      options.RouteBasePath = $"/api/profiler"; // api/profiler/results-index - address to see queries
      // options.ResultsAuthorize = _ => true;
      // options.ResultsListAuthorize = _ => true;
      options.TrackConnectionOpenClose = true;
      options.IgnoredPaths.Add("/api/swagger/");
    }).AddEntityFramework();

    return services;
  }
  public static IServiceCollection AddEventBus(this IServiceCollection services, IConfiguration config)
  {
    var eventBusSection = config.GetSection("EventBus");

    if(!eventBusSection.Exists())
    {
      return services;
    }

    services.AddSingleton<IEventBusSubscriptionsManager, EventBusSubscriptionsManager>();

    services.AddSingleton<IRabbitMQPersistentConnection>(serProv => 
    {
      var logger = serProv.GetRequiredService<ILogger<RabbitMQPersistentConnection>>();

      var temp = config.GetRequiredConnectionString("EventBus");

      Console.WriteLine($"naaaaaaaaaaaaaaaaaaaame of rabbit   ----------------  {temp}");

      var factory = new ConnectionFactory()
      {
        HostName = config.GetRequiredConnectionString("EventBus"),
        Port = 5672,
        DispatchConsumersAsync = true
      };

      if(!string.IsNullOrEmpty(eventBusSection["UserName"]))
      {
        factory.UserName = eventBusSection["UserName"];
      }

      if (!string.IsNullOrEmpty(eventBusSection["Password"]))
      {
          factory.Password = eventBusSection["Password"];
      }

      var retryCount = eventBusSection.GetValue("RetryCount", 5);

      return new RabbitMQPersistentConnection(factory, logger, retryCount);

    });

    services.AddSingleton<IEventBus, EventBusRabbitMq>(sp => 
    {
      var subscriptionClientName = eventBusSection.GetRequiredValue("SubscriptionClientName");
      var rabbitMQPersistentConnection = sp.GetRequiredService<IRabbitMQPersistentConnection>();
      var logger = sp.GetRequiredService<ILogger<EventBusRabbitMq>>();
      var eventBusSubscriptionsManager = sp.GetRequiredService<IEventBusSubscriptionsManager>();
      var retryCount = eventBusSection.GetValue("RetryCount", 5);

      return new EventBusRabbitMq(logger, eventBusSubscriptionsManager, rabbitMQPersistentConnection, sp, subscriptionClientName, retryCount);
    });

    return services;
  }
}