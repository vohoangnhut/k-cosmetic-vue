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
              el-carousel-item(v-for='(item, index) in imageList', :key='index')
                img(:src='item.url', alt='First slide')
        .col-md-6.ml-auto.mr-auto
          h2.title  {{ productVO.name }}
          //h5.category Slim-Fit Leather Biker Jacket
          h2.main-price {{ productVO.price }} VNĐ
          #accordion.card-collapse(role='tablist', aria-multiselectable='true')
            .card.card-plain
              .card-header
                | Mô Tả Sản Phẩm
              .card-body
                .ql-viewer(v-html='productVO.short_description')
                
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
import toastr from '../../core/toastr';

export default {
  components: {
    AppFooter,
  },
  data() {
    return {
      productVO: {},
    };
  },

  computed: {
    currentYear() {
      return new Date().getFullYear();
    },

    imageList() {
      if (this.productVO.imageList) return this.productVO.imageList;
      return [];
    },
  },

  methods: {
    getData(prodId) {
      if (!prodId) {
        toastr.warning('Sản Phẩm Bạn Tìm Kiếm Không Tồn Tại');
        this.$router.push('product/');
      }

      this.$db
        .ref('/products/' + prodId)
        .once('value')
        .then(snapshot => {
          let datas = snapshot.val();

          if (!datas) {
            toastr.warning('Sản Phẩm Bạn Tìm Kiếm Không Tồn Tại');
            this.$router.push('product/');
          }

          this.productVO = {
            key: datas.key,
            name: datas.name,
            price: datas.price,
            short_description: datas.short_description,
            imageList: datas.images,
          };
        });
    },
  },

  created() {
    this.getData(this.$route.params.prodId);
  },
};
</script>

