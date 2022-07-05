import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loading from "./components/PageLoading.vue"

Vue.config.productionTip = false

Vue.component("loading", Loading)

Vue.filter("numeroPreco", valor=>{
  valor = Number(valor);
  if(!isNaN(valor)){
    return valor.toLocaleString("pt-BR", {
      style:"currency",
      currency:"BRL"
    })
  }
  else{
    return ""
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
