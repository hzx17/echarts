<!-- 针对/trendpage这条路径显示出来的
     在这个组件中，通过子组件注册的方式，要显示Trend.vue这个组件
-->
<template>
  <div class="com-page">
    <Trend/>
  </div>
</template>

<script>
import Trend from '@/components/Trend.vue'
export default {
  name: 'TrendPage',
  data () {
    return {}
  },
  components: {
    Trend
  },
  methods: {}
}
</script>

<style>

</style>
