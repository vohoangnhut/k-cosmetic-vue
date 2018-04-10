<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-transparent.navbar-absolute.bg-primary.fixed-top
  .container-fluid
    .navbar-wrapper
      .navbar-toggle
        button.navbar-toggler(type='button' @click='clickNavBar')
          span.navbar-toggler-bar.bar1
          span.navbar-toggler-bar.bar2
          span.navbar-toggler-bar.bar3
      //a.navbar-brand {{title}}

    ul.navbar-nav
      li.nav-item
        a.nav-link(@click="logout")
          i.now-ui-icons.arrows-1_share-66
          p
            span.d-lg-none.d-md-block Sign Out
              
        
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';


export default {
   data() {
      return {
        title : '',
      }
    },

  computed: {
    ...mapActions('session', ['me']),

  },

  methods: {
    ...mapActions('session', ['logout']),

    clickNavBar() {
      this.$emit('clickNavBar');
    }
  },


  created() {
    this.title = this.$route.meta.title;
  }
};
</script>
<style lang='scss' scoped>
.app-header.navbar {
  border: 0;

  .navbar-brand {
    border: 0;
    margin: 10px 0;
  }
}
</style>
