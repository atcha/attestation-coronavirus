import Vue from 'vue'
import '@/assets/css/tailwind.css'
import '@/assets/css/style.css'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'
import Vuelidate from "vuelidate/src";
import './registerServiceWorker'

Vue.use(Vue2TouchEvents)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
