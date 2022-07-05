<template>
<div>
  <div v-if="produto" class="produto">
    <img  v-if="produto.fotos" :src="produto.fotos" :alt="produto.id" >
    <div class="infos">
      <h1 class="nome">{{produto.nome}}</h1>
      <p class="preco">{{produto.preco | numeroPreco}}</p>    
    </div>
    <div class="desc">
       <h2>{{produto.descricao}}</h2>   
    </div>
    <div v-if="compras" class="venda" @click.prevent="mostrarrecibo=!mostrarrecibo"><h1>você vendeu este item</h1><buttom > ver recibo </buttom></div>
    <button v-else-if="produto.estoque - comprados" key="dados" class="btn" @click="mostrar = !mostrar" >comprar</button>
    <div v-else class="esgotado">produto esgotado</div>
  </div>
    <transition>
        <div v-if="mostrar" key="compra">
          <finalizar-compra :produto="produto" :comprados="comprados"></finalizar-compra>
        </div>
    </transition>
    <transition>
      <div v-if="compras && mostrarrecibo" key="dados" class="recibo">
        <recibo :compras="compras"/>
      </div>
  </transition>
</div> 
</template>

<script>
import { api } from "@/services.js"
import finalizarCompra from "@/components/finalizarCompra.vue"
import recibo from "@/components/recibo.vue"
export default {
  components:{
    finalizarCompra,
    recibo
  },
  data(){
    return{
      produto:[],
      mostrar:false,
      compras:null,
      mostrarrecibo:false,
      comprados:"",
    }
  },
  computed:{
    usuario(){
      return this.$store.state.usuario
    }
  },
  name:"produtos",
  props: ["id"],
  methods:{
    fetchProdutos(){
      api.get(`/produto/${this.id}`).then(response=> {
        this.produto = response.data
      })
    },
    getCompras(){
      api.get(`/transacao?vendedor=${this.usuario.id}`).then(response=>{
        const Carray = response.data
        Carray.forEach((i)=>{
          if(i.produto.id === this.id ){
          this.compras = i       
          
          }
        })
     })
    },
    estoque(){
    let total = 0
    api.get(`/transacao`).then((response)=>{
      response.data.forEach((i)=>{
        if (i.produto.id === this.produto.id){          
          total = total + Number(i.quantidade)
           
        }
          this.comprados = total  
          console.log(this.comprados)  
      })
    })
  }
    },
  created(){
    this.fetchProdutos();
    this.getCompras()
  },
  watch:{
    produto(){
      this.estoque()
    }
  }
}
</script>

<style scoped>
.nome{
  text-transform: uppercase;
  letter-spacing: 2px;
}
.preco{
  color:orange;
  font-weight: 800;
}
.esgotado{
  grid-column: 1/-1;
  color: red;
  text-transform: uppercase;
}
h2{
  display: inline;
  }
.recibo {
  padding: 20px;
  border: 1px solid black;
  margin: 20px auto;
  max-width: 800px;
}

.produto{
display: grid;
grid-template-columns: repeat(12,1fr);
grid-template-rows: auto 1fr 1fr;
max-width: 900px;
margin: 0 auto;
box-shadow: 1px 1px 10px 1px black;
padding: 20px;
align-items: center;
}

img{
  grid-column: 1/6;
}

.infos{
grid-column: 6/13;
}
button{
  height: 90px;
  grid-row:3 ;
  grid-column: 1/-1;
  align-self: end;
  font-size: 32px;
}
.desc{
  grid-column: 1/-1;
}
.venda{
  grid-row:3 ;
  grid-column: 1/-1;
  cursor: pointer;
  background: #8877FF;
  color: white;
  border-radius: 4px;
}
.venda buttom{
  border-top: 4px solid white;
  background: #8877FF;
  display: block;
  padding: 15px;
}
.venda h1{
  color: white;
}
</style>