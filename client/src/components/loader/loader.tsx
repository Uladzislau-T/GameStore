import { FC } from "react";
import { classNames } from "../../utils/classNames/classNames";
import "./loader.scss"


interface PageLoaderProps {
  className?:string;
}
 
const Loader: FC<PageLoaderProps> = ({className}: PageLoaderProps) => {
  return ( 
    <div className={classNames("lds-roller", {}, [className || ""])}>      
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>
      <div>
      </div>      
    </div>
   );
}
 
export default Loader;