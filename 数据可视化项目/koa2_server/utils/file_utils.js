
/* 读取文件的工具方法 */
const fs =require('fs')
module.exports.getFileJsonData=(filePath)=>{
 return new Promise((resolve,reject)=>{
  fs.readFile('koa2_server/'+filePath, 'utf-8',(err,datastr)=>{
    if(err){
      reject('读取文件失败',err.message)
    }
     resolve(datastr)
  })
 }).catch(err => {
  console.log(err);
})
}