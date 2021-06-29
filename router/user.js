const express=require('express')

const userCtrl=require('../contorller/user')
const userValidate=require('../validator/user')
const {authorization}=require('../middleware/auth')
const router=express.Router()

router.post('/login',userValidate.login,userCtrl.userlogin)

router.post('/',userValidate.register,userCtrl.userRegister)

router.put('/updatePsd',userValidate.login,userCtrl.updatePsd)

router.post('/privatePsd',authorization,userCtrl.privatePsd)

module.exports=router