import { ButtonHTMLAttributes, FC, useEffect, useState } from "react";
import cls from "./button.module.scss"
import { classNames } from "../../utils/classNames/classNames";

export enum ThemeButton {
  CLEAR = "clear",
  BACKGROUND = "background",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { //интерфейс , который подгружает стандартные свойства кнопки
  className?:string,
  theme?: ThemeButton,
}
 
const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme,
    ...otherProps
  } = props

  const [themeClass, setThemeClass] = useState<string>("")

  useEffect(() => {
    switch (theme) {
      case ThemeButton.CLEAR:
        setThemeClass(cls.clear)
        break;
      case ThemeButton.BACKGROUND:
        setThemeClass(cls.background)
        break;
      default:
        break;
    }
  }, [])

  return (
    <button 
      type="button"
      className={classNames(cls.button, {}, [className || '', themeClass])}
      {...otherProps}   
    >
      {children}
    </button> 
  );
}
 
export default Button;