<template lang="pug">
footer.footer.footer-big(data-background-color='black')
	.container
		.content
			.row
				.col-md-4
					h5 THÔNG TIN LIÊN HỆ
					hr
					.social-feed
						.feed-line
							i.fa.fa-map-marker
							b Địa chỉ
							p 17A Hồ Xuân Hương-P6-Q3-TP-HCM
						.feed-line
							i.fa.fa-phone
							b Hotline 24/7
							p 0162.638.5576
				.col-md-4
					h5 SHIP COD
					hr
					img.img-center(src='~img/examples/footer_banner-2.png')
				
				
				.col-md-4
					h5 FANPAGE HOME
					hr
					iframe(src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Flrocre.hakim%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId', 
					width='100%', height='130', 
					style='border:none;overflow:hidden', 
					scrolling='no', frameborder='0', allowtransparency='true', allow='encrypted-media')

</template>

<script>
export default {
  data() {
    const year = new Date().getFullYear();
    return {
      year
    };
  }
};
</script>

<style lang="scss" scoped>
.img-center {
	width: 80%;
}
.right-content {
  text-align: right;
}
</style>
