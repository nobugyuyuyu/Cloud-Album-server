# 项目介绍
这是2021年软件杯智能云相册题目的node.js后端，不过由于移动云的图片识别能力太过细，我使用了腾讯云的图像识别，所以就不再准备参赛

### 数据库启动命令：mongod --dbpath D:\mongdb


## 1. 注册

### 请求URL：

	http://localhost:5000/api/user

### 请求方式：

	POST

### 请求体

    {
        "username":"jun",
        "password":"jun@jun.com",
        "img":"头像图片的base64编码"           //不必要
    }

### 返回示例：

	成功:
	{
        "status": 0,
        "msg": "注册成功"
    }
	失败
    {
        "status": 1,
        "msg": error.message
    }

## 2. 登陆

### 请求URL：

	http://localhost:5000/api/user/login

### 请求方式：

	POST

### 请求体

    {
        "username":"jun",
        "password":"jun@jun.com"
    }   

### 返回示例：

	成功:
    {
        "status": 0,
        "token": token,
        "user": {
            "img": "头像图片的base64编码",
            "_id": "60cb1e18c0ce3a0b78926f9a",
            "username": "jun",
            "password": "888131a7f3d23a325c7c1a38ad41eed9",
            "__v": 0
        }
    }
	失败
    {
        "status": 1,
        "msg": error.message
    }   

## 2.1 修改密码

### 请求URL：

	http://localhost:5000/api/user/updatePsd?psd=123@123.com     新密码作为参数

### 请求方式：

	PUT

### 请求体

    {
        "username":"jun",
        "password":"jun@jun.com"
    }   

### 返回示例：

	成功:
    {
        "status": 0,
        "user": {
            "img": "头像图片的base64编码",
            "_id": "60cb1e18c0ce3a0b78926f9a",
            "username": "jun",
            "password": "888131a7f3d23a325c7c1a38ad41eed9",
            "__v": 0
        }
    }
	失败
    {
        "status": 1,
        "msg": error.message
    }  

## 2.2 设置私密密码

### 请求URL：

	http://localhost:5000/api/user/privatePsd?privatePsd=private    新密码作为参数

### 请求方式：

	POST

### 请求体

    headers:{
        Authorization:token
    } 
   
### 返回示例：

	成功:
    {
        {
            "status": 0,
            "mas": "设置成功"
        }
    }
	失败
    {
        "status": 1,
        "msg": error.message
    } 

## 3. 上传图片

### 请求URL：

	http://localhost:5000/api/photo/             不定义所属相册
    http://localhost:5000/api/photo?album=time  定义所属相册


### 请求方式：

	POST

### 请求

    headers:{
        Authorization:token
    }

### 返回示例：

	成功:
    {
        "status": 0,
        "msg": "上传成功"
    }
	失败
    {
        "status":1,
        "msg":err.message
    }  

## 4. 下载图片

### 请求URL：

	http://localhost:5000/api/photo?type=交通工具    
        下载某一类的图片（建筑、自然风光、人物、动植物、交通工具、其他、事件、美食、卡证文档）
    http://localhost:5000/api/photo                  获取所有图片

### 请求方式：

	GET

### 请求体

    headers:{
        Authorization:token
    }

### 返回示例：

	成功:
    {
        "status": 0,
        "target": [
            {
                "favorite": false,
                "delete": false,
                "private": false,
                "_id": "60cda6e8c2c5ad2088e33592",
                "type": "人物",
                "date": "2021/6/19",
                "id": "ZCQ84BlBUs",
                "__v": 0,
                "url": "http://localhost:5000/api/photo/download?name=ZCQ84BlBUs.jpg"
            },
            {
                "favorite": false,
                "delete": false,
                "private": false,
                "_id": "60cdb631e14a2c04e06ab733",
                "type": "动植物",
                "date": "2021/6/19",
                "id": "j1oKTuIrLD",
                "__v": 0,
                "url": "http://localhost:5000/api/photo/download?name=j1oKTuIrLD.jpg"
            }
        ]
    }
	失败
    {
        "status": 0,
        "target": []
    } 

## 5. 修改图片

### 请求URL：

    <!-- 以下
        favorite：将图片设为喜欢 
        private：将图片设为私密
        album：自定义属于哪个相册
    -->
	http://localhost:5000/api/photo?favorite=true&private=true&album=time
    http://localhost:5000/api/photo?favorite=true
    http://localhost:5000/api/photo?private=true

    body中：
        {
            "ids":["QlDxgzQykn","vvOZq6mfV6"]     //图片的id集合
        }

### 请求方式：

	PUT

### 请求体

    headers:{
        Authorization:token
    }

### 返回示例：

	成功:
    {
        "status": 0,
        "msg": "修改成功"
    }
	失败
    {
        "status": 1,
        "msg": "图片不存在"
    } 

