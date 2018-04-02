<template lang='pug'>
.app
  top-nav(@onToggleClick='onToggleClick', :sidebar-opened='sidebar.opened', :fixed='navFixed')
  sidebar(:opened='sidebar.opened')
  .app-body(style="background-image: linear-gradient(#6891a2, #409eff);")
    .container-fluid
      .row
        banner(@onFixed='onFixed')
        .content-wrapper(:class='{ fixed: navFixed }')
          .main.col-md-12
            router-view.animated.fadeIn(keep-alive)
  .transparent-fullscreen(v-if='sidebar.opened', :class='{ "sidebar-opened": sidebar.opened }', @click='onToggleClick')

</template>

<script>
import TopNav from './components/TopNav/index';
import Sidebar from './components/Sidebar/index';
import Banner from './components/Banner/index';

export default {
  components: {
    TopNav,
    Sidebar,
    Banner
  },

  data() {
    return {
      sidebar: {
        opened: false
      },
      navFixed: false
    };
  },

  methods: {
    onToggleClick() {
      this.sidebar.opened = !this.sidebar.opened;
    },

    onFixed(flag) {
      this.navFixed = flag;
    }
  },

  mounted() {}
};
</script>

<style lang="scss">
@import '../../scss/';
</style>

<style lang='scss'>
@import '~assets/scss/app.scss';
</style>
