<template lang="pug">
.sidebar(data-color='orange')
  .logo
    a.simple-text.logo-mini(href='http://credit-score.com')
      | HK
    a.simple-text.logo-normal(href='http://credit-score.com')
      | Kim Comestic
  .sidebar-wrapper
    ul.nav
      item(to='/admin/emp', title='Nhân Viên', icon="users_single-02")
      //item(to='/admin/products', title='Sản Phẩm', icon="design_app")
      //item(to='/admin/upload', title='Sản Phẩm', icon="design_app")
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Item from './item';

export default {
  components: {
    Item
  },

  computed: {
    ...mapGetters('session', ['me']),
    isAdmin() {
      if(this.me){
        if(this.me.user_type === 'admin')
          return true
        else
          return false
      }
      return false
    },
  },
};
</script>

<style scoped>

</style>
