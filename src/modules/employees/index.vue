<template lang='pug'>
div(v-loading.fullscreen.lock='loading')
  b-card
    el-form.demo-form-inline(:models='formSearchData', inline=true,  @submit.native.prevent="onTextSearchEnter")
      el-form-item
        el-input(placeholder='Mã, Tên, Số ĐT ...', v-model='formSearchData.txtSearch', @keyup.enter.native='onTextSearchEnter($event)')
      el-form-item(label='Tỉnh/TP')
        el-select(v-model='formSearchData.province', clearable='', filterable='', placeholder='Chọn ...' , @change='metChangeProvinceSearch')
          el-option(v-for='item in lstProvince', :key='item.name_with_type', :label='item.name_with_type', :value='item.name_with_type')
      el-form-item(label='Huyện')
          el-select(v-model='formSearchData.district', clearable='', filterable='', placeholder='Chọn ...' , @change='metChangeDistrictSearch')
            el-option(v-for='item in lstDistrict', :key='item.name_with_type', :label='item.name_with_type', :value='item.name_with_type')
      el-form-item(label='Ngày Đăng Ký')
        el-date-picker(v-model='formSearchData.rangeValue', type='daterange',start-placeholder='Start Date', 
        end-placeholder='End Date',
        format="yyyy-MM-dd", 
        value-format="yyyy-MM-dd",
        @change='dateRangeChangeEvent')    
      el-form-item
        el-button(type='primary', icon='search', @click='metHandlerSearch') Tìm Kiếm
      el-form-item
        el-button(type='success', icon='plus', @click='metHandlerAddNew') Thêm Mới
    br
    el-row
      el-table(ref='singleTable', :data='lstDataDisplay', border='', style='width: 100%',  :default-sort = "{prop: 'createdAt', order: 'ascending'}")
        el-table-column(type='index', width='50')
        el-table-column(property='username', label='Mã NV', width='200', :sortable="true")
        el-table-column(property='name', label='Họ & Tên NV', width='200', :sortable="true")
        el-table-column(property='phone', label='SĐT NV', width='200', :sortable="true")
        el-table-column(property='password', label='Password', width='150', :sortable="true")
        el-table-column(property='createdAt', label='Ngày Đăng Ký', width='200', :sortable="true", :sort-method="sortDate")
          template(slot-scope='scope') {{labelFunction_date(scope.row.createdAt)}}
        el-table-column(property='district', label='Khu Vực Quản Lý (Huyện)', width='400')
          template(slot-scope='props')
            | {{props.row.district}}
        el-table-column(property='district', label='Khu Vực Quản Lý (Tỉnh/TP)', width='400')
          template(slot-scope='props')
            | {{props.row.province}}
        el-table-column(label='action', width='150')
          template(slot-scope='scope')
            el-tooltip.item(effect='dark', content='Edit', placement='left-start')
              el-button(size='small', @click='handleEdit(scope.$index, scope.row)', icon='el-icon-edit')
            el-tooltip.item(effect='dark', content='Delete', placement='right-start')
              el-button(size='small', type='danger', @click='handleDelete(scope.$index, scope.row)', icon='el-icon-delete')
    el-row
      el-pagination(@size-change='handleSizeChange',
                    @current-change='handleCurrentChange', 
                    :current-page.sync='currentPage', 
                    :page-sizes='pageSizes', 
                    :page-size='pageSize', 
                    layout='total, sizes, prev, pager, next, jumper',
                    :total='total')
    br

    el-dialog(title='Details', :visible.sync='showDialogFlg', :modal-append-to-body='false', :close-on-click-modal='false')
      el-form(:model='formData', label-width='150px', :rules="rules",ref="ruleForm")
        el-form-item(label='Mã NV',prop="username")
          el-input( v-model='formData.username')
        el-form-item(label='Tên',prop="name")
          el-input( v-model='formData.name')
        el-form-item(label='Ngày Sinh', prop="birthday")  
          el-date-picker(v-model='formData.birthday', type='date', placeholder='Pick a day', format='dd/MM/yyyy', value-format="dd/MM/yyyy")
        el-form-item(label='SDT', prop="phone")  
          el-input( v-model='formData.phone')
        el-form-item(label='Chức Vụ', prop="phone")  
          el-input( v-model='formData.position')
        el-form-item(label='Bộ Phận', prop="phone")  
          el-input( v-model='formData.department')

        el-form-item(label='Tỉnh/TP', prop="province")  
            el-select(v-model='formData.province', clearable='', filterable='', placeholder='Chọn ...' , @change='metChangeProvince')
              el-option(v-for='item in lstProvince', :key='item.name_with_type', :label='item.name_with_type', :value='item.name_with_type')
        el-form-item(label='Huyện', prop="district")  
            el-select(v-model='formData.district', clearable='', filterable='', placeholder='Chọn ...' ,)
              el-option(v-for='item in lstDistrict', :key='item.name_with_type', :label='item.name_with_type', :value='item.name_with_type')
        el-form-item(label='Password',prop="password")
          el-input( v-model='formData.password',type="text", :disabled='!isNew')
      span.dialog-footer(slot='footer')
        el-button(@click='metHandlerCancel') Đóng
        el-button(type='primary', @click='handleSave') Lưu

