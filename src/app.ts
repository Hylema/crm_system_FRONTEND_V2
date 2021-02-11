import '@/prototypes'
import App from './App.vue'
import Vue from 'vue'
import plugins from './plugins'
// Vue.config.productionTip = false

export default function createApp () {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return new Vue({
    ...plugins,
    render: h => h(App)
  }).$mount('#app')
}
