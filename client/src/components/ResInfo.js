import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useResInfoData from "../utils/useResInfoData";
import ResCategory from "./ResCategory";
import { useState } from "react";
import SmallMenu from "./SmallMenu";
import { useDispatch, useSelector } from "react-redux";
import { addFavt } from "../utils/favtRestro";

const ResInfo=()=>{
   
        const {resId}=useParams();
        const resInfo=useResInfoData(resId); //cutom hook
        const [show,setShow]=useState(0);
        const [showVeg,setShowVeg]=useState(false);
        const dispatch=useDispatch();
        const favt=useSelector((store)=>store.favt.myList)
        const handleFavt=()=>{
           dispatch(addFavt(resInfo?.Res))
        }
        const filterCategory=resInfo?.categories?.map((res)=>(
        {    title:res.title   , itemCards: showVeg?res.itemCards.filter((i)=>
                            i.type==='VEG' ):res.itemCards                     
         }
        ) )
        
    if(resInfo===null)
      return <Shimmer/>
        return (
                <div>
                        <div className="text-center ">
                                <div className="font-bold text-lg p-2 m-2"> {resInfo?.Res?.name} </div>
                                <div className="font-bold">{resInfo?.Res?.costForTwo} </div>
                                <button className="bg-green-400 px-4 m-4 rounded-lg transition duration-300 ease-in-out font-mono hover:scale-105"onClick={()=>setShowVeg(!showVeg)}>{showVeg?'Show All':'Only Veg'}</button>
                              { favt.some(obj => obj.id === resInfo?.Res?.id)?<button className="ml-20 bg-pink-300 p-1 rounded-lg font-mono transition duration-300 ease-in-out hover:scale-105">Added to Favt</button>:<button
      onClick={() => handleFavt()}
      className="ml-20 bg-[] p-1 font-mono rounded-lg transition duration-300 ease-in-out hover:scale-105"
    >Add to Favt</button>}
                                <div>
                              
                               </div>
                        </div >
                        <div className="text-center ]">
                        {
                                filterCategory.map((r,index)=>(
                                        //controlled component
                                        
                                        <ResCategory 
                                        data={r} 
                                        id={r.title}
                                        setShow={()=>setShow(index)}
                                        open={show==index?true:false}
                                        />
                                )
                                )
                        }
                        </div>
                        <div >
                          <SmallMenu data={filterCategory}/>
                       </div>
                        
                </div>
        )

}
export default ResInfo;