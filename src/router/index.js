import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import NotFound from '../components/NotFound.vue'

export default new Router({   
  routes: [
    {
      path:'/',
      component:()=>import('../components/Home.vue')

    },
    {
      path:'/Home',
      meta:{keepAlive:true,title:"首页"},//数据缓存
      component:()=>import('../components/Home.vue')
    },
    //this.$route.meta.keepAlive
    {
      path:'/List',
      meta:{keepAlive:true,title:"列表"},
      component:()=>import('../components/List.vue')

    },
    {
      path:'/Add',
      meta:{title:"添加"},
      component:()=>import('../components/Add.vue')

    },
    {
      path:'/Collect',
      meta:{title:"收藏"},
      component:()=>import('../components/Collect.vue')

    },
    {
      path:'/Detail/:bId',
      name:"detail",
      meta:{title:"详情"},
      component:()=>import('../components/Detail.vue')

    },
    {
      path:'*',
      component:NotFound
    }
  ]
})
