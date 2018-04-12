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
    
    //- ul.navbar-nav
    //-   li.nav-item
    //- .navbar-nav
    //-   .nav-item
    a.logout-item(@click="logout")
        i.now-ui-icons.users_circle-08
          //p SIGN OUT
    
    //- button.navbar-toggler(type='button', 
    //-                       @click='toggleNavProfile')
    //-   span.navbar-toggler-bar.navbar-kebab
    //-   span.navbar-toggler-bar.navbar-kebab
    //-   span.navbar-toggler-bar.navbar-kebab
    //- #navigation.collapse.navbar-collapse.justify-content-end(:class='{ "show": openProfile }')
    //-   ul.navbar-nav
    //-     li.nav-item
    //-       a.nav-link(@click="logout")
    //-         i.now-ui-icons.arrows-1_share-66
    //-         p
    //-           span.d-lg-none.d-md-block Sign Out
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
      title: '',
      openProfile: false,
    };
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
    },
  },

  created() {
    this.title = this.$route.meta.title;
  },
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

.logout-item {
  padding: 5px 7px 2px 7px;
  font-size: 1.3em;

  // margin: 5px;
  // padding: 5px 7px 4px 7px;
  border-radius: 3px;
}

.logout-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}
</style>
