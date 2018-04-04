<template lang="pug">
.wrapper
  .page-header.page-header-small
    .page-header-image(data-parallax='true')
    .content-center
      .row
        .col-md-8.ml-auto.mr-auto
          h1.title KIM Comestic
          h4 Let’s be Beautiful. Be Colorful. and Be You.
          h5 Trang này để show sản phẩm, có tên và giá của từng sản phẩm
  .section
    .container
        .col-md-12
          .row
            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image(@click='gotoDetails(1)')
                  img(src='~img/polo.jpg', alt='...')
                .card-body
                  h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ
           
            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image
                  a(href='#')
                    img(src='~img/tom-ford.jpg', alt='...')
                .card-body
                  a(href='#')
                    h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ

              // end card
            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image
                  a(href='#')
                    img(src='~img/wooyoungmi.jpg', alt='...')
                .card-body
                  a(href='#')
                    h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ

              // end card
            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image
                  a(href='#')
                    img(src='~img/sweeney.jpg', alt='...')
                .card-body
                  a(href='#')
                    h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ

              // end card
            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image
                  a(href='#')
                    img(src='~img/kingsman.jpg', alt='...')
                .card-body
                  a(href='#')
                    h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ

              // end card
            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image
                  a(href='#')
                    img(src='~img/boglioli.jpg', alt='...')
                .card-body
                  a(href='#')
                    h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ
            
            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image
                  a(href='#')
                    img(src='~img/polo.jpg', alt='...')
                .card-body
                  a(href='#')
                    h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ
           
            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image
                  a(href='#')
                    img(src='~img/tom-ford.jpg', alt='...')
                .card-body
                  a(href='#')
                    h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ

              // end card
            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image
                  a(href='#')
                    img(src='~img/wooyoungmi.jpg', alt='...')
                .card-body
                  a(href='#')
                    h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ

              // end card
            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image
                  a(href='#')
                    img(src='~img/sweeney.jpg', alt='...')
                .card-body
                  a(href='#')
                    h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ

            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image
                  a(href='#')
                    img(src='~img/kingsman.jpg', alt='...')
                .card-body
                  a(href='#')
                    h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ

              // end card
            .col-lg-3.col-md-4
              .card.card-product.card-plain
                .card-image
                  a(href='#')
                    img(src='~img/boglioli.jpg', alt='...')
                .card-body
                  a(href='#')
                    h4.card-title Impeccably tailored
                  p.card-description
                    | 24,000,000 VNĐ
            
          .row
            .ml-auto.mr-auto
                button.btn.btn-primary.btn-round(rel='tooltip') Load more...

  app-footer
</template>

<script>
import { Footer as AppFooter } from '../../components';

export default {
  components: {
    AppFooter,
  },

  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },

  methods: {
    gotoDetails(id) {
      // console.log(id);
      this.$router.push(`item/${id}`);
    }
  },
};
</script>

<style lang="scss" scoped>
.padding-top-custom {
  padding-top: 50px !important;
}
.signup-page /deep/ {
  .section {
    padding-top: 0px;
  }
}
.padding-top {
  padding-top: 150px !important;
}
.page-header-image {
  background-image: url('~images/bg/bg32.jpg');
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.card-image {
  cursor: pointer;
}

</style>
