import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import store from "./store"
import App from "./layout"

new Vue({
  el: "#app",
  render: h => h(App),
  store: store
})