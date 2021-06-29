const mongoose=require('mongoose')

const vedioSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    url: {
        type:String,
        require:true
    }
});

  module.exports=vedioSchema