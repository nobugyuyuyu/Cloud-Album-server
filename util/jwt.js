const jwt=require('jsonwebtoken')
const {promisify}=require('util')


exports.sign=promisify(jwt.sign)
exports.verify=promisify(jwt.verify)

// 不验证直接解析
exports.decode=promisify(jwt.decode)
