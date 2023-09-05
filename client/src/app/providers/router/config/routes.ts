import { FC } from "react"
import { StartPage } from "../../../../pages/startpage"
import { Catalog } from "../../../../pages/catalog"
import { NotFound } from "../../../../pages/notFound"
// import { SignIn } from "../pages/auth/sign-in/sign-in"


interface RouteItem {
  path: string,
  Element: FC,
  private?: boolean
}

export const routes: Record<string, RouteItem> = {
  notFound: {
    path: '*',
    Element: NotFound
  },
  startPage: {
    path: '/',
    Element: StartPage,
  },
  catalog: {
    path: '/catalog',
    Element: Catalog    
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