import {  createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Offline } from 'react-detect-offline';
import { Toaster } from "react-hot-toast";
import Layout from "./Components/Layout/Layout.jsx";
import Products from "./Components/Products/Products.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import AuthContextProvider from "./Components/Context/AuthContextProvider.jsx";
import GuardIn from "./Components/Guard/GuardIn.jsx";
import GuardOut from "./Components/Guard/GuardOut.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./Components/Context/CartContext.jsx";
import Payement from "./Components/Payement/Payement.jsx";
import AllOrders from "./Components/AllOrders/AllOrders.jsx";
import Profile from "./Components/Profile/Profile.jsx";

let myRouter = createBrowserRouter([ 
  {path: "/", element: <Layout />, children: [
    {index: true, element: <GuardOut> <Register /> </GuardOut> },
    {path: "e-commerce", element: <GuardIn> <Login /> </GuardIn>},
    {path: "register", element: <GuardOut> <Register /> </GuardOut>},
    {path: "login", element: <GuardOut> <Login /> </GuardOut>},
    {path: "products", element: <GuardIn> <Products /> </GuardIn>},
    {path: "productDetails/:id", element: <GuardIn> <ProductDetails /> </GuardIn>},
    {path: "categories", element: <GuardIn> <Categories /> </GuardIn>},
    {path: "brands", element: <GuardIn> <Brands /> </GuardIn>},
    {path: "cart", element: <GuardIn> <Cart /> </GuardIn>},
    {path: "payment", element: <GuardIn> <Payement /> </GuardIn>},
    {path: "allorders", element: <GuardIn> <AllOrders /> </GuardIn>},
    {path: "profile", element: <GuardIn> <Profile /> </GuardIn>},
    {path: "*", element: <NotFound />},
  ]},
]);


export default function App() {

  const myClient = new QueryClient();

  return <>

    <QueryClientProvider client={myClient}>

      <AuthContextProvider>  

        <CartContextProvider> <RouterProvider router={myRouter} /> </CartContextProvider>

      </AuthContextProvider>

    </QueryClientProvider>


    <Offline>

      <div className="flex justify-content-center align-items-center text-center position-relative" style={{backgroundColor: "#f0f0f0"}}>

        <div className="flex flex-column align-items-center bg-danger text-white position-fixed w-100 p-5" style={{top: "150px"}}>

          <div className="mb-3">📶</div>
          <div className=".fw-bold">No Internet Connection</div>
          <div>Please check your network settings and try again.</div>

        </div>

      </div>

    </Offline>


    <Toaster />
    
  </>
}