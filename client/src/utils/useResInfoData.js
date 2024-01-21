import { useEffect, useState } from "react";
import { restroURL1 } from "./constants";

const useResInfoData=(resId)=>
{     
        const [resInfo,setResInfo]=useState(null);
        useEffect(()=>{
          fetchData();
        },[])
  
        const fetchData=async()=>{
           try {
            const data2=await fetch('https://tornado-five.vercel.app/api/v1/res/name/'+resId)
            const json2=await data2.json()
            const data =await fetch('https://tornado-five.vercel.app/api/v1/res/'+resId)
            const json=await data.json()
            const obj={categories:json?.Res?.categories,Res:json2.Res}
            setResInfo(obj)
           } catch (error) {
            console.log(error)
           }
   
     }

return resInfo
}
export default useResInfoData;