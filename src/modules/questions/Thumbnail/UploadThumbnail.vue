<template lang='pug'>
    el-row
      img.floatLeft.thumbnailImg(width='100%',v-if='link', :src='link', alt='')
      el-upload.upload-demo(action='https://jsonplaceholder.typicode.com/posts/', ref="upload",  :auto-upload="false", :show-file-list= 'false', :multiple="false",
                          list-type='picture',
                          :on-change='handleChange')
        el-button.floatLeft(size='small', type='info', :loading='loadingButton', icon='el-icon-upload')
      el-button.floatLeft(v-if='link', size='small', type='danger', :loading='loadingButton', icon='el-icon-close', @click='removeLink')
</template>

<script>
export default {
  props: {
    commingLink: String,
    commingIndex: Number,
  },

  data: function () {
    return {
      link: '',
      index: null,

      dialogImageUrl: '',
        loadingButton: false,
    }
  },

   methods: {
     updateValue: function (event) {
       this.link = event.target.value;
    },
    
    handleChange() {
      console.log(this.$refs.upload.uploadFiles);
        if(this.$refs.upload.uploadFiles){
          this.loadingButton = true;
          let file = this.$refs.upload.uploadFiles[0];
          if(file){
            const ext = file.name.slice(file.name.lastIndexOf('.'));
            const fileName = file.name.slice(0, file.name.lastIndexOf('.'));
            const extraFileName = Math.random().toString(36).substring(2, 10).toUpperCase();
            this.$storage.ref('images/'+ fileName + extraFileName + '.' +  ext).put(file.raw).then((snapshot)=> {
                this.loadingButton = false;
                this.$refs.upload.clearFiles();
                this.link = snapshot.downloadURL;

                let emitParams = {
                  link : snapshot.downloadURL,
                  index : this.index
                }
                this.$emit('childChangeValue', emitParams);
                
            });
          }
        }
      },

      removeLink() {
        this.link = '';
        let emitParams = {
          link : '',
          index : this.index
        }
        this.$emit('childChangeValue', emitParams);
      }

  },

  beforeMount () {    
    this.link = this.commingLink;
    this.index = this.commingIndex;
  }
};
</script>

<style lang='scss' scoped>
.floatLeft {
  float: left;
  margin: 0 0 0 5px;
}

.thumbnailImg {
  width: 70px;height: 70px; border: 1px solid #ebbfbf;
}
</style>
