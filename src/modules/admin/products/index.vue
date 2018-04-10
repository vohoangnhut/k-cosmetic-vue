<template lang='pug'>
div(v-loading.fullscreen.lock='loading')
  b-card
    el-form.demo-form-inline( inline=true,  @submit.native.prevent="onTextSearchEnter")
      //- el-form-item
      //-   el-input(placeholder='Name ...', v-model='formSearchData.txtSearch', @keyup.enter.native='onTextSearchEnter($event)')  
      //- el-form-item
      //-   el-button(type='primary', icon='search', @click='metHandlerSearch') Refesh
      el-form-item
        el-button(type='success', icon='plus', @click='metHandlerAddNew') Thêm Mới
    br
    el-row
      el-table(ref='singleTable', :data='lstDataDisplay', border='', style='width: 100%',  :default-sort = "{prop: 'createdAt', order: 'ascending'}")
        el-table-column(type='index', width='50')
        el-table-column(property='name', label='Tên', width='600', :sortable="true")
        el-table-column(property='price', label='Giá', width='200', :sortable="true")
        //el-table-column(property='short_description', label='Mô Tả', width='200', :sortable="true")
        el-table-column(label='action', width='150')
          template(slot-scope='scope')
            el-tooltip.item(effect='dark', content='Edit', placement='left-start')
              el-button(size='small', @click='handleEdit(scope.$index, scope.row)', icon='el-icon-edit')
            el-tooltip.item(effect='dark', content='Delete', placement='right-start')
              el-button(size='small', type='danger', @click='handleDelete(scope.$index, scope.row)', icon='el-icon-delete')
      //el-button(type='info', size='small', icon='plus', @click='handlerLoadMore', style='margin-top: 10px;') Load More
      

</template>

<script>
import toastr from '../../../core/toastr';
import code_generator from '../../../core/common';
import _ from 'lodash';
//import firebase from 'firebase';
import moment from 'moment';
import axios from 'axios';

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
    return {
      formSearchData: {
        txtSearch: '',
      },

      loading: false,
      lstDataDisplay: [],

      theLastItem: {},
    };
  },

  methods: {
    metHandlerSearch() {
      this.getData();
    },

    onTextSearchEnter(event) {
      event.preventDefault();
      this.getData();
    },

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
              let imageList = row['images'];
              if (imageList && imageList.length > 0) {
                imageList.forEach(image => {
                  this.$storage.ref(image.fullPath).delete();
                });
              }

              this.showNotice('Thông Báo', 'Xoá Thành Công', 'success'); //Warning//Info//Error
              this.getData();
            },
            error => {
              this.showNotice('Lỗi', error, 'error'); //Warning//Info//Error
            },
          );
        })
        .catch(() => {});
    },

    metHandlerAddNew() {
      this.$router.push('/admin/product');
    },

    showNotice(title, content, type) {
      this.$notify({
        title: title,
        message: content,
        type: type,
        duration: 1000,
      });
    },

    getData() {
      this.lstDataDisplay = [];

      let query = this.$db
          .ref('products')
          .orderByChild('createdAt')
          //.limitToFirst(100);
      // else
      //   query = this.$db
      //     .ref('products')
      //     .orderByChild('name')
      //     .startAt(this.formSearchData.txtSearch)
      //     .endAt(this.formSearchData.txtSearch+ '\uf8ff')
      //     .limitToFirst(3);

      query.on('child_added', snapshot => {
        let item = snapshot.val();
        let valueItem = {
          key: item.key,
          name: item.name,
          price: item.price,
          short_description: item.short_description,
          long_description: item.long_description,
          images: item.images,
        };
        this.lstDataDisplay.push(valueItem);

        this.theLastItem = item;
      });
    },

    handlerLoadMore() {
      if (!this.theLastItem) return;
      this.$db
        .ref('products')
        .orderByChild('createdAt')
        .startAt(this.theLastItem.createdAt)
        .limitToFirst(4)
        .on('child_added', snapshot => {
          let item = snapshot.val();
          let valueItem = {
            key: item.key,
            name: item.name,
            price: item.price,
            short_description: item.short_description,
            long_description: item.long_description,
            images: item.images,
          };
          if (this.theLastItem.key != item.key)
            this.lstDataDisplay.push(valueItem);

          this.theLastItem = item;
        });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang='scss' scoped>
.el-date-editor {
  width: 260px !important;
}
</style>
