namespace Ecommerce.EventBus
{
  public partial class EventBusSubscriptionsManager : IEventBusSubscriptionsManager
  {
    public class SubscriptionInfo
    {
      public bool IsDynamic { get; }
      public Type HandlerType {get; }

      private SubscriptionInfo(bool isDynamic, Type handlerType)
      {
        IsDynamic = isDynamic;
        HandlerType = handlerType;
      }

      public static SubscriptionInfo Dynamic(Type handlerType) =>
        new SubscriptionInfo(true, handlerType);

      public static SubscriptionInfo Typed(Type handlerType) =>
        new SubscriptionInfo(false, handlerType);
    }
  }
}