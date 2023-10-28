using RabbitMQ.Client;

namespace EventBusRabbitMq.Abstractions
{
  public interface IRabbitMQPersistentConnection : IDisposable
  {
    bool IsConnected {get;}
    bool TryConnect();
    IModel CreateModel();
  }
}