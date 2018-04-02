<template lang='pug'>
div(v-loading.fullscreen.lock='loading')
  el-card.box-card
    .clearfix(slot='header', :style='{ background: headerColor }')
      el-container
        el-aside(width='200px') 
          span {{title}}
        el-main.custom
          el-select(v-model='searchUserCode', clearable='', filterable='', placeholder='Mã Nhân Viên' , @change='metChangeUserCode')
            el-option(v-for='item in listUserCodes', :key='item._id', :label='item.username', :value='item.username')
          el-select(v-model='searchUserPhone', clearable='', filterable='', placeholder='SĐT Nhân Viên' , @change='metChangeUserPhone')
            el-option(v-for='item in listUserPhones', :key='item._id', :label='item.phone', :value='item.phone')

          el-select(v-model='searchProvince', clearable='', filterable='', placeholder='Tỉnh/TP Khảo Sát' , @change='metChangeProvinceSearch')
            el-option(v-for='item in lstProvince', :key='item.name_with_type', :label='item.name_with_type', :value='item.name_with_type')
          el-select(v-model='searchDistrict', clearable='', filterable='', placeholder='Huyện Khảo Sát' ,@change='metChangeDistrict')
            el-option(v-for='item in lstDistrict', :key='item.name_with_type', :label='item.name_with_type', :value='item.name_with_type')

          //el-input(placeholder='Mã, Tên, Số ĐT Cửa Hàng', v-model='searchText', @keyup.enter.native='onTextSearchEnter($event)', style='width:200px')
          el-date-picker(v-model='pickedDates', 
                      type='daterange', 
                      clearable=false,
                      start-placeholder='Start date', 
                      end-placeholder='End date',
                      @change='dateRangeChangeEvent')

          

    //- line-chart(:ref='chartId',
    //-           :chart-id='chartId',
    //-           :chart-data='chartData',
    //-           :options='chartOpts',
    //-           :height='400')
</template>

<script>
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';
import { apiUrl } from '../../../config';
import  { PROVINCE, DISTRICT }  from '../../../libs/index'

// import LineChart from '../../../components/linechart';

const DATE_FORMAT = 'YYYY-MM-DD';
const DEFAULT_OPTIONS = {
  responsive: true,
  tooltips: {
    mode: 'index',
    intersect: false
  },
  hover: {
    mode: 'nearest',
    intersect: true
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Ngày'
        },
        gridLines: {
          display: true,
          borderDash: [2, 2],
          tickMarkLength: 1
        }
      }
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Số Lượng Khảo Sát'
        },
        gridLines: {
          display: true,
          borderDash: [2, 2],
          tickMarkLength: 1
        },

        ticks: {
          //stepSize: 1,
          min: 0
        }
      }
    ]
  },
  maintainAspectRatio: false
};

