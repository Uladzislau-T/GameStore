using cart.IntegrationEvents.Events;
using cart.Models;
using Ecommerce.EventBus.Abstractions;

namespace cart.IntegrationEvents.Handlers;

public class ProductPriceChangedIntegrationEventHandler : IIntegrationEventHandler<ProductPriceChangedIntegrationEvent>
{
    private readonly ILogger<ProductPriceChangedIntegrationEventHandler> _logger;
    private readonly ICartRepository _repository;

    public ProductPriceChangedIntegrationEventHandler(
        ILogger<ProductPriceChangedIntegrationEventHandler> logger,
        ICartRepository repository)
    {
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
    } 

    public async Task Handle(ProductPriceChangedIntegrationEvent @event)
    {        
        _logger.LogInformation("Handling integration event: {IntegrationEventId} - ({@IntegrationEvent})", @event.Id, @event);

        await _repository.UpdatePriceInBasketItems(@event.ProductId, @event.NewPrice);

        _logger.LogInformation($"Price for event {@event.Id} has been updated");
    }
}
