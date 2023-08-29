import { FC, Suspense, useContext, useEffect, useState } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
// import { Header } from './components/header/header';
import { routes } from './providers/router/config/routes';
import './styles/app.scss';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from './providers/ThemeProvider/lib/useTheme';
import { classNames } from '../shared/lib/classNames/classNames';
import { AppRouter } from './providers/router';
import { Footer } from '../widgets/footer';
import { Navbar } from '../widgets/navbar';

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