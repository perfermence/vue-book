<template>
  <div class="add">
    <mHeader :back="true">添加页</mHeader>
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
          <label for="bookCover">书的封面</label>
          <input type="text" v-model="book.bookCover" id="bookCover">
        </li>
        <li>
          <button @click="add">添加</button>
        </li>
    </ul>
    </div>    
  </div>
</template>

<script>
import mHeader from '../base/mHeader.vue';
import {addBook} from '../api/index';
export default {
  data(){
    return{book:{}}
  },
  components:{
    mHeader
  },
  methods:{
    async add(){
      alert(1);
      await addBook(this.book);
      this.$router.push('/list');
    }
  }
}
</script>

<style scoped lang="less">
.add{
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
        margin-bottom:25px;
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
