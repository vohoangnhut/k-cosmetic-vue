<template lang="pug">
div(v-loading.fullscreen.lock='loading')
  el-row
      el-row.my-statistic(:gutter="20")
        stats-counter.iconStype(title='Nhân Viên', :count='soLuongNhanVien', icon='fa fa-group', background-color='#27ae60')
        stats-counter(title='Câu Hỏi', :count='soLuongCauHoi', icon='fa fa-question-circle-o', background-color='#4a148c')
        stats-counter.iconStype(title='Khảo Sát Hoàn Thành', :count='khaoSatHoanThanh', icon='fa fa-star', background-color='#e67e22')
        stats-counter.iconStype(title='Khảo Sát Chưa Hoàn Thành', :count='khaoSaoChuaHoanThanh', icon='fa fa-star-half-o', background-color='#d35400')
      el-row
        stats-line-chart(chart-id="distributedDomains", 
                        title="Biểu Đồ Khảo Sát",
                        header-color="#95a5a6",
                        icon="globe",
                        :listData="listCombineUserCompany",
                        :listUserCodes="listUserCodes",
                        :listUserPhones="listUserPhones",
                        :legend='true')
</template>

<script>

import _ from 'lodash';
import StatsCounter from './widget/StatsCounter';
import axios from 'axios';
import StatsLineChart from './widget/StatsLineChart';


import { exportSurvey } from '../../libs/surveyExport';
import { apiUrl } from '../../config';

export default {

    data() {
      return {
        loading : false,
        khaoSatHoanThanh : 0,
        khaoSaoChuaHoanThanh : 0,
        soLuongNhanVien : 0,
        soLuongCauHoi : 0,

        listCompaniesBinding : [],
        listUsersBinding : [],
        listUserCodes : [],
        listUserPhones : [],
        listCombineUserCompany : [],
        chartDataAPI: '/api/dashboard/getChartData'
      }
    },
    components: {
      StatsCounter,
      StatsLineChart
    }, 
    
  methods: {

    initRequest(){

      this.loading = true;

      //count complete
      axios.request(`${apiUrl}/companies/count/1`, {
        method: 'get'
      }).then((response) => {
        this.khaoSatHoanThanh = 0;
        if (response.data)
          this.khaoSatHoanThanh = response.data.count;
      }).catch((error) => { 
          console.error('REST request error!', error);
      });

      //count incomlete
      axios.request(`${apiUrl}/companies/count/0`, {
        method: 'get'
      }).then((response) => {
        this.khaoSaoChuaHoanThanh = 0;
        if (response.data)
          this.khaoSaoChuaHoanThanh = response.data.count;
      }).catch((error) => {
        console.error('REST request error!', error);
      });


      //count users
      axios.request(`${apiUrl}/users/count`, {
        method: 'get'
      }).then((response) => {
        this.soLuongNhanVien = 0;
        if (response.data)
          this.soLuongNhanVien = response.data.count;
      }).catch((error) => {
        console.error('REST request error!', error);
      });

      //count question
      axios.request(`${apiUrl}/questions/count`, {
        method: 'get'
      }).then((response) => {
        this.soLuongCauHoi = 0;
        if (response.data)
          this.soLuongCauHoi = response.data.count;
      }).catch((error) => {
        console.error('REST request error!', error);
      });

      //count question
      axios.request(`${apiUrl}/users/lists`, {
        method: 'get'
      }).then((response) => {
        if (response.data){
          this.listUserCodes = _.uniqBy(response.data.userNames, '_id');
          this.listUserPhones = _.uniqBy(response.data.phones, '_id'); 

          this.loading = false;
        }
      }).catch((error) => {
        console.error('REST request error!', error);

        this.loading = false;
      });

      
      
    }

  },
 created() {    
   this.initRequest();
  }

}
</script>

<style>
.iconStype > .content > i {
  font-size: 100px !important;top: 10px !important;
}

.my-statistic {
  margin-bottom: 10px;
}
</style>
