import ResCard, { withTopTag } from "./ResCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useSelector} from "react-redux";


const Body = () => {
        const [resArray, setResArray] = useState([])
        const [filterList, setFilterList] = useState([])
        const [searchText, setSearchText] = useState("")
        const favtItems=useSelector((store)=>store.favt.myList);

        useEffect(() => {
                fetchData();
                
        }, [])

        const fetchData = async () => {
                
                try {
                        const response = await fetch('https://tornado-five.vercel.app/api/v1/res/restroCards');
                        const data = await response.json();
                        setResArray(data.ResCards)
                        setFilterList(data.ResCards)
                } catch (error) {
                        console.log(error)
                }
               
        }


        if (resArray?.length === 0)
                return <Shimmer />

        const ResTopCard=withTopTag(ResCard);
        return (
                <div className="card">
                        <div className="filter flex">
                                
                                <div className="options m-4 p-4 flex w-3/5">
                                        <div className=" w-9/12">
                                                <input type="text" placeholder="     Find your Restaurants"
                                                  
                                                        className="border border-solid w-8/12 h-9 shadow-md bg-[#fdf8f5]"
                                                        value={searchText}
                                                        onChange={(e) => setSearchText(e.target.value)} />

                                                <button
                                                        className="px-4 py-2 m-4 font-mono text-white rounded-lg bg-[#f4bdc1] shadow-lg hover:text-[#6c4347]"
                                                        onClick={() => {
                                                                const filterList = resArray.filter((res) => {
                                                                        if (res.name.toLowerCase().includes(searchText.toLowerCase()))
                                                                                return true;

                                                                });
                                                                setFilterList(filterList);
                                                        }}>
                                                        Search</button>
                                        </div >
                                        <button className="px-4 py-2 font-mono text-white bg-[#98a3c6] m-4 rounded-lg shadow-lg hover:text-[#434f75]" onClick={() => {
                                                const newList = filterList?.filter((res) => res.avgRating > 4)
                                                setFilterList(newList)
                                        }}>Top Rated</button>
                                        
                                        
                                        
                                </div>

                        </div>
                        <div className="flex flex-wrap justify-between">
                                {filterList?.map((res) => <Link to={"/" + res.id}>{
                                        res.avgRating>4?
                                        <ResTopCard resData={res} favt={favtItems.find(item => item.id === res.id)?true:false}/>:
                                        <ResCard resData={res} favt={favtItems.find(item => item.id === res.id)?true:false} />
                                        }
                                        </Link>)}
                        </div>
                </div>
        )
}
export default Body