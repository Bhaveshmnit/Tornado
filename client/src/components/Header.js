import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { clearFavt } from "../utils/favtRestro";
import logo from "../images/logo3.png"
const Header = () => {
        const cartItems=useSelector((store)=>store.cart)
        const myFavtList=useSelector((store)=>store.favt.myList)
        const {userName,userLogin,setUserLogin,setUserName}=useContext(UserContext)
        const dispatch=useDispatch();
        const handleClearCart=()=>{
            dispatch(clearCart())
            dispatch(clearFavt())
        }

        const saveCart=async(cartItems,myFavtList)=>{
        const token = localStorage.getItem('token')
        const obj={
         myCart:cartItems.items,
         myTotal:cartItems.Total
        }
        const obj2={
                myList:myFavtList
        }
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,

          },
          body:JSON.stringify(obj)
        };
        const options2 = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
      
                },
                body:JSON.stringify(obj2)
              };
        try {
          const response = await fetch('https://tornado-sandy.vercel.app/api/v1/cart/save', options);
          const data = await response.json()
          const response2 = await fetch('https://tornado-sandy.vercel.app/api/v1/favt/save', options2);
          const data2 = await response2.json()
      } catch (error) {
          console.log(error)
      }
        }
        const handleLogout=async (cartItems,myFavtList)=>{

          setUserLogin(false);
          setUserName("Default")
          saveCart(cartItems,myFavtList);
          localStorage.removeItem('token');
          localStorage.setItem('cartState',{items:[],Total:0})
          localStorage.setItem('favtState',{myList:[]})
          handleClearCart()
          
        }
        

        //subscribe to store using selector
        
        return (
                <div className="flex justify-between font-mono text-lg shadow-lg 
                bg-[#DDD0C8] text-[#323232] font-bold">
                        <div className="logo p-3 mx-5">
                                <img className="w-24" src={logo}/>
                        </div>
                        <div className="flex items-center">
                                <ul className="flex p-4 m-4">

                                        <li className="px-4 hover:text-[#fdf8f5]"><Link to="/">HOME</Link></li>
                                        {/* <li className="px-4"><Link to="/about">About</Link></li> */}
                                        {/* <li className="px-4"><Link to="/contact">Contact</Link></li> */}
                                        <li className="px-4 hover:text-[#fdf8f5]"><Link to="/cart">CART-({cartItems.items?.length})</Link></li>
                                       {userLogin&&<li className="px-4  hover:text-[#fdf8f5]"><Link to="/profile">{userName}</Link></li>} 
                                        {!userLogin? 
                                        <li className="px-4 hover:text-[#fdf8f5]"><Link to="/login">LOGIN</Link></li>:
                                        <button className="px-4 hover:text-[#fdf8f5]" onClick={()=>handleLogout(cartItems,myFavtList)}>logout</button>
                                        }

                                       
                                </ul>
                        </div>
                </div>
        )
}
export default Header
