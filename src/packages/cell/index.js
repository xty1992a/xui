// 导入组件
import CG from './cell-group.vue'
import CE from './cell.vue'

CG.install = function (Vue) {
  Vue.component(CG.name, CG)
}
CE.install = function (Vue) {
  Vue.component(CE.name, CE)
}

export const CellGroup = CG
export const Cell = CE

// 默认导出 install 方法
export default {
  install (Vue, opts = {}) {
	// 定义全局组件
	Vue.component(CG.name, CG)
	Vue.component(CE.name, CE)
  },
}
