import { useDispatch, useSelector } from "react-redux";
import ResCard from "./ResCard";
import { removeFavt } from "../utils/favtRestro";
import { Link } from "react-router-dom";


const Profile=()=>{
   

        const favtItems=useSelector((store)=>store.favt.myList);
        const dispatch=useDispatch();
        const handleRemove=(item)=>{
             dispatch(removeFavt(item))
        }
        return (
                <>
                <div className="flex justify-center font-mono text-xl m-2 p-2 font-bold text-[#9f8a7e]">
                <h1>Your Favourite Restaurants</h1>
                </div>
                <div className="flex flex-wrap"> 
                   {    favtItems.map((r,index)=>(
                     <div className="relative">
                        <button className="text-white bg-black rounded-lg p-2 absolute right-10 bottom-10"
                         onClick={()=>handleRemove(index)}
                        >remove</button>
                     <Link to={"/" + r.id}><ResCard id={r.id} resData={r}/></Link>
                     </div>
                   ))
}
                </div>
                 
                </>
        )
}

export default Profile

