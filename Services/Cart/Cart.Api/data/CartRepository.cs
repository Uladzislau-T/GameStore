#nullable disable
using System.Text;
using System.Text.Json;
using cart.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Services.Common;
using StackExchange.Redis;

namespace cart.Data
{
  public class CartRepository : ICartRepository
  {
    private readonly Context _context;
    private readonly ConnectionMultiplexer _redis;
    private readonly IDatabase _database;
    private readonly ILogger<CartRepository> _logger;

    public CartRepository(Context context, ConnectionMultiplexer redis, ILogger<CartRepository> logger)
    {
      _context = context;
      _redis = redis;
      _database = redis.GetDatabase();
      _logger = logger;
    }

    public async Task<Cart> GetCartBySessionAsync(string session)
    {
        throw new NotImplementedException();
    }

    public async Task<Cart> GetCartByClientAsync(int clientId)
    {       
        var categories = await _database.StringGetAsync("cart");

          Cart response;
          if(!categories.IsNullOrEmpty)
          {
            // var cachedDataString = Encoding.UTF8.GetString(categories);
            response = JsonSerializer.Deserialize<Cart>(categories, JsonDefaults.CaseInsensitiveOptions);

            _logger.LogInformation("Responsed with cached cart");

            return response;
          }

          response = await _context.Cart.Include(c => c.Items).SingleOrDefaultAsync(c => c.Id == clientId);

          var stringToCache = JsonSerializer.Serialize<Cart>(response, JsonDefaults.CaseInsensitiveOptions);
          var dataToCache = Encoding.UTF8.GetBytes(stringToCache);

          DistributedCacheEntryOptions options = new DistributedCacheEntryOptions()
            .SetAbsoluteExpiration(DateTime.Now.AddMinutes(5))
            .SetSlidingExpiration(TimeSpan.FromMinutes(3));

          var created = await _database.StringSetAsync("cart", dataToCache);

          if (!created)
          {
              _logger.LogInformation("Problem occur persisting the item.");
              return null;
          }

          _logger.LogInformation("Cart response persisted successfully.");

        return response;
    }

    public async Task<Cart> UpdateCartAsync(Cart cart)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteCartAsync(string id)
    {
        return await _database.KeyDeleteAsync(id);
    }        
  }
}