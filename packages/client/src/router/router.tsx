import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ErrorLayout from "../components/Layout/errorLayout/ErrorLayout";

//layout
import RootLayout from "../components/Layout/rootLayout/RootLayout";



 const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={< RootLayout/>} ErrorBoundary={ErrorLayout} >
      
      </Route>
    )
  );


  export default router;