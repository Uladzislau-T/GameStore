
using Ecommerce.EventBus;

namespace catalog.IntegrationEvents.Events;

class ProductPriceChangedIntegrationEvent : IntegrationEvent
{
  public int ProductId { get; set; }
  public decimal OldPrice { get; set; }
  public decimal NewPrice { get; set; }

  public ProductPriceChangedIntegrationEvent(int productId, decimal newPrice, decimal oldPrice)
  {
    ProductId = productId;
    NewPrice = newPrice;
    OldPrice = oldPrice;
  }  
}