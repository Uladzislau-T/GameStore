using Ecommerce.EventBus;
using Ecommerce.EventBus.Abstractions;

namespace catalog.IntegrationEvents;

public class CatalogIntegrationEventService : ICatalogIntegrationEventService
{
  private readonly IEventBus _eventBus;
  private readonly ILogger<CatalogIntegrationEventService> _logger;

  public CatalogIntegrationEventService(ILogger<CatalogIntegrationEventService> logger, IEventBus eventBus)
  {
    _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    _eventBus = eventBus ?? throw new ArgumentNullException(nameof(eventBus));
  }
  public async Task PublishThroughEventBusAsync(IntegrationEvent evt)
  {
    try
    {
      _logger.LogInformation($"Publishing integration event: {evt.Id} - ({evt})");
      _eventBus.Publish(evt);
    }
    catch (Exception ex)
    {
      _logger.LogError(ex, $"Error Publishing integration event: {evt.Id} - ({@evt})");
    }
  }
}