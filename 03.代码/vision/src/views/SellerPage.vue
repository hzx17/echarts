<!-- 针对/Sellerpage这条路径显示出来的
     在这个组件中，通过子组件注册的方式，要显示Seller.vue这个组件
-->
<template>
  <div class="com-page">
    <seller/>
  </div>
</template>

<script>
import Seller from '@/components/Seller.vue'
export default {
  name: 'SellerPage',
  data () {
    return {}
  },
  components: {
    Seller
  },
  methods: {}
}
</script>

<style>

</style>
