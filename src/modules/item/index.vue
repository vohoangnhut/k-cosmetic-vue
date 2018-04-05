<template lang="pug">
.wrapper
  .page-header.page-header-mini
    .page-header-image
  .section
    .container
      .row
        .col-md-5
          .block
            el-carousel(trigger='click', height='450px')
              el-carousel-item(v-for='item in imageList', :key='item')
                img(:src='item.url', alt='First slide')
        .col-md-6.ml-auto.mr-auto
          h2.title  Tên Sản Phẩm
          //h5.category Slim-Fit Leather Biker Jacket
          h2.main-price 25.000.000 VNĐ
          #accordion.card-collapse(role='tablist', aria-multiselectable='true')
            .card.card-plain
              .card-header
                | Mô Tả Sản Phẩm
              .card-body
                p
                  | Eres' daring 'Grigri Fortune' swimsuit has the fit and coverage of a bikini in a one-piece silhouette. This fuchsia style is crafted from the label's sculpting peau douce fabric and has flattering cutouts through the torso and back. Wear yours with mirrored sunglasses on vacation.
                
      .features-4
        .container
          .row
            .col-md-8.ml-auto.mr-auto.text-center
              h2.title Hướng Dẫn Sử Dụng Và Công Dụng Của Sản Phẩm
              h4.description
                | Havenly is a convenient, personal and affordable way to redecorate your home room by room. Collaborate with our professional interior designers on our online platform.
          .row
            .col-md-4
              .card.card-background.card-raised(data-background-color='', style="background-image: url('~img/bg24.jpg')")
                .info
                  .icon.icon-white
                    i.now-ui-icons.shopping_delivery-fast
                  .description
                    h4.info-title 1 Vài Thứ
                    p
                      | Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough.
                    a.ml-3(href='#pablo') Find more...
            .col-md-4
              .card.card-background.card-raised(data-background-color='', style="background-image: url('~img/bg28.jpg')")
                .info
                  .icon.icon-white
                    i.now-ui-icons.business_badge
                  .description
                    h4.info-title Giới Thiệu Thêm
                    p
                      | Divide details about your product or agency work into parts. Write a few lines about each one. Very good refund policy just for you.
                    a(href='#pablo') Find more...
            .col-md-4
              .card.card-background.card-raised(data-background-color='', style="background-image: url('~img/bg25.jpg')")
                .info
                  .icon
                    i.now-ui-icons.ui-2_favourite-28
                  .description
                    h4.info-title Ở Đây
                    p
                      | Share a floor plan, and we'll create a visualization of your room. A paragraph describing a feature will be enough. This is a popular item for you.
                    a.ml-3(href='#pablo') Find more...
  app-footer


</template>

<script>
import { Footer as AppFooter } from '../../components';

export default {
  components: {
    AppFooter,
  },
  data() {
    return {
      imageList: [
        {
          name: 'food.jpeg',
          url:
            'https://firebasestorage.googleapis.com/v0/b/k-comestic.appspot.com/o/images%2Ffb296cb5e122af54612d50dd50ae9f89G6KBS7MS..jpg?alt=media&token=5f1ab82c-9208-4acf-bb38-fd85b506d5d4',
        },
        {
          name: 'food2.jpeg',
          url:
            'https://firebasestorage.googleapis.com/v0/b/k-comestic.appspot.com/o/images%2Fapple-macbook-pro-13-inch-2016-1888-0445A1MLXYD..jpg?alt=media&token=0029b534-b822-4b3a-9b61-fab62095f31a',
        },
        {
          name: 'food2.jpeg',
          url:
            'https://firebasestorage.googleapis.com/v0/b/k-comestic.appspot.com/o/images%2Fapple-macbook-pro-touch-bar-15-inch-2017-4201-iloveimg-croppedGYWS87Y7..jpg?alt=media&token=0eaace00-7871-4afd-bd22-e84cfc3965d7',
        },
        {
          name: 'food2.jpeg',
          url:
            'https://firebasestorage.googleapis.com/v0/b/k-comestic.appspot.com/o/images%2Fimage-2018-04-05TIWV2JNX..jpg?alt=media&token=e19625d0-e7b9-444e-8f5f-b0d2e179f07f',
        },
        {
          name: 'food2.jpeg',
          url:
            'https://firebasestorage.googleapis.com/v0/b/k-comestic.appspot.com/o/images%2Fsaint-laurentXTS5AR69..jpg?alt=media&token=4ea3caec-56d3-496d-9a2e-539b553002e1',
        },
        
      ],
    };
  },

  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },

  methods: {},

  created() {   

    console.log('ID',this.$route.params.id);
  },

};
</script>

<style lang="scss" scoped>
//
  // .el-carousel__item h3 {
  //   color: #475669;
  //   font-size: 14px;
  //   opacity: 0.75;
  //   line-height: 150px;
  //   margin: 0;
  // }


// .padding-top-custom {
//   padding-top: 50px !important;
// }
// .signup-page /deep/ {
//   .section {
//     padding-top: 0px;
//   }
// }
// .padding-top {
//   padding-top: 150px !important;
// }
.page-header-image {
  background-image: url('~img/bg37.jpg');
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  z-index: -1;
}

// .img1 {
//   background-image: url('~images/bg/project8.jpg');
// }

// .img2 {
//   background-image: url('~images/bg/project9.jpg');
// }
</style>
