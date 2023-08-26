import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from "./navbar.module.scss"


interface NavbarProps {
  className: string
}
 
const Navbar = ({className}: NavbarProps) => {
  return ( 
  <div className={classNames(cls.navbar, {}, [className])}>

  </div> );
}
 
export default Navbar;