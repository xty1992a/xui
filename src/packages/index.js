/**
 * Created by TY-xie on 2018/5/7.
 */
import './font/iconfont.css'
import Action from './action/index.js'
import Count from './count/index.js'
import XDialog from './dialog/index.js'
import Scroll from './scroll/index.js'
import SidePop from './side-pop/index.js'
import Btn from './btn/index.js'
import Tabs from './tabs/index.js'
import TabPanel from './tab-panel/index.js'
import TabNav from './tab-nav/index.js'
import Ranger from './ranger/index.js'
import {Checker, CheckGroup} from './checker/index.js'
import {Cell, CellGroup} from './cell/index.js'
import mount from './dialog.js'
const components = [
  Action,
  Btn,
  Cell,
  CellGroup,
  Count,
  CheckGroup,
  Checker,
  Scroll,
  SidePop,
  XDialog,
  Tabs,
  TabPanel,
  TabNav,
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