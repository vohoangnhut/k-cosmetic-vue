<template lang='pug'>
  b-card
    el-form.demo-form-inline(:models='formSearchData', inline=true,  @submit.native.prevent="onTextSearchEnter")
      el-form-item
        el-input(placeholder='Text Search ...', v-model='formSearchData.txtSearch', @keyup.enter.native='onTextSearchEnter($event)')
      el-form-item
        el-button(type='primary', icon='search', @click='metHandlerSearch') Tìm Kiếm
      el-form-item
        el-button(type='success', icon='plus', @click='metHandlerAddNew') Thêm Mới
    br
    el-row
      el-table(:data='lstDataDisplay', style='width: 100%')
          el-table-column(type='expand')
            template(slot-scope='props')
              li(v-for='item in props.row.details')
                | {{ item.content }}
          el-table-column(label='Câu Hỏi', prop='content')
          el-table-column(label='Thao Tác', width='150')
            template(slot-scope='scope')
              el-tooltip.item(effect='dark', content='Edit', placement='left-start')
                el-button(size='small', @click='handleEdit(scope.$index, scope.row)', icon='el-icon-edit')
              el-tooltip.item(effect='dark', content='Delete', placement='right-start')
                el-button(size='small', type='danger', @click='handleDelete(scope.$index, scope.row)', icon='el-icon-delete')
    br

    el-dialog.customizeWidth(title='Chi Tiết', :visible.sync='showDialogFlg', :modal-append-to-body='false', :close-on-click-modal='false')
      h5 Nội Dung Câu Hỏi :
      el-form(:model='formData', :rules="rules", ref="ruleForm") 
        el-form-item(prop="content")
            el-input(placeholder="Câu Hỏi ?" , v-model='formData.content')
        el-row
          el-switch.itemSwitch(v-model='formData.first_question', active-color='#13ce66', inactive-color='#e5e5e5', active-text="Câu Đầu Tiên")
        el-row
          el-switch.itemSwitch(v-model='formData.last_question', active-color='#13ce66', inactive-color='#e5e5e5', active-text="Câu Hỏi Cuối")
        el-row
          el-switch.itemSwitch(v-model='formData.has_extra_data', active-color='#13ce66', inactive-color='#e5e5e5', active-text="Cho Phép Nhập")
        el-row
          el-switch.itemSwitch(v-model='formData.sum', active-color='#13ce66', inactive-color='#e5e5e5', active-text="Tính Tổng")
        el-row
          el-switch.itemSwitch(v-model='formData.selected_allow', active-color='#13ce66', inactive-color='#e5e5e5', active-text="Chp Phép Chọn")
          div(v-if='formData.selected_allow', style="margin-left: 9px;float: left;")
            el-radio-group(v-model='formData.multi', size='small')
              el-radio-button(:label='false') Chọn Một
              el-radio-button(:label='true') Chọn Nhiều
      hr  
      h5( style='margin-top: 20px;') Đáp Án :
        el-button(@click='addDetailsQuestion', type='info' , icon='el-icon-edit', style='margin-left: 10px;') Thên Đáp Án
      el-row
      table.table.table-hover
        thead
          tr
            th Nội Dung Câu Trả Lời
            th Link Hình
            th Câu Hỏi Kế Tiếp
            th Xoá
        tbody(v-for='(item, index) in formData.details')
            th
              el-input(v-model='item.content')
            th
              //upload-thumbnail(:commingLink='item.thumbnail',:commingIndex='index', @childChangeValue='updateParentThumbnail' )
              el-input(v-model='item.thumbnail')
            th
              el-select(v-model='item.next_question', clearable='', filterable='', placeholder='Chọn ...')
                el-option(v-for='qstItem in lstdata', :key='qstItem.id', :label='qstItem.content', :value='qstItem.id')
            th
              el-tooltip.item(effect='dark', content='Delete', placement='right-start')
                  el-button(type='danger', @click='removeDetailContent(index)', icon='el-icon-delete')

      h5( style='margin-top: 20px;') Câu Hỏi Lên Quan
        el-button(@click='addDetailsQuestion', type='info' , icon='el-icon-edit', style='margin-left: 10px;') Thêm
      el-row
        el-input(v-model='item.content')
        el-tooltip.item(effect='dark', content='Delete', placement='right-start')
          el-button(type='danger', @click='removeDetailContent(index)', icon='el-icon-delete')

      span.dialog-footer(slot='footer')
        el-button(@click='metHandlerCancel') Đóng
        el-button(type='primary', @click='handleSave') Lưu

</template>

