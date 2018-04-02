<template lang='pug'>
div(v-loading.fullscreen.lock='loading')
  b-card
    el-form.demo-form-inline(:models='formSearchData', inline=true,  @submit.native.prevent="onTextSearchEnter", label-width="120px")
      el-form-item(label='Mã NV')
        el-select(v-model='formSearchData.userCode', clearable='', filterable='', placeholder='Mã Nhân Viên' , @change='metChangeUserCode')
          el-option(v-for='item in listUserCodes', :key='item._id', :label='item.username', :value='item.username')
      el-form-item(label='SDT Nhân Viên')
        el-select(v-model='formSearchData.userPhone', clearable='', filterable='', placeholder='SĐT Nhân Viên' , @change='metChangeUserPhone')
          el-option(v-for='item in listUserPhones', :key='item._id', :label='item.phone', :value='item.phone')
        
      el-form-item(label='Tình Trạng PV')
        el-select(v-model='formSearchData.status', clearable='', filterable='', placeholder='Chọn ...' ,@change='metChangeStatus')
          el-option(v-for='item in lstStatus', :key='item.key', :label='item.value', :value='item.key')
      el-row
      el-form-item(label='Tỉnh/TP PV')
        el-select(v-model='formSearchData.province', clearable='', filterable='', placeholder='Chọn ...' , @change='metChangeProvince')
          el-option(v-for='item in lstProvince', :key='item.name_with_type', :label='item.name_with_type', :value='item.name_with_type')
      el-form-item(label='Huyện PV')
          el-select(v-model='formSearchData.district', clearable='', filterable='', placeholder='Chọn ...' ,@change='metChangeDistrict')
            el-option(v-for='item in lstDistrict', :key='item.name_with_type', :label='item.name_with_type', :value='item.name_with_type')
      
      el-form-item(label='Thời gian PV')
        el-date-picker(v-model='formSearchData.rangeValue', type='daterange',start-placeholder='Start Date', 
        end-placeholder='End Date',
        format="yyyy-MM-dd", 
        value-format="yyyy-MM-dd",
        @change='dateRangeChangeEvent')
            
      el-form-item
        el-button(type='primary', icon='search', @click='metHandlerSearch') Tìm Kiếm
      el-row
        el-form-item
          el-button(type='success', icon='search', @click='metHandlerExport()') Export tất cả
        //- el-form-item
        //-   el-button(type='success', icon='search', @click='metHandlerExport(0)') Export Chưa Hoàn Thành
    br
    el-row
      el-table(ref='singleTable', :data='lstDataDisplay', border='', style='width: 100%', :default-sort = "{prop: 'username', order: 'ascending'}")
        el-table-column(type='index', width='50')
        el-table-column(property='username', label='Mã NV', width='200', :sortable="true")
        el-table-column(property='name', label='Tên NV', width='200', :sortable="true")
        el-table-column(property='phone', label='SĐT NV', width='200', :sortable="true")
        el-table-column(property='info', label='Tên Cửa Hàng', width='150')
          template(slot-scope='scope') {{labelFunction_info(scope.row.info, 'name')}}
        el-table-column(property='completed', label='Tình Trạng', width='170', :sortable="true")
          template(slot-scope='scope') {{labelFunction_status(scope.row.completed)}}
        el-table-column(property='date', label='Ngày Khảo Sát', width='170', :sortable="true")
          template(slot-scope='scope') {{labelFunction_date(scope.row.date)}}
        el-table-column(property='info', label='Địa Chỉ', width='600')
          template(slot-scope='scope') {{labelFunction_location(scope.row.location)}}
        el-table-column(property='info', label='Liên Hệ', width='170')
          template(slot-scope='scope') {{labelFunction_info(scope.row.info, 'phone')}}
        el-table-column(property='info', label='Chủ Cửa Hàng', width='170')
          template(slot-scope='scope') {{labelFunction_info(scope.row.info, 'owner')}}
    el-row
      el-pagination(@size-change='handleSizeChange',
                    @current-change='handleCurrentChange', 
                    :current-page.sync='currentPage', 
                    :page-sizes='pageSizes', 
                    :page-size='pageSize', 
                    layout='total, sizes, prev, pager, next, jumper',
                    :total='total')

