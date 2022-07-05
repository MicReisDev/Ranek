<template>
<div>
  <transition mode="out-in" name="paginar">
    <div v-if="produtos.length>0" class="conteudo" key="aparecerprodutos">
        <ul>
          <li v-for="produto,index in produtos" :key="produto.id + index">
            <div v-if="produto.vendido =='false'" class="box">
              <router-link :to="{name:'produto', params:{id: produto.id}}" class="item">
                <img v-if="produto.fotos" :src="produto.fotos">
                <div>
                  <h1>{{produto.nome}}</h1>
                  <p class="preco">{{produto.preco | numeroPreco}}</p> 
                  <h3>Clique para ver mais!</h3>             
                </div>
              </router-link>
            </div>
          </li>
        </ul>
    </div>
    <div v-if=" produtos && produtos.length==0" key="semproduto">
      <h1>produto inexistente...</h1>
    </div >
    <div v-else key="carregando"> 
      <loading/>
    </div>
  </transition>
  <contador-pagina :maxProdutosPag="maxProdutosPag" :totalProdutos="totalProdutos" class="contador"/>
</div>
</template>

<script>

import { api } from "../services.js"
import { ativarBuscador } from "../ajuda.js"
import contadorPagina from "./paginarProdutos.vue"

export default {
data(){
  return{
    produtos:{},
    maxProdutosPag:9,
    totalProdutos:0,
  }
},
components:{
  contadorPagina
},
methods:{
  fetchProdutos(){
    this.produtos = {}
    api.get(this.url).then(response=>{
    this.totalProdutos = Number(response.headers["x-total-count"]);
    this.produtos = response.data;
    } )

  
  }
},
computed:{
  url(){
    const query = ativarBuscador(this.$route.query);
    return  `/produto?_limit=${this.maxProdutosPag}${query}`
  }
},
watch:{
  url(){
      this.fetchProdutos()
  }
},
created(){
  this.fetchProdutos()
}
}
</script>

<style scoped>
h3{
  font-size: 25px;
  color:#8877FF;
}
.preco{
  color:orange
}
.box{
  width: 350px;
  height: 200px;
}

.item{  
    display: grid;
  grid-template-columns: 1fr 1fr;
  align-items:center;
  }

h1{
  font-size: 32px;
}
.conteudo{
  min-height: 800px;
}
ul{
  max-width: 1400px;
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;

}
li{
  padding: 1rem 2rem;
  background: #f5f4f5;
  color: white;
  border-radius: 4px;
  border: 3px solid #f5f4f5;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.50);
  min-width: 300px;
  transition: 0.5s;
}

li:hover{
  z-index: 1;
  border: 3px solid ;
  transition: 0.5s;
  box-shadow: 0px 0px 15px 3px #8877FF;
  cursor: pointer;
  transform: scale(1.1);
}

.contador{
  margin-top:50px ;
}

.paginar-enter,
.paginar-leave-to {
  transform: translate3d(900px,0,300px);
  display: none;
  opacity: 0;
  z-index: -1;
}

.paginar-enter-active,
.paginar-leave-active {
  transition: all 0.3s;
  display: block;
  opacity: 1;
    z-index: -1;
}

img{max-width: 100%;}

</style>