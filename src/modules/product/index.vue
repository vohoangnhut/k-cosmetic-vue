<template lang="pug">
div(v-loading.fullscreen.lock='loading')
  .wrapper
    .page-header.page-header-small
      .page-header-image(data-parallax='true')
      //- .content-center
      //-   .row
      //-     .col-md-8.ml-auto.mr-auto
      //-       h1.title Hà Kim Lrocre
    
    .container
        .col-md-12
          .row
            .col-lg-12.col-md-12
              h3.title.title-large.title-center Sản Phẩm
          .row
            .col-lg-3.col-md-4(v-for='(item, index) in lstProducts', :key='index')
              .card.card-product.card-plain
                .card-image(@click='gotoDetails(item.key)')
                  img.product-img(:src='item.images ? item.images[0].url : exmapleImageProduct', alt='...Product...Image...')
                .card-body
                  h4.card-title {{ item.name }}
                  p.card-description
                    | {{ formatCurrency(item.price) }} VNĐ
           
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
      lstProducts: [],
      exmapleImageProduct : 'assets/img/wooyoungmi.jpg',

      theLastItem: {},
      loading: false,
    };
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
    },

    formatCurrency(inputValue) {
      if (inputValue) {
        return parseFloat(inputValue.replace(/\./g, ''))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
      return '0';
    },

    getData() {
      this.loading = true;
      this.lstProducts = [];
      let query = this.$db.ref('products').orderByChild('createdAt')
      //.limitToFirst(4);
      //.once('value')
      query.on('child_added', snapshot => {
        let item = snapshot.val();
        let valueItem = {
          key: item.key,
          name: item.name,
          price: item.price,
          short_description: item.short_description,
          long_description: item.long_description,
          images: item.images,
        };

        this.lstProducts.push(valueItem);

        this.theLastItem = item;

        this.loading = false;
        
      });
      
      // this.lstProducts = [];
      // this.$db
      //   .ref('products')
      //   .once('value')
      //   .then(snapshot => {
      //     let datas = snapshot.val();

      //     if (datas) {
      //       let arrays = Object.values(datas);
      //       arrays.forEach(item => {
      //         let data = {
      //           key: item.key,
      //           name: item.name,
      //           price: item.price,
      //           short_description: item.short_description,
      //           images: item.images,
      //         };

      //         this.lstProducts.push(data);
      //       });
      //     }
      //   });
    },

    getMore() {
      if (!this.theLastItem) return;
      this.$db
        .ref('products')
        .orderByChild('createdAt')
        .startAt(this.theLastItem.createdAt)
        .limitToFirst(4)
        .on('child_added', snapshot => {
          let item = snapshot.val();
          let valueItem = {
            key: item.key,
            name: item.name,
            price: item.price,
            short_description: item.short_description,
            long_description: item.long_description,
            images: item.images,
          };
          if (this.theLastItem.key != item.key)
            this.lstProducts.push(valueItem);

          this.theLastItem = item;
        });

    },
  },

  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.padding-top-custom {
  padding-top: 50px !important;
}
.signup-page >  {
  .section {
    padding-top: 0px;
  }
}
.padding-top {
  padding-top: 150px !important;
}
.page-header-image {
  background-image: url('~img/cover.jpg');  
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.card-image {
  cursor: pointer;
  height: 250px;
}

.product-img {
  position: absolute;
  /* max-width: 100%; */
  /* border-radius: 1px; */
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  /* max-width: 100%; */
  max-height: 100%;
}

.title-center {
  text-align: center;
}
</style>
