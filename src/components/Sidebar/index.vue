<template lang="pug">
.sidebar(data-color='orange')
  .logo
    a.simple-text.logo-mini(href='http://credit-score.com')
      | CS
    a.simple-text.logo-normal(href='http://credit-score.com')
      | Credit Score
  .sidebar-wrapper
    ul.nav
      item(to='/', title='Dashboard', icon="design_app")
      item(to='profile', title='Profile', icon="users_circle-08")
      item(to='user', title='User', icon="users_single-02", v-if='isAdmin')
      item(to='log', title='Log', icon="files_single-copy-04", v-if='isAdmin')      
      item(to='ciccfg', title='CIC Config', icon="loader_gear", v-if='isAdmin')
      item(to='cfgselfdeclare', title='Tự Khai', icon="design-2_ruler-pencil", v-if='isAdmin')
      item(to='result', title='Kết Quả', icon="files_paper", v-if='isAdmin')
      item(to='setting', title='Cài Đặt', icon="ui-2_settings-90", v-if='isAdmin')
      item(to='dbdn', title='Import', icon="arrows-1_cloud-upload-94", v-if='isAdmin')

      
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
