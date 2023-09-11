import { Link } from "react-router-dom";
import { classNames } from "../../../utils/classNames/classNames";
import cls from "./navbar.module.scss"
import { useTheme } from "../../../app/providers/ThemeProvider/lib/useTheme";
import { useEffect, useState } from "react";
import { Sidebar } from "../../sidebar";
import { ThemeSwitcher } from "../../../widgets/themeSwitcher";
import { useTranslation } from "react-i18next";
import { LangSwitcher } from "../../../widgets/langSwitcher";


interface NavbarProps {
  className?: string
}
 
const Navbar = ({className}: NavbarProps) => {
  const {t} = useTranslation("navbar")
  const {theme, toggleTheme} = useTheme()
  const [collapsed, setCollapsed] = useState<boolean>(true)

  function handleCollapsing(){
    setCollapsed(prev => !prev)
  }

  function handleSidebarResize(){
    if(window.innerWidth >= 800)
      setCollapsed(true)
  }

  useEffect(() => {
   window.addEventListener("resize", handleSidebarResize) 
   
   return () => window.removeEventListener("resize", handleSidebarResize)
  })

  return ( 
  <div className={classNames(cls.navbar, {}, [className || ""])}>
    <div className={cls.navOne}>
      <div className={cls.navOne_content}>
        <input type="checkbox"  id={cls.menu_toggle} onChange={handleCollapsing} data-testid="sidebar-toggle"></input>
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
            <Link to="/catalog" >{t("Store")}<i className={cls.arrow_nav}></i></Link>
            {/* <ul className="navSlide">
              <li><Link to="" className="">Total War</Link></li>
              <li><Link to="" className="">Gothic</Link></li>
              <div></div>
              <li><Link to="" className="">New Releases</Link></li>
              <li><Link to="" className="">Bestsellers</Link></li>
            </ul> */}
          </div>
          <div className={cls.navbarLink}>
            <Link to="/news">{t("News")}<i className={cls.arrow_nav}></i></Link>
            {/* <ul className="navSlide">
              <li><Link to="" className="">Latest</Link></li>
              <div></div>
              <li><Link to="" className="">American Market</Link></li>
              <li><Link to="" className="">Europe</Link></li>
              <li><Link to="" className="">Asia</Link></li>
            </ul> */}
          </div>
          <div className={cls.navbarLink}>
            <Link to="">{t("Community")}
            </Link>
          </div>
          <div className={cls.navbarLink}>
            <Link to="">{t("About")}</Link>
            {/* <ul className="navSlide">
              <li><Link to="" className="">Contacts</Link></li>
              <div></div>
              <li><Link to="" className="">American Market</Link></li>              
            </ul> */}
          </div>          
        </div>       
        <div className={cls.navLoginCart}>
          <Link to="/sign-in"  className={[cls.dropLink_nav_login, cls.navOne_cart].join(" ")}><i style={{color:"#b791e5", marginRight:"25px"}} className="fas fa-user">
            </i>
          </Link>
          <a href="/" className={cls.dropLink_nav_login}><i style={{color:"#b791e5", marginRight:"0px"}} className="fas fa-shopping-cart">
            <sup style={{color:"#f04242", fontSize:"12px",}}> ( 2 )<span> $15</span></sup>
            </i>
          </a>
        </div>
        <div className={cls.navOne_menusRight}>
          <ThemeSwitcher className={cls.navbar_theme_visible}/>
          <LangSwitcher className={[cls.lang, cls.navbar_theme_visible].join(" ")}/>
        </div>
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