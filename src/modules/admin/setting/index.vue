<template lang='pug'>
div(v-loading.fullscreen.lock='loading')
  b-card
    el-form( :model='formData', label-width='150px', :rules="lstRule", ref="mainForm" )
      el-form-item(label='Old Password', prop='oldPassword')
        el-input(placeholder='Input new pass here ...', v-model='formData.oldPassword', type='password')  
      el-form-item(label='New Password', prop='password')
        el-input(placeholder='Input new pass here ...', v-model='formData.password', type='password')  
      el-form-item
        el-button(type='success', icon='plus', @click='updatePassword') Update


</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    // query() {
    //   return {
    //     size: this.pageSize,
    //     skip: this.pageSize * (this.currentPage - 1),
    //   };
    // },
  },

  data() {
    const validateFunc = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Không được để trống'));
      } else if (value.length < 6) {
        callback(new Error('Ít nhất 6 Ký Tự'));
      } else {
        callback();
      }
    };

    return {
      formData: {
        oldPassword: '',
        password: '',
      },
      lstRule: {
        oldPassword: [{ validator: validateFunc, trigger: 'blur' }],
        password: [{ validator: validateFunc, trigger: 'blur' }],
      },

      loading: false,
    };
  },

  methods: {
    ...mapActions('setting', ['updatePass']),

    updatePassword() {
      this.$refs['mainForm'].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$db
            .ref('_current')
            .once('value')
            .then(snapshot => {
              let data = snapshot.val();

              if (this.formData.oldPassword != data.key) {
                this.loading = false;
                this.$notify({
                  title: 'Thông Báo',
                  message: 'Mật khẩu cũ không đúng',
                  type: 'warning',
                  duration: 1500,
                });
              } else {
                let ref = this.$db.ref('_current');
                ref.set({ key: this.formData.password }).then(
                  data => {
                    this.updatePass(this.formData.password);
                    this.loading = false;
                  },
                  error => {
                    this.showNotice('Lỗi', error, 'error');
                    this.loading = false;
                  },
                );
              }
            });
        } else {
          return false;
        }
      });

      // let ref = this.$db.ref('_current');
      // ref.set({key: key});

      // if (!this.formData.password) {
      //   this.$notify({
      //     title: 'Thông Báo',
      //     message: 'Vui Lòng Nhập Password',
      //     type: 'warning',
      //     duration: 1500,
      //   });
      // } else {
      //   if (this.formData.password.length <= 5) {
      //     this.$notify({
      //       title: 'Thông Báo',
      //       message: 'Password ít nhất 6 ký tự',
      //       type: 'warning',
      //       duration: 1500,
      //     });
      //   } else {

      //     this.$db
      //     .ref('_current')
      //     .once('value')
      //     .then(snapshot => {
      //       let data = snapshot.val();

      //     });

      //     this.updatePass(this.formData.password);
      //   }
      // }

      //    firebase.auth().signOut().then(() => {
      //   window.location.href = '/';
      // });
    },
  },
  created() {
    //this.getData();
  },
};
</script>

<style lang='scss' scoped>
.el-date-editor {
  width: 260px !important;
}
</style>
