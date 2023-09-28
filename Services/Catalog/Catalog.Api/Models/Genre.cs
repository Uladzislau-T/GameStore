#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace catalog.Models
{
    [Table("genres")]
    public class Genre
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [JsonIgnore]
        public IEnumerable<Product> Products { get; set; }
    }
}