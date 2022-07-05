<template>
  <div v-if="totalPaginas > 1" class="container">
    <router-link v-if="next > 1 " :to ="{query:{_page: next-1}}" class="setas"> < </router-link>
    <ul>
      <li v-for="pagina in maxPags" :key="pagina">
        <router-link :to="{query: query(pagina)}">{{pagina}}</router-link> 
      </li>
    </ul>
    <router-link v-if="(0 < next && next < totalPaginas)" :to ="{query:{_page: next+1}}" class="setas"> > </router-link>
    <router-link v-if="!next>0" :to ="{query:{_page: 2}}"  class="setas"> > </router-link>
  </div>
</template>

<script>
export default {
props:{
  totalProdutos:{
    type:Number,
    default:1
  },
  maxProdutosPag:{
    type:Number,
    default:1
  }
},
computed:{
  next(){
   const target = Number(this.$route.query._page)
   return target 
  },
  totalPaginas(){
    const total = this.totalProdutos / this.maxProdutosPag;
    return (total !== Infinity) ? Math.ceil(total) : 0;
  },
  maxPags(){
    const total =  this.totalPaginas;
    const mostrarPaginas= [];    
    
    for(let i = 1; i<=total; i++){
      mostrarPaginas.push(i);
    }

      mostrarPaginas.splice(0,this.next -4)
      mostrarPaginas.splice(7, total)
      return mostrarPaginas
  }
},
methods:{
  query(pagina){
    return{
      ...this.$route.query,
      _page:pagina
    }
  }
}
}
</script>

<style scoped>
ul{
font-size: 20px;
display: flex;
justify-content: center ;
gap: 10px;
}
li a {
  transition: all 0.3s;
  padding: 5px 15px; 
  border-radius: 150px;
}
 li a:hover,.router-link-exact-active {
  color: white;
  background: #8877FF;

 }
.container{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px
}

.setas{

  color:#8877FF;

}
</style>