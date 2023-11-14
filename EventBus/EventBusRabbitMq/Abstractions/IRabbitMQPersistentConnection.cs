using RabbitMQ.Client;

namespace Ecommerce.EventBusRabbitMq.Abstractions
{
  public interface IRabbitMQPersistentConnection : IDisposable
  {
    bool IsConnected {get;}
    bool TryConnect();
    IModel CreateModel();
  }
}