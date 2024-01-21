const CustumApiError = require('../error/CustumError')
const RestaurantMenu = require('../modals/menu')
const Restro=require('../modals/resto')
const ResCards=async (req,res,next)=>{
        try {
                const Resturent=await Restro.find({})
                res.status(200).json({ResCards:Resturent,count:Resturent.length})
        } catch (error) {
                next(error)
        }
}
const ResInfo=async (req,res,next)=>{
        try {
        const newId=req.params.id  
        const Res=await RestaurantMenu.findOne({'id':newId})
        if(!Res)
        throw new CustumApiError('no such id found')
        res.status(200).json({Res})
        } catch (error) {
                next(error)
        }
}
const Name=async (req,res,next)=>{
        try {
        const newId=req.params.id  
        const Res=await Restro.findOne({'id':newId})
        if(!Res)
        throw new CustumApiError('no such id found')
        res.status(200).json({Res})
        } catch (error) {
                
        }
}

module.exports={ResInfo,ResCards,Name}