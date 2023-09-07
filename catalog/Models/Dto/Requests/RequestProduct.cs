namespace catalog.Models.Dto.Requests
{
  public class RequestProduct
  {
    public SortProduct Sort { get; set; } = SortProduct.All;
    public int Page { get; set; } = 1;
    public int Limit { get; set; } = 12;
    public string? Genres { get; set; } = string.Empty;
    public string? Features { get; set; } = string.Empty;
    public string? Platforms { get; set; } = string.Empty;    
  }

  // public record RequestProduct(string? Sort, string? Genres, string? Features, string? Platforms, int Page = 1, int Limit = 8);
}