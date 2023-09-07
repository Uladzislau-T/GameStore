#nullable disable
using System.ComponentModel.DataAnnotations;
using catalog.Filters.ValidationAttributes;

namespace catalog.Models.Dto
{      
    public class ProductDto {
        public int Id { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        public string PreviewImage { get; set; }
        public string MainImage { get; set; }        
        // [ValidDate]
        public DateTimeOffset TimeCreated { get; set; }
        public IEnumerable<string> Genres { get; set; }
        public IEnumerable<string> Features { get; set; }
        public IEnumerable<string> Platforms { get; set; }
    }
}