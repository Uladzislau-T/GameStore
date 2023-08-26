import { FC } from "react"
import { StartPageAsync } from "../pages/startpage/startpage.async"
import { CatalogAsync } from "../pages/catalog/catalog.async"
// import { SignIn } from "../pages/auth/sign-in/sign-in"


interface RouteItem {
  path: string,
  Element: FC,
  private?: boolean
}

export const routes: Record<string, RouteItem> = {
  startPage: {
    path: '/',
    Element: StartPageAsync,
  },
  catalog: {
    path: '/catalog',
    Element: CatalogAsync    
  },
  // catalogPaged: {
  //   path: '/catalog/:page',
  //   Element: Catalog    
  // },
  // signIn: {
  //   path: '/sign-in',
  //   Element: SignIn,
  // },
  // signUp: {
  //   path: '/sign-up',
  //   Element: SignUp,
  // },
  // profile: {
  //   path: '/@:profile',
  //   Element: ProfilePage,
  //   private: true,
  //}
}