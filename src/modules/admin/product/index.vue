<template lang='pug'>
div(v-loading.fullscreen.lock='loading')
  .card
    .card-header
      h6.card-title Thông Tin Sản Phẩm
    .card-body
      el-form(:model='formData', label-width='150px', :rules="rules",ref="ruleForm")
        el-form-item(label='Tên Sản Phẩm',prop="name")
          el-input( v-model='formData.name')
        el-form-item(label='Giá', prop="price")
          el-input( v-model='formData.price', @keyup.native='formatPrice($event)')
        el-form-item(label='Mô Tả Ngắn', prop="short_description")
          quill-editor(ref='shortDescp'
                      v-model='formData.short_description', 
                      :options='editorOptionShortDesc')
            #toolbarDesc(slot='toolbar')
              button.ql-bold Bold
              button.ql-italic Italic
              button.ql-underline Underline
              button.ql-strike Strike
              button.ql-list(value='ordered')
              button.ql-list(value='bullet')
              

        quill-editor(ref='myTextEditor', placeholder='acb'
                      v-model='formData.long_description', 
                      :options='editorOption', 
                      @blur='onEditorBlur($event)', 
                      @focus='onEditorFocus($event)', 
                      @ready='onEditorReady($event)')
          #toolbar(slot='toolbar')
            button.ql-bold Bold
            button.ql-italic Italic
            button.ql-underline Underline
            button.ql-strike Strike
            button.ql-list(value='ordered')
            button.ql-list(value='bullet')
            select.ql-header
              option(value='1')
              option(value='2')
              option(value='3')
              option(value='4')
              option(value='5')
              option(value='6')
              option(selected='')
            select.ql-color                
            select.ql-background                
            select.ql-align   
            button.ql-video Video
            button(type='button', @click='customButtonClick')
              i.el-icon-upload
            input.custom-input(type='file', @change='customButtonImage_UPLOAD', style='display: none !important;')
            button.ql-clean Clean

  .card
    .card-header
      h6.card-title Hình Sản Phẩm
    .card-body
      el-upload.upload-demo.custom-upload(ref='upload', :http-request='httpRequestUpload', action='https://jsonplaceholder.typicode.com/posts/'
                                  :auto-upload='true', :show-file-list='false', :multiple='true')
        el-button(slot='trigger', size='small', type='primary') Thêm Hình
  
      el-row      
        el-col(:span='8', v-for='(o, index) in imageList', :key='index')
            el-card(:body-style="{ padding: '0px' }")
                .box-image
                    img(:src='o.url')
                div(style='padding: 14px;')
                    //span {{ o.name }}
                    .bottom.clearfix
                        time.time {{ formatTime(o.time) }}
                        el-button.button(type='text', @click='removeImg(index, o)') REMOVE
  b-card
    el-row
      el-button(type='success', icon='plus', @click='handleSave') Lưu
      el-button(type='info', icon='plus', @click='handleCancel') Hủy
      

</template>

<script>
import toastr from '../../../core/toastr';
import code_generator from '../../../core/common';
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';

//Quill Editor
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import hljs from 'highlight.js';
import { quillEditor } from 'vue-quill-editor';