<style lang="scss" scoped>
.page-header-image {
  background-image: url('~img/bg37.jpg');
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.el-carousel__item {
  > img {
    position: absolute;
    /* max-width: 100%; */
    /* border-radius: 1px; */
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    /* max-width: 100%; */
    max-height: 100%;
  }
}

// Quill CSS
.ql-viewer .ql-font-serif {
  font-family: Georgia, Times New Roman, serif;
}
.ql-viewer .ql-font-monospace {
  font-family: Monaco, Courier New, monospace;
}
.ql-viewer .ql-size-small {
  font-size: 0.75em;
}
.ql-viewer .ql-size-large {
  font-size: 1.5em;
}
.ql-viewer .ql-size-huge {
  font-size: 2.5em;
}
.ql-viewer .ql-direction-rtl {
  direction: rtl;
  text-align: inherit;
}
.ql-align-center {
    text-align: center;
}

.ql-align-justify {
  text-align: justify;
}
.ql-align-right {
  text-align: right;
}
.ql-viewer blockquote {
  border-left: 4px solid #ccc;
  padding-left: 16px;
}

.ql-viewer code,
.ql-viewer pre {
  background-color: #f0f0f0;
  border-radius: 3px;
  padding: 6px 10px;
}
.ql-viewer ol > li,
.ql-viewer ul > li {
  list-style-type: none;
}
.ql-viewer ol li {
  counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
  counter-increment: list-num;
}
.ql-viewer ol li:before {
  content: counter(list-num, decimal) '. ';
}
/* indent 1 */
.ql-viewer ol ol li {
  counter-increment: list-1;
}
.ql-viewer ol ol li:before {
  content: counter(list-1, lower-alpha) '. ' !important;
}
.ql-viewer ol ol li {
  counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
}
/* indent 2 */
.ql-viewer ol ol ol li {
  counter-increment: list-2;
}
.ql-viewer ol ol ol li:before {
  content: counter(list-2, lower-roman) '. ' !important;
}
.ql-viewer ol ol ol li {
  counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;
}
/* indent 3 */
.ql-viewer ol ol ol ol li {
  counter-increment: list-3;
}
.ql-viewer ol ol ol ol li:before {
  content: counter(list-3, decimal) '. ' !important;
}
.ql-viewer ol ol ol ol li {
  counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;
}
/* indent 4 */
.ql-viewer ol ol ol ol ol li {
  counter-increment: list-4;
}
.ql-viewer ol ol ol ol ol li:before {
  content: counter(list-4, lower-alpha) '. ' !important;
}
.ql-viewer ol ol ol ol ol li {
  counter-reset: list-5 list-6 list-7 list-8 list-9;
}
/* indent 5 */
.ql-viewer ol ol ol ol ol ol li {
  counter-increment: list-5;
}
.ql-viewer ol ol ol ol ol ol li:before {
  content: counter(list-5, lower-roman) '. ' !important;
}
.ql-viewer ol ol ol ol ol ol li {
  counter-reset: list-6 list-7 list-8 list-9;
}
/* indent 6 */
.ql-viewer ol ol ol ol ol ol ol li {
  counter-increment: list-6;
}
.ql-viewer ol ol ol ol ol ol ol li:before {
  content: counter(list-6, decimal) '. ' !important;
}
.ql-viewer ol ol ol ol ol ol ol li {
  counter-reset: list-7 list-8 list-9;
}
/* indent 7 */
.ql-viewer ol ol ol ol ol ol ol ol li {
  counter-increment: list-7;
}
.ql-viewer ol ol ol ol ol ol ol ol li:before {
  content: counter(list-7, lower-alpha) '. ' !important;
}
.ql-viewer ol ol ol ol ol ol ol ol li {
  counter-reset: list-8 list-9;
}
/* indent 8 */
.ql-viewer ol ol ol ol ol ol ol ol ol li {
  counter-increment: list-8;
}
.ql-viewer ol ol ol ol ol ol ol ol ol li:before {
  content: counter(list-8, lower-roman) '. ' !important;
}
.ql-viewer ol ol ol ol ol ol ol ol ol li {
  counter-reset: list-9;
}
/* indent 9 */
.ql-viewer ol ol ol ol ol ol ol ol ol ol li {
  counter-increment: list-9;
}
.ql-viewer ol ol ol ol ol ol ol ol ol ol li:before {
  content: counter(list-9, decimal) '. ' !important;
}
/* ql indent */
.ql-viewer .ql-indent-1:not(.ql-direction-rtl) {
  padding-left: 3em;
}

.ql-viewer .ql-indent-1.ql-direction-rtl.ql-align-right {
  padding-right: 3em;
}

.ql-viewer .ql-indent-2:not(.ql-direction-rtl) {
  padding-left: 6em;
}

.ql-viewer .ql-indent-2.ql-direction-rtl.ql-align-right {
  padding-right: 6em;
}

.ql-viewer .ql-indent-3:not(.ql-direction-rtl) {
  padding-left: 9em;
}

.ql-viewer .ql-indent-3.ql-direction-rtl.ql-align-right {
  padding-right: 9em;
}

.ql-viewer .ql-indent-4:not(.ql-direction-rtl) {
  padding-left: 12em;
}

.ql-viewer .ql-indent-4.ql-direction-rtl.ql-align-right {
  padding-right: 12em;
}

.ql-viewer .ql-indent-5:not(.ql-direction-rtl) {
  padding-left: 15em;
}

.ql-viewer .ql-indent-5.ql-direction-rtl.ql-align-right {
  padding-right: 15em;
}

.ql-viewer .ql-indent-6:not(.ql-direction-rtl) {
  padding-left: 18em;
}

.ql-viewer .ql-indent-6.ql-direction-rtl.ql-align-right {
  padding-right: 18em;
}

.ql-viewer .ql-indent-7:not(.ql-direction-rtl) {
  padding-left: 21em;
}

.ql-viewer .ql-indent-7.ql-direction-rtl.ql-align-right {
  padding-right: 21em;
}

.ql-viewer .ql-indent-8:not(.ql-direction-rtl) {
  padding-left: 24em;
}

.ql-viewer .ql-indent-8.ql-direction-rtl.ql-align-right {
  padding-right: 24em;
}

.ql-viewer .ql-indent-9:not(.ql-direction-rtl) {
  padding-left: 27em;
}

.ql-viewer .ql-indent-9.ql-direction-rtl.ql-align-right {
  padding-right: 27em;
}
/* video */
.ql-viewer .ql-video {
  display: block;
  max-width: 100%;
}
.ql-viewer .ql-video.ql-align-center {
  margin: 0 auto;
}
.ql-viewer .ql-video.ql-align-right {
  margin: 0 0 0 auto;
}
</style>
