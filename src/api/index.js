/**
 * Created by TY-xie on 2018/5/7.
 */
import  Vue from 'vue'
const _ = Vue.prototype.$dialog
export default Request = function ({url, method = 'POST', data = {}, header}) {
  return new Promise((resolve, reject) => {
	_._loading()
	setTimeout(() => {
	  _._unLoading()
	}, 1500)
  })
}