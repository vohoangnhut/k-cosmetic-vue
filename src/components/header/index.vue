<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-transparent.navbar-absolute.bg-primary.fixed-top
  .container-fluid
    .navbar-wrapper
      .navbar-toggle
        button.navbar-toggler(type='button')
          span.navbar-toggler-bar.bar1
          span.navbar-toggler-bar.bar2
          span.navbar-toggler-bar.bar3
      a.navbar-brand {{title}}
    button.navbar-toggler(type='button', data-toggle='collapse', data-target='#navigation', aria-controls='navigation-index', aria-expanded='false', aria-label='Toggle navigation')
      span.navbar-toggler-bar.navbar-kebab
      span.navbar-toggler-bar.navbar-kebab
      span.navbar-toggler-bar.navbar-kebab
    #navigation.collapse.navbar-collapse.justify-content-end
      ul.navbar-nav
        li.nav-item
          a.nav-link
            p Xin Chào Admin !
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
    ...mapActions('session', ['logout'])
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
