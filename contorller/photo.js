const AWS = require('aws-sdk');
const path= require('path');
const fs = require('fs')
const colors = require('colors');
const shuffle = require('lodash/shuffle');
const { FFCreatorCenter, FFScene, FFText, FFImage, FFCreator } = require('ffcreator');

const {Photo,Vedio}=require('../model');


// 返回图片的url
exports.getPhoto=async(req,res,next)=>{
    try{
        const type=req.query.type
        let arr;
        if(type){
            arr=await Photo.find({'type':type})
        }else{
            arr=await Photo.find({})
        }
        
        const target=new Array();
        arr.map(img=>{
            if(img.private) ;
            else{
                const name=img.id+'.jpg'
                const url=`http://localhost:5000/api/photo/download?user=${req.user.username}&name=${name}`
                img.url=url
                target.push(img);
            }
        })
        res.status(200).json({
            status:0,
            target
        })
    }catch(err){
        next(err);
    }   
}

// 返回相册
exports.getalbum=async(req,res,next)=>{
    try{
        const arr=await Photo.find({})
        const albums = arr.reduce(function(obj, img) {
            if (!obj[img.album]) {
              obj[img.album] = new Array();
            }
            obj[img.album].push(img);
            return obj;
          }, {});
        
        res.status(200).json({
            status:0,
            albums
        })
    }catch(err){
        next(err);
    }   
}

// 返回私密图片
exports.getPrivate=async(req,res,next)=>{
    try{
        let arr=await Photo.find({})
        const target=new Array();
        arr.map(img=>{
            if(img.private){
                const name=img.id+'.jpg'
                const url=`http://localhost:5000/api/photo/download?user=${req.user.username}&name=${name}`
                img.url=url
                target.push(img);
            }     
        })
        res.status(200).json({
            status:0,
            target
        })
    }catch(err){
        next(err);
    }   
}

// 下载图片
exports.downPhoto=async(req,res,next)=>{
    try{
        const a=req.url.split('=');
        const fileName=a[2].slice(-14)
        const username=a[1].split('&')[0]
        const currFile = path.join(`imgs/${username}/`,fileName)
        res.set({
            "Content-type":"image/jpeg"
        });
        const fReadStream = fs.createReadStream(currFile);
        fReadStream.on("data",(chunk) => res.write(chunk,"binary"));
        fReadStream.on("end",function () {
            res.end();
        });
    }catch(err){
        res.status(200).json({
            status:1,
            message:"file not exist!"
        })
    }
}

// 下载视频
exports.downVedio=async(req,res,next)=>{
    try{
        const a=req.url.split('=');
        const fileName=a[2].slice(-14)
        const username=a[1].split('&')[0]
        const currFile = path.join(`imgs/${username}/`,fileName)
        let head = { 'Content-Type': 'video/mp4' };
        //需要设置HTTP HEAD
        res.writeHead(200, head);
        //使用pipe
        fs.createReadStream(currFile)
            .pipe(res);
    }catch(err){
        res.status(200).json({
            status:1,
            message:"file not exist!"
        })
    }
}

// 上传图片
exports.postPhoto=async(req,res,next)=>{
    try{
        res.status(200).json({
            status:0,
            filename:req.filename.slice(0,-4),
            message:"上传成功",
            url:`http://localhost:5000/api/photo/download?user=${req.user.username}&name=${req.filename}`
        })
    }catch(err){
        next(err)
    }
}

// 获取所有视频
exports.getallVedio=async(req,res,next)=>{
    try{
        const vedio=await Vedio.find({})
        console.log(vedio)
        res.status(200).json({
            status:0,
            vedio
        })
    }catch(err){
        next(err)
    }
}

