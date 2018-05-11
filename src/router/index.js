import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
	{
	  path: '/',
	  name: 'home',
	  component: resolve => require(['pages/home.vue'], resolve),
	},
	{
	  path: '/animation',
	  name: 'animation',
	  component: resolve => require(['pages/request-animation.vue'], resolve),
	},
  ],
})
