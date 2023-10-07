using Microsoft.AspNetCore.Mvc;

namespace webBff.Controllers;

[ApiController]
[Route("[controller]")]
public class CartController : ControllerBase
{
    private readonly ILogger<CartController> _logger;
    private readonly ICartService _cartService;

    public CartController(ILogger<CartController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public async Task<ProductResponse> GetProducts()
    {
        return
    }
}
