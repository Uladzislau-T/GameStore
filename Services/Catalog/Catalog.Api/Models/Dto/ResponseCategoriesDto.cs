

namespace catalog.Models.Dto
{      
    public class ResponseCategoriesDto {
        public IEnumerable<Genre> Genres {get; set;}
        public IEnumerable<Feature> Features {get; set;}
        public IEnumerable<Platform> Platforms {get; set;}

        public ResponseCategoriesDto(IEnumerable<Genre> genres, IEnumerable<Feature> features, IEnumerable<Platform> platforms)
        {
            Genres = genres;
            Features = features;
            Platforms = platforms;
        }
    }
}