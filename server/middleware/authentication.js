const CustumApiError=require('../error/CustumError')
const User=require('../modals/user')
const jwt=require('jsonwebtoken')

const auth =async (req,res,next)=>{
        
        try {
        //take from req.header.authorization 
        // authorization: Bearer token  
     const authHeader=req.headers.authorization
    
     //if not found error
     if (!authHeader || !authHeader.startsWith('Bearer')) 
      throw new CustumApiError('Authentication invalid no token in header',400)

      const token = authHeader.split(' ')[1]
      //get payload by decompsoing token
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      // attach the user to the job routes
      req.user = { userId: payload.userId, email: payload.email }
      
      next();//call next so that after verifcaton routes can do actual work
        } catch (error) {
                next(error)
        }
}
//this middleware is used to verify the user using token for all blog routes
//we export it to app.js
module.exports=auth;