<script>
import UploadThumbnail from './Thumbnail/UploadThumbnail';
export default {

  firebase() {
    return {
      lstdata: this.$db.ref('questions')
    };
  },
  
  components: {
      UploadThumbnail
  },

  data() {
    return {
      lstDataDisplay : [],
      lstDataBinding : [],

      showDialogFlg : false,
      formSearchData: {
        txtSearch: ''
      },
      formData : {
        id : '',
        content : '',
        has_extra_data : false,
        first_question : false,
        last_question : false,
        selected_allow : false,
        multi : false, 
        sum : false, 
        details: [{
            id:'', 
            content:'', 
            thumbnail : '', //K có remove
            extra_data: '', //K có remove
            selected: false, //K có remove
            next_question: ''  
          }],
      },

      radio5: '',

      formLabelWidth: '120px',
      rules: {
        content: [
          {
            required: true,
            message: 'input name',
            trigger: 'blur'
          }
        ]
      }
    };
  },

  methods: {

    onTextSearchEnter(event) {
      event.preventDefault();
      this.updateDisplayList();
    },

    metHandlerSearch(){
      this.updateDisplayList();
    },

    updateDisplayList(){
      this.lstDataDisplay = [...this.lstDataBinding];
      if(this.formSearchData.txtSearch)
      {
        let textSearch = this.formSearchData.txtSearch;
        this.lstDataDisplay = this.lstDataBinding.filter(function (item) {
            return item.question.toLowerCase().indexOf(textSearch.toLowerCase()) > -1;
        });
      }
        
    },

    handleEdit(index, row) {
      this.formData = {
        ...row,
        _key: row['.key'],
      } 

      delete this.formData['.key'];

      this.showDialogFlg = true;
    },

    handleDelete(index, row) {
      this.$confirm('Bạn có thật sự muốn xoá ?','Thông Báo', {
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancel',
          type: 'warning'
      }).then(() => {
        this.$firebaseRefs.lstdata.child(row['.key']).remove().then(
          (data) => {
            this.showNotice('Thông Báo','Xoá Thành Công','success') //Warning//Info//Error
            this.updateDisplayList();
          },
          (error)=> {
            this.showNotice('Lỗi',error,'Error') //Warning//Info//Error
          }
        );
      }).catch(() => {});
    },

    handleSave() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if(!this.formData.details || !this.formData.details[0] || !this.formData.details[0].content)
          {
            this.showNotice('Lỗi','Ít nhất có một áp dán','Error') //Warning//Info//Error
            return false;
          }


          //Hanlder data before save
          //thumbnail : '', //K có remove
          //extra_data: '', //K có remove
          //selected: '', //K có remove
          this.formData.details.forEach(element => {
            if(!this.formData.has_extra_data)
              delete element.extra_data;
            else
              element.extra_data = '';

            if(!element.thumbnail)
              delete element.thumbnail;
             else
              element.thumbnail = '';

            if(!this.formData.selected_allow)
              delete element.selected;
            else
              element.selected = false;
          });
            
          if(this.formData && this.formData._key)
          {
            this.$firebaseRefs.lstdata.child(this.formData._key).set(this.formData).then(
              (data) => {
                this.showNotice('Thông Báo','Cập Nhập Thành Công','success') //Warning//Info//Error
                this.showDialogFlg = false;
                this.updateDisplayList();
              },
              (error)=> {
                this.showNotice('Lỗi',error,'Error') //Warning//Info//Error
              }
            );
          }else{
              this.$firebaseRefs.lstdata.push(this.formData).then(
                (data) => {
                  this.showNotice('Thông Báo','Lưu Thành Công','success') //Warning//Info//Error
                  this.showDialogFlg = false;
                  this.updateDisplayList();
                },
                (error)=> {
                  this.showNotice('Lỗi',error,'Error') //Warning//Info//Error
                }
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
        id : Math.random().toString(36).substring(2, 10).toUpperCase(),
        content : '',
        has_extra_data : false,
        first_question : false,
        last_question : false,
        selected_allow : false,
        multi : false, 
        sum : false, 
        details: [{
          id:  Math.random().toString(36).substring(2, 10).toUpperCase(), 
          content:'', 
          thumbnail : '', 
          extra_data: '', 
          selected: false, 
          next_question: ''  
          }],
      },

      this.showDialogFlg = true;
    },

    showNotice(title, content, type) {
      this.$notify({
          title: title,
          message: content,
          type: type,
          duration: 1000
        });
    },
    
    metHandlerCancel(){
      this.showDialogFlg = false;
    },

    addDetailsQuestion(){
      this.formData.details.push({id:Math.random().toString(36).substring(2, 10).toUpperCase(), content:'', thumbnail : '', extra_data: '', selected: false, next_question: ''  });
    },

    removeDetailContent(idx){
      this.formData.details.splice(idx, 1);
    },

    updateParentThumbnail(params){
      let {index,link} = params;
      
      if(this.formData.details){
        //console.log('this.formData.details[index]', this.formData.details[index]);
        //console.log('this.formData.details[index].thumbnail', this.formData.details[index].thumbnail);
        if(this.formData.details[index])
          this.formData.details[index].thumbnail = link;
      }
      
    }
  },

  created() {    
    this.$bindAsArray('lstDataBinding', this.$db.ref('questions') , null, ()=>{this.updateDisplayList()});
  }

};
</script>

