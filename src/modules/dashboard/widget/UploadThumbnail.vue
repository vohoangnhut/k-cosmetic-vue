<template lang='pug'>
    el-input.upload-thumbnail(:value='internalValue', @change.native='updateValue')
</template>

<script>
export default {
  props: {
    parentValue: String,
  },

  data: function () {
    return {
      internalValue: ''
    }
  },
   methods: {
    updateValue: function (event) {
      this.$emit('childChangeValue', event.target.value)
    }
  },

  beforeMount () {    
    this.internalValue = this.parentValue;
  }
};
</script>

<style lang='scss' scoped>

</style>
