const multer = require('multer')
const {nanoid} = require('nanoid')

module.exports=(req,res,next)=>{
	const path=req.user.username;

	const storage = multer.diskStorage({
		destination: function (req, file, cb) { //函数需手动创建文件夹
			cb(null, `imgs/${path}`)
		},
		filename: function (req, file, cb) {
			const name=nanoid(10);
			req.filename=`${name}.jpg`
			cb(null,`${name}.jpg`);
		}
	  })
	  
	  const upload = multer({storage})
	  const uploadSingle = upload.single('image')
	  uploadSingle(req,res,(err)=>{
			if(err){
				res.send("msg:"+err);
			}else{
				next();
			}
		})

}