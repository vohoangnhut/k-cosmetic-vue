<template lang='pug'>
div(v-loading.fullscreen.lock='loading')
  b-card
    el-form.demo-form-inline( inline=true,  @submit.native.prevent="onTextSearchEnter")
      el-form-item
        el-button(type='success', icon='plus', @click='metHandlerAddNew') Thêm Mới
    br
    el-row
      el-table(ref='singleTable', :data='lstDataDisplay', border='', style='width: 100%',  :default-sort = "{prop: 'createdAt', order: 'ascending'}")
        el-table-column(type='index', width='50')
        el-table-column(property='name', label='Tên', width='200', :sortable="true")
        el-table-column(property='price', label='Giá', width='200', :sortable="true")
        el-table-column(property='short_description', label='Mô Tả', width='200', :sortable="true")
        el-table-column(label='action', width='150')
          template(slot-scope='scope')
            el-tooltip.item(effect='dark', content='Edit', placement='left-start')
              el-button(size='small', @click='handleEdit(scope.$index, scope.row)', icon='el-icon-edit')
            el-tooltip.item(effect='dark', content='Delete', placement='right-start')
              el-button(size='small', type='danger', @click='handleDelete(scope.$index, scope.row)', icon='el-icon-delete')

    br

    el-dialog(title='Details', :visible.sync='showDialogFlg', :modal-append-to-body='false', :close-on-click-modal='false')
      el-form(:model='formData', label-width='150px', :rules="rules",ref="ruleForm")
        el-form-item(label='Tên Sản Phẩm',prop="name")
          el-input( v-model='formData.name')
        el-form-item(label='Giá')
          el-input( v-model='formData.price')
        el-form-item(label='Mô Tả', prop="short_description")  
          el-input(type='textarea', :rows='2', placeholder='Please input', v-model='formData.short_description')
        
      span.dialog-footer(slot='footer')
        el-button(@click='metHandlerCancel') Đóng
        el-button(type='primary', @click='handleSave') Lưu

</template>

<script>
import toastr from '../../../core/toastr';
import code_generator from '../../../core/common';
import _ from 'lodash';
//import firebase from 'firebase';
import moment from 'moment';
import axios from 'axios';

export default {
  firebase() {
    return {
      listEmployees: this.$db.ref('users'),
    };
  },

  computed: {
    query() {
      return {
        size: this.pageSize,
        skip: this.pageSize * (this.currentPage - 1),
      };
    },
  },

  data() {
    return {
      loading: false,
      lstDataDisplay: [],
      lstDataBinding: [],
      showDialogFlg: false,

      formData: {
        key: '',
        name: '',
        price: '',
        short_description: '',
      },

      rules: {
        name: [
          {
            required: true,
            message: 'Vui lòng nhập Mã NV',
            trigger: 'blur',
          },
        ],
      },

      isNew: false,
    };
  },

  methods: {
    handleEdit(index, row) {
      this.formData = {
        key: row.key ? row.key : '',

        name: row.name ? row.name : '',
        price: row.price ? row.price : '',
        short_description: row.short_description ? row.short_description : '',
      };

      this.isNew = false;
      this.showDialogFlg = true;
    },

    handleDelete(index, row) {
      this.$confirm('Bạn có thật sự muốn xoá ?', 'Thông Báo', {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          let ref = this.$db.ref('products/' + row['_id']);

          ref.remove().then(
            data => {
              this.showNotice('Thông Báo', 'Xoá Thành Công', 'success'); //Warning//Info//Error
              this.getDataFromAPI();
            },
            error => {
              this.showNotice('Lỗi', error, 'Error'); //Warning//Info//Error
            },
          );
        })
        .catch(() => {});
    },

    handleSave() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if (this.isNew) {
            this.loading = true;
            let key = code_generator(10);
            let ref = this.$db.ref('products/' + key);
            ref
              .set({
                //emplCd: this.formData.emplCd ? this.formData.emplCd : '',
                key: key,
                name: this.formData.name ? this.formData.name : '',
                price: this.formData.price ? this.formData.price : '',
                short_description: this.formData.short_description
                  ? this.formData.short_description
                  : '',
                createdAt: moment().format('DD/MM/YYYY HH:mm:ss'),
              })
              .then(
                data => {
                  this.showNotice('Thông Báo', 'Lưu Thành Công', 'success');
                  this.showDialogFlg = false;
                  this.getData();
                  //this.getDataFromAPI();
                  this.loading = false;
                },
                error => {
                  this.showNotice('Lỗi', error, 'Error');
                  this.loading = false;
                },
              );
          } else {
            this.loading = true;

            let dataUpdate = {
              name: this.formData.name ? this.formData.name : '',
              price: this.formData.price ? this.formData.price : '',
              short_description: this.formData.short_description
                ? this.formData.short_description
                : '',
              createdAt: new Date().toString(),
            };

            let updates = {};
            updates['products/' + this.formData.key] = dataUpdate;
            this.$db
              .ref()
              .update(updates)
              .then(
                data => {
                  this.showNotice(
                    'Thông Báo',
                    'Cập Nhập Thành Công',
                    'success',
                  ); //Warning//Info//Error
                  this.showDialogFlg = false;
                  this.getDataFromAPI();
                  this.loading = false;
                },
                error => {
                  this.showNotice('Lỗi', error, 'Error'); //Warning//Info//Error
                  this.loading = false;
                },
              );
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    metHandlerAddNew() {
      this.formData = {
        name: '',
        price: '',
        short_description: '',
      };
      this.isNew = true;
      this.showDialogFlg = true;
    },

    showNotice(title, content, type) {
      this.$notify({
        title: title,
        message: content,
        type: type,
        duration: 1000,
      });
    },

    metHandlerCancel() {
      this.showDialogFlg = false;
    },

    getData() {
      this.lstDataDisplay = [];
      this.$db
        .ref('products')
        .once('value')
        .then(function(snapshot) {
          let datas = snapshot.val();
          
          if (datas) {
            let arrays = Object.values(datas)
            arrays.forEach(item => {
              let data = {
                key: item.key,
                name: item.name,
                price: item.price,
                short_description: item.short_description,
              };

              this.lstDataDisplay.push(data);
            });
          }

          //let username = (snapshot.val() && snapshot.val().username) || 'Anonymous';

          // if(snapshot.val()){

          // }
        });
    },
  },
  created() {
    //  this.loading = true;
    //   this.$bindAsArray('lstDataBinding', this.$db.ref('users') , null, ()=>{
    //     console.log('Nhân Viên >> Finished Get Data from DB')
    //     this.updateDisplayList()
    //     this.loading = false;
    //     });
    //this.getDataFromAPI();
    this.getData();
    toastr.error('mnpasdfadasd');
  },
};
</script>

<style lang='scss' scoped>
.el-date-editor {
  width: 260px !important;
}
</style>
