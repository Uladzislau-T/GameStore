import { FC, lazy } from "react";
import cls from "./catalog.module.scss"
import { classNames } from "../../../shared/lib/classNames/classNames";

interface CatalogProps {
  
}
 
const Catalog: FC<CatalogProps> = () => {
  return ( 
    <div className={classNames(cls.catalog_container, {}, [])}>
      Catalog
    </div>
   );
}
 
export default Catalog;