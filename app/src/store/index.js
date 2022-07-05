import { api } from '@/services'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
    login:false,
    mensagem:"",
    usuario:{
      id:"",
      nome:"",
      email:"",
      senha:"",
      cep:"",
      rua:"",
      numero:"",
      bairro:"",
      cidade:"",
      estado:"",
      cep:""
    },
    usuarioProdutos: null,
  },
  getters: {
  },
  mutations: {
    UPDATE_LOGIN(state,payload){
      state.login = payload
    },
    UPDATE_USUARIO(state,payload){
      state.usuario = Object.assign(state.usuario, payload)
    },
    MUDAR_MENSAGEM(state,payload){
      state.mensagem = payload;
    },
    UPDATE_USUARIO_PRODUTOS(state, payload){
      state.usuarioProdutos = payload
    },
    ADD_USUARIO_PRODUTOS(state, payload){
      state.usuarioProdutos.unshift(payload)
    }
  },
  actions: {
    getUsuarioProdutos(context){
      api.get(`/produto?usuario_id=${context.state.usuario.id}`).then(response => {
        context.commit("UPDATE_USUARIO_PRODUTOS", response.data)
      })
    },
    getUsuario(context,payload){
       return api.get(`/usuario?email=${payload.usuario}`).then(response=>{
        if(payload.usuario === response.data[0].email && payload.senha === response.data[0].senha){
        context.commit("UPDATE_USUARIO",response.data[0])
        context.commit("UPDATE_LOGIN",true)
        this.$router.push({name:"home"})
        }
      })
    },
    criarUsuario(context,payload){

     return api.post("/usuario", payload)
    },
    deslogarUsuario(context){
      context.commit("UPDATE_USUARIO",{
        id:"",
        nome:"",
        email:"",
        senha:"",
        cep:"",
        rua:"",
        numero:"",
        bairro:"",
        cidade:"",
        estado:"",
        cep:""
      });
      context.commit("UPDATE_LOGIN",false)

    }
  },
  modules: {
  }
})
