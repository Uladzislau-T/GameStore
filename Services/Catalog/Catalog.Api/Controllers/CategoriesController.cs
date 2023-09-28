


using catalog.Models.Dto;
using catalog.Models.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace catalog.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
  private readonly ICategoryRepository _categoryRepository;
  public CategoryController(ICategoryRepository categoryRepository)
  {
    _categoryRepository = categoryRepository;
  }

  public async Task<ResponseCategoriesDto> GetFilterCategories()
  {
    var result = await _categoryRepository.GetCategories();

    return result;
  }  
}