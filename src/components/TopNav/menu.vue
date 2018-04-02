<template lang="pug">
.navbar-center.col-lg-6.col-md-6.col-sm-6.col-xs-6
  ul
    router-link(v-for="m in menus", :key="m.path" :to="m.path", tag="li", active-class="active", exact)
      a {{m.name}}
</template>

<script>
export default {
  props: {
    menus: Array // {path, name}
  }
};
</script>

<style lang="scss">

</style>
