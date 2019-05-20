import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { Lazyload } from 'mint-ui'
import vueTap from 'v-tap'
Vue.use(vueTap)

import App from './App'
import routes from './router'
import store from './store'

const { author, routerMode }= window.config;

//全局通用样式
import './styles/base.scss'

//全局指令，用于路由切换title的改变
Vue.directive('title', {
	inserted: function (el, binding) {
	  document.title = binding.value
	}
})

//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

//图片懒加载配置
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: require('./images/nopic.jpg'),
  loading: require('./images/loading.gif'),
  attempt: 1
});

Vue.use(MintUI)
Vue.use(VueRouter)


//路由
const router = new VueRouter({
	mode:routerMode,
	routes
})

router.beforeEach((to, from, next) => {
  //如果是http跳转到https
  var url = window.location.href;       
  if(url.indexOf("https") < 0 && !window.config.debug) {       
    url = url.replace("http:", "https:");       
    window.location.replace(url);       
  }

  //强制清除微信缓存
  if (location.href.indexOf('?v=') < 0 && location.href.indexOf("code") < 0) {
    window.location.href = `/?v=${window.config.version}${location.hash}`;
  }

  //强制滚到顶部
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  //判断页面是否需要登录
  if(store.state.User.token==null && to.meta.checkLogin){
    next('/login');
    return;
  }
  //微信授权
  if(author && to.path != '/about' && to.path != '/joinus' && to.path != '/helper'){
    if(to.path == '/login'){
      window.localStorage.setItem('beforeEnterHash', location.hash); // 保存用户进入的hash
    }
    if(to.path == '/author' && store.state.User.openid !== null) {
      // 用户使用后退返回到授权页，则默认回到首页
      next('/');
      return;
    }
    let ua = window.navigator.userAgent.toLowerCase();
    if(ua.indexOf('micromessenger') > 1
    && store.state.User.openid === null
    && store.state.User.token === null
    && to.path != '/author'
    && to.path != '/login') {
      //授权成功
      if(location.href.indexOf('code')>0) {
        next('/author');
        return;
      }else {
        //第一次进入
        window.localStorage.setItem('beforeEnterHash', location.hash); // 保存用户进入的hash
        next('/author');
        return;
      }
    }else {
      next();
      return;
    }
  }
  next();
})



new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
