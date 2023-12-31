import { FC, useMemo, useState } from "react"
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from "../lib/ThemeContext"

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.NORMAL

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  const defaultProps = useMemo(() => ({
    theme: theme,
    setTheme: setTheme
  }),[theme])  

  return(
  <div>
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  </div>)
}

export default ThemeProvider