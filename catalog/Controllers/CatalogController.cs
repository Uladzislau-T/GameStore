using System.Net;
using catalog.Models.Dto;
using catalog.Models.Interfaces;
using catalog.Models.Dto.Requests;
using Microsoft.AspNetCore.Mvc;

namespace catalog.Controllers;

[ApiController]
[Route("api/[controller]")]
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
    [ProducesResponseType((int)HttpStatusCode.Created)]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] ProductDto dto)
    {
        if(!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var result = await _productRepository.CreateProduct(dto);

        return result;
    }

    [HttpPut]
    [ProducesResponseType((int)HttpStatusCode.Created)]
    public async Task<ActionResult<ProductDto>> UpdateProduct([FromBody] ProductDto dto)
    {     
        var result = await _productRepository.UpdateProduct(dto);

        if(result == null)
        {
            return NotFound();
        }   

        return result;
    }

    [HttpDelete]
    public async Task<ActionResult> CreateProduct([FromQuery] int id)
    {      
        var result = await _productRepository.DeleteProduct(id);

        if(result == false)
        {
            return NotFound();
        }

        return NoContent();
    }

    // [HttpPost]
    // public async Task<> CreateCart()
}
