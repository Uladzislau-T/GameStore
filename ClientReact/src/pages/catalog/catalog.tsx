import { FC, useState } from "react";
import "./catalog.css";
import { GameCard } from "../../components/gameCard/gameCard";
import { gameAPI } from "../../core/API/gameService";
import { CatalogCategory } from "./components/categories/catalog-category";
import { Categories } from "./types";
import { Pagination } from "./components/pagination/catalog-pagination";
import { useParams } from "react-router-dom";

interface CatalogProps {}

export const Catalog: FC<CatalogProps> = () => {  
  const catalogGameFilter = "catalog-game-filter";
  const catalogGameQuery = "catalog-game-query";
  const catalogGameSorting = "catalog-sorting-method";
  const catalogGameLimit = "catalog-game-limit";

  const {page: currentPage} = useParams()

  const [category, setCategory] = useState<string>(localStorage.getItem(catalogGameQuery) ?? "");
  const [filters, setFilters] = useState<Categories>(
    JSON.parse(localStorage.getItem(catalogGameFilter) ??
     JSON.stringify({
      genres: [],
      features: [],
      platforms: [],
    })));
  const [sorting, setSorting] = useState<string>(localStorage.getItem(catalogGameSorting) ?? "Default");
  const [page, setPage] = useState<number>(currentPage !== undefined ? Number(currentPage) : 1);
  const [limit, setLimit] = useState<number>(Number(localStorage.getItem(catalogGameLimit) ?? 12));
  const { data: gameResponse } = gameAPI.useGetAllGamesQuery({
    categories: category,
    sortingItem: sorting,
    page: page,
    limit: limit,
  });
  const { data: categories } = gameAPI.useGetAllCategoriesQuery(""); 

  function updatePage(newPage: number){
    setPage(newPage)
  }

  if (!(catalogGameFilter in localStorage)) {
    localStorage.setItem(
      catalogGameFilter,
      JSON.stringify(filters)
    );
  }

  function filterToString(objFilter: Categories) {
    let query = "";

    Object.keys(objFilter).forEach((key) => {    
        if(objFilter[key as keyof typeof objFilter].length === 0)
        {
          return
        }

        query = query + `${key}=`
        objFilter[key as keyof typeof objFilter].forEach((value, index) => {
          query = query + `${value},`
        })
        query = query.substring(0, query.length -1)
        query = query + "&"
    })
       

    query = query.substring(0, query.length -1)
    localStorage.setItem(catalogGameQuery, query)

    return query;
  }

  function handleCategories(categorySection: string, categoryParam: string) {
    let section = categorySection as keyof typeof filters;

    let index = filters[section].indexOf(categoryParam);
    if (index === -1) {
      filters[section].push(categoryParam);
    } else {
      filters[section].splice(index, 1);
    }

    localStorage.setItem(catalogGameFilter, JSON.stringify(filters));

    // setcategoriesForFiltering(prevState => ({
    //   ...prevState,
    //   [section]: filters[section]
    // }))

    let stringFilter = filterToString(filters);

    handleGamesFetching(stringFilter);
  }

  function handleGamesFetching(categoryParam: string) {
    setCategory(categoryParam);
  } 

  function handleSorting(sortingMethod: string){
    localStorage.setItem(catalogGameSorting, sortingMethod)
    setSorting(sortingMethod)
  }
  function handleLimit(limit: string){
    localStorage.setItem(catalogGameLimit, limit)
    setLimit(Number(limit))
  }

  return (
    <div className="catalog-container">
      <div className="catalog-sortingAndItems">
        <div className="sorting">
          <div className="dropdown">
            Show:
            <button className="dropbtn">
              {sorting}<i className="arrow"></i>
            </button>
            <div className="dropdown-content">
              <button onClick={() => handleSorting("All")}>All</button>
              <button onClick={() => handleSorting("New Releases")}>New Releases</button>
              <button onClick={() => handleSorting("Alphabetical")}>Alphabetical</button>
              <button onClick={() => handleSorting("Price: High to Low")}>
                Price: High to Low
              </button>
              <button onClick={() => handleSorting("Price: Low to High")}>
                Price: Low to High
              </button>
            </div>
          </div>
          <div className="dropdown">
            Limit:
            <button className="dropbtn">
              {limit}<i className="arrow"></i>
            </button>
            <div className="dropdown-content">
              <button onClick={() => handleLimit("12")}>12</button>
              <button onClick={() => handleLimit("24")}>24</button>
              <button onClick={() => handleLimit("48")}>48</button>
              <button onClick={() => handleLimit("96")}>96</button>
            </div>
          </div>          
        </div>
        <div className="catalog-items">
          {gameResponse && gameResponse.games.map((games) => <GameCard key={games.id} game={games} />)}
        </div>
        <div>          
          {
            gameResponse && <Pagination setPage={updatePage} current={ page} total={(Math.ceil(gameResponse.gamesLength / limit))}/>
          }          
        </div>
      </div>
      <div className="catalog-categories">
        <div className="catalog-filter" style={{}}>
          Filter
        </div>
        {categories &&
          Object.keys(categories).map(key => (
            <CatalogCategory
              key={key}
              section={key}
              fetchCategory={handleCategories}
              categories={categories[key as keyof Categories]}
              activeCategories={filters[key as keyof Categories]}
            />
          ))}
      </div>
    </div>
  );
};
