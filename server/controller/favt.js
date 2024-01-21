const CustumApiError = require("../error/CustumError")
const Favt=require('../modals/favt')


const getFavt=async (req,res,next)=>{
        try {
               
                const id=req.user.userId
                const NCart=await Favt.findOne({userId:id})
                if(!NCart)
                res.status(200).json({myList:[]})
      //error-->catch-->next(error)-->errohandlermiddleware;
         else
        res.status(200).json({myList:NCart.Cart})
        } catch (error) {
                next(error)
        }
     

}
const updateFavt=async (req,res,next)=>{
        try {
                console.log(req.body)
                const{myList}=req.body;
                const id=req.user.userId
                const NewCart=await Favt.findOne({userId:id})
                if(!NewCart)
                { console.log('create new')
                   const newCart=await Favt.create(
                        {
                                userId:id,
                                Cart:myList
                        }
                   )
                   res.json({Cart:newCart.Cart})
              
                }
       else{
        console.log('update new')
              NewCart.Cart=myList;
               await NewCart.save();
               res.json({myList:NewCart.Cart})
       }
       
      //error-->catch-->next(error)-->errohandlermiddleware;
        } catch (error) {
                next(error)
        }
}

module.exports={getFavt,updateFavt}