</template>

<script>
import  toastr  from 'toastr';
import moment from 'moment';
import  _  from 'lodash';
import { exportSurvey } from '../../libs/surveyExport';
import  { PROVINCE, DISTRICT }  from '../../libs/index';
import axios from 'axios';
import { apiUrl, apiBaseUrl } from '../../config';
import { saveAs } from 'file-saver';
import { MessageBox } from 'element-ui';

export default {

  // firebase() {
  //   return {
  //     lstdata: this.$db.ref('companies'),
  //     listEmployees: this.$db.ref('users'),
  //   };
  // },

  data() {
    return {
      downloadUrl: '',
      loading: false,
      lstDataDisplay : [],
      lstDataBinding : [],
      lstStatus : [{key : 1, value: 'Hoàn Thành'}, {key : 2, value: 'Chưa Hoàn Thành'}],
      formSearchData: {
        txtSearch: '',
        status: 1,
        province : '',
        district : '',
        userCode : '',
        userPhone : '',
        rangeValue: [],// [new Date(), new Date()],
      },

      lstProvince : [],
      lstDistrict : [],
      lstDistrictFull : [],

      listUserCodes : [],
      listUserPhones : [],
      listCombineUserCompany : [],
      listUsersBinding : [],
       currentPage: 1,
      pageSize: 20,
      pageSizes: [20, 50, 100],
      total : 0,
    };
  },

  methods: {

      handleSizeChange(val) {
      this.pageSize = val;
      this.updateDisplayList();
    },
    
    handleCurrentChange(val) {
      this.currentPage =  val;
      this.updateDisplayList();
    
    },

    metHandlerExport(completeStatus){
      console.log(this.formSearchData)
      this.loading = true;
      axios.request(`${apiUrl}/export`, {
        method: 'get',
        params : {
          //page : this.currentPage,
          //size : this.pageSize,
          username : this.formSearchData.userCode,
          phone : this.formSearchData.userPhone,
          status : this.formSearchData.status == 1 ? 1 : 0,
          province : this.formSearchData.province,
          district : this.formSearchData.district,
          startDt : this.formSearchData.rangeValue ? this.formSearchData.rangeValue[0] : '',
          endDt : this.formSearchData.rangeValue ? this.formSearchData.rangeValue[1] : ''//,
          // completed : completeStatus
        }
      }).then((response) => {
        if (response.data)
        {
          // let data = response.data;
          // let link = `<a href='${apiBaseUrl}${data.complete}'>Tải File Hoàn Thành</a><br/>
          //             <a href='${apiBaseUrl}${data.incomplete}'>Tải File Chưa Hoàn Thành</a>`
          
          // MessageBox.alert(link, 'Export Thành Công', { 

          let data = response.data;
          MessageBox.alert(`<a href='${apiBaseUrl}${data.localDir}'>Download Here</a>`, 'Export Thành Công', {
            dangerouslyUseHTMLString: true,
            type: 'success',
            center: true
          }).then(() => {
            console.log('DONE')
          }).catch(() => {
            console.log('CANCEL')       
          });
        }
        this.loading = false;
          
      }).catch((error) => {
        this.loading = false;
        console.error('REST request error!', error);
      });


      //exportSurvey(this.lstDataDisplay);
    },


    metChangeUserCode() {
      this.updateDisplayList();
    },

    metChangeUserPhone() {
      this.updateDisplayList();
    },

    onTextSearchEnter(event) {
      event.preventDefault();
      this.updateDisplayList();
    },

    metHandlerSearch(){
      this.updateDisplayList();
    },

    metChangeStatus(){
      this.updateDisplayList();
    },

    dateRangeChangeEvent(){
      this.updateDisplayList();
    },

    updateDisplayList(){

       this.lstDataDisplay = [];
      this.loading = true;
      axios.request(`${apiUrl}/serveys`, {
        method: 'get',
        params : {
          page : this.currentPage,
          size : this.pageSize,
          username : this.formSearchData.userCode,
          phone : this.formSearchData.userPhone,
          status : this.formSearchData.status,
          province : this.formSearchData.province,
          district : this.formSearchData.district,
          startDt : this.formSearchData.rangeValue ? this.formSearchData.rangeValue[0] : '',
          endDt : this.formSearchData.rangeValue ? this.formSearchData.rangeValue[1] : ''
        }
      }).then((response) => {
        if (response.data)
        {
          this.total = response.data.total;
          this.lstDataDisplay = response.data.companies;
          this.loading = false;
        }
          
      }).catch((error) => {
        console.error('REST request error!', error);
          this.loading = false;
        
      });

      
      //count question
      axios.request(`${apiUrl}/users/lists`, {
        method: 'get'
      }).then((response) => {
        if (response.data){
          this.listUserCodes = _.uniqBy(response.data.userNames, '_id');
          this.listUserPhones = _.uniqBy(response.data.phones, '_id'); 
        }
      }).catch((error) => {
        console.error('REST request error!', error);
      });

      // this.lstDataDisplay = [...this.listCombineUserCompany];

      // this.lstDataDisplay = this.listCombineUserCompany.filter(item => {
        
      //    if(this.formSearchData.status)
      //   {
      //     if(this.formSearchData.status === 1)
      //       if(!item.completed)
      //         return false;
      //     if(this.formSearchData.status === 2)
      //       if(item.completed)
      //         return false;
      //   }

      //   //Status
      //   if(this.formSearchData.status)
      //   {
      //     if(this.formSearchData.status === 1)
      //       if(!item.completed)
      //         return false;
      //     if(this.formSearchData.status === 2)
      //       if(item.completed)
      //         return false;
      //   }

      //   //Privince
      //   if(this.formSearchData.province)
      //   {
      //     if(!item.info)
      //       return false;
      //     if(item.info.province != this.formSearchData.province)
      //       return false;
      //   }
          

      //   //District
      //   if(this.formSearchData.district){
      //     if(!item.info)
      //       return false;
      //     if(item.info.district != this.formSearchData.district)
      //       return false;
          
      //   }
      //   if(this.formSearchData.rangeValue && this.formSearchData.rangeValue[0])
      //   {
      //     if(!item.date)
      //       return false;
      //     if(moment(item.date).format('YYYYMMDD') < this.formSearchData.rangeValue[0]) //Start date
      //       return false;
      //     if(moment(item.date).format('YYYYMMDD') > this.formSearchData.rangeValue[1]) //Start date
      //       return false;
      //   }

      //   //SDT Nhan Vien
      //   if(this.formSearchData.userPhone)
      //   {
      //     if(!item.phone)
      //       return false
      //     if(item.phone != this.formSearchData.userPhone)
      //       return false;
      //   }

      //   //Ma Nhan Vien
      //   if(this.formSearchData.userCode)
      //   {
      //     if(!item.username)
      //       return false
      //     if(item.username != this.formSearchData.userCode)
      //       return false;
      //   }
        
      //   return true;
      // })
      
        
    },

    labelFunction_status(complete) {
        if(complete)
            return 'Hoàn Thành';
        else   
            return 'Chưa Hoàn Thành';
    },

    labelFunction_date(date) {
        if(date)
            return moment(date).format('L LT');
        else   
            return '';
    },


     
    labelFunction_info(info, prop) {
        if(!info)
            return '';
        else   
            return info[prop] ? info[prop] : '';
    },

    labelFunction_location(location) {
      if(!location)
            return '';
        else {
          if(!location.detail_address)
            return 'Chưa Cung Cấp';
          else{
            return location.detail_address.addr_no + ' ' + location.detail_address.street + ' ' + 
                    location.detail_address.subDistrict + ' ' + location.detail_address.district + ' ' + 
                    location.detail_address.city + ' ' + location.detail_address.country;  
          }
        }
    },

    showNotice(title, content, type) {
      this.$notify({
          title: title,
          message: content,
          type: type,
          duration: 1000
        });
    },


    metChangeProvince(){
      this.updateDisplayList();
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

    metChangeDistrict() {
      this.updateDisplayList();
    }
   
  },

  created() {    
    this.lstProvince = _.values(PROVINCE);
    this.lstDistrictFull = _.values(DISTRICT);

      this.updateDisplayList();
  }

};
</script>

<style lang='scss' scoped>
.el-date-editor{
      width: 260px !important;
}
</style>
