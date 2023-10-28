
# nullable disable
using System.Text;
using System.Text.Json;
using catalog.Models.Dto;
using catalog.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using StackExchange.Redis;

namespace catalog.Data
{
    public class CategoryRepository : ICategoryRepository
    {
      private readonly Context _context;
      private readonly ConnectionMultiplexer _redis;
      private readonly IDatabase _database;
      private readonly ILogger<CategoryRepository> _logger;

      public CategoryRepository(Context context, ConnectionMultiplexer redis, ILogger<CategoryRepository> logger)
      {
        _context = context;
        _redis = redis;
        _database = redis.GetDatabase();
        _logger = logger;
      }
      public async Task<ResponseCategoriesDto> GetAllCategoriesAsync()
      {
        var categories = await _database.StringGetAsync("categories");

        ResponseCategoriesDto response;
        if(!categories.IsNullOrEmpty)
        {
          // var cachedDataString = Encoding.UTF8.GetString(categories);
          response = JsonSerializer.Deserialize<ResponseCategoriesDto>(categories, CommonJsonDefaults.CaseInsensitiveOptions);

          _logger.LogInformation("Responsed with cached items");

          return response;
        }

        var genres = await _context.Genre.OrderBy(x => x.Id).ToArrayAsync();
        var features = await _context.Feature.OrderBy(x => x.Id).ToArrayAsync();
        var platforms = await _context.Platform.OrderBy(x => x.Id).ToArrayAsync();

        response = new ResponseCategoriesDto(genres, features, platforms);

        var stringToCache = JsonSerializer.Serialize<ResponseCategoriesDto>(response, CommonJsonDefaults.CaseInsensitiveOptions);
        var dataToCache = Encoding.UTF8.GetBytes(stringToCache);

        // DistributedCacheEntryOptions options = new DistributedCacheEntryOptions()
        //   .SetAbsoluteExpiration(DateTime.Now.AddMinutes(5))
        //   .SetSlidingExpiration(TimeSpan.FromMinutes(3));

        var created = await _database.StringSetAsync("categories", dataToCache, TimeSpan.FromMinutes(2));

        if (!created)
        {
            _logger.LogInformation("Problem occur persisting the item.");
            return null;
        }

        _logger.LogInformation("Categories response persisted successfully.");

        return response;
      }
    }
}