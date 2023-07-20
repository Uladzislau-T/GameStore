import { FC } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import { Header } from './components/header/header';
import { routes } from './core/routes';
import './App.css';
import Footer from './components/footer/footer';

interface AppProps {}

export const App: FC<AppProps> = () => { 


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