export default {
  components: {
    quillEditor,
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
      loadingButton: false,
      imageList: [],
      imageRemovedList: [],
      formData: {
        key: '',
        name: '',
        price: '0',
        short_description: '',
        long_description: '',
        createdAt: '',
        updatedAt: '',
      },

      rules: {
        name: [
          {
            required: true,
            message: 'Vui lòng nhập tên sản phẩm',
            trigger: 'blur',
          },
        ],
        price: [
          {
            required: true,
            message: 'Vui lòng nhập giá',
            trigger: 'blur',
          },
        ],
        short_description: [
          {
            required: true,
            message: 'Vui lòng nhập mô tả',
            trigger: 'blur',
          },
        ],
      },

      //Quill Editor

      editorOptionShortDesc: {
        modules: {
          toolbar: '#toolbarDesc',
        },
      },

      editor: {},
      length: '',
      content: '',
      editorOption: {
        modules: {
          toolbar: '#toolbar',
        },
      },
    };
  },

  methods: {
    httpRequestUpload(data) {
      this.loading = true;
      let file = data.file;
      const ext = file.name.slice(file.name.lastIndexOf('.'));
      const fileName = file.name.slice(0, file.name.lastIndexOf('.'));
      const extraFileName = Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();

      this.$storage
        .ref('images/' + fileName + extraFileName + '.' + ext)
        .put(file)
        .then(snapshot => {
          //this.imageList.push(value);
          //this.loading = false;

          let item = {
            name: snapshot.metadata.name,
            url: snapshot.downloadURL,
            time: snapshot.metadata.timeCreated,
            fullPath: snapshot.metadata.fullPath,
          };

          if (!this.imageList) this.imageList = [];

          this.imageList.push(item);
          this.$refs.upload.clearFiles();
          this.loading = false;
        });
    },

    formatPrice(event) {
      let value = event.target.value;
      this.formData.price = this.formatCurrency(value);
    },

    formatCurrency(inputValue) {
      if (inputValue) {
        return parseFloat(inputValue.replace(/\./g, ''))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
      return '0';
    },

    removeImg(index, item) {
      this.imageRemovedList.push(item.fullPath);
      this.imageList.splice(index, 1);
    },

    showNotice(title, content, type) {
      this.$notify({
        title: title,
        message: content,
        type: type,
        duration: 1500,
      });
    },

    getData(prodId) {
      if (!prodId) return;

      this.$db
        .ref('/products/' + prodId)
        .once('value')
        .then(snapshot => {
          let data = snapshot.val();

          this.imageList = data.images;
          this.formData = {
            key: data.key,
            name: data.name,
            price: data.price,
            short_description: data.short_description,
            long_description: data.long_description,
            updatedAt: data.updatedAt,
            createdAt: data.createdAt,
          };
        });
    },

    formatTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
    },

    handleSave() {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          if (!this.imageList || this.imageList.length == 0) {
            this.showNotice('Thông Báo', 'Vui Lòng Thêm Ảnh Sản Phẩm', 'error'); //Warning//Info//error
            return;
          }

          if (!this.formData.key) {
            this.loading = true;
            let key = code_generator(10);
            let ref = this.$db.ref('products/' + key);
            ref
              .set({
                key: key,
                name: this.formData.name ? this.formData.name : '',
                price: this.formData.price ? this.formData.price : '',
                short_description: this.formData.short_description
                  ? this.formData.short_description
                  : '',
                long_description: this.formData.long_description
                  ? this.formData.long_description
                  : '',
                images: this.imageList,
                createdAt: moment().format('YYYYMMDDHHmmss'),
                updatedAt: moment().format('YYYYMMDDHHmmss'),
              })
              .then(
                data => {
                  this.showNotice('Thông Báo', 'Lưu Thành Công', 'success');
                  this.getData(key);
                  this.loading = false;
                },
                error => {
                  this.showNotice('Lỗi', error, 'error');
                  this.loading = false;
                },
              );
          } else {
            this.loading = true;

            let dataUpdate = {
              key: this.formData.key ? this.formData.key : '',
              name: this.formData.name ? this.formData.name : '',
              price: this.formData.price ? this.formData.price : '',
              short_description: this.formData.short_description
                ? this.formData.short_description
                : '',
              long_description: this.formData.long_description
                ? this.formData.long_description
                : '',
              images: this.imageList,
              createdAt: this.formData.createdAt,
              updatedAt: moment().format('YYYYMMDDHHmmss'),
            };

            let updates = {};
            updates['products/' + this.formData.key] = dataUpdate;
            this.$db
              .ref()
              .update(updates)
              .then(
                data => {
                  //remove image if there some removed images
                  if (
                    this.imageRemovedList &&
                    this.imageRemovedList.length > 0
                  ) {
                    this.imageRemovedList.forEach(fullPath => {
                      this.$storage.ref(fullPath).delete();
                    });
                    this.imageRemovedList = [];
                  }

                  this.showNotice(
                    'Thông Báo',
                    'Cập Nhập Thành Công',
                    'success',
                  ); //Warning//Info//
                  this.getData(this.formData.key);
                  this.loading = false;
                },
                error => {
                  this.showNotice('Lỗi', error, 'error'); //Warning//Info//error
                  this.loading = false;
                },
              );
          }
        } else {
          this.showNotice(
            'Thông Báo',
            'Vui Lòng Nhập Các Trường Bất Buộc',
            'error',
          ); //Warning//Info//error
          return false;
        }
      });
    },

    //Qill Editor
    onEditorBlur(editor) {
      this.editor = editor;
      //console.log('editor blur!', editor);
    },
    onEditorFocus(editor) {
      this.editor = editor;
      //console.log('editor focus!', editor);
    },
    onEditorReady(editor) {
      this.editor = editor;
      //console.log('editor ready!', editor);
    },

    customButtonClick() {
      let range;
      if (this.editor.getSelection() != null) {
        range = this.editor.getSelection();
        this.length = range.index;
      } else {
        this.length = this.formData.long_description.length;
      }
      this.$el.querySelector('.custom-input').click();
    },

    customButtonImage_UPLOAD(event) {
      this.loading = true;

      let file = event.target.files[0];

      let fileNm = file.name;
      let fileTp = file.type;

      const ext = fileNm.slice(fileNm.lastIndexOf('.'));
      const fileName = fileNm.slice(0, fileNm.lastIndexOf('.'));
      const extraFileName = Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();

      let reader = new FileReader();
      reader.onloadend = event => {
        let blob = new Blob([event.target.result], { type: fileTp });
        this.$storage
          .ref('images/' + fileName + extraFileName + '.' + ext)
          .put(blob)
          .then(snapshot => {
            console.log('Uploaded an array!', snapshot);
            this.editor.insertEmbed(this.length, 'image', snapshot.downloadURL);
            this.loading = false;
          });
      };
      reader.onerror = function(e) {
        console.log('Failed file read: ' + e.toString());
        this.loading = false;
      };
      reader.readAsArrayBuffer(file);
    },
    //Qill Editor

    handleCancel(){
      this.$router.push('/admin/products');
    }
  },

  created() {
    const { prodId } = this.$route.params;
    if (prodId) this.formData.key = prodId;

    this.getData(prodId);
  },
};
</script>

