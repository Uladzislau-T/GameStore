#nullable disable
using System.Text.Json;
using cart.Models;
using Microsoft.EntityFrameworkCore;
using Services.Common;
using StackExchange.Redis;

namespace cart.Data
{
  public class CartRepository : ICartRepository
  {
    private readonly Context _context;
    private readonly ConnectionMultiplexer _redis;
    private readonly IDatabase _redisDatabase;
    private readonly ILogger<CartRepository> _logger;

    public CartRepository(Context context, ConnectionMultiplexer redis, ILogger<CartRepository> logger)
    {
      _context = context;
      _redis = redis;
      _redisDatabase = redis.GetDatabase();
      _logger = logger;
    }

    public async Task<IEnumerable<Cart>> GetAllCartAsync()
    {
      var carts = await _context.Cart.Include(c => c.Items).ToArrayAsync();
      if(carts == null || carts.Length == 0)
      {
        _logger.LogInformation("There are no carts in db");
        return null;
      }

      return carts;
    }

    public async Task<Cart> GetCartBySessionIdAsync(string session)
    {
        throw new NotImplementedException();
    }

    public async Task<Cart> GetCartByClientIdAsync(int clientId)
    {       
      var redisCart = await _redisDatabase.StringGetAsync($"cart:{clientId}");

      Cart response;
      if(!redisCart.IsNullOrEmpty)
      {
        response = JsonSerializer.Deserialize<Cart>(redisCart, CommonJsonDefaults.CaseInsensitiveOptions);

        _logger.LogInformation("Responsed with cached cart");

        return response;
      }

      response = await _context.Cart.Include(c => c.Items).SingleOrDefaultAsync(c => c.ClientId == clientId);

      var stringToCache = JsonSerializer.Serialize<Cart>(response, CommonJsonDefaults.CaseInsensitiveOptions);

      // DistributedCacheEntryOptions options = new DistributedCacheEntryOptions()
      //   .SetAbsoluteExpiration(DateTime.Now.AddMinutes(5))
      //   .SetSlidingExpiration(TimeSpan.FromMinutes(3));

      var created = await _redisDatabase.StringSetAsync($"cart:{response.ClientId}", stringToCache, TimeSpan.FromMinutes(2));

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
      var created = await _redisDatabase.StringSetAsync($"cart:{cart.ClientId}", JsonSerializer.Serialize(cart, CommonJsonDefaults.CaseInsensitiveOptions));
      
      if (!created)
      {
        throw new DbUpdateException("Problem occured persisting the item in Redis.");
      }

      var dbCart = await _context.Cart.Where(c => c.ClientId == cart.ClientId).Include(c => c.Items).FirstOrDefaultAsync();

      if(dbCart != null){
        _context.Cart.Remove(dbCart);
      }

      await _context.Cart.AddAsync(cart);

      await _context.SaveChangesAsync();

      _logger.LogInformation("Cart item persisted successfully.");

      return cart;
    }

    public async Task UpdatePriceInBasketItems(int productId, decimal newPrice)
    {
      var carts = await _context.Cart.Where(c => c.Items.Any(ci => ci.ProductId == productId)).Include(c => c.Items).ToArrayAsync();

      foreach (var cart in carts)
      {
        var stringToCache = JsonSerializer.Serialize<Cart>(cart, CommonJsonDefaults.CaseInsensitiveOptions);

        var created = await _redisDatabase.StringSetAsync($"cart:{cart.ClientId}", stringToCache, TimeSpan.FromMinutes(10));
      
        if (!created)
        {
          throw new DbUpdateException("Problem occured persisting the item in Redis.");
        }      
      }

      foreach (var cart in carts)
      {
        var totalsum = 0m;
        foreach (var item in cart.Items)
        {
          if (item.ProductId == productId)
          {
            item.UnitPrice = newPrice;
          }

          totalsum += item.UnitPrice;
        }

        cart.TotalPrice = totalsum;
      }

      await _context.SaveChangesAsync();        
    }

    public async Task<bool> DeleteCartAsync(string id)
    {
      return await _redisDatabase.KeyDeleteAsync(id);
    }    
  }
}