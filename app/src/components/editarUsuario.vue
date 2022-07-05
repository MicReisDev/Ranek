<template>
  <div>
    <form>
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" v-model="novoUsuario.nome">

      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="novoUsuario.email">

      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" v-model="novoUsuario.senha">

      <label for="cep">CEP</label>
      <input type="text" name="cep" id="cep" v-model.lazy="cep"><span v-if="mensagem">{{mensagem}}</span>

      <label for="rua">Rua</label>
      <input type="text" name="rua" id="rua" v-model="novoUsuario.rua">

      <label for="numero">Número</label>
      <input type="number" name="numero" id="numero" v-model="novoUsuario.numero">

      <label for="bairro">Bairro</label>
      <input type="text" name="bairro" id="bairro" v-model="novoUsuario.bairro">

      <label for="cidade">Cidade</label>
      <input type="text" name="cidade" id="cidade" v-model="novoUsuario.cidade">

      <label for="estado">Estado</label>
      <input type="text" name="estado" id="estado" v-model="novoUsuario.estado">

      <button @click.prevent="enviarDados">
      <slot></slot>
      </button>
    </form>
     


  </div>
</template>

<script>
import { api } from "@/services.js" 

export default {
  data(){
    return{
      mensagem:"",
      cep: this.$store.state.usuario.cep,
      novoUsuario:{
        nome: this.$store.state.usuario.nome,
        email: this.$store.state.usuario.email,
        senha: this.$store.state.usuario.senha,
        rua: this.$store.state.usuario.rua,
        cep:"",
        numero: this.$store.state.usuario.numero,
        bairro: this.$store.state.usuario.bairro,
        cidade: this.$store.state.usuario.cidade,
        estado: this.$store.state.usuario.estado,
      },
    }
  },

  methods:{
    enviarDados(){
        this.$store.commit("UPDATE_USUARIO", this.novoUsuario)
        this.$router.push({name:"usuario"})
        const usuario = `/usuario/${this.$store.state.usuario.id}`
        setTimeout(()=>{
          api.put(usuario,this.$store.state.usuario).then(()=>{
          this.$store.dispatch("getUsuario",this.$store.state.usuario.id);
          })

        },3000)

      }
  },
  watch:{
      cep(){
        if(this.cep){
        fetch(`https://viacep.com.br/ws/${this.cep}/json/`).then(response=> {

          if(response.status === 400){
            if(this.cep.length<8){
                this.mensagem = "o cep tem que ter 8 digitos"
            }else{
              this.mensagem = "cep não encotrado"
            }
            
            this.novoUsuario.cep = ""
            this.novoUsuario.rua = ""
            this.novoUsuario.bairro = ""
            this.novoUsuario.cidade = ""
            this.novoUsuario.estado = ""

          }
          else{
            response.json().then(result  => {
            this.cep = result.cep
            this.novoUsuario.cep = result.cep
            this.novoUsuario.rua = result.logradouro
            this.novoUsuario.bairro = result.bairro
            this.novoUsuario.cidade = result.localidade
            this.novoUsuario.estado = result.uf
            this.mensagem = ""
          })
         }
        })
        }
      },

  }
}
</script>

<style scoped>
button{
  margin-top:30px ;
  font-size: 18px;
  padding: 0;
  border: none;
  background: none;
}

div{
  margin: 0 auto;
  width: 400px;
  padding: 0;
}
div form{
display: grid;
grid-auto-columns: 1fr 1fr;

} 
label{
  font-size: 24px;
  grid-column: 1;
  text-align: left;
}
input{
  padding: 10px;
  height: 40px;
  border: 3px solid white;
  margin-bottom:10px;
  border-radius:30px ;
  font-size: 24px;
  transition: 0.3s all;
  box-shadow: 0px 5px 10px 3px gray;
  grid-column: 1/-1;
  max-width: 400px;
}
input:hover,input:focus{
  outline: none;
  border: 3px solid #8877FF;
  box-shadow: 0px 5px 10px 3px #8877FF;
}

#cep{
  max-width: 200px;
  
}

span{
font-size: 16px;
position: relative;
padding: 0;
color: red;
top: -53px;
left:130px;
padding: 0;
margin: 0;
display: inline;
  }
  input:last-child{
    margin-bottom: 32px;
  }
</style>