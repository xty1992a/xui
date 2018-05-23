/**
 * Created by TY-xie on 2018/5/7.
 */
import Action from './action/index.js'
import Count from './count/index.js'
import XDialog from './dialog/index.js'
import Scroll from './scroll/index.js'
import SidePop from './side-pop/index.js'
import Btn from './btn/index.js'
import Tabs from './tabs/index.js'
import TabPanel from './tab-panel/index.js'
import Ranger from './ranger/index.js'
import mount from './dialog.js'
const components = [
  Action,
  Btn,
  Count,
  Scroll,
  SidePop,
  XDialog,
  Tabs,
  TabPanel,
  Ranger,
];

const install = function (Vue) {
  Vue.prototype.$eventBus = new Vue
  Vue.prototype.$dialog = mount(Vue)
  components.map(component => {
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