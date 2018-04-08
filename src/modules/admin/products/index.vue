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
        //el-table-column(property='short_description', label='Mô Tả', width='200', :sortable="true")
        el-table-column(label='action', width='150')
          template(slot-scope='scope')
            el-tooltip.item(effect='dark', content='Edit', placement='left-start')
              el-button(size='small', @click='handleEdit(scope.$index, scope.row)', icon='el-icon-edit')
            el-tooltip.item(effect='dark', content='Delete', placement='right-start')
              el-button(size='small', type='danger', @click='handleDelete(scope.$index, scope.row)', icon='el-icon-delete')

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
      const key = row.key ? row.key : '';
      this.$router.push(`/admin/product/${key}`);
    },

    handleDelete(index, row) {
      this.$confirm('Bạn có thật sự muốn xoá ?', 'Thông Báo', {
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          let ref = this.$db.ref('products/' + row['key']);

          ref.remove().then(
            data => {
              this.showNotice('Thông Báo', 'Xoá Thành Công', 'success'); //Warning//Info//Error
              this.getData();
            },
            error => {
              this.showNotice('Lỗi', error, 'Error'); //Warning//Info//Error
            },
          );
        })
        .catch(() => {});
    },


    metHandlerAddNew() {
      this.$router.push('/admin/product');

      // this.formData = {
      //   name: '',
      //   price: '',
      //   short_description: '',
      // };
      // this.isNew = true;
      // this.showDialogFlg = true;
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
        .then( snapshot => {
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
