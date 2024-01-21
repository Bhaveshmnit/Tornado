import React, {  useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";
import ResInfo from "./components/ResInfo";
import { createBrowserRouter,RouterProvider,Outlet} from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";

const AppLayout = () => {
        const [userLogin,setUserLogin]=useState(null)
        const [userName,setUserName]=useState("Default")
        //authentican

 const verify=async()=>{
        const token = localStorage.getItem('token')
        if(token){
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        };
          try {
                const response = await fetch('https://tornado-five.vercel.app/api/v1/auth/profile', options);
                const data = await response.json()
                setUserLogin(data.login)
                setUserName(data.name);
          } catch (error) {
                console.log(error)
          }
         
}

 }
        useEffect(()=>{
         //api call send username and password
         verify();
        },[])
        return (
                <Provider store={appStore}>
                <UserContext.Provider value={{userLogin,userName,setUserName,setUserLogin}}>
                <div className="app">
                        <Header />
                        <Outlet/>
                </div>
               </UserContext.Provider>
               </Provider>
        )
        }


const root = ReactDOM.createRoot(document.getElementById("root"))
const appRouter=createBrowserRouter(
        [
                {
                        path:"/",
                        element:<AppLayout/>,
                        children:[
                                {
                                        path:"/",
                                        element:<Body/>
                                },
                                {
                                        path:"/profile",
                                        // element:<Suspense fallback={<h1>Loading plz wait....</h1>}><Grocery/></Suspense>
                                        element:<Profile/>
                                },
                                {
                                        path:"/:resId",
                                        element:<ResInfo/>
                                },
                                {
                                        path:"/cart",
                                        element:<Cart/>
                                },
                                {
                                        path:"/login",
                                        element:<Login/>
                                },
                                {
                                        path:"/register",
                                        element:<Register/>
                                }

                        ]
                        // error:<Error/>
                },
                ,{
                        path:"*",
                        element:<Error/>
                }
        ]
)

root.render(<RouterProvider router={appRouter} />)