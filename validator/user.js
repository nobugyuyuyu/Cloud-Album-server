const { body, validationResult } = require('express-validator');
const validate=require('../middleware/validate')
const {User}=require('../model');
const md5 = require('../util/md5');

exports.register=validate([
    // 配置验证规则
    body('username')
        .custom(async username=>{
            const user=await User.findOne({username})
            if(user){
                return Promise.reject('用户名已存在')
            }
        })
])

exports.login=[
    validate([
        body('username').custom(async (username,{req})=>{
            const user=await User.findOne({username})
            if(!user){
                return Promise.reject('用户不存在')
            }
            // 将数据挂载到请求对象中，后续的中间件就可以使用
            req.user=user
        })
    ]),
    validate([
        body('password').custom(async (password,{req})=>{
            if(req.user.password!==md5(password)){
                return Promise.reject('密码错误')
            }
        })
    ])
]
