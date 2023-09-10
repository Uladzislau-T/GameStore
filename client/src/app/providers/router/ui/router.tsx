import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../config/routes";
import PageLoader from "../../../../widgets/pageLoader/ui/pageLoader";
 
const AppRouter = () => {  
  return ( 
    <Suspense fallback={<PageLoader/>}> 
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