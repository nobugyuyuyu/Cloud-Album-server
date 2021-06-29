module.exports=()=>{
    return (err,req,res,next)=>{
        res.status(200).json({
            status:1,
            msg:err.message
        })
    }
}