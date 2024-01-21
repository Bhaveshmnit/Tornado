const Shimmer=()=>{
        const card=<div className="shim-card bg-black"></div>
        const arr=[]
        {
                for(let i=0;i<10;i++)
                {
                        arr.push(card);
                }
        }
        return (
                <div className="shim-container">
                      {arr}
                </div>
        )
}
export default Shimmer