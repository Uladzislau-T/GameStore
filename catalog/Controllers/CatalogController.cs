using catalog.Models.Dto;
using catalog.Models.Interfaces;
using catalog.Models.Requests;
using Microsoft.AspNetCore.Mvc;

namespace catalog.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductController : ControllerBase
{

    // private readonly ILogger<Catalog> _logger;
    private readonly IProductRepository _productRepository;    

    public ProductController(IProductRepository productRepository)
    {
        // _logger = logger; 
        _productRepository = productRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ResponseProductDto>>> GetProducts([FromQuery]RequestProduct request)
    {     
        var result = await _productRepository.GetProducts(request);        

        return Ok(result);
    }

    [HttpPost]
    public async Task<> CreateCart()
}
