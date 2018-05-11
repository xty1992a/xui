// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import XUI from '@/packages/index.js'
// import XUI from 'xui'
Vue.use(XUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: `<div>
<App/>
<x-dialog></x-dialog>
</div>`,
})
