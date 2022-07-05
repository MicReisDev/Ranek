<template>
<div>
  <div v-if="this.$store.state.login">  
    <transition mode="out-in" name="popup">
      <div class="popup" v-if="mostrar">{{mensagem}}</div>
    </transition>
    <div class="navbar">
      <nav>
        <ul>
          <li><router-link :to="{name:'usuario'}" class="btn">produto</router-link></li>
          <li><router-link :to="{name:'usuarioCompras'}" class="btn">compras</router-link></li>
          <li><router-link :to="{name:'usuarioVendas'}" class="btn">vendas</router-link></li>
          <li><router-link :to="{name:'editarUsuario'}" class="btn">editar</router-link></li>
          <li><a class="btn" @click.prevent="deslogar">Deslogar</a></li>
        </ul>
      </nav>     
      <div class="view">
        <transition name="paginar" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>Voce não está logado!</h1>
  </div>
</div>
</template>

<script>
export default {
data(){
  return{
    mostrar:true,

  }
},
methods:{
  deslogar(){
    this.$store.dispatch("deslogarUsuario");
    this.$router.push("/login")
  }
},
computed:{
  mensagem(){
  setTimeout(()=>{
      this.mostrar = false
      this.$store.commit("MUDAR_MENSAGEM","")
      },2000)

    if(this.$store.state.mensagem === "Usuário criado com sucesso!"){
      return this.$store.state.mensagem
    }
    else if(this.$store.state.mensagem === ""){
      this.mostrar = false
    }
  },
}
}

</script>

<style scoped>

.popup{
  padding: 1rem 2rem;
  backdrop-filter: blur(4px);
  border: 2px solid #8877FF;
  width: 300px;
  margin: 0 auto;
  box-shadow: 0px 5px 10px 3px gray;
  position: relative;
  top: -100px;
  font-size: 24px;
}

.popup-enter,
.popup-leave-to {
  transform: translate3d(0,-300px,0);
  display: none;
  opacity: 0;
  z-index: -1;
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s;
  display: block;
  opacity: 1;
  z-index: -1;
}
.navbar{
  display: grid;
  grid-auto-columns: repeat(12,1fr);
}
.navbar nav{  
  grid-column: 1/2;
  padding: 20px;
  margin:0;
  height: 100vh;
  border-right:1px solid #8877FF ;
  width: 150px;
  }
.view{
  grid-column: 2/13;

}

.navbar ul{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 22px;
  align-items: left;
  gap: 20px;
}

li a, button{
  color:white;
  background: white;
  color: #8877FF;
  padding: 1rem 2rem;
  text-transform: uppercase;
}
 li:last-child a{
  background: red;
  color: white;;
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

.router-link-exact-active{
  background: #8877FF;
  color: white;
  transform: scale(1.1);
  box-shadow:  0px 5px 10px 1px rgba(0, 0, 0, 0.7);
}
.router-link-exact-active:hover{
    background: #8877FF;
  color: white;
  box-shadow:  0px 5px 10px 1px rgba(0, 0, 0, 0.7);
}
</style>