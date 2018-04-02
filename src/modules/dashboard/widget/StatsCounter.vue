<template lang='pug'>
el-col.stats-counter(:span='4')
  div.content(v-bind:style='{ background: backgroundColor, border: "1px solid " + backgroundColor }')
    i(:class='icon')
    span.label {{title}}
    span.number {{count}}
</template>

<script>
export default {
  props: {
    title: String,
    count: Number,
    icon: String,
    backgroundColor: {
      type: String,
      default: '#27ae60'
    },
  }
};
</script>

<style lang='scss' scoped>
.stats-counter {
  i {
    font-size: 120px;
    position: absolute;
    opacity: 0.12;
    top: 0;
    padding: 7px;
  }

  .label {
    text-align: right;
    display: block;
    width: 75%;
    height: 40px;
    padding: 10px 15px 10px 10px;
    word-break: break-word;
    float: right;
  }

  .number {
    font-size: 40px;
    float: right;
    display: block;
    padding: 10px 20px 0 0;
    width: 100%;
    text-align: right;
  }

  @media (max-width: 1366px) {
    .number {
      font-size: 22px;
    }
    .label {
      height: 60px;
    }
  }

  .content {
    width: 100%;
    height: 135px;
    color: white;
    border-radius: 4px;
  }
}
</style>
