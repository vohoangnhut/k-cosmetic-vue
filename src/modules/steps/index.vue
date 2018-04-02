<template lang='pug'>
  b-card
    el-button(style='margin-top: 12px;', @click='previous', size='small', type='primary') Trước
    el-button(style='margin-top: 12px;', @click='next', size='small', type='primary') Tiếp
    
    el-steps(:active='active', finish-status='success', simple='', style='margin-top: 20px')
      el-step(v-for='(stepItem, index) in lstSteps' ,:key='stepItem.id', :title='stepItem.label')

    el-row(v-if="active === index", v-for='(stepItem, index) in lstSteps' ,:key='stepItem.id')
      el-button(type='success', size='small', style='margin: 5px 0 5px 0' ,icon='plus', @click='metHandlerAddNew') Thêm Mới

      el-table(:data="dataGlobal['step'+ (active+1)]  ? dataGlobal['step'+ (active+1)] : []", style='width: 100%')
        el-table-column(type='expand')
          template(slot-scope='props')
            li(v-for='item in props.row.details')
              | {{ item.content }}
        el-table-column(label='Nội Dung', prop='content')
        el-table-column(label='Thao Tác', width='180')
          template(slot-scope='scope')
            el-tooltip.item(effect='dark', content='Sữa', placement='left-start')
              el-button(size='small', @click='handleEdit(scope.$index, scope.row)', icon='el-icon-edit')
            el-tooltip.item(effect='dark', content='Sao Chép', placement='left-start')
              el-button(size='small', type='primary', @click='handlerCopy(scope.$index, scope.row)', icon='el-icon-tickets')
            el-tooltip.item(effect='dark', content='Xóa', placement='right-start')
              el-button(size='small', type='danger', @click='handleDelete(scope.$index, scope.row)', icon='el-icon-delete')


    el-dialog.dialogQues(title='Chi Tiết', 
              :visible.sync='showDialogFlg', 
              :modal-append-to-body='false', 
              :close-on-click-modal='false')
        h5 Nội Dung Câu Hỏi :
        el-form(:model='formData', :rules="rules", ref="ruleForm") 
          el-form-item(prop="content")
            el-input(placeholder="Câu Hỏi ?" , v-model='formData.content')
          el-form-item()
            el-input(placeholder="header" , v-model='formData.header')
          el-row
            el-col(:span='6')
              el-switch.itemSwitch(v-model='formData.first_question', active-color='#13ce66', inactive-color='#e5e5e5', active-text="Câu Đầu Tiên")
            el-col(:span='6')
              el-switch.itemSwitch(v-model='formData.last_question', active-color='#13ce66', inactive-color='#e5e5e5', active-text="Câu Hỏi Cuối")
            el-col(:span='6')
              el-switch.itemSwitch(v-model='formData.has_extra_data', active-color='#13ce66', inactive-color='#e5e5e5', active-text="Cho Phép Nhập")
            el-col(:span='6')
              el-switch.itemSwitch(v-model='formData.sum', active-color='#13ce66', inactive-color='#e5e5e5', active-text="Tính Tổng")
          el-row(style='margin: 5px 0 0 0')
            el-switch.itemSwitch(v-model='formData.selected_allow', active-color='#13ce66', inactive-color='#e5e5e5', active-text="Chp Phép Chọn")
          
            div(v-if='formData.selected_allow', style="margin-left: 10px;float: left;")
              el-radio-group(v-model='formData.multi', size='small')
                el-radio-button(:label='false') Chọn Một
                el-radio-button(:label='true') Chọn Nhiều

        hr  
        h5( style='margin-top: 20px;') Đáp Án :
          el-button(@click='addDetailsQuestion', type='info' , icon='el-icon-edit', size='small' , style='margin-left: 10px;') Thên Đáp Án
        el-row
        table.table.table-hover
          thead
            tr
              th Nội Dung Câu Trả Lời
              th Link Hình
              th Description
              th Xoá
          tbody(v-for='(item, index) in formData.details')
              th
                el-input(v-model='item.content')
              th
                //upload-thumbnail(:commingLink='item.thumbnail',:commingIndex='index', @childChangeValue='updateParentThumbnail' )
                el-input(v-model='item.thumbnail')
              th
                el-input(v-model='item.description')
                
                //el-select(v-model='item.next_question', clearable='', filterable='', placeholder='Chọn ...')
                //  el-option(v-for='qstItem in lstdata', :key='qstItem.id', :label='qstItem.content', :value='qstItem.id')
              th
                el-tooltip.item(effect='dark', content='Delete', placement='right-start')
                    el-button(type='danger', @click='removeDetailContent(index)', icon='el-icon-delete')
        hr
        h5( style='margin-top: 20px;') Câu Hỏi Liên Quan :
          el-form(:model='formReference', style='margin: 5px 0 0 0') 
            el-row(:gutter='20')
              el-col(:span='7')
                el-form-item(label='Step')
                  el-select(v-model='formReference.stepValue', clearable='', filterable='', placeholder='Bước ...', @change='changeRefStep')
                    el-option(v-for='stepItem in lstSteps', :key='stepItem.value', :label='stepItem.label', :value='stepItem.value')
              el-col(:span='7')
                el-form-item(label='Câu Hỏi')
                  el-select(v-model='formReference.questionId', clearable='', filterable='', placeholder='Câu Hỏi ...', @change='changeRefQues')
                    el-option(v-for='questionItem in lstQuesions', :key='questionItem.id', :label='questionItem.content', :value='questionItem.id')
              el-col(:span='7')
                el-form-item(label='Đáp Án')
                  el-select(v-model='formReference.optionId', clearable='', filterable='', placeholder='Câu Trả Lời ...')
                    el-option(v-for='optionItem in lstOptions', :key='optionItem.id', :label='optionItem.content', :value='optionItem.id')
              el-col(:span='3')
                el-tooltip.item(effect='dark', content='Delete', placement='right-start', :span='6')
                  el-button(type='success', @click='addRef', icon='el-icon-circle-plus-outline')

            el-row(:gutter='20', v-for='(refWebItem, index) in formData.ref_web' ,:key='refWebItem')
              el-col(:span='2')
                el-button.closeButton(type='success', @click='removeReference(index)', icon='el-icon-close')
              el-col(:span='20')
                p.referLable {{refWebItem}}
            el-row(:gutter='20', v-for='(refItem, index) in formData.ref' ,:key='refItem')
              el-col(:span='2')
                el-button.closeButton(type='success', @click='removeReference(index)', icon='el-icon-close')
              el-col(:span='20')
                p.referLable {{refItem}}
              


        el-row
        span.dialog-footer(slot='footer')
          el-button(@click='metHandlerCancel') Đóng
          el-button(type='primary', @click='handleSave') Lưu
