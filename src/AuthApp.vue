<template lang="pug">
.wrapper(:class='{ "nav-open": navOpen }')
  sidebar(@clickNavBar='toggleNavBar')
  .main-panel
    app-header(@clickNavBar='toggleNavBar')
    .panel-header(:class='[isDashboard ? "panel-header-lg" : "panel-header-sm"]')
      big-chart(v-if='isDashboard', :data='bigChartDatas.datas', :labels='bigChartDatas.labels')
    .content
      .container-fluid
        router-view.animated.fadeIn(keep-alive)
      back-2-top(:duration='400')
</template>

<script>
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import {
  Header as AppHeader,
  Back2Top,
  Sidebar,
  BigChart,
} from './components/';

export default {
  /**
   * Load sub-components
   */
  components: {
    AppHeader,
    Back2Top,
    Sidebar,
    BigChart,
  },

  /**
   * Create app data object
   *
   * TODO: move to vuex state
   */
  data() {
    return {
      wsReconnecting: false,
      miniSidebar: false,
      isDashboard: false,
      //chartData: [],
      //chartLabels: [],
      navOpen : false
    };
  },

  computed: {
 
  },

  watch: {
    $lng() {
      console.log('Language updated');
      this.update(this);
    },
  },

  methods: {
     toggleNavBar() {
       this.navOpen = !this.navOpen;
    }
  },

  /**
   * Application created
   */
  created() {
    console.log('App started!');
  },
};
</script>

<style lang="scss">
@import '~assets/scss/style.scss';
.animated.fadeIn {
  margin-bottom: 30px;
}
</style>
