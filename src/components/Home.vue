<template>
 <div>
   <mHeader>
     首页
   </mHeader>
   <div class="content">
     <Loading v-if="loading"></Loading>
     <template v-else>
      <Swiper :swiperSliders='sliders'></Swiper>
      <div class="container">
        <h3>热门图书</h3>
        <ul>
          <li v-for="(book,index) in books" :key="index">
            <img :src="book.bookCover" alt="">
            <b>{{book.bookName}}</b>
          </li>
        </ul>
      </div>
     </template>
   </div>
 </div>
</template>

<script>
import mHeader from '../base/mHeader.vue'
import Swiper from '../base/Swiper.vue'
import {getAll} from '../api/index'
import Loading from '../base/Loading.vue'
export default {
  components:{
    mHeader,
    Swiper,
    Loading
  },
  created(){
    this.getData();
  },
  data(){
    return { sliders:[],books:[],loading:true }
  },
  methods:{
    async getData(){
      let [sliders,hotBooks]=await getAll();
      this.sliders=sliders.data;
      this.books=hotBooks.data;
      //轮播图和热门图书已经获取完成
      this.loading=false;
    }
  }
}
</script>
<style scoped lang="less">
.container{
  width:95%;
  margin:10px auto;
  h3{
    color:maroon;
  }
  ul{
    display: flex;
    flex-wrap:wrap;//换行
    li{
      width:50%;
      text-align: center;
      margin:5px 0;
      img{
        width:100%;
        height:150px;
      }
    }

  }
}
</style>
