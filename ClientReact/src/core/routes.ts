import { FC } from "react"
import { Catalog } from "../pages/catalog/catalog"
import StartPage  from "../pages/startpage/startpage"
import { SignIn } from "../pages/auth/sign-in/sign-in"


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
  signIn: {
    path: '/sign-in',
    Element: SignIn,
  },
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