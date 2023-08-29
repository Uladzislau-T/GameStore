import { Link } from "react-router-dom";
import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from "./navbar.module.scss"
import { useTheme } from "../../../app/providers/ThemeProvider/lib/useTheme";
import { useState } from "react";
import { Sidebar } from "../../sidebar";
import { ThemeSwitcher } from "../../../shared/ui/ThemeSwitcher";


interface NavbarProps {
  className: string
}
 
const Navbar = ({className}: NavbarProps) => {
  const {theme, toggleTheme} = useTheme()
  const [collapsed, setCollapsed] = useState<boolean>(true)

  function handleCollapsing(){
    setCollapsed(prev => !prev)
  }

  return ( 
  <div className={classNames(cls.navbar, {}, [className])}>
    <div className={cls.navOne}>
      <div className={cls.navOne_content}>
        <input type="checkbox"  id={cls.menu_toggle} onChange={handleCollapsing}></input>
        <Link to="" className={cls.brand}>
          <i>
            <span style={{color:"#CF1796"}}>
                GAME
            </span>
            <span>
                IMPACT
            </span>
          </i>      
        </Link>
        <div className={cls.navbarLinkList} >
          <div className={cls.navbarLink}>
            <Link to="/catalog" >Store<i className={cls.arrow_nav}></i></Link>
            {/* <ul className="navSlide">
              <li><Link to="" className="">Total War</Link></li>
              <li><Link to="" className="">Gothic</Link></li>
              <div></div>
              <li><Link to="" className="">New Releases</Link></li>
              <li><Link to="" className="">Bestsellers</Link></li>
            </ul> */}
          </div>
          <div className={cls.navbarLink}>
            <Link to="/news">News<i className={cls.arrow_nav}></i></Link>
            {/* <ul className="navSlide">
              <li><Link to="" className="">Latest</Link></li>
              <div></div>
              <li><Link to="" className="">American Market</Link></li>
              <li><Link to="" className="">Europe</Link></li>
              <li><Link to="" className="">Asia</Link></li>
            </ul> */}
          </div>
          <div className={cls.navbarLink}>
            <Link to="">Community
            </Link>
          </div>
          <div className={cls.navbarLink}>
            <Link to="">About
            </Link>
          </div>
          <div className={cls.navbarLink}>
            <Link to="">Contact
            </Link>
          </div>
        </div>
        <ThemeSwitcher className={cls.navbar_theme_visible}/>
        <div className={cls.navBtn}>      
          <label htmlFor={cls.menu_toggle}>        
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </div>
    </div>
    <Sidebar collapsed={collapsed}/>
    <div className={cls.navTwo}>
      <div className={cls.navTwo_content}>

      </div>
    </div>  
  </div> );
}
 
export default Navbar;