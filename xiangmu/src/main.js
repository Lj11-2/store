// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//公共组件
import allComponents from './components/index'
for(let i in allComponents){
  Vue.component(i,allComponents[i])
}
//过滤器
import filters from './filters/index'
for(let i in filters){
  Vue.filter(i,filters[i])
}
import store from "./store"
//图片前缀
Vue.prototype.$imgPre="http://localhost:3000"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
