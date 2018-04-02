<template lang="pug">
h1 home
                
  app-footer
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  

  data() {
    return {
      formCic: {
        id: '',
        verifyCode: '',
        ref: '',
      },

      visableFinal: false,
    };
  },

  

};
</script>

<style lang="scss">
.page-header {
  min-height: 100vh;
  max-height: 999px;
  padding: 0;
  color: #2c2c2c !important;
  position: relative;
  overflow: hidden;
  /deep/ .content {
    text-align: left;
  }
  /deep/ .container {
    color: #2c2c2c !important;
  }
}
.page-header-image {
  background-image: url('~images/bg/pricing1.jpg');
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  z-index: -1;
}

// .removeBorder > input {
//   border: none !important;
// }

// .el-form-item {
//     margin-bottom: 10px !important;
// }

.fade-main-enter-active,
.fade-main-leave-active {
  transition: opacity 0.5s;
}
.fade-main-enter,
.fade-main-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-enter {
  transform: translateX(10px);
  opacity: 0;
}

/*** fullloading ****/
.el-loading-mask.is-fullscreen {
  background-color: rgba(44, 62, 80, 0.9) !important;
}

.el-loading-spinner {
  display: none;
}
.el-counttime {
  position: fixed;
  z-index: 11000;
  // height: 100%;
  width: 700px;
  left: 30%;
  top: 40%;
  right: 0;
  margin-left: auto !important;
  margin-right: auto !important;
  margin: 0 auto;
}
.block {
  display: flex;
  flex-direction: column;
}

.text {
  color: #1abc9c;
  font-size: 40px;
  font-family: 'Roboto Condensed', serif;
  font-weight: 400;
  margin-top: -30px;
  margin-bottom: 10px;
  text-align: center;
}

.digit {
  color: #ecf0f1;
  font-size: 100px;
  font-weight: 100;
  font-family: unset;
  // margin: 10px;
  text-align: center;
}
</style>
