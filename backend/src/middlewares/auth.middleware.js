import { User } from "../models/index.js";
import { asyncWrapper } from "./asyncWrapper.js";
import jsonwebtoken from 'jsonwebtoken'

export const authGuard = asyncWrapper(async(req,res,next)=>{
    let token = null
    if(req.cookies?.accessToken){
        token = req.cookies.accessToken
    }else if(req.headers.authorization){
        token = req.headers.authorization.split(" ")[1]
    }
    
    if(token){
        try {
            const decodeToken = jsonwebtoken.verify(token,process.env.JWT_SECRET)
            const user = await User.findOne({username:decodeToken.username}).populate("role")
            req.user = user
            next()
        } catch (error) {
            const cookiesOption={
                maxAge:0,
                httpOnly:true,
                sameSite:"strict",
                secure: process.env.NODE_ENV == "production"
            }
            if(process.env.NODE_ENV == "production"){
                cookiesOption.domain = ".deathcode.in"
            }
            res.cookie('lt',"",cookiesOption)
            next()
        }
    }else{
        const cookiesOption={
            maxAge:0,
            httpOnly:true,
            sameSite:"strict",
            secure: process.env.NODE_ENV == "production"
        }
        if(process.env.NODE_ENV == "production"){
            cookiesOption.domain = ".deathcode.in"
        }
        res.cookie('lt',"",cookiesOption)
        next()
    }
})

