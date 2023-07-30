import { FC, useEffect } from 'react';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { Header } from './components/header/header';
import { routes } from './core/routes';
import './App.css';
import Footer from './components/footer/footer';
import { useAuth } from './hooks/useAuth';

interface AppProps {}

export const App: FC<AppProps> = () => { 
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate(routes.startPage.path);
    }
  }, [auth.isLoggedIn]);


  return (
    <div className="app">
      <Header/>
        <div style={{flex:"666"}}>
          <Routes>
            {Object.values(routes).map((route) => {              
              return(
                <Route 
                  key={`route-${route.path}`} 
                  path={route.path} 
                  element={<route.Element/>}/>
              )
            })}        
          </Routes>
        </div>
      <Footer/>
    </div>
  );
}