#nullable disable
using AutoMapper;
using catalog.Models;
using catalog.Models.Dto;
using catalog.Models.Interfaces;
using catalog.Models.Dto.Requests;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using System.Text.Json;

namespace catalog.Data
{
    public class ProductRepository : IProductRepository
    {
      private readonly Context _context;
      private readonly ConnectionMultiplexer _redis;
      private readonly IDatabase _database;
      private readonly IMapper _mapper;
      private readonly ILogger<CategoryRepository> _logger;

      public ProductRepository(Context context, ConnectionMultiplexer redis, IMapper mapper, ILogger<CategoryRepository> logger)
      {
        _context = context;
        _redis = redis;
        _database = redis.GetDatabase();
        _mapper = mapper;
        _logger = logger;
      }      

      public async Task<ResponseProductDto> GetProducts(RequestProduct request)
      {
        var genres = request.Genres != string.Empty ? request.Genres?.Split(",") : Array.Empty<string>();
        var features = request.Features != string.Empty ? request.Features?.Split(",") : Array.Empty<string>();
        var platforms = request.Platforms != string.Empty ? request.Platforms?.Split(",") : Array.Empty<string>();

        var products = _context.Product
          .Include(p => p.Genres)
          .Include(p => p.Features)
          .Include(p => p.Platforms)
          .Select(x => x);

        if(genres != null || genres.Length != 0)
          foreach (var genre in genres)        
            products = products.Where(p => p.Genres.Any(g => g.Name == genre));        

        if(features != null || features.Length != 0)        
          foreach (var feature in features)       
            products = products.Where(p => p.Features.Any(f => f.Name == feature));
        
        if(platforms != null || platforms.Length != 0)
          foreach (var platform in platforms)        
            products = products.Where(p => p.Platforms.Any(p => p.Name == platform));            

        switch (request.Sort) {
          case SortProduct.NewReleases:
            products = products.OrderByDescending(p => p.TimeCreated);
            break;
          case SortProduct.Alphabetical:
            products = products.OrderBy(p => p.Title);
            break;
          case SortProduct.PriceHightoLow:
            products = products.OrderByDescending(p => p.Price);
            break;
          case SortProduct.PriceLowtoHigh:
            products = products.OrderBy(p => p.Price);
            break;
          default:
            break;
        }  

        var productsCount = await products.CountAsync();  

        var startIndex = (request.Page - 1) * request.Limit;
        int offset;
        if((productsCount - startIndex) < 1)
        {
          offset = 0;          
        }
        else
        {
          offset = startIndex;
        }  

        var rawProducts = await products
          .Skip(offset)
          .Take(request.Limit)
          .AsNoTracking()
          .ToArrayAsync();

        var productsDto = _mapper.Map<IEnumerable<ProductDto>>(rawProducts);

        return new ResponseProductDto(productsDto, productsCount); 
      }

      public async Task<IEnumerable<ProductDto>> GetProductByIds(IEnumerable<int> ids)
      {
        var keys = ids.Select(i => {return $"product:{i}";});

        var redisProducts = _database.getall

        var categories = await _database.StringGetAsync("categories");

        IEnumerable<ProductDto> productsDto;
        if(!categories.IsNullOrEmpty)
        {
          // var cachedDataString = Encoding.UTF8.GetString(categories);
          response = JsonSerializer.Deserialize<ResponseCategoriesDto>(categories, JsonDefaults.CaseInsensitiveOptions);

          _logger.LogInformation("Responsed with cached items");

          return response;
        }

        var products = await _context.Product.Where(p => ids.Contains(p.Id)).ToArrayAsync();

        if(products == null || products.Length == 0)
        {
          throw new InvalidOperationException("There are no items in db with such ids");
        }

        productsDto = _mapper.Map<IEnumerable<ProductDto>>(products);

        return productsDto;
      }

      public async Task<ProductDto> CreateProduct(ProductDto dto)
      {   
        var product = await MapProductAsync(_context, dto);

        _context.Product.Add(product);

        await _context.SaveChangesAsync();

        dto.Id = product.Id;

        return dto;
      }

      public async Task<Product> UpdateProduct(Product product)
      {
        using var transaction = _context.Database.BeginTransaction();

        try
        {

          var productForUpdate = await _context.Product
            .Include(p => p.Genres)
            .Include(p => p.Features)
            .Include(p => p.Platforms)
            .SingleOrDefaultAsync(p => p.Id == product.Id);

          if(productForUpdate == null)
          {
            return null;
          }

          var genres = await _context.Genre.Where(g => product.Genres.Contains(g)).ToListAsync();
          var features = await _context.Feature.Where(g => product.Features.Contains(g)).ToListAsync();
          var platforms = await _context.Platform.Where(g => product.Platforms.Contains(g)).ToListAsync();

          productForUpdate.Genres.Clear();        
          productForUpdate.Features.Clear();
          productForUpdate.Platforms.Clear();

          await _context.SaveChangesAsync();

          productForUpdate.Title = product.Title;
          productForUpdate.Author = product.Author;
          productForUpdate.Description = product.Description;
          productForUpdate.Price = product.Price;
          productForUpdate.TimeCreated = product.TimeCreated;
          productForUpdate.PreviewImage = product.PreviewImage;
          productForUpdate.MainImage = product.MainImage;
          productForUpdate.Genres.AddRange(genres);
          productForUpdate.Features.AddRange(features);
          productForUpdate.Platforms.AddRange(platforms);

          await _context.SaveChangesAsync();

          transaction.Commit();
          
          return product;

        }
        catch (Exception)
        {
            transaction.Rollback();
            throw;
        }
      }

      public async Task<bool> DeleteProduct(int id)
      {
        var product = await _context.Product.FirstOrDefaultAsync(p => p.Id == id);

        if(product == null)
        {
          return false;
        }

        _context.Product.Remove(product);

        await _context.SaveChangesAsync();

        return true;
      }

      public async Task<Product> MapProductAsync(Context context, ProductDto dto)
      {
        var genres = await context.Genre.Where(g => dto.Genres.Contains(g.Name)).ToListAsync();
        var features = await context.Feature.Where(g => dto.Features.Contains(g.Name)).ToListAsync();
        var platforms = await context.Platform.Where(g => dto.Platforms.Contains(g.Name)).ToListAsync();

        var product = new Product() {
          Title = dto.Title,
          Author = dto.Author,
          Description = dto.Description,
          Price = dto.Price,
          TimeCreated = dto.TimeCreated,
          PreviewImage = dto.PreviewImage,
          MainImage = dto.MainImage,
          Genres = genres,
          Features = features,
          Platforms = platforms
        };

        return product;
      }
    }
}