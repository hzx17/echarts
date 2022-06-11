# 起步

## 主题
### 内置主题的使用
   * Echarts默认内置了两套主题：light ，dark
   * 在初始的对象化方法init中可以指明
      var chart=echarts.init(dom,'dark')
      var chart=echarts.init(dom,'light')
### 自定义主题
   * 步骤
     1. 在主题编辑器中编辑主题
     2. 下载主题，是一个js文件
     3. 引入主题js文件
     4. 在init方法中使用主题
## 调色盘的使用
   它是一组颜色，图形、系列会从其中选择颜色
   * 主题调色盘，引入自定义的主题，这个就是主题调色盘
   * 全局调色盘，他会覆盖主题调色盘，在option中配置color:['red','pink'....]
   * 局部调色盘，他会覆盖全局调色盘，在series配置项中配置series:[{type:'bar',color:['red','pink'....]}]
 ### 颜色渐变
  * 线性渐变与径向渐变
     在series中配置itemStyle配置color
     ```json
            itemStyle: {
             color: {
               type: 'linear', // 线性渐变
               x: 0,
               y: 0,
               x2: 0,
               y2: 1,
               colorStops:[
                {
                offset: 0, color: 'red' // 0%处的颜色为红色
                 },
                {
                  offset: 1, color: 'blue' // 100%处的颜色为蓝
                 }
               ]
             }
            color: {
              type: 'radial', // 径向渐变
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [
                {
                  offset: 0, color: 'red' // 0%处的颜色为红色
                },
                {
                  offset: 1, color: 'blue' // 100%处的颜色为蓝
                }
              ]
            }
          }
     ```
## 样式
   * 直接样式
       itemStyle、textStyle、lineStyle、areaStyle、label
   * 高亮样式
       在emphasis中包裹itemStyle、textStyle、lineStyle、areaStyle、label
## 自适应
   当浏览器的大小发生改变时，其大小会根据其改变
    ```javascript
      //监听window窗口大小改变事件
      window.onresize=function(){
        mCharts.resize()
      }
    ```
# 动画
   * 加载动画-echarts数据很多时候都是从后端返回而来的，那么就需要加载动画
       echarts中已经内置了加载数据的动画，我们只需要在合适的时机显示或隐藏即可
           echarts.showLoading() // 在获取数据之前, 显示加载动画
           echarts.hideLoading() // 当服务器数据获取成功之后, 隐藏加载动画
   * 增量动画-当数据改变时，通过echarts.setOption()来设置
   * 动画常用配置项
       ```json
         animation: true,  // 控制动画是否开启,默认开启
        // animationDuration: 7000, // 动画的时长, 它是以毫秒为单位
        animationDuration: function(arg){
          console.log(arg)
          return 2000 * arg
        },
        animationEasing: 'bounceOut', // 缓动动画
        animationThreshold: 7, // 动画元素的阈值
      ```
# 全局echarts对象
  ## 全局方法
  * init方法：最主要的作用是得到echarts实例对象，，还可以设置主题
  * registerTheme方法：注册主题
  * registerMap方法：注册地图数据
  * connect方法： 关联，联动使用多个echarts实例
  ## echartsInstance常用方法
  * setOption：
       - 设置或修改实例的配置项以及数据
       - 多次设置setOption方法会合并修改配置项
       - 增量动画
  * resize：
     - 重新计算大小
     - 一般结合window.onresize一起使用
  * on/off：
     - 绑定或者解绑事件处理函数
     - 鼠标事件
     - Echarts事件
  * dispatchAction:
     - 触发某些行为
  * clear
     - 可以再次设置
  * dispose
     - 完全销毁

