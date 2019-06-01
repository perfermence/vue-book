<template>
  <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide v-for="(slide,index) in swiperSliders" :key="index" >
      <img :src="slide" alt="">
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    props:['swiperSliders'],
    data() {
      return {
        swiperOption: {
          autoplay:{
              delay: 2000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
          },
          pagination: {
            el:'.swiper-pagination'
          },
        }
      }
    },
  }

 
</script>
<style lang="less">
img{
width:100%;
height:250px;
}
</style>
