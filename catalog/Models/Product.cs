#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace catalog.Models
{
    [Table("products")]
    public class Product : IComparable<Product>
    {
        public int Id { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }        
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PreviewImage { get; set; }
        public string MainImage { get; set; }
        
        public DateTimeOffset TimeCreated { get; set; }
        public List<Genre> Genres { get; set; }
        public List<Feature> Features { get; set; }
        public List<Platform> Platforms { get; set; }

        public int CompareTo(Product o)
        {
            return Title.CompareTo(o.Title);
        }
    }
}