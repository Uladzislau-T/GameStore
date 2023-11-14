#nullable disable
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace catalog.Models
{
    [Table("platform")]
    public class Platform
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [JsonIgnore]
        public IEnumerable<Product> Products { get; set; }
    }
}