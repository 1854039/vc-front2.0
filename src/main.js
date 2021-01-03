import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import AmapVue from '@amap/amap-vue';
import vueResource from 'vue-resource';

AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = '84c113b753854d2a372345f043cb50c2';
AmapVue.config.plugins = [
    'AMap.ToolBar',
    'AMap.MoveAnimation',
    // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];
Vue.use(AmapVue);
Vue.use(vueResource);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')