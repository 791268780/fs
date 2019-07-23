
const express = require('express')
const app = express()
const fs = require('fs')
const pathLib = require('path')
// 引入body-parser中间件，用来处理post请求体body中的数据
const bodyParser = require('body-parser')
// 引入multer中间件，用于处理上传的文件数据
const multer = require('multer')

const server = app.listen(3000, function(){
  console.log('express + multer 实现文件上传')
})

// 读取静态资源
app.use(express.static('./web'))
// 通过配置multer的dest属性， 将文件储存在项目下的tmp文件中
app.use(multer({ dest: './tmp/' }).any()) // 能自动创建文件夹


// 文件上传接口
app.post('/fileUpload', function(req, res){
  
    // 上传的文件在req.files中
    const filename = req.files[0].path + pathLib.parse(req.files[0].originalname).ext
    console.log(filename); // 原路径
    console.log(req.files[0].path); // 新路径
    fs.rename(req.files[0].path, filename, function(err){
      if(err){
        res.send(err)
      }else{
        res.send('上传成功')
      }
    })

})

// function exists(callback) { // 判断文件路径是否存在
//   fs.exists('/tmp', function (exists) {
//     // exists ? callback(true) : mkdir(callback);
//     console.log(exists);callback(false);
//   });
// }

// function mkdir() {
//   fs.mkdir('./tmp',0000, function (err) {
//     if (err) { console.log('目录创建失败'); return;};
//     console.log('目录创建成功');
//     callback(true);
//   });
// }
