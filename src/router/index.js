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
	  component: resolve => require(['pages/animation'], resolve),
	},
	{
	  path: '/slider',
	  name: 'slider',
	  component: resolve => require(['pages/slider-page.vue'], resolve),
	},
	{
	  path: '/keyboard',
	  name: 'keyboard',
	  component: resolve => require(['pages/keyboard.vue'], resolve),
	},
	{
	  path: '/backup',
	  name: 'backup',
	  component: resolve => require(['pages/backup'], resolve),
	},
	{
	  path: '/clip',
	  name: 'clip',
	  component: resolve => require(['pages/clip'], resolve),
	},
	{
	  path: '/picker',
	  name: 'picker',
	  component: resolve => require(['pages/address-picker'], resolve),
	},
	{
	  path: '/notice',
	  name: 'notice',
	  component: resolve => require(['pages/notice'], resolve),
	},
	{
	  path: '*',
	  name: 'notFound',
	  component: resolve => require(['pages/404'], resolve),
	},
  ],
})
