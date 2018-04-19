<template lang="pug">
nav.navbar.navbar-expand-lg.navbar-absolute.navbar-transparent(color-on-scroll='500')
  .container(:class='{ "nav-open": navOpen }')
    .navbar-translate
      a.navbar-brand(href='/', rel='tooltip', title='Ha Kim Lrocre', data-placement='bottom')
        p.navigation-item.shadow-item Ha Kim Lrocre
      button.navbar-toggler(type='button', 
        data-toggle='collapse', 
        data-target='#navigation', 
        aria-controls='navigation-index', aria-expanded='false', aria-label='Toggle navigation',
        @click='toggleNavBar')
        span.navbar-toggler-bar.bar1
        span.navbar-toggler-bar.bar2
        span.navbar-toggler-bar.bar3
    .collapse.navbar-collapse(data-nav-image='../assets/img/blurred-image-1.jpg', data-color='orange')
      ul.navbar-nav.ml-auto(@click='toggleNavBar')
        item.navigation-item(to='/daily', title='Đại Lý', icon="business_money-coins")
        item.navigation-item(to='/product', title='Sản Phẩm', icon="shopping_bag-16")
        //- item(to='/about', title='About', icon="emoticons_satisfied")
        //- item(to='/qa', title='Hỏi đáp', icon="ui-2_chat-round")
        //item(to='/login', title='Đăng nhập', icon="business_badge")
        //- li.nav-item
        //-   a.nav-link(href='http://fibo.vn/', target='_blank')
        //-     i.now-ui-icons.objects_globe
        //-     p @CreditScore
        //- li.nav-item
        //-   a.nav-link(href='http://News.fibo.vn/', target='_blank')
        //-     i.now-ui-icons.location_world
        //-     p @Fibo

</template>

<script>
import Item from './item';

export default {
  // props: {
  //   navOpen : Boolean,
  // },
  components: {
    Item,
  },

  data() {
    return {
      
      navOpen: false
    };
  },

  computed: {
    isHome() {
      return this.$route.path === '/' || this.$route.name === 'Home';
    },
  },

  methods: {
    toggleNavBar() {
      this.navOpen = !this.navOpen;
    }
  },

  created() {
  },
};
</script>

<style lang="scss" scoped>
.navigation-item {
  font-size: 20px;
}

.shadow-item {
  text-shadow: 1px 1px black;
}
.nav-cus {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}
</style>


