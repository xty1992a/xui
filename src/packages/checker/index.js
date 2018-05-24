// 导入组件
import CG from './check-group.vue'
import Ch from './checker.vue'

CG.install = function (Vue) {
  Vue.component(CG.name, CG)
}
Ch.install = function (Vue) {
  Vue.component(Ch.name, Ch)
}

export const Checker = Ch
export const CheckGroup = CG

// 默认导出 install 方法
export default {
  install (Vue, opts = {}) {
	// 定义全局组件
	Vue.component(CG.name, CG)
	Vue.component(Ch.name, Ch)
  },
}
