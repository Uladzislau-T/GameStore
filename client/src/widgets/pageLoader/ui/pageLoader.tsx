import { FC } from "react";
import cls from "./pageLoader.module.scss"
import { classNames } from "../../../utils/classNames/classNames";
import Loader from "../../../components/loader/loader";


interface PageLoaderProps {
  className?:string;
}
 
const PageLoader: FC<PageLoaderProps> = ({className}: PageLoaderProps) => {
  return ( 
    <div className={classNames(cls.pageLoader, {}, [className || ""])}>
      <Loader/>
    </div>
   );
}
 
export default PageLoader;