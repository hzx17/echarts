
export default class SocketService {
  /**
   * 单类
   * */
  static instance = null
  static get Instance () {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }

  ws = null // 和服务器连接的Socket对象
  connected = false // 标识是否连接成功
  sendRetry = 0 // 记录尝试发送数据次数
  connectRetry = 0 // 记录尝试重连次数
  // 存储回调函数
  callBackMapping = {}
  /* 连接客户端的方法 */
  connect () {
    // 连接服务器
    if (!window.WebSocket) {
      return console.log('你的浏览器不支持WebSocket')
    }
    this.ws = new WebSocket('ws://localhost:9998')

    // 连接成功的事件
    this.ws.onopen = () => {
      console.log('连接服务器成功...')
      this.connected = true
      this.connectRetry = 0
    }
    // 连接失败的事件
    this.ws.onclose = () => {
      console.log('连接服务器失败了')
      this.connected = false
      this.connectRetry++
      if (this.connectRetry < 5) {
        // 重连尝试
        setTimeout(() => {
          this.connect()
        }, 1000)
      }
    }
    // 得到服务端发送过来的数据
    this.ws.onmessage = msg => {
      // console.log('从服务器端接收到了数据...' + msg.data)
      const recvData = JSON.parse(msg.data)
      const socketType = recvData.socketType
      // 判断回调函数是否存在
      if (this.callBackMapping[socketType]) {
        const action = recvData.action
        if (action === 'getData') {
          const realData = JSON.parse(recvData.data)
          this.callBackMapping[socketType].call(this, realData)
        } else if (action === 'fullScreen') {
          this.callBackMapping[socketType].call(this, recvData)
        } else if (action === 'themeChange') {
          this.callBackMapping[socketType].call(this)
        }
      }
    }
  }

  // 回调函数的注册
  registerCallBack (socketType, callBack) {
    this.callBackMapping[socketType] = callBack
  }

  // 取消回调函数
  unRegisterCallBack (socketType, callBack) {
    this.callBackMapping[socketType] = null
  }

  // 发送数据的方法
  send (data) {
    if (this.connected) {
      this.ws.send(JSON.stringify(data))
    } else {
      this.sendRetry++
      setTimeout(() => {
        this.ws.send(JSON.stringify(data))
      }, this.sendRetry * 300)
    }
  }
}
