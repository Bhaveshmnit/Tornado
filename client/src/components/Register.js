import { useContext, useState } from "react"
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
          const response = await fetch('https://tornado-five.vercel.app/api/v1/cart', options);
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
          const response = await fetch('https://tornado-five.vercel.app/api/v1/favt', options);
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
const Register = () => {
        const update2=(data)=>{
                dispatch(UpadateFavt(data))
            }
        const dispatch=useDispatch();
        const update=(data)=>{
            dispatch(UpadateCart(data))
        }
        const {setUserLogin,setUserName}=useContext(UserContext)
        const navigate=useNavigate();
        const [form, setForm] = useState({
                name: '',
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
                        const response = await fetch('https://tornado-five.vercel.app/api/v1/auth/register', {
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
                                navigate('/register')
                               
                        }
                } catch (error) {
                        console.error('Error:', error);
                        navigate('/register')
                       
                }
        };


        return (
                <>
                      
                        <>
                                <div className="flex items-center  justify-center min-h-screen bg-gray-100">
                                        <form
                                                className="bg-[#e8ddd7] p-8 shadow-md rounded-md"
                                                onSubmit={handlesubmit}
                                        >
                                                <h1 className="text-2xl font-bold mb-4">User SignUp</h1>

                                                <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-600">
                                                                Username
                                                        </label>
                                                        <input
                                                                className="mt-1 p-2 bg-[#fdf8f5] border border-gray-300 rounded-md w-full"
                                                                type="text"
                                                                value={form.name}
                                                                name="name"
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

                                                <div className="mb-4">
                                                        <label className="block text-sm font-medium text-gray-600">
                                                                Email
                                                        </label>
                                                        <input
                                                                className="mt-1 p-2 bg-[#fdf8f5] border border-gray-300 rounded-md w-full"
                                                                type="text"
                                                                value={form.email}
                                                                name="email"
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
                                                <button className="text-blue-500  hover:underline"><Link to="/login">signin</Link></button>
                                                </div>
                                        </form>
                                </div>
                        </>

                </>

        )
}

export default Register


