using StackExchange.Redis;

namespace cart.Extentions
{
  public static class Extensions
  {
    public static IServiceCollection AddRedis(this IServiceCollection services, IConfiguration configuration)
    {
        return services.AddSingleton(sp =>
        {
            var redisConfig = ConfigurationOptions.Parse(configuration.GetConnectionString("redis"), true);

            return ConnectionMultiplexer.Connect(redisConfig);
        });
    }
  }
}