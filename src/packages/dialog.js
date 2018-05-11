/**
 * Created by TY-xie on 2018/4/2.
 */
function mount(Vue) {
  const dialog = {
	_toast(msg, status = 0, delay = 1500) { // 图文toast 0 警告 1 成功 2 失败
	  Vue.prototype.$eventBus.$emit('dialog', {type: 'toast', payload: {msg, delay, status}})
	},
	_loading() {
	  Vue.prototype.$eventBus.$emit('dialog', {type: 'loading', payload: {show: true}})
	},
	_unLoading() {
	  Vue.prototype.$eventBus.$emit('dialog', {type: 'loading', payload: {show: false}})
	},
	_alert(msg) {
	  Vue.prototype.$eventBus.$emit('dialog', {type: 'alert', payload: {msg}})
	},
	_confirm(msg, options) {
	  options = typeof options === 'undefined' ? ['确定', '取消'] : options
	  let key = {}
	  let pro = new Promise((resolve, reject) => {
		key.resolve = resolve
		key.reject = reject
	  })
	  Vue.prototype.$eventBus.$emit('dialog', {type: 'confirm', payload: {msg, key, options}})
	  return pro
	}
  }
  return dialog
}
export default mount