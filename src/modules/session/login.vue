<template lang="pug">
  .container
    .card.card-container
      .card-body
        img#profile-img.profile-img-card(src='//ssl.gstatic.com/accounts/ui/avatar_2x.png')
        p#profile-name.profile-name-card
        el-form.form-signin(:model='formData', status-icon='', @submit.native="login(formData)")
          el-input#username(type='text', v-model='formData.username', auto-complete='off', placeholder='Username', style="margin-bottom: 8px;")
          el-input#password(type='password', v-model='formData.password', auto-complete='off' ,
                            placeholder='Password', style="margin-bottom: 8px;",
                            @keyup.enter.native='login(formData)')
          el-button.btn.btn-lg.btn-block(type='primary', @click='login(formData)') Login


</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    };
  },

  methods: {
    ...mapActions('session', ['login'])
  }
};
</script>

<style scoped>
.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    border-radius: 50%;
}

.profile-name-card {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0 0;
    min-height: 1em;
}

.container {
  padding-top: 100px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
}

.card {
    background-color: #F7F7F7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    border-radius: 2px;
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.card-container.card {
    max-width: 350px;
    padding: 40px 40px;
}

.form-signin #username{
    direction: ltr;
    height: 44px !important;
    font-size: 16px;
    margin-bottom: 10px !important;
}
</style>
