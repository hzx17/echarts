/**
 * webSocket使用步骤：
 *    1.引入ws包
 *    2.创建对象
 *    3.监听事件 
 *         - 连接事件
 *         - 接收数据事件
 *    4.发送数据
 */
const path =require('path')
const fileUtils=require('../utils/file_utils.js')
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
    client.on('message', async msg => {
      console.log('客户端发送了数据：'+msg)
      let payload = JSON.parse(msg)  // 将前端发送而来的数据接收
      const action = payload.action
      if (action === 'getData') {
        let filePath = '../data/' +payload.chartName + '.json'     // 选择的图表路径
        const ret = await fileUtils.getFileJsonData(filePath)
        payload.data = ret  // 增加一个data字段，这个字段就是要返回的json文件内容
        client.send(JSON.stringify(payload))
      }else { 
        // 原封不动的将所接收到的数据发送到所连接到的客户端
        wss.clients.forEach(client => {
          client.send(msg)
        })
      }
    })
  })
}
 