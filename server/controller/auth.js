const CustumApiError =require('../error/CustumError')
const User=require('../modals/user')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const Restro=require('../modals/resto')
const axios = require('axios');
const login=async (req,res,next)=>{
       
                        try {
                                const {email,password}=req.body;
                                if(!email||!password)
                                throw new CustumApiError('provide valid email and password')
                        
                                const existingUser=await User.findOne({ email })
                        
                                if(!existingUser)
                                throw new CustumApiError('No user found')
                        
                                const matchPassword=await bcrypt.compare(password,existingUser.password)
                        
                                if(!matchPassword)
                                throw new CustumApiError('invlaid credentials')


                const token=jwt.sign( { userId: existingUser._id, email: existingUser.email },process.env.JWT_SECRET)
                res.status(200).json({user:existingUser,token:token})


                        } catch (error) {
                                next(error)
                        }
  
}
const register=async (req,res,next)=>{
        try {
            const {name,email,password}=req.body;

            if(!name)
            throw new CustumApiError('please send name')

            if(!email)
            throw new CustumApiError('please send email')
        
            if(!password)
             throw new CustumApiError('please send password')

             
            const hashPasword= await bcrypt.hash(password,10);
            const newUser = await User.create({
                email:email,
                password:hashPasword,
                name:name
            });

            const token=jwt.sign( { userId: newUser._id, email: newUser.email },process.env.JWT_SECRET)
             res.status(200).json({user:newUser,token:token})

        } catch (error) {
                next(error)
        }
}
const profile=async (req,res,next)=>{
        const id=req.user.userId
        const NewUser=await User.findOne({_id:id})
        if(NewUser)
        {
                res.json({name:NewUser.name,login:true})
        }
        else
        {
                res.json({login:false})       
        }
}
module.exports={login,register,profile};
/*
login
1)check if correct email and password in req.body
2)check for existing user through unique email
3)if user found comapre password of exiting user and recived one
4)if match password generate jwt token and send responce
*/
/*
register
1)recieve {email,name,password} in req.body as express.json()middleware is there
2)check if password is not empty
3)then bycrpt encrpt the password
4)create user if any error mongoose will check it
5)create token
6)send responce with token
*/
/*
/*
1)after login we use a authenticaton middleware so that 
2)token is there in get request header
3)extreact id and email from payload of token
4)add it in req.body
*/
