import { useDispatch, useSelector } from "react-redux"
import ItemList from "./ItemList"
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
    const dispatch=useDispatch();
            const handleClearCart=()=>{
                dispatch(clearCart())
            }
            const cartItems=useSelector((store)=>store.cart.items);
            const Total=useSelector((store)=>store.cart.Total)
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-2/4 m-2">
          {/* Sidebar banners */}
          <div className="p-10  bg-[#fdf8f5] border-b m-2 font-mono border-gray-300 shadow-md">Address</div>
          <div className="p-10   bg-[#fdf8f5] border-b m-2 font-mono border-gray-300 shadow-md">Payment</div>
          <div className="p-10   bg-[#fdf8f5] border-b m-2 font-mono border-gray-300 shadow-md">Account</div>
        </div>
        {/* Main Content */}
        <div className="w-2/4 flex flex-col m-4">
          {/* Header */}
          <div className="sticky top-0  bg-[#fdf8f5] shadow-md p-4 border-b border-gray-300 flex justify-between items-center">
            <div className="font-bold font-mono">Restaurant Name</div>
            <button className="m-2 p-2 bg-black text-white rounded-lg"
                       onClick={handleClearCart}
                      >Clear Cart</button>
          </div>
          {/* Scrollable list of items */}
          <div className="flex-1 overflow-y-auto p-4  bg-[#fdf8f5]">
          <div className="w-12/12 m-auto">
                                   <ItemList  items={cartItems}/>
                     </div>
          </div>
          {/* Bottom Total */}
          <div className="sticky bottom-0  bg-[#fdf8f5] p-4 border-t border-gray-300">
            <div className="text-right text-lg font-bold font-mono">Total:  ₹{Total.toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Cart;

