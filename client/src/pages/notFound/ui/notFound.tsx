import { FC } from "react";
import { useTranslation } from "react-i18next";
import cls from "./notFound.module.scss"


interface NotFoundProps {
  
}
 
const NotFound: FC<NotFoundProps> = () => {
  const {t} = useTranslation()

  const fullPath = location.protocol + '//' + location.host

  return ( 
    <div className={cls.notFound}>      
      <span className={cls.notFound_wrapper}>        
        <img src={`${fullPath}/images/notFoundPage/404.jpg`} alt="404" className={cls.notFound_img}/>        
        <span className={cls.bear}>
          <span className={cls.bear_text}>
            {/* {t("Not Found")} */}
            The page you‘re<br/>
            trying to reach does not<br/>
            exist :(. Check the address<br/>
            or <a className={cls.bear_text_link} href="/">report an error</a>.
            </span>
          <img src={`${fullPath}/images/notFoundPage/bear.png`} alt="..." className={cls.bear_img}/>
        </span>
      </span>
    </div>
   );
}
 
export default NotFound;