/* 响应头中间件 */
module.exports=async (ctx,next)=>{
  const contentType='application/json;charset=utf-8'
  ctx.set('Access-Control-Allow-Origin','*')
  ctx.set('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
  ctx.set('content-Type',contentType)
  await next()
}