using Microsoft.AspNetCore.Mvc;

namespace webBff.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public async Task<ProductResponse> GetProducts()
    {
        return
    }
}
