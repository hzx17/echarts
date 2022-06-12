# koa2介绍
   * 基于Node.js平台的web开发框架
   * 由express原班人马打造的，express异步是通过回调函数来实现的
   * koa异步处理是通过Generator+yieid实现的
   * koa2是通过async与await语法糖来实现的（node版本需要在7.6以上）
# koa2特点
  * 支持async/await语法糖
  * 支持洋葱模型的中间件
# koa2快速上手
   * 检查node环境（7.6以上）
   * 安装koa
       - npm init -y
       - npm install koa
    * 创建编写app.js文件
      1. 创建koa对象
      2. 编写响应函数（中间件）
      3. 监听端口
    * 启动服务器 node app 
# 中间件的特点
  * koa对象通过use方法加入一个中间件
  * 一个中间件就是一个函数
  * 中间件的执行顺序符合洋葱模型
  * 内层中间件是否执行取决于外层中间件的next函数是否调用
# 后台项目的实现步骤
  1. 项目准备
     - 安装包
     - 创建文件和目录结构
       - app.js
       - data/
       - middleware/
          - koa_response_data.js
          - koa_response_duration.js
          - koa_response_header.js
       - utils/
          - file_utils.js
  2. 总耗时中间件
  3. 响应头中间件
  4. 业务逻辑中间件
  5. 允许跨域
       由于同源策略（同协议、同端口、同域名）当前页面与后台对比，会存在跨域
       * 设置响应头
