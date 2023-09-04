#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace catalog.Models
{
    [Table("products")]
    public class Product : IComparable<Product>
    {
        public int Id { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Title { get; set; }
        
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        public string PreviewImage { get; set; }
        public string MainImage { get; set; }
        
        public DateTimeOffset TimeCreated { get; set; }
        public IEnumerable<Genre> Genres { get; set; }
        public IEnumerable<Feature> Features { get; set; }
        public IEnumerable<Platform> Platforms { get; set; }

        public int CompareTo(Product o)
        {
            return Title.CompareTo(o.Title);
        }
    }
}