<template>
  <div>
    <div v-if="compras.length === 0">
      <h1>Você ainda não vendeu nada!</h1>
    </div>
    <div v-else>
      <h2>Suas Vendas:</h2>
      <div class="produtosCompras" v-for="(compra) in compras" :key="compra.id">
        <produtos-comprados :produto="compra.produto">
          <template v-slot:quantidade>
            <p>vendidos: {{compra.quantidade}}</p>
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
  api.get(`/transacao?vendedor=${this.usuario.id}`).then(response=>{
    this.compras = response.data  
  console.log(this.compras)})
 
  },
  estoque(){
    let total = 0
    api.get(`/transacao`).then((response)=>{
      response.data.forEach((i)=>{
        if (i.produto.id === this.produto.id){          
          total = total + Number(i.quantidade)
           
        }
          this.comprados = total  
      })
    })
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

<style>

</style>