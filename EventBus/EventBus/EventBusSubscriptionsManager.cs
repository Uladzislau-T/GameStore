#nullable disable
using EventBus.Abstractions;

namespace EventBus
{
  public partial class EventBusSubscriptionsManager : IEventBusSubscriptionsManager
  {
    private readonly Dictionary<string, List<SubscriptionInfo>> _handlers;
    private readonly List<Type> _eventTypes = new List<Type>();


    public void AddSubscription<T,TH>()
      where T : IntegrationEvent
      where TH: IIntegrationEventHandler<T>
    {
      var eventName = typeof(T).Name;

      AddSubscriptionInternal(typeof(TH), eventName);

      if (!_eventTypes.Contains(typeof(T)))
      {
        _eventTypes.Add(typeof(T));
      }
    }

    private void AddSubscriptionInternal(Type handlerType, string eventName)
    {
      if (!HasSubscriptionsForEvent(eventName))
      {
        _handlers.Add(eventName, new List<SubscriptionInfo>());
      }

      if (_handlers[eventName].Any(s => s.HandlerType == handlerType))
      {
        throw new ArgumentException(
            $"Handler Type {handlerType.Name} already registered for '{eventName}'", nameof(handlerType));
      }

      _handlers[eventName].Add(SubscriptionInfo.Typed(handlerType));      
    }

    public IEnumerable<SubscriptionInfo> GetHandlersForEvent(string eventName) => _handlers[eventName];

    public bool HasSubscriptionsForEvent(string eventName) => _handlers.ContainsKey(eventName);

    public Type GetEventTypeByName(string eventName) => _eventTypes.SingleOrDefault(e => e.Name == eventName);

    public void Clear() => _handlers.Clear();
  }
}