using static EventBus.EventBusSubscriptionsManager;

namespace EventBus.Abstractions
{
  public interface IEventBusSubscriptionsManager
  {
    void AddSubscription<T,TH>()
      where T : IntegrationEvent
      where TH: IIntegrationEventHandler<T>;
    IEnumerable<SubscriptionInfo> GetHandlersForEvent(string eventName);
    bool HasSubscriptionsForEvent(string eventName);
    Type GetEventTypeByName(string eventName);
    void Clear();
  }
}