// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)
import './fonts/iconfont.css' //导入CSS文件，css-loader会解析它

Vue.config.productionTip = false
//在进入路由之前，每一次都会执行此方法，全局钩子，有拦截的功能
router.beforeEach(function(to,from,next){
    document.title=to.meta.title;
    next();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
