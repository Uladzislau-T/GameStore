import { FC, Suspense, useContext, useEffect, useState } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
// import { Header } from './components/header/header';
import { routes } from './providers/router/config/routes';
import './styles/app.scss';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { classNames } from '../utils/classNames/classNames';
import { AppRouter } from './providers/router';
import { Footer } from '../components/footer';
import { Navbar } from '../components/navbar';
import PageLoader from '../widgets/pageLoader/ui/pageLoader';
import { StartPage } from '../pages/startpage';
import { Catalog } from '../pages/catalog';
import { StartPageAsync } from '../pages/startpage/ui/startpage.async';
import { CatalogAsync } from '../pages/catalog/ui/catalog.async';

interface AppProps {}

export const App: FC<AppProps> = () => {
  const {theme, toggleTheme} = useTheme()

  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate(routes.startPage.path);
    }
  }, [auth.isLoggedIn]);
  

  return (
    <div className={classNames("app",{}, [theme])}>
        <Navbar className='' />      
        <AppRouter/>
        <Footer/>
    </div>
  );
}