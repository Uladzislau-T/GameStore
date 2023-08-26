import { useContext } from "react";
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "./ThemeContext";

interface UseThemeResult{
  toggleTheme: () => void,
  theme: Theme
}

export function useTheme(): UseThemeResult{
  const {theme, setTheme} = useContext(ThemeContext)

  function toggleTheme() {    
    const newTheme = theme === Theme.NORMAL ? Theme.LIGHT : Theme.NORMAL    
    if(setTheme != undefined)
        setTheme(newTheme)
    
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return {theme, toggleTheme}
}