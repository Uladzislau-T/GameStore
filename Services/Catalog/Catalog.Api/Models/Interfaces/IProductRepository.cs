using catalog.Models.Dto;
using catalog.Models.Dto.Requests;
using Microsoft.AspNetCore.Mvc;

namespace catalog.Models.Interfaces
{
  public interface IProductRepository
  {
        Task<ProductDto> CreateProduct(ProductDto dto);
        Task<bool> DeleteProduct(int id);
        Task<ResponseProductDto> GetProducts(RequestProduct request);
        Task<IEnumerable<ProductDto>> GetProductByIds(IEnumerable<int> ids);
        Task<Product> UpdateProduct(Product dto);
    }
}