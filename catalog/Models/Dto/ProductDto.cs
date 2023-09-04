#nullable disable
namespace catalog.Models.Dto
{      
    public class ProductDto {
        public string Author { get; set; }
        
        public string Title { get; set; }

        public string Description { get; set; }
        
        public decimal Price { get; set; }
        public string PreviewImage { get; set; }
        public string MainImage { get; set; }

        public DateTimeOffset TimeCreated { get; set; }
        public IEnumerable<string> Genres { get; set; }
        public IEnumerable<string> Features { get; set; }
        public IEnumerable<string> Platforms { get; set; }
    }
}