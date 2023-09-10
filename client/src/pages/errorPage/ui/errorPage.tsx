import { FC } from "react";
import { classNames } from "../../../utils/classNames/classNames";
import { useTranslation } from "react-i18next";
import Button from "../../../components/button/button";
import cls from "./error.module.scss"


interface ErrorPageProps {
  className?:string;
}
 
const ErrorPage: FC<ErrorPageProps> = ({className}:ErrorPageProps) => {
  const {t} = useTranslation("translation")

  function reloadPage(){
    location.reload();
  }

  return ( 
    <div className={classNames(cls.errorPage, {}, [className || ""])}>
      <p>{t("Error")}</p>
      <Button
        onClick={reloadPage}
      >
          {t("Reload page")}
      </Button>
    </div>
   );
}
 
export default ErrorPage;