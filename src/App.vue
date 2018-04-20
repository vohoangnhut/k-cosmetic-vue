<template lang="pug">

.app
  .fb-customerchat(attribution='setup_tool', page_id='1102364296531228', theme_color='#7646ff', logged_in_greeting='Chào bạn! Bạn muốn tìm sản phẩm gì?', logged_out_greeting='Chào bạn! Bạn muốn tìm sản phẩm gì?')
  top-nav
  .wrapper
    router-view.animated.fadeIn(keep-alive)
</template>

<script>
import Vue from 'vue';
import { TopNav, Footer as AppFooter } from './components';

export default {
  components: {
    TopNav,
    AppFooter
  },

  data() {
    return {
      allowFooter: true
    }
  },

  created() {
    const { footer } = this.$route.matched[0].meta;
    this.allowFooter = footer === false ? false : true;
  }
};
</script>


<style lang='scss'>
@import '~assets/scss/frontend.scss';
</style>
