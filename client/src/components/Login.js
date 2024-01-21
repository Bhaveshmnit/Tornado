import {  useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../utils/UserContext";
import { useDispatch } from "react-redux";
import { UpadateCart } from "../utils/cartSlice";
import { UpadateFavt } from "../utils/favtRestro";

const fetchCart=async(update)=>{
      
        const token = localStorage.getItem('token')
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        };
        try {
          const response = await fetch('http://localhost:5000/api/v1/cart', options);
          const data = await response.json()
          if(data.hasOwnProperty('items'))
          {    
                update(data)
          }
          else
        {        
                  update({items:[],Total:0})
        }
         
        
      } catch (error) {
          console.log(error)
      }
      }
      const fetchFavt=async(update2)=>{
      
        const token = localStorage.getItem('token')
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        };
        try {
          const response = await fetch('http://localhost:5000/api/v1/favt', options);
          const data = await response.json()
          if(data.hasOwnProperty('myList'))
          {    
                update2(data)
          }
          else
        {         
                  update2({myList:[]})
        }
         
        
      } catch (error) {
          console.log(error)
      }
      }

const Login = () => {
        const dispatch=useDispatch();
        const update=(data)=>{
            dispatch(UpadateCart(data))
        }
        const update2=(data)=>{
                dispatch(UpadateFavt(data))
            }
        const {setUserName,setUserLogin}=useContext(UserContext);
        const navigate=useNavigate();
        const [form, setForm] = useState({
                password: '',
                email: ''
        })

        const handleChange = (e) => {
                if (e.target)
                        setForm({
                                ...form,
                                [e.target.name]: e.target.value,
                        })

        }

        const handlesubmit = async (e) => {
                e.preventDefault();

                try {
                        const response = await fetch('http://localhost:5000/api/v1/auth/login', {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(form)
                        });

                        const data = await response.json();

                        if (data.token) {
                                const { token } = data;
                                localStorage.setItem('token', token);
                                
                                setUserName(data.user.name)
                                setUserLogin(true);
                                fetchCart(update);
                                fetchFavt(update2);
                                navigate('/')
                                
                        } else {
                                alert(data.msg)
                                navigate('/login')
                                
                        }
                } catch (error) {
                        console.error('Error:', error);
                        navigate('/login')
                        
                }
        };
//bg-[#e8ddd7] 

        return (
                <>

                        <>
                             
                                <div className="flex items-center justify-center min-h-screen font-mono bg-gray-100">
                                        <form
                                                className="bg-[#e8ddd7] p-8 shadow-md rounded-md "
                                                onSubmit={handlesubmit}
                                        >
                                                <h1 className="text-2xl font-bold mb-4">User Login</h1>

                                                <div className="mb-4">
                                                        <label className="block text-sm font-medium  text-gray-600">
                                                                Email
                                                        </label>
                                                        <input
                                                                className="mt-1 p-2 border bg-[#fdf8f5] border-gray-300 rounded-md w-full"
                                                                type="text"
                                                                value={form.email}
                                                                name="email"
                                                                onChange={handleChange}
                                                        />
                                                </div>
                                                <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-600">
                                                                Password
                                                        </label>
                                                        <input
                                                                className="mt-1 p-2 border bg-[#fdf8f5] border-gray-300 rounded-md w-full"
                                                                type="password"
                                                                value={form.password}
                                                                name="password"
                                                                onChange={handleChange}
                                                        />
                                                </div>

                                                <div className="flex justify-between">
                                                <button
                                                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                                        type="submit"
                                                >
                                                        Submit
                                                </button>
                                                <button className="text-blue-500  hover:underline"><Link to="/register">signup</Link></button>
                                                </div>
                                        </form>
                                </div>
                        </>

                </>

        )
}

export default Login


