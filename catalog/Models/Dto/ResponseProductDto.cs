
#nullable disable
namespace catalog.Models.Dto
{      
    public class ResponseProductDto {
        public IEnumerable<ProductDto> Products {get; set;}
        public int ProductsCount { get; set; }

        public ResponseProductDto(IEnumerable<ProductDto> products, int length)
        {
            Products = products;
            ProductsCount = length;
        }
    }
}