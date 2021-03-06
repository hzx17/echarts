<template>
  <div class="com-container">
    <div class="com-chart" ref="seller_ref"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Seller-echarts',
  data () {
    return {
      chartInstance: null,
      allData: null,
      currentPage: 1, // 当前显示页数
      totalPage: 0, // 总共页数
      timerId: null // 定时器函数
    }
  },
  watch: {
    theme () {
      this.chartInstance.dispose() // 当主题切换时，销毁当前图表
      this.initChart() // 重新以最新的主题名称初始化图表对象
      this.screenAdapter() // 完成图表的适配
      this.updateChart() // 更新图表
    }
  },
  methods: {
    // 初始化echartInstance对象
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref, this.theme)
      /* 对图表对象初始化配置控制 */
      const initOption = {
        title: {
          text: '｜商家销售统计',
          textStyle: {
            fontSize: 66
          },
          left: 20,
          top: 20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              width: 66,
              color: '#2D3443'
            }
          }
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category'
        },
        series: {
          type: 'bar',
          barWidth: 66,
          label: {
            show: true,
            position: 'right',
            textStyle: {
              color: 'white'
            }
          },
          itemStyle: {
            barBorderRadius: [0, 33, 33, 0],
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#5052EE' }, // 0%处的颜色为红色
              { offset: 1, color: '#AB6EE5' } // 100%处的颜色为蓝
            ])
          }
        }
      }
      this.chartInstance.setOption(initOption)
      /* 鼠标事件的监听 */
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    // 获取服务器的数据
    async getData (ret) {
      // const { data: ret } = await this.$http.get('/seller')
      this.allData = ret
      this.allData.sort((a, b) => {
        return a.value - b.value
      })
      this.totalPage = this.allData % 5 === 0 ? this.allData.length / 5 : this.allData.length / 5 + 1
      this.updateChart()
      this.startInterval() // 启动定时器
    },
    // 更新图表
    updateChart () {
      const start = (this.currentPage - 1) * 5 // 截取数据开始位置
      const end = this.currentPage * 5 // 截取数据结束位置
      const showData = this.allData.slice(start, end)
      const sellerNames = showData.map((item) => {
        return item.name
      })
      const sellerValue = showData.map((item) => {
        return item.value
      })
      const dataOption = {
        yAxis: {
          data: sellerNames
        },
        series: {
          data: sellerValue
        }
      }
      this.chartInstance.setOption(dataOption)
    },
    startInterval () {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.currentPage++
        if (this.totalPage <= this.currentPage) {
          this.currentPage = 1
        }
        this.updateChart()
      }, 3000)
    },
    /* 当浏览器大小改变时，调用该方法，来完成屏幕的适配 */
    screenAdapter () {
      const titleFontSize = this.$refs.seller_ref.offsetWidth / 100 * 3.6
      const adapterOption = { // 分辨率改变配置项
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize
            }
          }
        },
        series: {
          barWidth: titleFontSize,
          itemStyle: {
            barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0]
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    }
  },
  computed: {
    ...mapState(['theme'])
  },
  created () {
    // 在组件完成之后，注册websocket回调函数，getData这个方法就成为回调函数，当客户端发送数据以后，这个回调就会调用
    this.$socket.registerCallBack('sellerData', this.getData)
  },
  mounted () {
    this.initChart() // 挂载完成之后，初始化echart
    // this.getData() // 获取数据
    this.$socket.send({
      action: 'getData',
      socketType: 'sellerData',
      chartName: 'seller',
      value: ''
    })
    this.screenAdapter() // 主动检测屏幕分配率
    window.addEventListener('resize', this.screenAdapter) // 监听器
  },
  destroyed () {
    this.timerId = null // 销毁时取消掉定时器
    window.removeEventListener('resize', this.screenAdapter) // 销毁时取消掉监听器
    this.$socket.unRegisterCallBack('sellerData', this.getData) // 销毁时，取消回调函数取消
  }
}
</script>

<style lang='less' scoped>

</style>
