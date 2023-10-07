using System.Net;
using catalog.Models.Dto;
using catalog.Models.Interfaces;
using catalog.Models.Dto.Requests;
using Microsoft.AspNetCore.Mvc;
using catalog.Models;

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

    public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsByIds(int[] ids)
    {
        if(ids == null || ids.Length == 0)
        {
            return BadRequest("Need to pass at least one id");
        }

        var result = await _productRepository.GetProductByIds(ids);

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
    public async Task<ActionResult<Product>> UpdateProduct([FromBody] Product product)
    {     
        var result = await _productRepository.UpdateProduct(product);

        if(result == null)
        {
            return NotFound();
        }   

        return product;
    }

    [Route("{id}")]
    [HttpDelete]
    public async Task<ActionResult> DeleteProduct([FromRoute] int id)
    {      
        var result = await _productRepository.DeleteProduct(id);

        if(result == false)
        {
            return NotFound();
        }

        return NoContent();
    }
}
