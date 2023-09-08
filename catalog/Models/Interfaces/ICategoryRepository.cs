

using catalog.Models.Dto;

namespace catalog.Models.Interfaces
{
  public interface ICategoryRepository
  {
    Task<ResponseCategoriesDto> GetCategories();
  }
}