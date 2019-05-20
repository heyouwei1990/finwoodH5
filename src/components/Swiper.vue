<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(str,index) in listImg" :key="index">
          <div class="pic">
            <img v-if="str.href" @click="link(str.href)" :src="str.url"/>
            <img v-if="!str.href" :src="str.url"/>
            <!-- <div class="swiper-lazy-preloader"></div> -->
          </div>

			</div>
		</div>
		<div v-show="listImg.length>1" class="swiper-pagination swiper-pagination-white"></div>
	</div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  props: {
    listImg: Array
  },
  mounted() {
    var swiper = new Swiper(".swiper-container", {
      pagination: ".swiper-pagination",
      paginationClickable: true,
      autoplayDisableOnInteraction: false,
      //loop: true,   //开启会在商品详情页出现bug
      autoplay: 5000,
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      // lazyLoading:true,
      // lazyLoadingInPrevNext:true,
    });
  },
  methods: {
    link(url) {
      if(url.indexOf('http://')<0 && url.indexOf('https://')<0) {
        this.$router.push(url);
      }else {
        window.location.href = url;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.swiper-container {
  width: 100%;
  min-height: 140px;
  .swiper-wrapper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    position: relative;
    padding-top: 37.5%;
    overflow: hidden;
    .pic {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    display: inline-block;
    background: #7c5e53;
  }
}
</style>
