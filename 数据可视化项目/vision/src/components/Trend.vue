<template>
  <div class="com-container">
    <div class="title" :style="comStyle" >
      <span>{{'｜' + showTitle}}</span>
      <span class="iconfont title-icon" @click="showChoice = !showChoice" :style="comStyle">&#xe6eb;</span>
      <div class="select-container" :style="marginStyle" v-for="(item, index) in selectTypes" :key='index' v-show='showChoice'>
        <div class="select-item"  @click="selectChart(item.key)">{{item.text}}</div>
      </div>
    </div>
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getThemeValue } from '@/utils/theme_utils'
export default {
  name: 'Trend-echarts',
  data () {
    return {
      chartInstance: null, // echarts实例对象
      allData: null, // 获取的所有数据
      showChoice: false,
      choiceType: 'map', // 默认显示的标题
      titleFontSize: 0 // 标题字体大小
    }
  },
  computed: {
    /* 点击下拉图标展示，内容 */
    selectTypes () {
      if (!this.allData) {
        return []
      } else {
        return this.allData.type.filter((item) => {
          return item.key !== this.choiceType
        })
      }
    },
    /* 展示的标题 */
    showTitle () {
      if (!this.allData) {
        return []
      } else {
        return this.allData[this.choiceType].title
      }
    },
    /* 标题公共大小 */
    comStyle () {
      return {
        'font-size': this.titleFontSize + 'px',
        color: getThemeValue(this.theme).titleColor
      }
    },
    /* 标题向左偏移量 */
    marginStyle () {
      return {
        'margin-left': this.titleFontSize + 'px'
      }
    },
    ...mapState(['theme'])
  },
  methods: {
    initChart () {
      this.chartInstance = this.$echarts.init(this.$refs.trend_ref, this.theme)
      const initOption = {
        xAxis: {
          type: 'category',
          boundaryGap: false
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 20,
          top: '15%',
          icon: 'circle'
        },
        grid: {
          top: '35%',
          left: '3%',
          right: '4%',
          bottom: '1%',
          containLabel: true
        },
        series: {
          type: 'line'
        }
      }
      this.chartInstance.setOption(initOption)
    },
    /* 获取数据,ret为服务端发送个客户端的数据 */
    async getData (ret) {
      // const { data: ret } = await this.$http.get('/trend')
      this.allData = ret
      this.updateChart() // 调用更新数据函数
    },
    updateChart () { // 更新数据
      const timerArr = this.allData.common.month // x轴的数据
      const valueArr = this.allData[this.choiceType].data // 类目轴下的数据
      // 半透明的颜色值
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)'
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)'
      ]
      const seriesArr = valueArr.map((item, index) => { // y轴下series的数据
        return {
          name: item.name,
          type: 'line',
          data: item.data,
          stack: this.choiceType,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: colorArr1[index] }, // 0%处的颜色为红色
              { offset: 1, color: colorArr2[index] } // 100%处的颜色为蓝
            ])
          }
        }
      })
      // 图例的数据
      const legendArr = valueArr.map((item) => {
        return item.name
      })
      const dataOption = {
        xAxis: {
          data: timerArr
        },
        series: seriesArr,
        legend: {
          data: legendArr
        }
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter () { // 屏幕分辨率改变
      this.titleFontSize = this.$refs.trend_ref.offsetWidth / 100 * 3.6
      const adapterOption = {
        legend: {
          itemWidth: this.titleFontSize / 1.2,
          itemHeight: this.titleFontSize / 1.2,
          itemGap: this.titleFontSize / 1.2,
          textStyle: {
            fontSize: this.titleFontSize / 1.2
          }
        }
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    /* 用户选择展示 */
    selectChart (currentType) {
      this.choiceType = currentType
      this.updateChart()
      this.showChoice = false
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
  mounted () {
    this.initChart() // 调用初始化函数
    // this.getData() // 获取函数,使用websocket，就不用直接调用的方式，向服务端索要数据
    this.$socket.send({
      action: 'getData',
      socketType: 'trendData',
      chartName: 'trend',
      value: ''
    })
    this.screenAdapter() // 主动触发屏幕大小改变设置函数
    window.addEventListener('resize', this.screenAdapter) // 监听屏幕容器大小改变
  },
  created () {
    // 在组件完成之后，注册websocket回调函数，getData这个方法就成为回调函数，当客户端发送数据以后，这个回调就会调用
    this.$socket.registerCallBack('trendData', this.getData)
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter) // 销毁时取消监听
    this.$socket.unRegisterCallBack('trendData', this.getData) // 销毁时，取消回调函数取消
  }
}
</script>

<style lang='less' scoped>
.title{
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 10;
  color: white;
  .title-icon{
    margin-left: 10px;
    cursor: pointer;
  }
  .select-container{
    margin-left:10px ;
    background-color: #222733;
  }
  .select-item{
    cursor: pointer;
  }
}
</style>
