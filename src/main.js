// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import App from './App'
import store from './store'

// To router porpouses
import IntroInfo from '@/components/IntroInfo.vue'
import FormStepsTwo from '@/components/FormStepsTwo.vue'
import FormStepsThree from '@/components/FormStepsThree.vue'
import OnError from '@/components/OnError.vue'
import OnSuccess from '@/components/OnSuccess.vue'

import './styles/_normalize.scss'
import 'axios-progress-bar/dist/nprogress.css'

Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', name: 'intro', component: IntroInfo },
  { path: '/names/:step', name: 'names', component: FormStepsTwo },
  { path: '/email-confirmation/:step', name: 'email', component: FormStepsThree },
  { path: '/error/:step', name: 'error', component: OnError },
  { path: '/success/:step', name: 'success', component: OnSuccess }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
