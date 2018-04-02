<template lang="pug">
div(v-loading.fullscreen.lock='loading')
  b-card
    el-container
      el-aside(width='200px')
        el-form.demo-form-inline(:models='formSearchData', inline=true,  @submit.native.prevent="onTextSearchEnter")

          //- el-form-item(label='Phường/ Xã')
          //-   el-select(v-model='formSearchData.ward', clearable='', filterable='', placeholder='Chọn ...' , @change='metChangeCondition')
          //-     el-option(v-for='item in lstWard', :key='item.id', :label='item.value', :value='item.value')

          //- el-form-item(label='Quận/ Huyện')
          //-   el-select(v-model='formSearchData.district', clearable='', filterable='', placeholder='Chọn ...' , @change='metChangeCondition')
          //-     el-option(v-for='item in lstDistrict', :key='item.id', :label='item.value', :value='item.value')

          //- el-form-item(label='Tỉnh/TP')
          //-   el-select(v-model='formSearchData.province', clearable='', filterable='', placeholder='Chọn ...' , @change='metChangeCondition')
          //-     el-option(v-for='item in lstProvince',  :key='item.id', :label='item.value', :value='item.value')
          
          el-form-item(label='Tỉnh/TP')
            el-select(v-model='formSearchData.province', clearable='', filterable='', placeholder='Chọn ...' , @change='metChangeProvinceSearch')
              el-option(v-for='item in lstProvince', :key='item.name_with_type', :label='item.name_with_type', :value='item.name_with_type')
          
          el-form-item(label='Huyện')
              el-select(v-model='formSearchData.district', clearable='', filterable='', placeholder='Chọn ...' , @change='metChangeDistrictSearch')
                el-option(v-for='item in lstDistrict', :key='item.name_with_type', :label='item.name_with_type', :value='item.name_with_type')
        
          el-form-item(label='Tên Đại lý/ Cửa hàng')
           el-select(v-model='formSearchData.name', clearable='', filterable='', placeholder='Chọn ...' , @change='metChangeCondition')
              el-option(v-for='item in lstName',  :key='item.id', :label='item.value', :value='item.value')

          el-form-item(label='SĐT Đại lý/ Cửa hàng')
           el-select(v-model='formSearchData.phone', clearable='', filterable='', placeholder='Chọn ...' , @change='metChangeCondition')
              el-option(v-for='item in lstPhone',  :key='item.id', :label='item.value', :value='item.value')

          el-form-item(label='Quy mô đại lý/ Cửa hàng')
            el-select(v-model='formSearchData.status', clearable='', filterable='', placeholder='Chọn ...' ,  @change='metChangeCondition')
                el-option(v-for='item in lstStatus', :key='item.key', :label='item.value', :value='item.key')
                
          el-form-item
            el-button(type='primary', icon='search', @click='metHandlerSearch') Tìm Kiếm

          el-form-item
            | Kết quả tìm kiếm : {{markersFound}}
      el-main
        gmap-map(:center='center', :zoom='13', style='height: 1000px', ref="map")
          gmap-info-window(:options='infoOptions', :position='infoWindowPos', :opened='infoWinOpen', @closeclick='infoWinOpen=false')
            el-container
              el-aside(width='160px')
                img(v-for='item in infoContent.photos', :src='item ? item.uri : ""', alt='', width='150px')
              el-main 
                  p Số nhà/Tên Đường : {{infoContent.info ? infoContent.info.addr_num + ' ' + infoContent.info.street : ''}}
                  p Phường/ Xã : {{infoContent.info ? infoContent.info.ward : ''}}
                  p Quận/ Huyện : {{infoContent.info ? infoContent.info.district : ''}}
                  p Tỉnh/TP : {{infoContent.info ? infoContent.info.province : ''}}
                  //p Quốc Gia : {{infoContent.location ? infoContent.location.detail_address.country : ''}}
                  hr
                  p Tên Đại Lý/ Trại : {{infoContent.info ? infoContent.info.name : ''}}
                  p SĐT Đại Lý/ Trại : {{infoContent.info ? infoContent.info.phoneOfName : ''}}
                  hr
                  p Tên NV Kháo Sát : {{infoContent.name ? infoContent.name : ''}}
                  p SĐT NV Kháo Sát : {{infoContent.phone ? infoContent.phone : ''}}
                  hr
                  p Tổng Doanh Số : {{infoContent.totalSales ? infoContent.totalSales : ''}}
                  p Các brand Đại Lý Có : 
                    li(v-for='item in infoContent.brandDaiLy')
                      | {{ item }}
                  p Các brand Trại Có : 
                    li(v-for='item in infoContent.brandTrai')
                      | {{ item }}
                  
                  p GPS : {{infoContent.location ? infoContent.location.latitude + ','+ infoContent.location.longitude : ''}}
                  
          gmap-marker(:key='index', v-for='(m, index) in markers', :position='m.position', :clickable='true', :draggable='false', @click="toggleInfoWindow(m,index)")
</template>

<script>
import _ from 'lodash';
import {loaded} from 'vue2-google-maps'
import { PROVINCE, DISTRICT, brands } from '../../libs/index';
import { getBrandsOfCompany, getTongDanhSo } from '../../libs/readCompany';

import { getInfo } from './getTextMap';

import axios from 'axios';
import { apiUrl } from '../../config';

