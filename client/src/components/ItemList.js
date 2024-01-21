import { useDispatch, useSelector } from "react-redux"
import { addItems, removeItems } from "../utils/cartSlice";


const ItemList = ({ items }) => {
        const cartItems = useSelector((store) => store.cart.items);
        const dispatch = useDispatch();
        const handleAdditem = (items) => {
                dispatch(addItems(items));
        }
        const handleRemoveitem = (index) => {
                
                dispatch(removeItems(index))
        }
        

        return (
                <div>
                        {
                                items?.map((i) => {
                                        const my = cartItems?.find(item => item.id === i.id)
                                        return (
<>
                                                <div className="flex m-4 p-4 border-black-10 text-left  font-mono justify-between">
                                                        <div className="flex-1 text-left m-2">
                                                                <div className="text-l font-semibold mb-1">{i.name} -  ₹{ i && i.price !== undefined ? i.price /100: 268.5}</div>
                                                                <div className="text-gray-600 font-sans text-sm">{i.description}</div>
                                                        </div>
                                                        <div className="relative">
                                                                <div>
                                                                        {
                                                                                (!my) && <button className="absolute bg-black text-white p-1 m-1 rounded-lg  left-11"
                                                                                onClick={() => handleAdditem(i)}
                                                                                >Add</button>
                                                                        }
                                                                        {
                                                                                my &&
                                                                                <div className="bg-black absolute w-20 left-6 bottom-19 flex justify-around rounded-lg p-1">
                                                                                        <button className=" bg-black text-white   rounded-lg  left-6"
                                                                                        onClick={() => handleAdditem(i)}
                                                                                       >+</button>
                                                                                       <button className=" text-white left-1">{my.freq}</button>
                                                                                        <button className=" bg-black text-white   rounded-lg  left-20"
                                                                                                onClick={() => handleRemoveitem(i.id)}
                                                                                        >-</button>
                                                                                </div>
                                                                        }

                                                                </div>
                                                                <img className="resimage h-20 w-30 rounded-t-lg" src={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/" + i.imageId} alt="NOT FOUND" />
                                                                
                                                        </div>
                                                </div>
                                                <hr className="  w-8/12 m-auto"/>
                                                </>


                                        )
                                })
                        }

                </div>
        )
}
export default ItemList