</template>

<script>
import  toastr  from 'toastr'
import  _  from 'lodash'

let lstSteps = [
  {label : 'Step 1', value: 'step1', id: 0},
  {label : 'Step 2', value: 'step2', id: 1},
  {label : 'Step 3', value: 'step3', id: 2},
  {label : 'Step 4', value: 'step4', id: 3},
  {label : 'Step 5', value: 'step5', id: 4},
  {label : 'Step 6', value: 'step6', id: 5},
]
export default {

  firebase() {
    return {
      lstdata: this.$db.ref('questions'),
      //images: this.$storage.ref('images')
    };
  },

  data() {
    return {
      lstDataDisplay:[],
      lstDataBinding : [],
      
      active: 0,
      rules: {
        content: [
          {
            required: true,
            message: 'input name',
            trigger: 'blur'
          }
        ]
      },

      isNew : false,
      //Popup Add question
      showDialogFlg : false,
      formData : {
        id : '',
        content : '',
        header : '',
        has_extra_data : false,
        first_question : false,
        last_question : false,
        selected_allow : false,
        multi : false, 
        sum : false, 
        ref : [],
        ref_web : [],
        details: [{
            id:'', 
            content:'', 
            description:'', 
            thumbnail : '', //K có remove
            extra_data: '', //K có remove
            selected: false, //K có remove 
          }],
      },

      dataGlobal : {
        'step1' :  [],
        'step2' :  [],
        'step3' :  [],
        'step4' :  [],
        'step5' :  [],
        'step6' :  []
      },

      lstSteps : lstSteps,
      lstQuesions : [],
      lstOptions : [],
      formReference : {
        stepValue : '',
        questionId : '',
        optionId : ''
      }

    };
  },

  methods: {

    next() {
        if (this.active++ > 4) 
          this.active = 0;
    },

    previous() {
        if (this.active-- < 1) this.active = 5;
    },

    onTextSearchEnter(event) {
      event.preventDefault();
      this.updateDisplayList();
    },

    metHandlerSearch(){
      this.updateDisplayList();
    },

    removeReference(index){
      if(this.formData.ref_web) 
        this.formData.ref_web.splice(index,1) 

      if(this.formData.ref) 
        this.formData.ref.splice(index,1) 
    },

    metHandlerAddNew() {
      this.formData = {
        id : Math.random().toString(36).substring(2, 10).toUpperCase(),
        content : '',
        header : '',
        has_extra_data : false,
        first_question : false,
        last_question : false,
        selected_allow : false,
        multi : false, 
        sum : false, 
        ref : [],
        ref_web : [],
        details: [{
          id:  Math.random().toString(36).substring(2, 10).toUpperCase(), 
          content:'', 
          thumbnail : '', 
          extra_data: '', 
          selected: false 
          }],
      },

      this.formReference = {
        stepValue : '',
        questionId : '',
        optionId : ''
      }

      this.isNew = true;
      this.showDialogFlg = true;
    },


    handleEdit(index, row) {
      this.formData = {
        ...row
      } 

      if(!this.formData.ref_web)
        this.formData.ref_web = [];
      if(!this.formData.ref)
        this.formData.ref = [];
      if(!this.formData.header)
        this.formData.header = '';
      this.formData.indexEdit = index;
      
      this.formReference = {
        stepValue : '',
        questionId : '',
        optionId : ''
      }

      this.isNew = false;
      this.showDialogFlg = true;
    },

    handleDelete(index, row) {
      this.$confirm('Bạn có thật sự muốn xoá ?','Thông Báo', {
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancel',
          type: 'warning'
      }).then(() => {
        let _key = 'step'+ (this.active + 1);
        //console.log(this.dataGlobal[_key][index]);
        //console.log(row);
        this.dataGlobal[_key].splice(index,1)
        let ref = this.$db.ref('/steps');
        ref.set(this.dataGlobal).then((data)=> {
          this.showNotice('Thông Báo','Xoá Thành Công','success') 
          this.showDialogFlg = false;
        }, (error)=>{
          this.showNotice('Lỗi',error,'Error')
        });
        
      }).catch(() => {});
    },

    handlerCopy(index, row) {
      this.formData = {
        ...row
      } 
      
      this.formReference = {
        stepValue : '',
        questionId : '',
        optionId : ''
      };

      this.isNew = true;
      this.showDialogFlg = true;
    },

    handleSave() {

      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          
          //Hanlder data before save
          //thumbnail : '', //K có remove
          //extra_data: '', //K có remove
          //selected: '', //K có remove
          this.formData.details.forEach(element => {
            if(!this.formData.has_extra_data)
              delete element.extra_data;
            else
              element.extra_data = '';

            if(_.has(element,'thumbnail'))
              if(!element.thumbnail)
                delete element.thumbnail;

            if(!this.formData.selected_allow)
              delete element.selected;
            else
              element.selected = false;
          });
            

          let _key = 'step'+ (this.active + 1);
          if(this.isNew)
          {
            
            if(!this.dataGlobal[_key]){
              this.dataGlobal[_key] = [];
            }
            this.dataGlobal[_key].push(this.formData);
          }else{
            let indexEdit = this.formData.indexEdit;
            delete this.formData.indexEdit;
            this.dataGlobal[_key][indexEdit] = this.formData;
          }

          let ref = this.$db.ref('/steps');
          ref.set(this.dataGlobal).then((data)=> {
            this.showNotice('Thông Báo','Lưu Thành Công','success') 
            this.showDialogFlg = false;
            this.refreshGloableData();
          }, (error)=>{
            this.showNotice('Lỗi',error,'Error')
          });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
      this.refreshGloableData();
    },

    addDetailsQuestion(){
      this.formData.details.push({
        id: Math.random().toString(36).substring(2, 10).toUpperCase(), 
        content:'', 
        thumbnail : '', 
        extra_data: '', 
        selected: false
      });
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
    },
    
    changeRefStep() {
      this.lstQuesions = this.dataGlobal[this.formReference.stepValue];
    },

    changeRefQues() {
      let length = this.lstQuesions.length;
      for(let i = 0;i < length;i++){
        if(this.formReference.questionId === this.lstQuesions[i].id)
        {
          this.lstOptions = this.lstQuesions[i].details;
          break;
        }
      }
    },

    addRef() {
      let stepNm = '';
      let questionContent = '';
      let optionContent = '';

      let stepsLength = this.lstSteps.length;
      for(let k = 0;k < stepsLength;k++){
        if(this.lstSteps[k].value === this.formReference.stepValue){
          stepNm = this.lstSteps[k].label;
          break;
        }
      }
      
      let length = this.lstQuesions.length;
      for(let i = 0;i < length;i++){
        if(this.formReference.questionId === this.lstQuesions[i].id)
        {
          questionContent = this.lstQuesions[i].content;
          let optionLength = this.lstQuesions[i].details.length;
          for(let j = 0;j < optionLength;j++){
            if(this.formReference.optionId === this.lstQuesions[i].details[j].id){
              optionContent = this.lstQuesions[i].details[j].content
              break;
            }
          }
          break;
        }
      }

      let ref_web = `${stepNm} > ${questionContent} > ${optionContent}`;

      if(!this.formData.ref_web)
        this.formData.ref_web = [];
      if(!this.formData.ref)
        this.formData.ref = [];

      this.formData.ref_web.push(ref_web);
      this.formData.ref.push(this.formReference.optionId);
    },

    refreshGloableData(){
      this.$db.ref('questions').on('value', (snap) => {
          let items = [];
          let i = 1;
          snap.forEach((child) => {
            this.dataGlobal['step'+i] = child.val();
            i++;
          });

          //console.log('Câu Hỏi >> Finished Get Data from DB')
        });
    }
  },

  created() {    
    this.refreshGloableData();  
  }
};
</script>

<style scope>


.dialogQues > .el-dialog {
  width: 80% !important;
}

.itemSwitch {
  float: left;
  margin-top: 6px;
}

.referLable {
  padding-top: 10px;
}

</style>
