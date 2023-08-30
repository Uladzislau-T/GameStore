import { useTranslation } from "react-i18next";
import { classNames } from "../../../utils/classNames/classNames";
import cls from "./langSwitcher.module.scss"
import Button, { ThemeButton } from "../../../components/button/button";


interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({className}: LangSwitcherProps) => {
  const {t, i18n} = useTranslation()

  function toggle() {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en')
  }

  return (    
    <Button
      className={classNames(cls.lang_switcher, {}, [className || ''])} 
      theme={ThemeButton.CLEAR} 
      onClick={toggle}
    >
      {t("Translate")}
    </Button>      
  );
};