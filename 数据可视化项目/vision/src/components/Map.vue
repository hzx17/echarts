<template>
  <div class="com-container">
    <div class="com-chart" ref="map_ref" @dblclick="backMap"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { getProvinceMapInfo } from '../utils/map_utils'
export default {
  name: 'Map-echarts',
  data () {
    return {
      chartInstance: null, // echarts实例对象
      allData: null, // 获取的所有数据
      mapData: {}
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
    async initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme)
      // 获取地图数据，不属于后端数据，所以不能使用$http
      const { data: ret } = await axios.get('http://localhost:8999/static/map/china.json')
      // 注册地图
      this.$echarts.registerMap('china', ret)
      const initOption = {
        title: {
          text: '｜商家分布',
          left: 20,
          top: 20
        },
        geo: {
          type: 'map',
          map: 'china',
          top: '5%',
          bottom: '5%',
          itemStyle: {
            areaColor: '#2E72BF',
            borderColor: '#333'
          }
        },
        legend: {
          left: '5%',
          bottom: '5%',
          orient: 'vertical'
        }
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('click', async arg => { // 点击地图，展示省份
        const provinceInfo = getProvinceMapInfo(arg.name)
        // 判断当前点击省份的地图mapData是否存在
        if (!this.mapData[provinceInfo.key]) {
          const { data: ret } = await axios.get('http://localhost:8999' + provinceInfo.path)
          this.mapData[provinceInfo.key] = ret
          this.$echarts.registerMap(provinceInfo.key, ret)
        }
        const changeOption = {
          geo: {
            map: provinceInfo.key
          }
        }
        this.chartInstance.setOption(changeOption)
      })
    },
    /* 获取数据 */
    async getData (ret) {
      // const { data: ret } = await this.$http.get('/map') // 使用websocket
      this.allData = ret
      this.updateChart() // 调用更新数据函数
    },
    updateChart () { // 更新数据
      const legendArr = this.allData.map(item => {
        return item.name
      })
      const seriesArr = this.allData.map(item => {
        // 返回对象就代表一个类别下的所有散点数据
        // 要在地图上显示散点数据，就要给图标增加一个配置，coordinateSystem: 'geo'
        return {
          type: 'effectScatter',
          rippleEffect: {
            scale: 5,
            brushType: 'stroke'
          },
          name: item.name,
          data: item.children,
          coordinateSystem: 'geo'
        }
      })
      const dataOption = {
        legend: {
          data: legendArr
        },
        series: seriesArr
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () { // 屏幕分辨率改变
      const titleFontSize = this.$refs.map_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize
          }
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: this.titleFontSize / 2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    /* 双击返回中国地图 */
    backMap () {
      setTimeout(() => {
        const revertOption = {
          geo: {
            map: 'china'
          }
        }
        this.chartInstance.setOption(revertOption)
      }, 100)
    }
    // ajax (url) {
    //   return new Promise((resolve, reject) => {
    //     // 步骤1、创建异步对象
    //     const xhttp = new XMLHttpRequest()
    //     // 步骤2：设置请求的url参数、参数1是请求的类型、参数2是请求的地址
    //     xhttp.open('get', url)
    //     // 步骤3：发送请求
    //     xhttp.send()
    //     // 步骤4注册事件 onreadystatechange状态改变调用
    //     xhttp.onload = function () {
    //       if (this.status >= 200 && this.status < 400) {
    //         resolve(this.response)
    //       } else {
    //         reject(new Error(this.statusText))
    //       }
    //     }
    //   })
    // }
  },
  computed: {
    ...mapState(['theme'])
  },
  created () {
    // 在组件完成之后，注册websocket回调函数，getData这个方法就成为回调函数，当客户端发送数据以后，这个回调就会调用
    this.$socket.registerCallBack('mapData', this.getData)
  },
  mounted () {
    this.initChart() // 调用初始化函数
    // this.getData() // 获取函数
    // 获取函数,使用websocket，就不用直接调用的方式，向服务端索要数据
    this.$socket.send({
      action: 'getData',
      socketType: 'mapData',
      chartName: 'map',
      value: ''
    })
    this.screenAdapter() // 主动触发屏幕大小改变设置函数
    window.addEventListener('resize', this.screenAdapter) // 监听屏幕容器大小改变
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter) // 销毁时取消监听
    this.$socket.unRegisterCallBack('mapData', this.getData) // 销毁时，取消回调函数取消
  }
}
</script>

<style>

</style>
