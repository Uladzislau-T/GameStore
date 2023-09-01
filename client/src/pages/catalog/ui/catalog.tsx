import { FC, lazy } from "react";
import cls from "./catalog.module.scss"
import { classNames } from "../../../utils/classNames/classNames";
import { useTranslation } from "react-i18next";

interface CatalogProps {
  
}
 
const Catalog: FC<CatalogProps> = () => {
  const {t} = useTranslation("catalog")

  return ( 
    <div className={classNames(cls.catalog_container, {}, [])}>
      {t("Catalog")}
    </div>
   );
}
 
export default Catalog;