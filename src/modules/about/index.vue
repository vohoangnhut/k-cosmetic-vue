<template lang="pug">
.wrapper
  .page-header.page-header-small
    .page-header-image
    .content-center
      .row
        .col-md-8.ml-auto.mr-auto.text-center
          h2.title Hà Thị Kim Comestic
          h4 Bán sỉ và lẻ mỹ phẩm nhập khẩu từ Mỹ Tho
  .section
    .section
      .container
        .row
          .col-md-8.ml-auto.mr-auto
            h3.title Trang này để giới thiệu và thông tin mua sỉ lẻ này nọ
            p
              | This is the paragraph where you can write more details about your product. Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious, otherwise he wouldn't scroll to get here. Add a button if you want the user to see more. We are here to make life better.
              br
              br
              |  And now I look and look around and there’s so many Kanyes I've been trying to figure out the bed design for the master bedroom at our Hidden Hills compound... and thank you for turning my personal jean jacket into a couture piece.
            p.blockquote.blockquote-primary
              | “And thank you for turning my personal jean jacket into a couture piece.”
              br
              br
              small
                | Kanye West, Producer.
    .section
      .container
        .row
          .col-md-8.ml-auto.mr-auto
            h2.title Latest Blogposts 4
            br
            .card.card-plain.card-blog
              .card-image
                a(href='#pablo')
                  img.img.img-raised.rounded(src='~img/examples/card-blog13.jpg')
              h6.category.text-info Fashion
              h3.card-title
                a(href='#pablo') Groupon Moves Into Flash Fashion
              h5.card-description
                | More acquisitions for Groupon to widen the net of consumers using its platform for more than daily deals. Today it is announcing the acquisition of ideeli, a flash fashion retailer, for $43 million in...
              //a.btn.btn-primary.btn-round(href='#pablo') Read More
            .card.card-plain.card-blog
              .card-image
                a(href='#pablo')
                  img.img.img-raised.rounded(src='~img/examples/card-blog14.jpg')
              h6.category.text-success Entertainment
              h3.card-title
                a(href='#pablo') When music and technology collide
              h5.card-description
                | Some might say that technology is killing the music industry. But if you look around, there’s a beautiful marriage there — the music industry is evolving every day, and artists are embracing technology in new and innovative ways...
              //a.btn.btn-primary.btn-round(href='#pablo')  Read More

    .section
      .container
        .col-md-12
          h2.title.text-center Similar Stories
          br
          #blogs-1.blogs-1
            .row
              .col-md-10.ml-auto.mr-auto
                .card.card-plain.card-blog
                  .row
                    .col-md-5
                      .card-image
                        img.img.img-raised.rounded(src='~img/examples/card-blog4.jpg')
                    .col-md-7
                      h6.category.text-info Enterprise
                      h3.card-title
                        a(href='#pablo') Warner Music Group buys concert discovery service Songkick
                      p.card-description
                        | Warner Music Group announced today it’s acquiring the selected assets of the music platform Songkick, including its app for finding concerts and the company’s trademark.
                      p.author
                        | by
                        a(href='#pablo')
                          b Sarah Perez
                        | , 2 days ago
                .card.card-plain.card-blog
                  .row
                    .col-md-7
                      h6.category.text-danger
                        i.now-ui-icons.now-ui-icons.media-2_sound-wave
                        |  Startup
                      h3.card-title
                        a(href='#pablo') Insticator raises $5.2M to help publishers
                      p.card-description
                        | Insticator is announcing that it has raised $5.2 million in Series A funding. The startup allows online publishers to add quizzes, polls and other interactive elements...
                      p.author
                        | by
                        a(href='#pablo')
                          b Anthony Ha
                        | , 5 days ago
                    .col-md-5
                      .card-image
                        img.img.img-raised.rounded(src='~img/examples/card-blog6.jpg')
    .section
      .container
        .col-md-12
          h4.card-title  Bảng Giá
          p.category  Thông tin giá sỉ và lẻ
        
          .table-responsive
            table.table
              thead.text-primary
                th
                  | Name
                th.text-right
                  | Price
              tbody
                tr
                  td
                    | Dakota Rice
                  td.text-right
                    | $36,738
                tr
                  td
                    | Minerva Hooper
                  td.text-right
                    | $23,789
                tr
                  td
                    | Sage Rodriguez
                  td.text-right
                    | $56,142
                tr
                  td
                    | Philip Chaney
                  td.text-right
                    | $38,735
                tr
                  td
                    | Doris Greene
                  td.text-right
                    | $63,542
                tr
                  td
                    | Mason Porter
                  td.text-right
                    | $78,615
                tr
                  td
                    | Jon Porter
                  td.text-right
                    | $98,615

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

  methods: {},
};
</script>

<style lang="scss" scoped>
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
  background-image: url('~img/bg22.jpg');
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
