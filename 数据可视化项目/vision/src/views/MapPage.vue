<!-- 针对/mappage这条路径显示出来的
     在这个组件中，通过子组件注册的方式，要显示Map.vue这个组件
-->
<template>
  <div class="com-page">
    <Map/>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
export default {
  name: 'MapPage',
  data () {
    return {}
  },
  components: {
    Map
  },
  methods: {}
}
</script>

<style>

</style>
