const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:8999,//端口号配置
    // open:true, //自动打开页面
  },
  publicPath: "./", // 部署应⽤包时的基本 URL
})
