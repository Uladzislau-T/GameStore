import { FC, useState } from "react";
import { classNames } from "../../../../utils/classNames/classNames";
import cls from "./sidebar.module.scss"
import { ThemeSwitcher } from "../../../../widgets/themeSwitcher";
import { LangSwitcher } from "../../../../widgets/langSwitcher";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  className?:string
  collapsed: boolean
}
 
const Sidebar: FC<SidebarProps> = ({className, collapsed}:SidebarProps) => {
  const {t} = useTranslation("sidebar")
  // const [collapsed, setCollapsed] = useState(false)

  // function onToggle(){
  //   setCollapsed(prev => !prev)
  // }

  return ( 
    <div className={classNames(cls.sidebar, {[cls.collapsed]:collapsed})} data-testid="sidebar">
      <div className={cls.sidebarList} >
        <div className={cls.sidebarLink}>
          <Link to="/catalog" >{t("Store")}<i className={cls.arrow_nav}></i></Link>  
        </div>        
        <div className={cls.sidebarLink}>
          <Link to="/news">{t("News")}<i className={cls.arrow_nav}></i></Link>
        </div>
        <div className={cls.sidebarLink}>
          <Link to="">{t("Community")}
          </Link>
        </div>
        <div className={cls.sidebarLink}>
          <Link to="">{t("About")}</Link>          
        </div>          
      </div>

      
      <Link to="/sign-in"  className={cls.sidebar_login} style={{color:"#b791e5"}}>
        SIGN-IN
      </Link>

      <div className={cls.switchers}> 
        <ThemeSwitcher/>
        <LangSwitcher className={cls.lang}/>
      </div> 
    </div>
    
   );
}
 
export default Sidebar;