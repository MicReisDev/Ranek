<template>
  <div>
    <div class="add-bg">
      <div class="btn" @click="ativo=!ativo">ADICIONAR PRODUTO</div> 
      <transition mode="out-in">
          <div v-if="ativo" class="addProdutos">
          <form>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" name="nome" v-model="produtoNovo.nome">
            <label for="preco">Preço:</label>
            <input type="text" id="preco" name="preco" v-model="produtoNovo.preco">
            <label for="estoque">Estoque:</label>
            <input type="number" id="estoque" name="estoque" v-model="produtoNovo.estoque">
            <label for="descrição">Descrição:</label>
            <textarea name="descicao" id="decricao" cols="30" rows="10" v-model="produtoNovo.descricao" ></textarea>
            <label for="fotos">Fotos:</label>
            <input type="text" id="fotos" name="fotos" v-model="produtoNovo.fotos">
            <button class="btn" @click.prevent="adcNovoProduto">ADICIONAR</button>
          </form>       
        </div>
      </transition>
    </div>
    <ul>
      <h2 v-if="usuarioProdutos.length>0">Seus produtos:</h2>
      <div v-else>
       <h2>Você ainda não adicionou nada!</h2> 
       <h2>vamos começar?</h2>       
      </div>
      <li v-for="produto, index in usuarioProdutos" :key="index">
        <lista-do-usuario :produto="produto">
          <template v-slot:quantidade>
            <p>estoque: {{produto.estoque}}</p>
          </template>
          <button @click.prevent="excluirProduto(produto)" class="excluir">X</button>
        </lista-do-usuario>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions} from "vuex"
import listaDoUsuario from "@/components/listaUsuario"
import { api } from '@/services.js'
export default {
components:{listaDoUsuario},
data(){
  return{
    ativo:false,
    produtoNovo:{
      nome:"",
      preco:"",
      descricao:"",
      fotos:null,
      usuario_id:"",
      vendido:"false",
      estoque:"",
      id:"",
    }
  }
},
computed:{
  ...mapState(["login", "usuario", "usuarioProdutos"]),

},
methods:{
    ...mapActions(["getUsuarioProdutos"]),
    adcNovoProduto(){     
      this.produtoNovo.id = this.produtoNovo.nome
      this.produtoNovo.usuario_id = this.$store.state.usuario.id
      api.post("/produto", this.produtoNovo)
      this.$router.push({name:"usuario"})
      this.ativo = false
      this.produtoNovo = {
      nome:"",
      preco:"",
      descricao:"",
      fotos:null,
      usuario_id:"",
      vendido:"false",
      estoque:"",
      id:"",
    }
    setTimeout(() => {
      this.getUsuarioProdutos()
    }, 1000);
    },
    excluirProduto(produto){
      const confirmarExclusao = window.confirm(`Deseja realmente excluir o item ${produto.nome}?`)
      if(confirmarExclusao){
      api.delete(`/produto/${produto.id}`)
      setTimeout(() => {
      this.getUsuarioProdutos()
    }, 1000);
    }
    }
},
created(){
this.getUsuarioProdutos()
}
}
</script>

<style scoped>
#estoque{
  width: 60px;
}

.excluir{
  position: absolute;
  height: 30px;
  width: 30px;
  padding: 0px;
  grid-column: 2;
  background: #8877FF;
  color: white;
  border: none;
  right: 0px;
  transition: all 0.3s;
}
.excluir:hover{
  transform: scale(1.2);
  cursor: pointer;
}

form{
box-shadow: 0px 5px 10px 3px #8877FF;
padding: 20px;
border: 4px solid #8877FF;
border-radius: 10px;
}
.add-bg{
  margin-bottom: 60px;
}
div.btn{
  background: #8877FF;
  max-width: 60px;
  font-size: 18px;
}
button.btn{
  grid-column: 2;
  max-width: 200px;
  font-size: 24px;
  background:#8877FF;
}

.addProdutos form{
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  margin: 0 auto;
  max-width: 800px;
}
label{  
  grid-column: 1;
  width: 100px;
  text-align: left;
  }
input,textarea{
  grid-column: 2;
  padding: 10px;
  height: 40px;
  border: 3px solid white;
  margin-bottom:10px;
  border-radius:30px ;
  font-size: 24px;
  transition: 0.3s all;
  box-shadow: 0px 5px 10px 3px #8877FF;
}

input:hover,input:focus,textarea:hover,textarea:focus{
  outline: none;
  border: 3px solid #8877FF;
  box-shadow: 0px 5px 10px 3px #8877FF;
}
textarea{
height: 80px;
border-radius:10px ;
}
</style>