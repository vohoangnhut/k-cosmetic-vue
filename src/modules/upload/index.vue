<template lang='pug'>
  b-card
    el-upload.upload-demo(action='https://jsonplaceholder.typicode.com/posts/', ref="upload",  :auto-upload="false", :show-file-list= 'false', :multiple="false",
                        list-type='picture',
                          :on-change='handleChange')
        el-button(size='small', type='primary', :loading='loadingButton') Upload File
    br
    el-progress(:percentage='percentage')
    el-form(ref='form', label-width='120px', v-if="percentage === 100 && dialogImageUrl", style="margin-top:20px")
        el-form-item(label='Review Image', style="margin-bottom:0px")
            img(width='100%', :src='dialogImageUrl', alt='', style="width: 70px;height: 70px;")
        el-form-item(label='Link Thumbnail')
            pre {{dialogImageUrl}}
</template>

<script>
export default {

  data() {
    return {
        percentage: 0,
        dialogImageUrl: '',
        loadingButton: false,
    };
  },

  methods: {

      handleChange() {
        if(this.$refs.upload.uploadFiles){
        this.loadingButton = true;
          let file = this.$refs.upload.uploadFiles[0];
          if(file){
            const ext = file.name.slice(file.name.lastIndexOf('.'));
            const fileName = file.name.slice(0, file.name.lastIndexOf('.'));
            const extraFileName = Math.random().toString(36).substring(2, 10).toUpperCase();
            let uploadTask = this.$storage.ref('images/'+ fileName + extraFileName + '.' +  ext).put(file.raw);
            uploadTask.on('state_changed', // or 'state_changed'
                (snapshot)=> {
                    this.percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                }, (error) => {
                    this.loadingButton = false;
                    console.log(error);
                }, () => {
                    this.dialogImageUrl = uploadTask.snapshot.downloadURL;
                    this.loadingButton = false;
                    this.$refs.upload.clearFiles();
              });
          }
        }
      },
  },


};
</script>
