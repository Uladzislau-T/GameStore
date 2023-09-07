#nullable disable
using AutoMapper;
using catalog.Models;
using catalog.Models.Dto;
using catalog.Models.Interfaces;
using catalog.Models.Dto.Requests;
using Microsoft.EntityFrameworkCore;

namespace catalog.Data
{
    public class ProductRepository : IProductRepository
    {
      private readonly Context _context;
      private readonly IMapper _mapper;
      public ProductRepository(Context context, IMapper mapper)
      {
        _context = context;
        _mapper = mapper;
      }      

        public async Task<ResponseProductDto> GetProducts(RequestProduct request)
      {
        var genres = request.Genres != string.Empty ? request.Genres?.Split(",") : Array.Empty<string>();
        var features = request.Features != string.Empty ? request.Features?.Split(",") : Array.Empty<string>();
        var platforms = request.Platforms != string.Empty ? request.Platforms?.Split(",") : Array.Empty<string>();

        IQueryable<Product> products = _context.Product
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

      public async Task<ProductDto> CreateProduct(ProductDto dto)
      {
        var product = await MapToProductAsync(dto);
        
        _context.Product.Add(product);

        await _context.SaveChangesAsync();

        return dto;
      }

      public async Task<ProductDto> UpdateProduct(ProductDto dto)
      {
        var product = await _context.Product.Where(p => p.Id == dto.Id).FirstOrDefaultAsync();

        if(product == null)
        {
          return null;
        }

        var genres = await _context.Genre.Where(g => dto.Genres.Contains(g.Name)).ToArrayAsync();
        var features = await _context.Feature.Where(g => dto.Features.Contains(g.Name)).ToArrayAsync();
        var platforms = await _context.Platform.Where(g => dto.Platforms.Contains(g.Name)).ToArrayAsync();
        
        product.Author = dto.Author;
        product.Title = dto.Title;
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.TimeCreated = product.TimeCreated;
        product.Genres = genres;
        product.Features = features;
        product.Platforms =platforms;

        _context.Product.Update(product);

        await _context.SaveChangesAsync();
        
        return dto;
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

        private async Task<Product> MapToProductAsync(ProductDto dto)
        {
          var genres = await _context.Genre.Where(g => dto.Genres.Contains(g.Name)).ToArrayAsync();
          var features = await _context.Feature.Where(g => dto.Features.Contains(g.Name)).ToArrayAsync();
          var platforms = await _context.Platform.Where(g => dto.Platforms.Contains(g.Name)).ToArrayAsync();

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