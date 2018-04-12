<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-absolute.bg-primary.fixed-top(:class='{ "bg-white": openProfile, "navbar-transparent": !openProfile }')
  .container-fluid
    .navbar-wrapper
      .navbar-toggle
        button.navbar-toggler(type='button', @click='clickNavBar')
          span.navbar-toggler-bar.bar1
          span.navbar-toggler-bar.bar2
          span.navbar-toggler-bar.bar3
      //a.navbar-brand {{title}}
    
    button.navbar-toggler(type='button', 
                          data-toggle='collapse', 
                          data-target='#navigation', 
                          aria-controls='navigation-index', 
                          aria-expanded='false', 
                          aria-label='Toggle navigation',
                          @click='toggleNavProfile')
      span.navbar-toggler-bar.navbar-kebab
      span.navbar-toggler-bar.navbar-kebab
      span.navbar-toggler-bar.navbar-kebab
    #navigation.collapse.navbar-collapse.justify-content-end(:class='{ "show": openProfile }')
      ul.navbar-nav
        li.nav-item
          a.nav-link(@click="logout")
            i.now-ui-icons.arrows-1_share-66
            p
              span.d-lg-none.d-md-block Sign Out
    //- ul.navbar-nav
    //-   li.nav-item
    //-     a.nav-link(@click="logout")
    //-       i.now-ui-icons.arrows-1_share-66
    //-       p
    //-         span.d-lg-none.d-md-block Sign Out
              
        
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex';


export default {
   data() {
      return {
        title : '',
        openProfile: false
      }
    },

  computed: {
    ...mapActions('session', ['me']),

  },

  methods: {
    ...mapActions('session', ['logout']),

    clickNavBar() {
      this.$emit('clickNavBar');
    },

    toggleNavProfile() {
      this.openProfile = !this.openProfile;
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
