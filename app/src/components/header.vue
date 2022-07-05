<template>
  <div class="conteudo">
    <nav>
      <div class="logo"> <router-link to="/"> <img src="../assets/ranek.svg" alt=""> </router-link></div>
      <div class="buscador">
        <form class="conteudo-buscador">
        <input type="text" v-model="valorBuscar" placeholder="buscar" name="buscar" id="buscar">
        <input type="submit" class="btn"  id="ir" @click.prevent="buscador" value="">
        </form>
      </div>
      <transition name="logado">
      <div class="fazerLogin" v-if="!this.$store.state.login" key=logar> <router-link to="/login" class="btn"> Login</router-link>
      </div>
      <div v-else class="usuario btn" key="logado"><router-link to="/usuario">{{nome}}</router-link></div>
      </transition>
    </nav>
  </div>
</template>

<script>
export default {
data(){
  return{
    valorBuscar:"",
  }
}, 
methods:{
  buscarProduto(){
    this.$router.push({path:"/",query:{ q: this.valorBuscar }})
    this.valorBuscar = ""
  },
  buscador(){
    if(!this.valorBuscar == ""){

      this.buscarProduto()
    }
  }
},
computed:{
  nome(){
   const nome = this.$store.state.usuario.nome.replace(/ .*/, "");
   return nome.toUpperCase()
  }
}
}
</script>

<style scoped>
a{
  color:white
}
.conteudo{
  border-bottom: 1px solid rgba(0, 0, 0, 0.19);
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.19);
}
nav{
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0px auto;
  font-size: 24px;
  font-weight: 900;
  align-items: center;
  padding: 12px 0;

}
img{
  padding-top: 5px ;
  max-width: 100%;
  max-height: 100%;
}
.logo img{
  width: 120px;
}
.fazerLogin a {
  background:#8877FF ;
}
.buscador form{
  display: flex;
  gap: 25px;
}

input[type=text]{
  font-family: Arial, Helvetica, sans-serif;
  min-width: 500px;
  min-height: 35px;
  padding: 5px;
  margin: 0px;
  font-size: 24px;
  font-weight: 100;
  border-radius: 100px;
  border: 3px solid white;
  padding-left: 30px;
  box-shadow: 0px 2px 5px 2px #8877FF;
}

.buscador .btn{
    background:#8877FF ;

}
#buscar{
  transition: all 0.3s;
}
#buscar:hover,#buscar:focus{
outline: none;
transition: all 0.3s;
border: 3px solid #8877FF;
}
.conteudo-buscador{
  display: flex;
  gap: 20px
}
#ir{
  background-image: url("../assets/search.svg") ;
  background-position: center; 
  background-repeat: no-repeat;
  border-radius: 70px;
}
.logado-enter,
.logado-leave-to {
  transform: translate3d(0,-100px,0px);
  opacity: 0;

}

.logado-enter-active,
.logado-leave-active {
  transition: all 0.3s;
  opacity: 1;
}

@media screen and (max-width: 600px){
  input[type=text]{
  min-width: auto;
  min-height: auto;
}
}
</style>