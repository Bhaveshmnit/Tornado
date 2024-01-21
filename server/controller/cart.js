const CustumApiError = require("../error/CustumError")
const UserCart = require("../modals/cart")


const getCart=async (req,res,next)=>{
        try {
              
                const id=req.user.userId
                const NewCart=await UserCart.findOne({userId:id})
                if(!NewCart)
                res.status(200).json({items:[],Total:0})
      //error-->catch-->next(error)-->errohandlermiddleware;
         else
        res.status(200).json({items:NewCart.Cart,Total:NewCart.Total})
        } catch (error) {
                next(error)
        }
     

}
const updateCart=async (req,res,next)=>{
        try {
              
                const{myCart,myTotal}=req.body;
                const id=req.user.userId
                const NewCart=await UserCart.findOne({userId:id})
                if(!NewCart)
                {
                   const newCart=await UserCart.create(
                        {
                                userId:id,
                                Total:myTotal,
                                Cart:myCart
                        }
                   )
                   res.json({Cart:newCart.Cart,Total:newCart.Total})
              
                }
       else{
              NewCart.Cart=myCart;
              NewCart.Total=myTotal
               await NewCart.save();
       }
       res.json({NewCart})
      //error-->catch-->next(error)-->errohandlermiddleware;
        } catch (error) {
                next(error)
        }
}

module.exports={getCart,updateCart}