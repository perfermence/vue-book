<template>
  <div class="detail">
    <mHeader :back="true">详情</mHeader>
    <div class="list">
      <ul>  
        <li>
          <label for="bookName">书的名称</label>
          <input type="text" v-model="book.bookName" id="bookName">
        </li>
        <li>
          <label for="bookInfo">书的信息</label>
          <input type="text" v-model="book.bookInfo" id="bookInfo">
        </li>
        <li>
          <label for="bookPrice">书的价格</label>
          <input type="text" v-model="book.bookPrice" id="bookPrice">
        </li>
        <li>
          <button @click="update">确认修改</button>
        </li>
    </ul>
    </div>    
  </div>
</template>

<script>
import mHeader from '../base/mHeader.vue'
import {findOneBook,updateBook} from '../api/index'
export default {
  data(){
    return {book:{}}
  },
  watch:{//监控路由的变化来重新获取数据
    $route(){
      this.getData();
    }
  },
  created(){
    this.getData();
  },
  components:{
    mHeader
  },
  methods:{
    async update(){
      //点击修改图书信息
      await updateBook(this.$route.params.bId,this.book);
      console.log(this.book);
      this.$router.push('/list');//修改完成后跳转页面
    },
    async getData(){
      //通过ID找到某一项后赋给book属性。
      let {data}=await findOneBook(this.$route.params.bId);//attention
      this.book=data;
      //如果是空对象，需要跳转回列表页
      Object.keys(this.book).length>0?void 0:this.$router.push('/list');
    }
  }
}
</script>
<style scoped lang="less">
  .detail{
    position:absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background:#ffffff;
    z-index:100;
  }
  .list{
    margin:30px 20px 0 20px;
    li{
      label{
        display:block;
        font-size:20px;
      }
      input{
        margin:20px 0;
        height:25px;
        width:100%;
        font-size:15px;
      }
      button{
        width:70px;
        height: 35px;
        color:#FFFFFF;
        background:rgb(93, 174, 240);
        border-radius: 10px;
      }
    }
  }
</style>
 