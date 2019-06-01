<template>
  <div class="footer">
    <router-link to="/Home">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
    </router-link>
    <router-link to="/List">
        <i class="iconfont icon-Group-"></i>
        <span>列表</span>
    </router-link>
    <router-link to="/Add">
        <i class="iconfont icon-tianjia"></i>
        <span>添加</span>
    </router-link>
    <router-link to="/Collect">
        <i class="iconfont icon-collection"></i>
        <span>收藏</span>
    </router-link>
  </div>
</template>
<script>
export default {
   
}
</script>
<style lang="less" scoped>
div{
    border-top:solid 1px gray;
    position:fixed;
    left: 0;
    bottom:0;
    width:100%;
    height: 50px;
    &.footer{
    display:flex;
        a{
            display:flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex:1;
            cursor: pointer;
            text-decoration:none;
            color:rgb(17, 231, 35);
            font-size:16px;
             &.router-link-active{
                color:red;
            }
        }
       
}
}
</style>
