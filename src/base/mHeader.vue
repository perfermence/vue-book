<template>
  <div class="header">
    <slot></slot>
    <i class="iconfont icon-fanhui" v-if="back"
     @click="goBack"></i>
  </div>
</template>

<script>
export default {
   props:{
     back:{
       type:Boolean,
       default:false
     }
   },
   methods:{
     goBack(){
       this.$router.go(-1);
     }
   }
}
</script>
<style lang="less" scoped>
.header{
  position:fixed;
  text-align: center;
  left: 0;
  top: 0;
  width:100%;
  height: 25px;
  background: lightgray ;
  letter-spacing: 5px;
  line-height: 25px;
  color:navy;
    i{
     float: left;
     margin-left:10px;
    }
}
</style>
