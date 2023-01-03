import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import React ,{ useState, useCallback } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home";







import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Toaster} from "react-hot-toast"
import { AuthProvider } from "./context/auth";
import Menu from "./components/nav/Menu";

import Food from "./Food/Food";
//import Reservation from "./Reservation/Reservation";
import Register from "../src/pages/auth/Register"
import Login  from "../src/pages/auth/Login"
import AdminDashboard from "./pages/admin/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import Dashboard from "./pages/user/Dashboard";
import NotFound from "./image/not found.gif"
import AdminRoute from "./components/routes/AdminRoute";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product"
import AdminProducts from "./pages/admin/Products";
import UserProfile from "./pages/user/Profile";
import UserOrders from "./pages/user/Order"
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/admin/Orders";
// import RoutesWithUserChatComponent from "./pages/components/RoutesWithUserChatComponent";

import ChatPage from "./ChatPage/ChatPage"
//import { Route, Routes } from "react-router-dom";
import Contact from "./Contact/Contact"
//import RegisterPage from "./pages/RegisterPage";
//import LoginPage from "./pages/LoginPage";
//import UserProfilePage from "./User/UserProfilePage"
//import React ,{ useState, useCallback } from "react"
// import Auth from "../src/pages/Auth"
//import Food from "./Food/Food";
import Reservation from "./Reservation/Reservation";

//import {AuthContext} from "./shared/context/auth-context";
import Menu2 from "./Menu/Menu2";

import Special from "./Special/Special";
import ShowMyMeals from "./ShowMyMeals/ShowMyMeals";
import Footer from './Footer/Footer';
import "./style.scss"

function App() {
  // const [isLoggedIn,setIsLoggedIn] = useState(false)


 
  // let routes;
  // if (isLoggedIn) {
  //   routes = (
      
  //       <Route path="/register" exact>
          
  //         </Route>
  //   )
  // } else {
  //   routes = (
      
  //       <Route path="/" exact>
         
  //         </Route>
  //   )
  // }



const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      
      <img src={NotFound} alt="Loading" style={{width:"40%"}}/>
    </div>
  );
};




 
        
      
        





  return (
    
    <div className="App">
   
  
      <Toaster/>
    
     
      <Routes>
      
        

      
       
        <Route  path ="/dashboard/user" element={ <PrivateRoute/>} >
       
        <Route  path ="profile" element={ <UserProfile/>}/>
        <Route  path ="orders" element={ <UserOrders/>}/>
        <Route  path ="" element={ <Dashboard/>}/>
       
       </Route>
      
        
        <Route  path ="/dashboard/admin" element={ <AdminRoute/>} >
        <Route  path ="category" element={ <AdminCategory/>}/>
        

        <Route  path ="product" element={ <AdminProduct/>}/>
        <Route  path ="" element={ <AdminDashboard/>}/>
        <Route  path ="products" element={ <AdminProducts/>}/>
       

        <Route  path ="/dashboard/admin/product/update/:id" element={ <AdminProductUpdate/>}/>
        <Route  path ="orders" element={ <AdminOrders/>}/>
        </Route>
        
        <Route  path ="*" element={ <PageNotFound/>} replace/>
        


        
        
        
     {/* <Route element={<RoutesWithUserChatComponent/>}>
    
       
        </Route> */}

        <Route  exact path ="/login" element={ <Login/>}/>
        <Route  path ="/register" element={ <Register/>}/>
        <Route  path ="/cart" element={ <Cart/>}/>
        <Route path="/chat" element={ <ChatPage/>}/>
        
        <Route path="/contact" element={ <Contact/>} />
        <Route path="/special" element={ <Special/>} />
        <Route path="/showMyMeals" element={ <ShowMyMeals/>} />
        
        <Route path="/food/:type" element={ <Food/>}/>
        <Route path="/" element={ <Home/>}/>
        <Route path ="/reservation" element={ <Reservation/>}/>
        {/* <Route path = "/auth"  element = {<Auth/>}/> */}
        <Route path = "/menu"  element = {<Menu2/>}/>
        </Routes>
      
      <Footer />
    </div>
   
  );
}

export default App;
