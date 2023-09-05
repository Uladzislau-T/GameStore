import { ButtonHTMLAttributes, FC } from "react";
import cls from "./button.module.scss"
import { classNames } from "../../utils/classNames/classNames";

export enum ThemeButton {
  CLEAR = 'clear'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { //интерфейс , который подгружает стандартные свойства кнопки
  className?:string,
  theme?: ThemeButton
}
 
const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme,
    ...otherProps
  } = props


  return (
    <button 
      type="button"
      className={classNames(cls.button, {}, [className || '', cls.clear])}
      {...otherProps}   
    >
      {children}
    </button> 
  );
}
 
export default Button;