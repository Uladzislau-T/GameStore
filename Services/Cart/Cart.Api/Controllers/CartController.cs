using cart.Data;
using cart.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace cart.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
      private readonly ICartRepository _repository;
      public CartController(ICartRepository repository)
      {
        _repository = repository;
      }

      [HttpGet]
      public async Task<ActionResult<Cart>> Get()
      {
        var cart = await _repository.GetAllCartAsync();
        return Ok(cart);
      }

      [HttpDelete("{id}")]
      [ProducesResponseType(StatusCodes.Status200OK)]
      public async Task<ActionResult> DeleteCartById(string id)
      {
          await _repository.DeleteCartAsync(id);

          return Ok();
      }
    }
}