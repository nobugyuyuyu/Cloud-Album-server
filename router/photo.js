const express=require('express')

const photoCtrl=require('../contorller/photo')
const {authorization}=require('../middleware/auth')
const {privateAuth}=require('../middleware/privateAuth')
const upload=require('../middleware/upload')
const tag=require('../middleware/tag')
const router=express.Router()



router.get('/',authorization,photoCtrl.getPhoto)
router.get('/private',authorization,privateAuth,photoCtrl.getPrivate)
router.get('/download',photoCtrl.downPhoto)
router.put('/',authorization,photoCtrl.putPhoto)
router.post('/delete',authorization,photoCtrl.deletePhoto)
router.post('/',authorization,upload,tag,photoCtrl.postPhoto)
router.get('/downloadVedio',photoCtrl.downVedio)
router.post('/makeVedio',authorization,photoCtrl.makeVedio)
router.get('/getallVedio',authorization,photoCtrl.getallVedio)
router.get('/getalbum',authorization,photoCtrl.getalbum)

module.exports=router