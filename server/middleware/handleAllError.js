const errorHandler=(err,req,res,next)=>{
        
        if(err.code===11000)
        res.status(400).json({msg:'email already exist'});

        res.status(400).json({msg:err.message});
}
module.exports=errorHandler
//1)here all the error are redirected and then responce send
//2)we can handle differnet monggose error using error code 