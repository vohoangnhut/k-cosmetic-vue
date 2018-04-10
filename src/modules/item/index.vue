<template lang="pug">
.wrapper
  .page-header.page-header-mini
    .page-header-image
  .section
    .container
      .row  
        .col-md-1.col-sm-1
          button.btn(@click='goBack')
            i.fa.fa-angle-left
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
              .card-body.custom-ql-viewer
                .ql-editor(v-html='productVO.short_description')
                
      .features-4
        .container
          .row
            .ql-editor(v-html='productVO.long_description')
            //- .col-md-8.ml-auto.mr-auto.text-center
            //-   h2.title Hướng Dẫn Sử Dụng Và Công Dụng Của Sản Phẩm
            //-   h4.description
            //-     | Havenly is a convenient, personal and affordable way to redecorate your home room by room. Collaborate with our professional interior designers on our online platform.
          .row
            .col-md-4
              .card.card-background.card-raised(data-background-color='', style="background-image: url('~img/bg28.jpg')")
                .info
                  .icon.icon-white
                    i.now-ui-icons.emoticons_satisfied
                  .description
                    h4.info-title Lựa Chọn
                    p
                      | Hãy xem qua nhũng sẩm phẩm của chúng tôi trên website này, chúng tôi đã cung cấp toàn bộ thông tin chi tiết cho mỗi sản phẩm
                    
            .col-md-4
              .card.card-background.card-raised(data-background-color='', style="background-image: url('~img/bg24.jpg')")
                .info
                  .icon.icon-white
                    i.now-ui-icons.tech_mobile
                  .description
                    h4.info-title Liên Hệ
                    p
                      | Qua số điện thoại (097) 123456878 hoặc chat trực tiếp với chúng tôi qua messenger ngay phía góc phải, chúng tôi sẽ trả lời bạn ngay
                    
            .col-md-4
              .card.card-background.card-raised(data-background-color='', style="background-image: url('~img/bg25.jpg')")
                .info
                  .icon.icon-white
                    i.now-ui-icons.shopping_delivery-fast
                  .description
                    h4.info-title Vận Chuyễn
                    p
                      | Sau khi hoàn tất đơn hàng qua điện thoại, đội ngũ nhân viên giao hàng của chúng tôi sẽ giao hàng trong vòng 24h. kể cả ngày lễ và CN
                    
  app-footer


</template>

<script>
import { Footer as AppFooter } from '../../components';
import toastr from '../../core/toastr';
//import 'quill/dist/quill.core.css';

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
    goBack() {
      this.$router.go(-1);
    },
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
            long_description: datas.long_description,
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

.custom-ql-viewer {
  > .ql-editor {
    padding: 0px;
  }
}
</style>
