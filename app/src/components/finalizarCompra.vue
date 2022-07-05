<template>
<div>
  <div v-if="!(produto.usuario_id === this.$store.state.usuario.id) && this.$store.state.login">
    <div class="dados">
      <h1>Confirme seus dados:</h1>
       <div> <span>CEP : </span> {{usuario.cep}} </div>
       <div> <span>Endereço :</span> {{usuario.rua}}, {{usuario.numero}} </div>
       <div> <span>Bairro :</span> {{usuario.bairro}} </div>
       <div> <span>Cidade :</span> {{usuario.cidade}}</div>
       <div> <span>Estado :</span> {{usuario.estado}} </div>
       <div v-if="produto.estoque">Quantidade disponível: {{estoque}}</div>
       <div><span class="bot" @click="removeCar">-</span> {{compra}}<span class="bot" @click="adcCar">+</span></div>
       <div>
        <button @click.prevent="finalizarCompra" class="btn">Finalizar Compra</button>
       </div>
       <div><p>algo errado? <router-link :to="{name:'editarUsuario'}">editar</router-link></p></div>
    </div>
  </div>
  <div v-else-if="this.$store.state.login">
    <h2>
      este produto é seu e por isso você não consegue comprar-lo
    </h2>
  </div>
  <div v-else>
    <h3 >você não está logado</h3> <h3><router-link :to="{name:'login'}" class="btn">Clique aqui para logar / criar login</router-link> </h3>
  </div>
</div>
</template>

<script>
import { api } from "@/services.js"
export default {
props:['produto','comprados'],
data(){
  return{
    compra:1,
    usuario: this.$store.state.usuario,
  }
},
computed:{
  transacao(){
    return{
      comprador_nome: this.usuario.nome,
      comprador_id: this.usuario.id,
      comprador_email: this.usuario.email,
      produto: this.produto,
      vendedor: this.produto.usuario_id,
      preco: this.produto.preco,
      quantidade: this.compra,
      endereco:{
        logradouro: this.usuario.rua,
        numero: this.usuario.numero,
        bairro: this.usuario.bairro,
        cidade: this.usuario.cidade,
        estado: this.usuario.estado,
      }
}
    },
    estoque(){
      return this.produto.estoque - this.comprados
    }
},
methods:{
  postarCompra(){
    api.post("/transacao", this.transacao).then(()=>{
      this.$router.push({name:"usuarioCompras"})

    })
  },
  finalizarCompra(){
    this.postarCompra();
  },
  removeCar(){
    if(this.compra>1){
      this.compra--          
    }
  },
  adcCar(){
    if(this.compra < this.estoque){
      this.compra++
    }
  },

}
}
</script>

<style scoped>

h3 a{
color: white;
display: inline-block;

}
.btn{
  margin: 40px 0;
}
a{
  color:#8877FF
}
p{
  padding: 20px 0;
  font-size: 16px;
  font-weight: 600;
}
.dados{
  text-align: left;
  max-width: 600px;
  margin:  0px auto;
}

span{
  color: #8877FF ;
  width: 130px;
  display: inline-block;
}
.bot{
  width: auto;
  padding: 0 20px;
  cursor: pointer;
}
</style>