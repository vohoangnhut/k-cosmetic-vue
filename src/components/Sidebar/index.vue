<template lang="pug">
.sidebar(:class='{ opened: opened }')
  nav.sidebar-nav
    div(slot='header')
    ul.nav()
      router-link.nav-link(v-for="m in menus", :key="m.path" :to="m.path")
        i(:class='m.icon')
        |  {{m.name}}
    slot
    div(slot='footer')
</template>
<script>
export default {
  name: 'sidebar',
  props: {
    opened: Boolean
  },

  components: {},


  data() {
    return {
      menus : [
        
      { path: 'surveys', name: 'Danh Sách Khảo Sát' ,icon: 'fa fa-list-ol' },
      // { path: 'questions', name: 'Câu Hỏi' ,icon: 'fa fa-question-circle-o' },
      // { path: 'brands', name: 'Nhãn Hiệu' ,icon: 'fa fa-sitemap' },
      // { path: 'foodtypes', name: 'Loại Thức Ăn' ,icon: 'fa fa-shopping-basket' },
      // { path: 'foods', name: 'Thức Ăn' ,icon: 'fa fa-codiepie' },
      //{ path: 'upload', name: 'Upload' ,icon: 'fa fa-upload' },
      { path: 'maps', name: 'Maps' ,icon: 'fa fa-map-marker' },
      { path: 'steps', name: 'Câu Hỏi' ,icon: 'fa fa-question-circle-o' },
      ],
    };
  },

  methods: {}
};
</script>

<style lang="css">
.nav-link {
  cursor: pointer;
}

.sidebar > .sidebar-nav > .nav > .nav-link > i {
  color :#fff !important;
}
</style>
