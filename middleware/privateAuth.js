const {nanoid} = require('nanoid');

const {verify,decode}=require('../util/jwt')
const {jwtSecret}=require('../config/config.default')
const {User}=require('../model')


exports.privateAuth=async(req,res,next)=>{
    let token=req.headers.authorization
    token=token?token:null
    if(!token){
        return res.status(200).json({
            status:1,
            msg:'require token'
        })
    }
    try{
        const decodedToken=await verify(token,jwtSecret)
        req.user=await User.findById(decodedToken.userId)
        next()
    }catch(err){
        return res.status(200).json({
            status:1,
            msg:err.message
        })
    }
}





