#nullable disable
using System.ComponentModel.DataAnnotations;
using catalog.Filters.ValidationAttributes;

namespace catalog.Models.Dto
{      
    public class ProductDto {
        public int? Id { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public string PreviewImage { get; set; }
        [Required]
        public string MainImage { get; set; }        
        [ValidDate]
        public DateTimeOffset TimeCreated { get; set; }
        [Required]
        public ICollection<string> Genres { get; set; }
        [Required]
        public ICollection<string> Features { get; set; }
        [Required]
        public ICollection<string> Platforms { get; set; }
    }

    public record ProductDtoWrapper(IEnumerable<ProductDto> products);    
}