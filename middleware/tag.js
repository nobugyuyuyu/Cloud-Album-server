const tencentcloud = require("tencentcloud-sdk-nodejs");
const fs = require('fs')

const {Photo}=require('../model')

module.exports=async(req,res,next)=>{
	try{
        fs.readFile(`imgs/${req.user.username}/${req.filename}`, 'binary', function (err, data) {
            if (err) {
                
                console.log(err);
            } else {
                const buffer = new Buffer.from(data, 'binary');
                const str = buffer.toString('base64');
                const TiiaClient = tencentcloud.tiia.v20190529.Client;

                const clientConfig = {
                    credential: {
                        secretId: "ak",
                        secretKey: "sk"
                    },
                    region: "ap-shanghai",
                    profile: {
                        httpProfile: {
                        endpoint: "tiia.tencentcloudapi.com",
                        },
                    },
                };
            
                const client = new TiiaClient(clientConfig);
                const params = {
                    "ImageBase64":str
                };
                client.DetectLabel(params).then(
                async(data) => {
                    let type=data.Labels[0].FirstCategory;
                    let detail=data.Labels[0].SecondCategory;
                    if(type==="场景"){
                        if(detail==="自然风光"){
                            type="自然风光"
                            detail=''
                        }else if(detail==="建筑"){
                            type="建筑"
                            detail=''
                        }
                    }
                    if(type==="物品"){
                        if(detail==="交通工具"){
                            type="交通工具"
                            detail=''
                        }
                    }
                    if(type==="人物"){
                        detail=''
                    }
                    const photo=new Photo();
                    photo.type=type;
                    photo.album=req.query.album||''
                    photo.url=`http://localhost:5000/api/photo/download?user=${req.user.username}&name=${req.filename}`
                    photo.detail=detail;
                    photo.date=new Date().toLocaleDateString();
                    photo.id=req.filename.slice(0,-4)
                    await photo.save()
                },
                (err) => {
                    console.log(err)
                }
                );
            }
        });    
        next()
    }catch(err){
        next(err);
    }
}