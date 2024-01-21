import { CDN_URL } from "../utils/constants";


const ResCard = (props) => {
        const { resData ,favt} = props
        const {
                cloudinaryImageId,
                name,
                avgRating,
                cuisines
              } = resData;
                return <div className="m-4 p-4 w-64 h-80 bg-[#fdf8f5]  rounded-lg shadow-md flex flex-col items-start hover:bg-gray-200 ">
              <img className="resimage object-cover h-32 w-full rounded-t-lg" src={CDN_URL + cloudinaryImageId} alt={name} />
              <div className="p-2">
                <div>
                  <h3 className="text-xl font-bold mb-1">{name}</h3>
                  </div>
                  <div>
                  <h4 className="text-sm text-gray-600">{cuisines.slice(0, 4).join(", ")}</h4>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                      <div>
                          <h4 className="text-sm font-semibold">Rating:</h4>
                          <p className="text-lg font-bold">{avgRating}</p>
                      </div>
                     {favt&&<div>🩷</div>}
                  </div>
              </div>
          </div>
        
}

export const withTopTag=(ResCard)=>{
    return (props)=>{
        return (
             <div>
           <label className="absolute bg-[#573d45] font-mono text-white m-2 p-2 rounded-r-lg">Top Rated</label>
           <ResCard {...props}/>
             </div>
        )
    }
}
export default ResCard