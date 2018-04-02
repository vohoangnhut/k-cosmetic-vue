<template>
  <router-link :to="url" class="nav-link">
    <i :class="icon"></i> {{name}}
    <b-badge :variant="badge.variant">{{badge.text}}</b-badge>
  </router-link>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    badge: {
      default: ''
    }
  }
};
</script>