export default {
  data() {
    return {
      loading: false,
      //Maps
      center: { lat: 10.80165426168215, lng: 106.64578231440399 },
      formSearchData: {
        ward: '',
        province: '',
        district: '',
        name: '',
        phone: '',
        status: null
      },

      lstProvince: [],
      lstDistrict: [],
      lstDistrictFull: [],
      lstWard: [],
      lstName: [],
      lstPhone: [],

      lstDataDisplay: [],
      lstDataBinding: [],
      lstStatus: [
        { key: 'small', value: 'Nhỏ' },
        { key: 'medium', value: 'Vừa' },
        { key: 'large', value: 'Lớn' }
      ],
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      markers: [],
      listUsersBinding: [],
      listCombineUserCompany: [],

      boundaries: null,
      markersFound : 0,
      fondMarkers : []
    };
  },

  methods: {
    onTextSearchEnter(event) {
      event.preventDefault();
      this.updateDisplayList();
    },

    metHandlerSearch() {
      this.updateDisplayList();
    },

    metChangeCondition() {
      this.updateDisplayList();
    },

    updateDisplayList() {
      axios
        .request(`${apiUrl}/filtermakers`, {
          method: 'get',
          params: {
            province: this.formSearchData.province,
            district: this.formSearchData.district,
            name: this.formSearchData.name,
            phone: this.formSearchData.phone,
            status: this.formSearchData.status
          }
        })
        .then(response => {
          if (response.data) {
            //this.markers = response.data.markers;
            this.markersFound = response.data.total
            //Move To center
            this.fondMarkers = response.data.markers;
            if(this.fondMarkers.length > 0){
              this.center = {
                lat: this.fondMarkers[0].position.lat,
                lng: this.fondMarkers[0].position.lng
              };
            }

            this.generateBounds();
            
          }
        })
        .catch(error => {
          console.error('REST request error!', error);
        });

   

      // this.markers = [];
      // this.countFilter = [];

      // //Forcus center
      // this.lstDataDisplay.forEach(item => {
      //   if (item.location) {
      //     this.center = {
      //       lat: item.location.latitude,
      //       lng: item.location.longitude
      //     };

      //     this.countFilter.push({
      //       position: {
      //         lat: item.location.latitude,
      //         lng: item.location.longitude
      //       },
      //       infoText: item
      //     });
      //   }
      // });

    },

    metChangeProvince() {
      let provinceObj = _.find(this.lstProvince, o => {
        return o.name_with_type === this.formData.province;
      });
      this.formData.district = '';
      if (provinceObj) {
        this.lstDistrict = this.lstDistrictFull.filter(item => {
          return provinceObj.code === item.parent_code;
        });
      } else {
        return [];
      }
    },

    metChangeProvinceSearch() {
      this.updateDisplayList();

      let provinceObj = _.find(this.lstProvince, o => {
        return o.name_with_type === this.formSearchData.province;
      });
      this.formSearchData.district = '';

      if (provinceObj) {
        this.lstDistrict = this.lstDistrictFull.filter(item => {
          return provinceObj.code === item.parent_code;
        });
      } else {
        this.lstDistrict = [];
      }
    },

    metChangeDistrictSearch() {
      this.updateDisplayList();
    },

    generateBounds() {
      const bounds = new window.google.maps.LatLngBounds()
      for (let m of this.fondMarkers) {
        bounds.extend(m.position)
      }
      //  this.$refs.map.$mapCreated.then(() => {
      //     let b = new window.google.maps.LatLngBounds()
      //     console.log(b.toString())
      // })

      this.$refs.map.$mapCreated.then((mapLoaded) => {
        mapLoaded.fitBounds(bounds);
      });
    },

    toggleInfoWindow(marker, idx) {
      axios
        .request(`${apiUrl}/companies/${marker.id}`, {
          method: 'get'
        })
        .then(response => {
          if (response.data) {
            this.infoWindowPos = marker.position;
            this.infoContent = getInfo(response.data);

            //check if its the same marker that was selected if yes toggle
            if (this.currentMidx == idx) {
              this.infoWinOpen = !this.infoWinOpen;
            } else {
              //if different marker set infowindow to open and reset current marker index
              this.infoWinOpen = true;
              this.currentMidx = idx;
            }
          }
        })
        .catch(error => {
          console.error('REST request error!', error);
        });
    }
  },

  mounted() {

     
  },

  watch: {

      // fondMarkers(markers) {
      //   loaded.then(() => {
      //       /* etc */
      //       if (markers.length > 2) {
      //         //Here is the problem
      //         const bounds = new google.maps.LatLngBounds();
      //         for (let m of markers) {
      //             bounds.extend(m.latLng);
      //         }
      //         this.$refs.map.$mapObject.fitBounds(bounds);
      //     }
      //   })
      // }
  },

  created() {
    // this.loading = true;

    this.lstProvince = _.values(PROVINCE);
    this.lstDistrictFull = _.values(DISTRICT);


    //Init
    this.loading = true;
    axios
      .request(`${apiUrl}/mapmakers`, {
        method: 'get'
      })
      .then(response => {
        if (response.data) {
          this.markers = response.data.markers;
          this.lstName = response.data.lstName;
          this.lstPhone = response.data.lstPhone;
          this.markersFound = response.data.total;
          this.loading = false;
        }
      })
      .catch(error => {
        console.error('REST request error!', error);
        this.loading = false;
        
      });
  }
};
</script>

<style scope>
.imgInfor {
  float: left;
  width: 40%;
  height: 100%;
}

.textInfor {
  margin-left: 10px;
  float: left;
  width: 55%;
}
</style>
