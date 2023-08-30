import { Theme } from "../../../app/providers/ThemeProvider/lib/ThemeContext";
import { useTheme } from "../../../app/providers/ThemeProvider/lib/useTheme";
import Button, { ThemeButton } from "../../../components/button/button";
import { classNames } from "../../../utils/classNames/classNames";
import cls from "./theneSwitcher.module.scss"
import LightIcon from "../../../app/assets/icons/theme-light 1.svg"
import DarkIcon from "../../../app/assets/icons/theme-dark 1.svg"


interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({className}: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();


  return (
      <Button
          theme={ThemeButton.CLEAR}
          className={classNames(cls.ThemeSwitcher, {}, [className ||''])}
          onClick={toggleTheme}
      >
          {theme === Theme.NORMAL ? <DarkIcon  /> : <LightIcon />}
      </Button>
  );
};