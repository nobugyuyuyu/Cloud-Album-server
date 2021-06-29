const fs=require('fs')
const md5=require('../util/md5')
const { jwtSecret } = require('../config/config.default')
const jwt=require('../util/jwt')
const {User}=require('../model')

exports.userlogin=async(req,res,next)=>{
    try{
        const user=req.user
        const token=await jwt.sign({
            userId:user._id
        },jwtSecret,{
            expiresIn:'1h'
        })
        res.status(200).json({
            status:0,
            token,
            user
        })
    }catch(err){
        next(err)
    }
}

exports.updatePsd=async(req,res,next)=>{
    try{
        const arr=await User.find({'username':req.body.username})
        const newPsd=req.query.psd;
        await User.updateOne({username:req.body.username},{$set:{password:newPsd}})
        const user=await User.find({'username':req.body.username})
        res.status(200).json({
            status:0,
            user
        })
    }catch(err){
        next(err)
    }
}

exports.userRegister=async(req,res,next)=>{
    try{
        const ori=new User();
        const user=Object.assign(ori,req.body)
        await user.save()
        await fs.mkdir(`imgs/${user.username}`, err => {
            if (!err) console.log("创建成功");
        });
        res.status(200).json({
            status:0,
            msg:'注册成功'
        })
    }catch(err){
        next(err)
    }
}

exports.privatePsd=async(req,res,next)=>{
    try{
        const username=req.user.username
        const privatePsd=req.query.privatePsd
        await User.updateOne({'username':username},{$set:{privatepsd:privatePsd}})
        res.status(200).json({
            status:0,
            mas:'设置成功'
        })
    }catch(err){
        next(err)
    }
}