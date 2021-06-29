const fs = require('fs')
const request = require('request')


app.use('/api',(req,res,next)=>{
    fs.readFile(`test.json`,(err,data)=>{
        if(!err){
            const img=JSON.parse(data).picture
            img.map((img,index)=>{
                request(img.imgurl).pipe(fs.createWriteStream('output/'+`${index}.jpg`));
            })
            res.send('ok')
        }else{
            next(err)
        }
    }); 
})