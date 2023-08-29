import { FC, useState } from "react";
import { classNames } from "../../../../shared/lib/classNames/classNames";
import cls from "./sidebar.module.scss"
import { ThemeSwitcher } from "../../../../shared/ui/ThemeSwitcher";

interface SidebarProps {
  className?:string
  collapsed: boolean
}
 
const Sidebar: FC<SidebarProps> = ({className, collapsed}:SidebarProps) => {
  // const [collapsed, setCollapsed] = useState(false)

  // function onToggle(){
  //   setCollapsed(prev => !prev)
  // }

  return ( 
    <div className={classNames(cls.sidebar, {[cls.collapsed]:collapsed})}>
      <div className={cls.switchers}>
        <ThemeSwitcher/>
      </div>      
    </div>
    
   );
}
 
export default Sidebar;