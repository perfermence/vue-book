<template>
  <div >
    <mHeader :back="true">列表</mHeader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <ul>
        <li v-for="(book,index) in books" :key="index">
          <div class="box1">
              <img :src="book.bookCover" alt="">
          </div>
          <div class="box2">
            <router-link  :to="{name:'detail',params:{bId:book.bookId}}" tag='A'>
               <h4>{{book.bookName}}</h4>
            </router-link>
              <p>{{book.bookInfo}}</p>
              <b>{{book.bookPrice | toFixed()}}</b>
              <button @click="remove(book.bookId)">删除</button>
          </div>
        </li>
      </ul>
      <div @click="more" class="more">加载更多</div>
    </div>
  </div>
</template>

<script>
import mHeader from '../base/mHeader.vue'
import *  as a from '../api/index.js'
export default {
  data(){
    return {
      books:[],
      offset:0,
      hasMore:true
    }
  },
  created(){
    this.getData();
  },
  filters:{
            toFixed(input){
                return '￥'+ input
            }
        },
  methods:{
    loadMore(){
      // 触发scroll事件可能触发n次，先进来开一个定时器，下次触发时，将上一次的定时器清除掉

      clearTimeout(this.timer)//节流？防抖？
      this.timer=setTimeout(()=>{
        let{scrollTop,clientHeight,scrollHeight}=this.$refs.scroll
        if(scrollTop+clientHeight+20>scrollHeight){
          this.getData();//获取更多
        }
      },13);
    },
    async getData(){
      if(this.hasMore){
        let{data}=await a.pagination(this.offset);
        let{hasMore,books}=data;
        this.books=[...this.books,...books];//获取的书放到books属性上
        this.hasMore=hasMore;
        this.offset=this.books.length;//维护偏移量 就是总书的长度
      }     
    },
    async remove(id){
      await a.removeBook(id);
      //前端删除数据
      this.books=this.books.filter(item=>item.bookId!==id)
    },
    more(){
      this.getData();
    }

  },
   components:{
    mHeader
  },
}
</script>

<style scoped>
  .content ul{
    padding:10px;  
  }
  .content ul li{
    display: flex;
    border-bottom:1px solid rgb(206, 195, 195);
  }
  .box1{
     width:130px;
    height: 150px;
  }
  .box1 img{
    display: block;
    width:130px;
    height: 150px;
  }
  .box2{
    width:220px;
    overflow: hidden;
  }
  .box2 h4{
    font-size:18px;
    line-height: 35px;
    color:blue;
  }
  .box2 p{
    color:#2a2a2a;
    line-height: 25px;
    /* overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */
  }
  .box2 b{
    color:red;
  }
  button{
    float:right;
    width:60px;
    height: 25px;
    color:#FFFFFF;
    background:orangered;
    border-radius: 15px;
  }
  .content .more{
    margin:10px;
    background: rgb(11, 216, 182);
    height:30px;
    text-align: center;
    line-height: 30px;
    font-size:20px;
  }
</style>
