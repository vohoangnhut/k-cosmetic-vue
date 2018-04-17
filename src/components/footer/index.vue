<template lang="pug">
footer.footer.footer-big(data-background-color='black')
	.container
		.content
			.row
				.col-md-12
					h5 Liên Hệ
					ul.links-vertical
						li
							| SDT : 01685522XX
						li
							| Địa Chỉ : 21 Lê Trung Nguyên, P12, Q.TB
		
				
				//- .col-md-6.right-content
				//- 	h5 Follow Us
				//- 	ul.social-buttons
				//- 		li
				//- 			a.btn.btn-icon.btn-neutral.btn-twitter.btn-round(href='#pablo')
				//- 				i.fa.fa-twitter
				//- 		li
				//- 			a.btn.btn-icon.btn-neutral.btn-facebook.btn-round(href='#pablo')
				//- 				i.fa.fa-facebook-square
				//- 		li
				//- 			a.btn.btn-icon.btn-neutral.btn-dribbble.btn-round(href='#pablo')
				//- 				i.fa.fa-dribbble
				//- 		li
				//- 			a.btn.btn-icon.btn-neutral.btn-google.btn-round(href='#pablo')
				//- 				i.fa.fa-google-plus
				//- 		li
				//- 			a.btn.btn-icon.btn-neutral.btn-instagram.btn-round(href='#pablo')
				//- 				i.fa.fa-instagram
		hr
		.copyright
			| Copyright ©
			| Nhut Vo All Rights Reserved.


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
.right-content {
  text-align: right;
}
</style>
