<template lang="pug">
header.app-header.navbar-fixed-top
  .container-fluid
    .row
      section.col-md-12.navbar-top-wrapper(:class='{ "sidebar-opened": sidebarOpened, fixed: fixed }')
        .navbar-left.col-lg-3.col-md-3.col-sm-3.col-xs-10
          button.btn-none(@click='$emit("onToggleClick")')
            i.fa.fa-bars
          b-link.navbar-brand(to='')
        navbar-center(:menus="menus")
        user-box
</template>

<script>
import NavbarCenter from './menu';
import UserBox from './userbox';
import { mapGetters } from 'vuex';

export default {
  props: {
    sidebarOpened: Boolean,
    fixed: Boolean
  },

  components: {
    ...mapGetters('session', ['me']),
    NavbarCenter,
    UserBox
  },

  data() {
    return {
      activeIndex: true,
      menus: []
    };
  },

  methods: {
    mobileSidebarToggle() {},
    sidebarToggle() {},
    asideToggle() {}
  },

  created() {
    this.menus = [
      { path: '/', name: 'Dashboard' },
      //{ path: 'users', name: 'Users' },
      { path: 'employees', name: 'Nhân Viên' },
      //{ path: 'steps', name: 'Câu Hỏi' },
      // { path: 'questions', name: 'Câu Hỏi' },
      // { path: 'brands', name: 'Nhãn Hiệu' },
      // { path: 'foodtypes', name: 'Loại Thức Ăn' },
      // { path: 'foods', name: 'Thức Ăn' },
    ];
  }
};
</script>

<style>

</style>
