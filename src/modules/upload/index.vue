<template lang='pug'>
.wrapper

  .section
    .container
    
        el-upload.upload-demo(action='https://jsonplaceholder.typicode.com/posts/', 
                                ref="upload",  
                                :auto-upload="false", 
                                :show-file-list= 'false', 
                                :multiple="true",
                                list-type='picture',
                                :on-change='handleChange')
            el-button(size='small', type='primary', :loading='loadingButton') Upload File
        br
        el-row
            el-col(:span='8', v-for='(o, index) in imageList', :key='index')
                el-card(:body-style="{ padding: '0px' }")
                    .box-image
                        img(:src='o.url')
                    div(style='padding: 14px;')
                        span {{ o.name }}
                        .bottom.clearfix
                            time.time {{ o.time }}
                            el-button.button(type='text', @click='removeImg(index, o)') REMOVE

        //- el-progress(:percentage='percentage')
        //- el-form(ref='form', label-width='120px', v-if="percentage === 100 && dialogImageUrl", style="margin-top:20px")
        //-     el-form-item(label='Review Image', style="margin-bottom:0px")
        //-         img(width='100%', :src='dialogImageUrl', alt='', style="width: 70px;height: 70px;")
        //-     el-form-item(label='Link Thumbnail')
        //-         pre {{dialogImageUrl}}

        //- .row
        //-     el-upload.upload-demo(action='https://jsonplaceholder.typicode.com/posts/', 
        //-                             ref="upload", :multiple="true",
        //-                             :on-preview='handlePreview',
        //-                             :auto-upload="false",
        //-                             :on-remove='handleRemove', 
        //-                             :file-list='imageList', 
        //-                             :on-change='handleChange'
        //-                             list-type='picture',)
        //-         el-button(size='small', type='primary', :loading='loadingButton') Click to upload
        //-         .el-upload__tip(slot='tip') jpg/png files with a size less than 500kb

</template>

<script>
import toastr from 'toastr';

export default {
  data() {
    return {
      currentDate: new Date(),

      percentage: 0,
      dialogImageUrl: '',
      loadingButton: false,
      imageList: [
      ],
    };
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    removeImg(index, item) {
      // Create a reference to the file to delete
      let desertRef = this.$storage.ref(item.fullPath);

      // Delete the file
      desertRef
        .delete()
        .then(() => {
          this.imageList.splice(index, 1);
          //toastr.toastr('Removed');
          // File deleted successfully
        })
        .catch(error => {
          //toastr.toastr(error);
          console.log(error);

          // Uh-oh, an error occurred!
        });
    },

    handleChange() {
      if (this.$refs.upload.uploadFiles) {
        this.loadingButton = true;
        let files = this.$refs.upload.uploadFiles;
        console.log(files);
        if (files) {
          files.forEach(file => {
            const ext = file.name.slice(file.name.lastIndexOf('.'));
            const fileName = file.name.slice(0, file.name.lastIndexOf('.'));
            const extraFileName = Math.random()
              .toString(36)
              .substring(2, 10)
              .toUpperCase();
            let uploadTask = this.$storage
              .ref('images/' + fileName + extraFileName + '.' + ext)
              .put(file.raw);
            uploadTask.on(
              'state_changed',
              snapshot => {
                this.percentage =
                  snapshot.bytesTransferred / snapshot.totalBytes * 100;
              },
              error => {
                this.loadingButton = false;
                toastr.toastr(error.FirebaseStorageError.message);
              },
              () => {
                //   console.log(uploadTask.snapshot.metadata.fullPath);
                //   console.log(uploadTask.snapshot.metadata.name);
                //   console.log(uploadTask.snapshot.metadata.timeCreated);
                //   console.log(uploadTask.snapshot.downloadURL);
                let value = {
                  name: uploadTask.snapshot.metadata.name,
                  url: uploadTask.snapshot.downloadURL,
                  time: uploadTask.snapshot.metadata.timeCreated,
                  fullPath: uploadTask.snapshot.metadata.fullPath,
                };
                this.imageList.push(value);
                //this.dialogImageUrl = uploadTask.snapshot.downloadURL;
                this.loadingButton = false;
                this.$refs.upload.clearFiles();
              },
            );
          });
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>
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
</style>
