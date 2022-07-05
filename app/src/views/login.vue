<template>
  <div>
    <div v-if="!this.$store.state.login">
      <h1>LOGIN</h1>
      <form >
        <label for="login">Email </label>
        <input type="email" name="login" id="login" placeholder="email" v-model="login.usuario">
        <label for="senha">Senha</label>
        <input type="password" name="senha" id="senha" placeholder="senha" v-model="login.senha">
        <button class="btn" @click.prevent="logar">ENTRAR</button>
      </form>
      <p> <router-link to="/novoUsuario"> não é cadastrado? clique aqui</router-link> </p>
    </div>  
    <div v-else>
      <lista-produtos/>
    </div>
  </div>
</template>

<script>
import novoUsuario from "@/views/NovoUsuario.vue"
import ListaProdutos from '../components/ListaProdutos.vue'
export default {
  components: { ListaProdutos, novoUsuario },
  data(){
    return{
      login:{     
      usuario:"",
      senha:""
      }
    }
  }, 
  methods:{
  logar(){
    this.$store.dispatch("getUsuario",this.login)
  }
  }
}
</script>

<style scoped>
a{
  color:#8877FF;
}
p{
  padding: 5px;
  font-size: 24px;
  color:#8877FF;
  cursor: pointer;
  display: inline;
}

p:hover{
  text-decoration: underline;
}
.btn{
  background-color:#8877FF;
  max-width: 200px;
  margin: 0 auto;

}
h1{
  color: #8877FF;
  font-weight: 900;
}
form{
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 400px;
}
label{
  font-size: 18px;
  text-align: left;
  margin-left: 20px;
}
input{
  padding: 10px;
  height: 40px;
  border: 3px solid white;
  margin-bottom:10px;
  border-radius:30px ;
  font-size: 24px;
  transition: 0.3s all;
  box-shadow: 0px 5px 10px 3px #8877FF;
}
input:hover,input:focus{
  outline: none;
  border: 3px solid #8877FF;
  box-shadow: 0px 5px 10px 3px #8877FF;
}
</style>