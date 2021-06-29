const mongoose=require('mongoose')

const photoSchema = new mongoose.Schema({
    id:{
        type:String,
        require:true
    },
    type: {
        type:String,
        default:''
    },
    detail: {
        type:String,
        default:''
    },
    album: {
        type:String,
        default:''
    },
    favorite:{
        type:Boolean,
        default:false
    },
    deletephoto:{
        type:Boolean,
        default:false
    },
    private:{
        type:Boolean,
        default:false
    },
    url:{
        type:String,
        default:''
    },
    date:{
        type:String,
        default:''
    }
});

  module.exports=photoSchema