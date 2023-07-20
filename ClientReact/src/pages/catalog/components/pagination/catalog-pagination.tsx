import { FC, useEffect, useState } from "react";
import pagination from "./pagination"
import "./catalog-pagination.css"
import { NavLink, useNavigate, useParams } from "react-router-dom";


interface PaginationProps {
  setPage:(page: number) => void
  current: number
  total: number
}

 
export const Pagination: FC<PaginationProps> = ({setPage, current, total}) => {
  const centerArray = pagination(current, total)


  const {page: currentPage} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if(currentPage !== undefined && currentPage !== "")
        setPage(Number(currentPage))
  }, [currentPage]);

  const [activePage, setActivePage] = useState<number>( Number(currentPage) ?? 1)

  function goToPreviousePage()
  {
    if(currentPage !== undefined)        
    {
      let page = Number.parseInt(currentPage) - 1
      navigate(`../catalog/${page}`)
      setActivePage(page)
    } 
  }

  function goToNextPage()
  {
    if(currentPage !== undefined)        
    {
      let page = Number.parseInt(currentPage) + 1
      navigate(`../catalog/${page}`)
      setActivePage(page)
    } 
  }

  function changePage(newPage: number){
    navigate(`../catalog/${newPage}`)
    setActivePage(newPage)
  }

  return (
    <div className="pagination">
      <div className="pagination-inner">
        <a href="/" onClick={(e) => {goToPreviousePage(); e.preventDefault()}} className={ currentPage !== "1" ? "catalog-pagination-arrow left" : "invinsible-arrow" }> </a>
        <NavLink className={activePage === 1 ? 'page-active' : 'page-inactive'} to={""} onClick={(e) => {changePage(1); e.preventDefault()}}>1</NavLink>
        { total > 1 ? centerArray.map(value => {               
              if(value !== "...") 
                return <NavLink className={activePage === Number(value) ? 'page-active' : 'page-inactive'} to={"/"} onClick={(e) => {changePage(Number(value)); e.preventDefault()}} key={value}>{value}</NavLink>
              else 
                return <NavLink style={{pointerEvents:"none", color:"#b791e5"}} to={""} aria-disabled key={value}>{value}</NavLink>
            }
          ) : null
        } 
        {
          total > 1 ? <NavLink className={activePage === total ? 'page-active' : 'page-inactive'} to={"/"} onClick={(e) => {changePage(total); e.preventDefault()}}>{total}</NavLink> : null
        }
        <a href="/" onClick={(e) => {goToNextPage(); e.preventDefault()}} className={ currentPage !== String(total) ? "catalog-pagination-arrow right" : "invinsible-arrow" }> </a>
      </div>
    </div>
  );
}