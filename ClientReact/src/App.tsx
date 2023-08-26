import { FC, Suspense, useContext, useEffect, useState } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
// import { Header } from './components/header/header';
import { routes } from './core/routes';
import './styles/app.scss';
import Footer from './components/footer/footer';
import { useAuth } from './hooks/useAuth';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

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
      {/* <Header/> */}
      <button onClick={toggleTheme}>TOGGLE</button>
        <div style={{flex:"666"}}>
          <Suspense fallback={<div>Loading...</div>}> 
            <Routes>
              {Object.values(routes).map((route) => {              
                return(
                  <Route 
                    key={`route-${route.path}`} 
                    path={route.path} 
                    element={<route.Element/>}/>
                )
              })}
              {/* <Route path={"/"} element={<StartPageAsync />}></Route>
              <Route path={"/catalog"} element={<CatalogAsync />}></Route> */}
            </Routes>
          </Suspense>  
        </div>
      <Footer/>
    </div>
  );
}