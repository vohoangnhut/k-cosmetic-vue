<template lang="pug">
.navbar-right.col-lg-3.col-md-3.col-sm-3.col-xs-2
  ul
    li
      i.fa.fa-bell
    li(@click='logout')
      a(style='display: block')
        i.fa.fa-sign-out
        span Logout
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions('session', ['logout'])
  }
};
</script>

<style>

</style>
