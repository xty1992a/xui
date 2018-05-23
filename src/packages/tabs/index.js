/**
 * Created by TY-xie on 2018/5/7.
 */
import Tabs from './index.vue'
// import TabPanel from './tab-panel.vue'
Tabs.install = function (Vue) {
  Vue.component(Tabs.name, Tabs)
  // Vue.component(TabPanel.name, TabPanel)
}

export default Tabs