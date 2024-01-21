
import ItemList from "./ItemList"


const ResCategory=({data,setShow,open})=>{
        const handleclick=()=>{
                setShow();
        }
        
        return (
                <div className="w-8/12 bg-[#fdf8f5] p-4 mx-auto my-4 shadow-lg " onClick={handleclick}>
                       <div className="flex justify-between">
                        <span className="text-xl font-bold mb-2 ">{data.title}</span>
                        <span>⬇</span>
                       </div >
                       { open&&<ItemList items={data.itemCards}/>}
                       </div>
        )
}
export default ResCategory