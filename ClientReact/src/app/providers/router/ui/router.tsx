import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../config/routes";
 
const AppRouter = () => {  
  return ( 
    <Suspense fallback={<div>Loading...</div>}> 
      <Routes>
        {Object.values(routes).map((route) => {              
          return(
            <Route 
              key={`route-${route.path}`} 
              path={route.path} 
              element={<route.Element/>}
            />
          )
        })}
      </Routes>
    </Suspense>
   );
}
 
export default AppRouter;