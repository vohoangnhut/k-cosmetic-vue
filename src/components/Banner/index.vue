<template lang="pug">
.banner-wrapper(:style='bannerStyle')
  .col-md-12
    .content-banner(:style='contentStyle')
      .title
        span Xin chào
        | , 
        span Administrator
        | !
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      sTop: 0
    };
  },

  computed: {
    contentStyle() {
      const marginTop = (this.sTop / 3) * -1;
      const style = {
        marginTop: `${marginTop}px`,
        opacity: 1 - (this.sTop / 110)
      };
      return this.sTop >= 2 ? style : {};
    },

    bannerStyle() {
      return this.sTop >= 2
        ? { transform: `scale(${1 + (this.sTop / 7000)})` }
        : {};
    }
  },

  methods: {
    handleScroll() {
      this.sTop = this.scrollTop();
      this.$emit('onFixed', this.sTop >= 100);
    },

    scrollTop() {
      return window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;
    }
  },

  created() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    window.addEventListener('mousewheel', this.handleScroll);
    window.addEventListener('DOMMouseScroll', this.handleScroll);
  },

  mounted() {}
};
</script>

<style>

</style>
