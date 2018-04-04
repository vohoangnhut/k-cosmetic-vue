<template lang="pug">
.page-header(filter-color="orange")
  .page-header-image
  .content
    .container
      .col-md-5.ml-auto.mr-auto
        .card.card-login.card-plain
          form(:model='formData', status-icon='', @submit.prevent="login(formData)")
            .card-header.text-center
              .logo-container
                img(src='~img/now-logo.png', alt='')
            .card-body
              .input-group.form-group-no-border.input-lg
                .input-group-prepend
                  span.input-group-text
                    i.now-ui-icons.users_circle-08
                input.form-control(v-model='formData.username', auto-complete='off', placeholder='Username', type='text')
              .input-group.form-group-no-border.input-lg
                .input-group-prepend
                  span.input-group-text
                    i.now-ui-icons.objects_key-25
                input.form-control(type='password',  v-model='formData.password', auto-complete='off' ,
                                    placeholder='Password',
                                    @keyup.enter='login(formData)')
            .card-footer.text-center
              button.btn.btn-primary.btn-round.btn-lg.btn-block(@click='login(formData)') Login

</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },

  methods: {
    ...mapActions('session', ['login'])
  }
};
</script>


<style lang="scss" scoped>

.logo-container{
    width: 65px;
    margin: 0 auto;
    margin-bottom: 55px;
}

.page-header {
  &:after,
  &:before {
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;
    display: block;
    left: 0;
    top: 0;
    content: '';
  }
}
.page-header-image {
  background-image: url('~images/bg/login.jpg');
}
</style>