</template>

<script>
import  toastr  from 'toastr'
import  _  from 'lodash'
import  { PROVINCE, DISTRICT }  from '../../libs/index'
import firebase from 'firebase';
import moment from 'moment';
import axios from 'axios';
import { apiUrl } from '../../config';
let roles = [
  {roleNm : 'Adminstrator', roleId : 'admin'},
  {roleNm : 'Application', roleId : 'app'},
  {roleNm : 'Map', roleId : 'map'},
  ]

export default {

  firebase() {
    return {
      listEmployees: this.$db.ref('users')
    };
  },

  computed: {

    query() {
      return {
        size: this.pageSize,
        skip: this.pageSize * (this.currentPage - 1)
      };
    }
  },

  data() {
     const validatePassword = (rule, value, callback) => {
       if(!this.isNew)
        callback();
      if (value === '') {
        callback(new Error('Vui Lòng Nhập Password'));
      } else if (value.trim().length < 6) {
        callback(new Error('Password ít nhất 6 ký tự'));
      } else {
        callback();
      }
     }

    return {
      loading : false,
      lstDataDisplay : [],
      lstDataBinding : [],
      showDialogFlg : false,
      formSearchData: {
        txtSearch: '', 
        province : '',
        district : '',
        rangeValue: [],// [new Date(), new Date()],
      },

      lstProvince : [],
      lstDistrict : [],
      lstDistrictFull : [],
      suffix : '@masan.com',
      formData: {
        birthday: '',
        district : '',
        name: '',
        phone : '',
        province : '',

        position: '',
        department: '',

        password: '',
        uname : '',
        username : '',
        uid : '',

        createdAt : null,
        updatedAt : null,
      },

      isNew : false,

      rules: {
        username: [
          {
            required: true,
            message: 'Vui lòng nhập Mã NV',
            trigger: 'blur'
          }
        ], name: [
          {
            required: true,
            message: 'Vui lòng nhập Tên',
            trigger: 'blur'
          }
        ], birthday: [
          {
            required: true,
            message: 'Vui lòng Ngày Sinh',
            trigger: 'blur'
          }
        ], position: [
          {
            required: true,
            message: 'Vui lòng Chức Vụ',
            trigger: 'blur'
          }
        ], department: [
          {
            required: true,
            message: 'Vui lòng Bộ Phận',
            trigger: 'blur'
          }
        ],province: [
          {
            required: true,
            message: 'Vui chọn Tỉnh/TP',
            trigger: 'blur'
          }
        ],district: [
          {
            required: true,
            message: 'Vui lòng Huyện',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: 'Vui lòng nhập SĐT',
            trigger: 'blur'
          }
        ],
       password: [
          {
            validator: validatePassword,
            required: true,
            trigger: 'blur'
          }
        ],
      },
      currentPage: 1,
      pageSize: 20,
      pageSizes: [20, 50, 100],
      total : 0,
    };
  },

  methods: {

    handleSizeChange(val) {
      this.pageSize = val;
      // if(this.groupSelected){
      //     this.getContacts(this.query);
      // } else {
      //   this.$alert(this._('pChooseGroup'), 'Notice');
      // }
      this.getDataFromAPI();
    },
    
    handleCurrentChange(val) {
      this.currentPage =  val;
      this.getDataFromAPI();
      // if(this.groupSelected){
      //     this.getContacts(this.query);
      // } else {
      //   this.$alert(this._('pChooseGroup'), 'Notice');
      // }
    },

    sortDate(a,b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    },

    labelFunction_date(date) {
        if(date)
            return moment(date).format('DD/MM/YYYY HH:mm');
        else   
            return '';
    },

    onTextSearchEnter(event) {
      event.preventDefault();
      this.getDataFromAPI();
    },

    metHandlerSearch(){
      this.getDataFromAPI();
    },

    dateRangeChangeEvent(){
      this.getDataFromAPI();
    },

    updateDisplayList(){
      this.lstDataDisplay = [...this.lstDataBinding];

      this.lstDataDisplay = this.lstDataBinding.filter((item) => {    
          // if(!item.createdAt)
          //     return false
        //Privince
          if(this.formSearchData.province)
          {
            if(!item.province)
              return false
            if(item.province != this.formSearchData.province)
              return false;
          }
            
          //District
          if(this.formSearchData.district)
          {
            if(!item.district)
              return false
            if(item.district != this.formSearchData.district)
              return false;
          }

          //Address
          if(this.formSearchData.txtSearch)
          {
            let textSearch = this.formSearchData.txtSearch;
            let itemName = item.name ? item.name :'';
            let itemUsername = item.username ? item.username :'';
            let itemPhone = item.phone ? item.phone :'';
            if(itemName.toLowerCase().indexOf(textSearch.toLowerCase()) > -1 
            || itemUsername.toLowerCase().indexOf(textSearch.toLowerCase()) > -1 
            || itemPhone.toLowerCase().indexOf(textSearch.toLowerCase()) > -1)
              return true;
            else
              return false;
          }

          if(this.formSearchData.rangeValue && this.formSearchData.rangeValue[0])
          {
            if(!item.createdAt)
              return false;
            if(moment(item.createdAt).format('YYYYMMDD') < this.formSearchData.rangeValue[0]) //Start date
              return false;
            if(moment(item.createdAt).format('YYYYMMDD') > this.formSearchData.rangeValue[1]) //Start date
              return false;
          }

          return true;
      });

    },

    handleEdit(index, row) {
      this.formData = {
        //emplCd: row.emplCd ? row.emplCd : '',
        
        birthday: row.birthday ? row.birthday : '',
        district : row.district ? row.district : '',
        name: row.name ? row.name : '',
        phone : row.phone ? row.phone : '',
        province : row.province ? row.province : '',

        position: row.position ? row.position : '',
        department: row.department ? row.department : '',
        password: row.password ? row.password : '',
        uname : row.uname ? row.uname : '',
        username : row.username ? row.username : '',
        uid : row.uid ? row.uid : ''
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
         let ref = this.$db.ref('users/' + row['_id']);
        
        ref.remove().then(
          (data) => {
            this.showNotice('Thông Báo','Xoá Thành Công','success') //Warning//Info//Error
            this.getDataFromAPI();
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

          if(this.isNew){
            this.loading = true;
            firebase.auth().createUserWithEmailAndPassword(this.formData.username + this.suffix, this.formData.password).then((res)=>{
              
              let ref = this.$db.ref('users/' + res.uid);
              ref.set({
                  //emplCd: this.formData.emplCd ? this.formData.emplCd : '',
                  name: this.formData.name ? this.formData.name : '',
                  birthday: this.formData.birthday ? this.formData.birthday : '',
                  province : this.formData.province ? this.formData.province : '',
                  district : this.formData.district ? this.formData.district : '',
                  phone : this.formData.phone ? this.formData.phone : '',
                  position: this.formData.position ? this.formData.position : '',
                  department: this.formData.department ? this.formData.department : '',
                  password: this.formData.password ? this.formData.password : '',
                  uname : this.formData.username ? this.formData.username + this.suffix : '',
                  username : this.formData.username ? this.formData.username : '',
                  uid : res.uid,
                  createdAt : (new Date()).toString()

              }).then((data)=> {
                this.showNotice('Thông Báo','Lưu Thành Công','success') 
                this.showDialogFlg = false;
                this.getDataFromAPI();
                this.loading = false;
                
              }, (error)=>{
                
                this.showNotice('Lỗi',error,'Error')
                this.loading = false;
                
              });
            },(error)=>{
                this.showNotice('Lỗi',error,'Error')
              })
                
          }else{
                this.loading = true;

                let dataUpdate = {
                                    //emplCd: this.formData.emplCd ? this.formData.emplCd : '',
                                    name: this.formData.name ? this.formData.name : '',
                                    birthday: this.formData.birthday ? this.formData.birthday : '',
                                    province : this.formData.province ? this.formData.province : '',
                                    district : this.formData.district ? this.formData.district : '',
                                    phone : this.formData.phone ? this.formData.phone : '',
                                    position: this.formData.position ? this.formData.position : '',
                                    department: this.formData.department ? this.formData.department : '',
                                    password: this.formData.password ? this.formData.password : '',
                                    uname : this.formData.username ? this.formData.username + this.suffix : '',
                                    username : this.formData.username ? this.formData.username : '',
                                    uid : this.formData.uid,
                                    updatedAt : (new Date()).toString()
                                }

                let updates = {};
                updates['users/' + this.formData.uid] = dataUpdate;
                this.$db.ref().update(updates).then(
                (data) => {
                  this.showNotice('Thông Báo','Cập Nhập Thành Công','success') //Warning//Info//Error
                  this.showDialogFlg = false;
                  this.getDataFromAPI();
                  this.loading = false;
                  
                },
                (error)=> {
                  this.showNotice('Lỗi',error,'Error') //Warning//Info//Error
                  this.loading = false;
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
        birthday: '',
        district : '',
        name: '',
        phone : '',
        province : '',
        position: '',
        department: '',
        password: '',
        uname : '',
        username : '',
        uid : ''
      } 
      this.isNew = true;
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

    metChangeProvince(){
      let provinceObj = _.find(this.lstProvince, (o)=>{
         return o.name_with_type === this.formData.province
      });
      this.formData.district = '';
      if(provinceObj){
        this.lstDistrict = this.lstDistrictFull.filter((item)=>{
          return (provinceObj.code === item.parent_code);
        })
      }else{
        return [];
      }

    },

    metChangeProvinceSearch() {
      this.getDataFromAPI();

      let provinceObj = _.find(this.lstProvince, (o)=>{
         return o.name_with_type === this.formSearchData.province
      });
      this.formSearchData.district = '';
      
      if(provinceObj){
        this.lstDistrict = this.lstDistrictFull.filter((item)=>{
          return (provinceObj.code === item.parent_code);
        })
      }else{
        this.lstDistrict = [];
      }
    },

    metChangeDistrictSearch() {
      this.getDataFromAPI();
    },

    getDataFromAPI(){

      this.lstDataDisplay = [];

      axios.request(`${apiUrl}/users`, {
        method: 'get',
        params : {
          page : this.currentPage,
          size : this.pageSize,
          text : this.formSearchData.txtSearch,
          province : this.formSearchData.province,
          district : this.formSearchData.district,
          startDt : this.formSearchData.rangeValue ? this.formSearchData.rangeValue[0] : '',
          endDt : this.formSearchData.rangeValue ? this.formSearchData.rangeValue[1] : ''
        }
      }).then((response) => {
        if (response.data)
        {
          this.total = response.data.total;
          this.lstDataDisplay = response.data.users;
        }
          
      }).catch((error) => {
        console.error('REST request error!', error);
      });
    }
  },
 created() {    
  //  this.loading = true;
  //   this.$bindAsArray('lstDataBinding', this.$db.ref('users') , null, ()=>{
  //     console.log('Nhân Viên >> Finished Get Data from DB')
  //     this.updateDisplayList()
  //     this.loading = false;
  //     });
    this.lstProvince = _.values(PROVINCE);
    this.lstDistrictFull = _.values(DISTRICT);
    this.getDataFromAPI();
    
  }
};
</script>

<style lang='scss' scoped>
.el-date-editor{
      width: 260px !important;
}
</style>
