import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss' // global css
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons' // icon
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';

// 引入echarts
import * as Echarts from 'echarts';

import store from './store'
Vue.prototype.$echarts = Echarts
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
document.title = "东南亚极端气候事件监测预测系统"
