

using catalog.Models.Dto;
using catalog.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace catalog.Data
{
    public class CategoryRepository : ICategoryRepository
    {
      private readonly Context _context;

      public CategoryRepository(Context context)
      {
        _context = context;
      }
        public async Task<ResponseCategoriesDto> GetCategories()
        {
          var genres = await _context.Genre.OrderBy(x => x.Id).ToArrayAsync();
          var features = await _context.Feature.OrderBy(x => x.Id).ToArrayAsync();
          var platforms = await _context.Platform.OrderBy(x => x.Id).ToArrayAsync();

          return new ResponseCategoriesDto(genres, features, platforms);
        }
    }
}