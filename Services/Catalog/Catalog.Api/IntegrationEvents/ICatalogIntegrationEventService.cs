using Ecommerce.EventBus;

namespace catalog.IntegrationEvents;

public interface ICatalogIntegrationEventService
{
    // Task SaveEventAndCatalogContextChangesAsync(IntegrationEvent evt);
    Task PublishThroughEventBusAsync(IntegrationEvent evt);
}