## 6. 删除图片

### 请求URL：

    永远删除
	http://localhost:5000/api/photo?ever=true    
    加入回收站
	http://localhost:5000/api/photo

    body中JSON格式的ids
    {
        "ids":["44_YrDFL-2","rgTfwuQg02","jVYA4nDMHc"]
    }

### 请求方式：

	DELETE

### 请求体


    headers:{
        Authorization:token
    }


### 返回示例：

	成功:
    {
        "status": 0,
        "msg": "删除成功"
    }
	失败
    {
        "status": 1,
        "msg": err.message
    } 

## 7. 视频剪辑

### 请求URL：

	http://localhost:5000/api/photo/makeVedio?name=china     name是自定义视频的名字

    {
        "ids":["QlDxgzQykn","vvOZq6mfV6"]     //图片的id集合
    }

### 请求方式：

	POST

### 请求体

    headers:{
        Authorization:token
    }

### 返回示例：

	成功:
    {
        "status": 0,
        "url": url
    }
	失败
    {
        "status": 1,
        "msg": err.message
    } 


## 8. 获取所有视频

### 请求URL：

	http://localhost:5000/api/photo/getallVedio     


### 请求方式：

	GET

### 请求体

    headers:{
        Authorization:token
    }

### 返回示例：

	成功:
    {
        "status": 0,
        "vedio": [
            {
                "_id": "60d3d92ca949eb32dce14603",
                "name": "jin.mp4",
                "url": "http://localhost:5000/api/photo/downloadVedio?user=jin&name=jin.mp4",
                "__v": 0
            }
        ]
    }
	失败
    {
        "status": 1,
        "msg": err.message
    } 

## 9. 获取所有相册

### 请求URL：

	http://localhost:5000/api/photo/getalbum    


### 请求方式：

	GET

### 请求体

    headers:{
        Authorization:token
    }

### 返回示例：

	成功:
    {
        "status": 0,
        "albums": {
            "liu": [
                {
                    "type": "场景",
                    "detail": "生活/娱乐场所",
                    "album": "liu",
                    "favorite": false,
                    "deletephoto": false,
                    "private": false,
                    "url": "http://localhost:5000/api/photo/download?user=jin&name=6dTCVnAwWx.jpg",
                    "date": "2021/6/24",
                    "_id": "60d3e6573dccae2dac01afad",
                    "id": "6dTCVnAwWx",
                    "__v": 0
                }
            ],
            "yu": [
                {
                    "type": "场景",
                    "detail": "其他",
                    "album": "yu",
                    "favorite": false,
                    "deletephoto": false,
                    "private": false,
                    "url": "http://localhost:5000/api/photo/download?user=jin&name=qXzNFhe7ym.jpg",
                    "date": "2021/6/24",
                    "_id": "60d3e6673dccae2dac01afae",
                    "id": "qXzNFhe7ym",
                    "__v": 0
                }
            ],
            "hua": [
                {
                    "type": "场景",
                    "detail": "其他",
                    "album": "hua",
                    "favorite": false,
                    "deletephoto": false,
                    "private": false,
                    "url": "http://localhost:5000/api/photo/download?user=jin&name=kX8TT1VEus.jpg",
                    "date": "2021/6/24",
                    "_id": "60d3e66c3dccae2dac01afaf",
                    "id": "kX8TT1VEus",
                    "__v": 0
                },
                {
                    "type": "自然风光",
                    "detail": "",
                    "album": "hua",
                    "favorite": false,
                    "deletephoto": false,
                    "private": false,
                    "url": "http://localhost:5000/api/photo/download?user=jin&name=PGl_mC9Ygd.jpg",
                    "date": "2021/6/24",
                    "_id": "60d3e6b13dccae2dac01afb0",
                    "id": "PGl_mC9Ygd",
                    "__v": 0
                },
                {
                    "type": "动植物",
                    "detail": "哺乳动物",
                    "album": "hua",
                    "favorite": false,
                    "deletephoto": false,
                    "private": false,
                    "url": "http://localhost:5000/api/photo/download?user=jin&name=8C70ymDygl.jpg",
                    "date": "2021/6/24",
                    "_id": "60d3e6b63dccae2dac01afb1",
                    "id": "8C70ymDygl",
                    "__v": 0
                },
                {
                    "type": "动植物",
                    "detail": "鸟类",
                    "album": "hua",
                    "favorite": false,
                    "deletephoto": false,
                    "private": false,
                    "url": "http://localhost:5000/api/photo/download?user=jin&name=7v5eHwp_Hn.jpg",
                    "date": "2021/6/24",
                    "_id": "60d3e6bd3dccae2dac01afb2",
                    "id": "7v5eHwp_Hn",
                    "__v": 0
                }
            ]
        }
    }
	失败
    {
        "status": 1,
        "msg": err.message
    } 


