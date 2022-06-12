/* 业务逻辑中间件 */
const path=require('path')
//引入读取文件
const fileUtils=require('../utils/file_utils.js')
module.exports=async (ctx,next)=>{
  const url=ctx.request.url
  let filePath=url.replace('/api','')
  filePath='../data'+filePath+'.json'
  filePath=path.join(__dirname,filePath)
  try {
    const ret=await fileUtils.getFileJsonData(filePath)
    ctx.response.body=ret
  } catch (error) {
    const errorMsg={
      msg:'文件不存在',
      status:404
    }
    ctx.response.body= JSON.stringify(errorMsg)
  }
  await next()
}