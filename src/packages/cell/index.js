// 导入组件
import CellGroup from './cell-group.vue'
import Cell from './cell.vue'

CellGroup.install = function (Vue) {
  Vue.component(CellGroup.name, CellGroup)
}
Cell.install = function (Vue) {
  Vue.component(Cell.name, Cell)
}

export const CellGroup = CellGroup
export const Cell = Cell

// 默认导出 install 方法
export default {
  install (Vue, opts = {}) {
	// 定义全局组件
	Vue.component(CellGroup.name, CellGroup)
	Vue.component(Cell.name, Cell)
  },
}
