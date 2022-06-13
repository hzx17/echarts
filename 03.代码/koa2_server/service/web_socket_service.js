/**
 * webSocket使用步骤：
 *    1.引入ws包
 *    2.创建对象
 *    3.监听事件 
 *         - 连接事件
 *         - 接收数据事件
 *    4.发送数据
 */
 const webSocket=require('ws') // 引入webSocket
 // 创建webSocket服务器对象，绑定的端口号时9998
 const wss = new webSocket.Server({
   port:9998
 })
 module.exports.listen = () => {
  // 监听客户端连接事件
  wss.on('connection',client => {
    console.log('客户端连接成功...')
    // msg:由客户端发送个服务端的数据
    client.on('message', msg => {
      console.log('客户端发送了数据：'+msg)
      client.send('hello socket qian端')
    })
  })
}
 