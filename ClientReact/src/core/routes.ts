import { FC } from "react"
import { Catalog } from "../pages/catalog/catalog"
import StartPage  from "../pages/startpage/startpage"


interface RouteItem {
  path: string,
  Element: FC,
  private?: boolean
}

export const routes: Record<string, RouteItem> = {
  startPage: {
    path: '/',
    Element: StartPage,
  },
  catalog: {
    path: '/catalog',
    Element: Catalog    
  },
  catalogPaged: {
    path: '/catalog/:page',
    Element: Catalog    
  },
  // profile: {
  //   path: '/@:profile',
  //   Element: ProfilePage,
  //   private: true,
  //}
}