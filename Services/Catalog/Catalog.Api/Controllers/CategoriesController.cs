


using catalog.Models.Dto;
using catalog.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace catalog.Controllers;

[ApiController]
[Route("api/catalog/[controller]")]
public class CategoryController : ControllerBase
{
  private readonly ICategoryRepository _categoryRepository;
  public CategoryController(ICategoryRepository categoryRepository)
  {
    _categoryRepository = categoryRepository;
  }

  public async Task<ResponseCategoriesDto> GetAllCategories()
  {
    var result = await _categoryRepository.GetAllCategoriesAsync();

    return result;
  }  
}