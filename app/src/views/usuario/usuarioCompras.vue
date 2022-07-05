<template>
  <div>
    <div v-if="compras.length === 0">
      <h1>Você ainda não comprou nada!</h1>
    </div>
    <div v-else>
      <h2>Suas Compras:</h2>
      <div class="produtosCompras" v-for="(compra) in compras" :key="compra.id">
        <produtos-comprados :produto="compra.produto">
          <template v-slot:quantidade>
            <p>unidades: {{compra.quantidade}}</p>
          </template>
        </produtos-comprados>
      </div>
    </div>
  </div>
</template>

<script>
import produtosComprados from "@/components/listaUsuario"
import {api} from "@/services.js"
export default {
components:{
  produtosComprados
},
data(){
  return{
    compras:null,
    usuario:this.$store.state.usuario,
    login:this.$store.state.login
  }
},
methods:{
  getCompras(){
  api.get(`/transacao?comprador_id=${this.usuario.id}`).then(response=>{this.compras = response.data})
  }
},
watch:{
  login(){
    this.getCompras()
  }
},
created(){
  this.getCompras()
}
}
</script>

<style scoped>
p{
  font-size: 24px;
}
</style>