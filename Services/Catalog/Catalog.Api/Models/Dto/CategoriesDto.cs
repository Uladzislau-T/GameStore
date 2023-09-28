namespace catalog.Models.Dto
{
  public class CategoriesDto
  {
    public IEnumerable<string> Genres { get; set; }
    public IEnumerable<string> Features { get; set; }
    public IEnumerable<string> Platforms { get; set; }
  }   

  public record CategoriesWrapper(CategoriesDto Categories);
}