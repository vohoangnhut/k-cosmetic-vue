<template lang='pug'>
div(v-loading.fullscreen.lock='loading')

  .wrapper

    .section
      .container
      
          el-upload.upload-demo(action='https://jsonplaceholder.typicode.com/posts/', 
                                  ref="upload",  
                                  :auto-upload="false", 
                                  :multiple="true",
                                  :on-change='handleChange')
              el-button(size='small', type='primary', :loading='loadingButton') Upload File
          br
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


          el-row
            quill-editor(ref='myTextEditor', 
                          v-model='content', 
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
                button.ql-direction(value='rtl')
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
                // You can also add your own
                button(type='button', @click='customButtonClick')
                  i.el-icon-upload
                input.custom-input(type='file', @change='_upload', style='display: none !important;')
                
                button.ql-clean Clean
                
            pre(v-html='contentCode')

          // el-row
          //   picture-input(ref='pictureInput', 
          //     @change='onChange', 
          //     width='600', height='600', 
          //     margin='16', 
          //     accept='image/jpeg,image/png', 
          //     size='10', buttonclass='btn', customstrings="Click to choose file")

</template>

<script>
import toastr from 'toastr';
import moment from 'moment';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.css';

//Quill Editor
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import hljs from 'highlight.js';
import { quillEditor } from 'vue-quill-editor';

import PictureInput from 'vue-picture-input';

export default {
  components: {
    vue2Dropzone,
    quillEditor,
    PictureInput,
  },

  data() {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { 'My-Awesome-Header': 'header value' },
      },

      currentDate: new Date(),

      percentage: 0,
      dialogImageUrl: '',
      loadingButton: false,
      imageList: [],

      //Quill Editor
      editor: {},
      length,

      content: '',
      editorOption: {
        modules: {
          toolbar: '#toolbar',
        },
      },

      loading: false,

      show: false,
      params: {
        token: '123456798',
        name: 'avatar',
      },
      headers: {
        smail: '*_~',
      },
      imgDataUrl: '', // the datebase64 url of created image
    };
  },

  computed: {
    contentCode() {
      return hljs.highlightAuto(this.content).value;
    },
  },

  methods: {
    formatTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
    },

    customButtonClick() {
      let range;
      if (this.editor.getSelection() != null) {
        range = this.editor.getSelection();
        this.length = range.index; //content获取到焦点，计算光标所在位置，目的为了在该位置插入img
      } else {
        this.length = this.content.length; //content没有获取到焦点时候 目的是为了在content末尾插入img
      }
      this.$el.querySelector('.custom-input').click(); //打开file 选择图片
    },

    _upload(event) {
      this.loading = true;

      let file = event.target.files[0];
      console.log(event.target.files);

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
    onEditorBlur(editor) {
      this.editor = editor;
      console.log('editor blur!', editor);
    },
    onEditorFocus(editor) {
      this.editor = editor;

      console.log('editor focus!', editor);
    },
    onEditorReady(editor) {
      this.editor = editor;

      console.log('editor ready!', editor);
    },
    //Qill Editor

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    dataURLtoBlob(dataURL) {
      let BASE64_MARKER = ';base64,';
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        let parts = dataURL.split(',');
        let contentType = parts[0].split(':')[1];
        let raw = decodeURIComponent(parts[1]);

        return new Blob([raw], {
          type: contentType,
        });
      }
      let parts = dataURL.split(BASE64_MARKER);
      let contentType = parts[0].split(':')[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], {
        type: contentType,
      });
    },

    onChange(image) {
      console.log('New picture selected!');
      if (image) {
        console.log('Picture loaded.');
        //this.upload(image);
        console.log(image);

        let blodImg = this.dataURLtoBlob(image);
        console.log(blodImg);

        // this.$storage
        //   .ref('images/' + fileName + extraFileName + '.' + ext)
        //   .put(blodImg)
        //   .then(snapshot => {
        //     console.log('Uploaded an array!', snapshot);
        //     this.editor.insertEmbed(this.length, 'image', snapshot.downloadURL);
        //     this.loading = false;
        //   });

        this.image = image;
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!');
      }
    },

    removeImg(index, item) {
      // Create a reference to the file to delete
      let desertRef = this.$storage.ref(item.fullPath);

      // Delete the file
      desertRef
        .delete()
        .then(() => {
          this.imageList.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
        });
    },

    async upload(file) {
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
            const extraFileName = Math.random().toString(36).substring(2, 10).toUpperCase();
            this.$storage.ref('images/' + fileName + extraFileName + '.' + ext)
            .put(file.raw)
            .then(snapshot => {
              let value = {
                  name: snapshot.metadata.name,
                  url: snapshot.downloadURL,
                  time: snapshot.metadata.timeCreated,
                  fullPath: snapshot.metadata.fullPath,
                };
                this.imageList.push(value);
                this.loadingButton = false;
                this.$refs.upload.clearFiles();
            });
          });
        }
      }
    },
  },

  mounted() {
    //console.log('this is my editor', this.editor);
    // setTimeout(() => {
    //   this.content = `<h1 class="ql-align-center">
    //                       <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
    //                     </h1>
    //                     <p><br></p>
    //                     <p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p>
    //                     <p><br></p>
    //                     <p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p>
    //                     <p><br></p>
    //                     <p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p>
    //                     <p><br></p>
    //                     <p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p>
    //                     <p><br></p>
    //                     <pre class="ql-syntax" spellcheck="false">const a = 10;<br>const editorOption = { highlight: text => hljs.highlightAuto(text).value };</pre>
    //                     <p><br></p>
    //                     <p><span class="ql-font-serif">Every flight begins with a fall.</span></p>
    //                     <p><br></p>
    //                     <p><a href="https://surmon.me/" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p>
    //                     <p><br></p>
    //                     <iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe>
    //                     <p><br></p>
    //                     <p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p>
    //                     <p><br></p>
    //                     <p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p>
    //                     <p><br></p>
    //                     <p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
    //                     `;
    // }, 1300);
  },
};
</script>

<style lang='scss' scoped>

.quill-code {
  border: none;
  height: auto;
  > code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0;
    height: 10rem;
    overflow-y: auto;
    resize: vertical;
  }
}

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

</style>
