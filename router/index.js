const express=require('express')


const router=express.Router()


router.use('/user',require('./user'))
router.use('/photo',require('./photo'))

module.exports=router