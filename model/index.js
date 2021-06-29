const mongoose = require('mongoose');

const {dbUri}=require('../config/config.default')

// 连接数据库
mongoose.connect(dbUri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const db = mongoose.connection;

// 连接失败
db.on('error',(err)=>{
    console.log('MongoDB数据库连接失败',err)
});
// 连接成功
db.once('open', function() {
  console.log("数据库连接成功")
});

// 组织导出模型
module.exports={
    User:mongoose.model('User',require('./user')),
    Photo:mongoose.model('Photo',require('./photo')),
    Vedio:mongoose.model('Vedio',require('./vedio'))
}