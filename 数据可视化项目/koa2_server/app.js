// 创建koa中间件
const koa =require('koa')
const app=new koa()

// 引入总耗时中间件
const koa_response_duration = require('./middleware/koa_response_duration.js')
// 引入响应头中间件
const koa_response_header = require('./middleware/koa_response_header.js')
// 引入业务逻辑中间件
const koa_response_data = require('./middleware/koa_response_data.js')
/* 绑定中间件 */
//绑定第一层中间件
app.use(koa_response_duration)
//绑定第二层中间件
app.use(koa_response_header)
//绑定第三层中间件
app.use(koa_response_data)

app.listen(7777,()=>{
  console.log('koa服务器打开了')
})

const webSocketService = require('./service/web_socket_service')
// 开启服务端监听，监听客户端连接
webSocketService.listen()