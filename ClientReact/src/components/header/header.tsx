import { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './header.css';

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {

  const [isActive, setActive] = useState<boolean>(false);

  function onMenuChange(){
    if(window.innerWidth > 1040)
    {
      
    }
  }

  return (  
  <div className="navbar column fixed-top">
    <div className="navOne ">    
      <input type="checkbox"  id="menu-toggle"></input>
      <Link to="" className="brand">
        <i>
          <span style={{color:"#CF1796"}}>
              GAME
          </span>
          <span>
              IMPACT
          </span>
        </i>      
      </Link>
      <div className="navbarLinkList" >
        <div className="navbarLink">
          <Link to="/catalog" >Store<i className="arrow-nav"></i></Link>
          <ul className="navSlide">
            <li><Link to="" className="">Total War</Link></li>
            <li><Link to="" className="">Gothic</Link></li>
            <div></div>
            <li><Link to="" className="">New Releases</Link></li>
            <li><Link to="" className="">Bestsellers</Link></li>
          </ul>
        </div>
        <div className="navbarLink">
          <Link to="/news">News<i className="arrow-nav"></i></Link>
          <ul className="navSlide">
            <li><Link to="" className="">Latest</Link></li>
            <div></div>
            <li><Link to="" className="">American Market</Link></li>
            <li><Link to="" className="">Europe</Link></li>
            <li><Link to="" className="">Asia</Link></li>
          </ul>
        </div>
        <div className="navbarLink">
          <Link to="">Community
          </Link>
        </div>
        <div className="navbarLink">
          <Link to="">About
          </Link>
        </div>
        <div className="navbarLink">
          <Link to="">Contact
          </Link>
        </div>
      </div>
      <div className="navLoginCart">
        <a href="/" className="dropLink-nav-login"><i className="fas fa-user ">
          </i>
        </a>
        <a href="/" className="dropLink-nav-login"><i style={{color:"#b791e5", marginRight:"40px"}} className="fas fa-shopping-cart">
          <sup style={{color:"#f04242", fontSize:"12px",}}> ( 2 )<span> $15</span></sup>
          </i>
        </a>
      </div>         
      <div className="nav-btn">      
      <label htmlFor="menu-toggle">        
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
  </div>
    <div className="navTwo">
      <div className="navTwoLinkContainer">
        <NavLink  className="navTwoLink" style={({isActive, isPending}) => 
        isPending ? {color: "inherit"} : isActive ? {color:"white"} : {}} to="/">Discover</NavLink>
        <NavLink className="navTwoLink" style={({isActive, isPending}) => 
        isPending ? {color: "inherit"} : isActive ? {color:"white"} : {}} to="/catalog">Browse</NavLink>
      </div> 
      <div className={isActive ? "search active" : "search"}>
        <form action="#" method="post">
            <input className="input" type="search" name="searchQuery" placeholder="Search..." />
        </form>
        <button className="btn-nav-search" type="submit" onClick={() => setActive(!isActive)}><i className="fas fa-search"></i></button>
      </div>     
    </div>
  </div>
  );
}