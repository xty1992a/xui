/**
 * Created by TY-xie on 2018/5/7.
 */
import Action from './action/index.js'
import Count from './count/index.js'
import XDialog from './dialog/index.js'
import Scroll from './scroll/index.js'
import mount from './dialog.js'
const components = [
  Action,
  Count,
  XDialog,
  Scroll,
];

const install = function (Vue) {
  Vue.prototype.$eventBus = new Vue
  Vue.prototype.$dialog = mount(Vue)
  components.map(component => {
	console.log(component, name)
	Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const XUI = {
  version: '1.0.2',
  install,
}
export default XUI