<template lang='pug'>
.app
  .app-body(style="background-image: linear-gradient(#6891a2, #409eff);")
    .container-fluid
      .row
        router-view.animated.fadeIn(keep-alive)
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },

  methods: {},

  mounted() {}
};
</script>

<style lang='scss'>
@import '~assets/scss/app.scss';
</style>