// 制作视频
exports.makeVedio=async(req,res,next)=>{
    try{
        console.log("result",req.body.ids);
        
        const ids=req.body.ids;
        const width = 600;
        const height = 400;
        
        
        
        const cacheDir = ''
        const outputDir = ''
        const output=`${req.query.name}.mp4`

        const vedio=new Vedio()
        vedio.name=output
        vedio.url=`http://localhost:5000/api/photo/downloadVedio?user=${req.user.username}&name=${output}`
        await vedio.save()

        const trans = shuffle(['Mosaic','GlitchDisplace', 'TricolorCircle',  'Radiation', 'DreamyZoom', 'Radiation', 'TricolorCircle', 'cube', 'Mosaic', 'cube', 'Mosaic']);

        // create creator instance
        const creator = new FFCreator({
          cacheDir,
          outputDir,
          output,
          width,
          height,
          highWaterMark: '10mb',
          frames: 6,
          debug: false,
        });

        const creatScene = ({ index, transition, text }) => {
            const scene = new FFScene();
            scene.setBgColor('#3b3a98');
            scene.setDuration(5);
            scene.setTransition(transition, 1.5);
        
            // bg img
            const img = `imgs/${req.user.username}/${ids[index]}.jpg`;
            const bg = new FFImage({ path: img});
            bg.setXY(300, 200); 
            bg.setWH(600, 400);
            scene.addChild(bg);
        
            return scene;
          };
        
          for (let i = 0; i < ids.length; i++) {
            const transition = trans[i];
            const scene = creatScene({ index: i, transition});
            creator.addChild(scene);
          }
          creator.addAudio('imgs/music.mp3');
          creator.openLog();
          creator.start();
        
          creator.on('error', e => {
            next(e.message);
          });

          creator.on('complete', e => {
              //读取图片
                fs.readFile(`${output}`,(err,data)=>{
                    if(!err){
                        //将读取到的图片写入2.jpg中
                        fs.writeFile(`imgs/${req.user.username}/${output}`,data,{flag:'a'},err=>{
                            //flags:打开文件的方式,a:以追加方式写入文件，文件不存在则创建
                            if(!err){
                                console.log('图片写入成功')
                            }else{
                                next(err)
                            }
                        });        
                    }
                }); 
                fs.unlinkSync(`${output}`)

            const url=`http://localhost:5000/api/photo/downloadVedio?user=${req.user.username}&name=${output}`

            res.status(200).json({
                status:0,
                url:url
            })
          });

    }catch(err){
        next(err)
    }
}

// 修改图片
exports.putPhoto=async(req,res,next)=>{
    try{
            const ids=req.body.ids;
            ids.map(async(id)=>{
                if(await Photo.find({'id':id})){
                    const private=req.query.private
                    const favorite=req.query.favorite
                    const album=req.query.album
                    const deletephoto=req.query.deletephoto
                    let updateobj=new Object();
                    if(favorite!==undefined){
                        updateobj.favorite=favorite
                    }
                    if(private!==undefined){
                        updateobj.private=private
                    }
                    if(album!==undefined){
                        updateobj.album=album
                    }
                    if(deletephoto!==undefined){
                        updateobj.deletephoto=deletephoto
                    }
                    await Photo.updateOne({id:id},{$set:updateobj})
                }else{
                    res.status(200).json({
                        status:1,
                        msg:'图片不存在'
                    })
                }
            })
            res.status(200).json({
                status:0,
                message:'修改成功'
            })
    }catch(err){
        next(err)
    }
}

// 删除图片
exports.deletePhoto=async(req,res,next)=>{
    try {
        const ids=req.body.ids
        console.log(typeof (ids));
        
        console.log("ids",req.body.ids);
        if(ids){
            ids.map(async(id)=>{
                if(req.query.ever){
                    const path=req.user.username;
                    const filePath =`imgs/${path}/${id}.jpg` 
                    fs.unlinkSync(filePath)
                    await Photo.remove({"id":id})
                }else{
                    await Photo.updateOne({"id":id},{$set:{deletephoto:true}})
                    console.log("ids",id);
                }
            })
            
            res.status(200).json({
                status:0,
                msg:'删除成功'
            })
        }else{
            res.status(200).json({
                status:1,
                msg:'删除失败'
            })
        }

        
    } catch (err) {
        next(err)
    }
}