export default {
  props: {
    chartId: String,
    title: String,
    uri: String,
    headerColor: {
      type: String,
      default: 'blue'
    },
    icon: {
      type: String,
      default: 'timeline'
    },
    legend: {
      type: Boolean,
      default: true
    },
    type: String, // {D|P|S|I|C}
    options: Object,
    listData: Array,

    listUserCodes: Array,
    listUserPhones: Array,
  },

  components: {
    //LineChart
  },

  data() {
    return {
      loading : false,
      chartDataFromUri: {},
      pickedDates: [
        moment()
          .add(-30, 'days')
          .format(DATE_FORMAT),
        moment().format(DATE_FORMAT)
      ],

      searchText : '',
      searchProvince : '',
      searchDistrict : '',
      searchUserCode : '',
      searchUserPhone : '',
      lstProvince : [],
      lstDistrict : [],
      lstDistrictFull : [],
    };
  },

  computed: {
    from() {
      return moment(this.pickedDates[0]);
    },

    fromDt() {
      return moment(this.pickedDates[0]).format(DATE_FORMAT);
    },

    to() {
      return moment(this.pickedDates[1]);
    },

    toDt() {
      return moment(this.pickedDates[1]).format(DATE_FORMAT);
    },

    dates() {
      let dates = [];
      let diff = this.to.diff(this.from, 'days');
      dates.push(`${this.from.format(DATE_FORMAT)}`);
      for (let i = 1; i <= diff; i++) {
        let nextDay = moment(this.from).add(i, 'days');
        dates.push(`${nextDay.format(DATE_FORMAT)}`);
      }
      return dates;
    },

    chartOpts() {
      return _.assignIn(DEFAULT_OPTIONS, this.options);
    },

    chartData() {
      const { series, labels } = this.chartDataFromUri;
      if (!series) return {};
      const datasets = series.map(s => ({
        label: s.name,
        fill: false,
        backgroundColor: s.color,
        borderColor: s.color,
        data: s.data
      }));
      return {
        labels,
        datasets
      };
    }
  },

  methods: {

    onTextSearchEnter(event) {
      event.preventDefault();
       this.getChartData();
    },

    metHandlerSearch(){
      this.getChartData();
    },

    metChangeProvinceSearch(){
      let provinceObj = _.find(this.lstProvince, (o)=>{
         return o.name_with_type === this.searchProvince
      });
      this.searchDistrict = '';

      this.getChartData();

      if(provinceObj){
        this.lstDistrict = this.lstDistrictFull.filter((item)=>{
          return (provinceObj.code === item.parent_code);
        })
      }else{
        return [];
      }
      
    },

    metChangeDistrict() {
      this.getChartData();
    },

    metChangeUserCode() {
      this.getChartData();
    },

    metChangeUserPhone() {
      this.getChartData();
    },

    getChartData(){
      this.loading = true;

      

      axios.request(`${apiUrl}/linechart`, {
        method: 'get',
        params : {
          username : this.searchUserCode,
          phone : this.searchUserPhone,
          province : this.searchProvince,
          district : this.searchDistrict,
          startDt : this.pickedDates[0] ? moment(this.pickedDates[0]).format(DATE_FORMAT) : '',
          endDt : this.pickedDates[1] ? moment(this.pickedDates[1]).format(DATE_FORMAT) : '',
        }
      }).then((response) => {
        let completed = [];
        let uncomplete = [];

        if (response.data)
        {
          //==============================
          
          this.dates.forEach(item=> {
            let coutCompleted = 0;
            let countUncompleted = 0;
            response.data.companies.forEach(o => {
              if(moment(o.date).format(DATE_FORMAT) === item && o.completed)
                coutCompleted++;
              else if(moment(o.date).format(DATE_FORMAT) === item && !o.completed)
                countUncompleted++;
            })
            completed.push(coutCompleted)
            uncomplete.push(countUncompleted);

          });
          //==============================
          
        }

        this.loading = false;


        this.chartDataFromUri = {
          labels: this.dates.map((d) => {
            return `'${moment(d, 'YYYY-MM-DD').format('DD')}`
          }),
          series: [{
            name : 'Khảo Sát Hoàn Thành',
            color : '#eacf7d',
            data : completed
          },{
            name : 'Khảo Sát Chưa Hoàn Thành',
            color : '#283646',
            data : uncomplete
          }]
        };
          
      }).catch((error) => {
        console.error('REST request error!', error);
         this.loading = false;
      });

    },

    dateRangeChangeEvent() {
      this.getChartData();
      this.$emit('dateRangeChange', {
        from: this.from,
        to: this.to,
        fromDt: this.fromDt,
        toDt: this.toDt,
        dates: this.dates
      });
    }
  },

  created() {
    this.getChartData();
    this.lstProvince = _.values(PROVINCE);
    this.lstDistrictFull = _.values(DISTRICT);
  },

  watch: { 
    listData: {
      handler: function(val, oldVal) {
        this.getChartData();
      }
    }
      
  }
};
</script>

<style lang='scss' scoped>
.custom{
  padding: 0px !important;
}

.el-select, .el-input, .el-date-editor{
      margin-right: 5px
}

.el-date-editor{
      width: 260px !important;
}

.box-card {
  /deep/ .el-range__close-icon {
    display: none;
  }
  
  /deep/ .el-card__header {
    padding: 0;
  }

  span {
    position: relative;
    top: 8px;
    padding-left: 10px;
    color: white;
    font-size: 16px;
    opacity: 0.7;
  }

  .clearfix {
    padding: 10px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
}
</style>