<style lang='scss' scoped>
.el-date-editor {
  width: 260px !important;
}

// Image Review Format

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}

.el-card {
  margin: 0 10px;
}

.box-image {
  height: 250px;
  position: relative;
  > img {
    position: absolute;
    /* max-width: 100%; */
    /* border-radius: 1px; */
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    max-width: 100%;
    max-height: 100%;
  }
}

.custom-upload {
  padding: 10px;
}
</style>



    // async submitUpload() {
    //   if (this.$refs.upload.uploadFiles) {
    //     this.loading = true;
    //     let files = this.$refs.upload.uploadFiles;
    //     //console.log(files);
    //     if (files) {
    //       let promises = [];

    //       console.log('files >>>>>>>>>>', files);

    //       files.forEach(file => {
    //         const ext = file.name.slice(file.name.lastIndexOf('.'));
    //         const fileName = file.name.slice(0, file.name.lastIndexOf('.'));
    //         const extraFileName = Math.random()
    //           .toString(36)
    //           .substring(2, 10)
    //           .toUpperCase();

    //         promises.push(
    //           this.$storage
    //             .ref('images/' + fileName + extraFileName + '.' + ext)
    //             .put(file.raw)
    //             .then(snapshot => {
    //               //this.imageList.push(value);
    //               //this.loading = false;

    //               return {
    //                 name: snapshot.metadata.name,
    //                 url: snapshot.downloadURL,
    //                 time: snapshot.metadata.timeCreated,
    //                 fullPath: snapshot.metadata.fullPath,
    //               };
    //             }),
    //         );
    //       });

    //       Promise.all(promises).then(imageInfo => {
    //         // console.log('imageList >>>>>>>>>>', this.imageList);
    //         // console.log('imageInfo >>>>>>>>>>', imageInfo);

    //         imageInfo.forEach(element => {
    //           this.imageList.push(element);
    //         });
    //         console.log('imageList >>>>>>>>>>', this.imageList);

    //         this.loading = false;
    //         this.$refs.upload.clearFiles();

    //         this.handleSave();
    //       });
    //     }
    //   }
    // },
