import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/home.vue"
import Login from "@/views/login.vue"
import Produto from "@/views/produto.vue"
import Usuario from "@/views/usuario/usuario.vue"
import NovoUsuario from "@/views/NovoUsuario.vue"
import UsuarioCompras from "@/views/usuario/usuarioCompras.vue"
import UsuarioProdutos from "@/views/usuario/usuarioProdutos.vue"
import UsuarioVendas from "@/views/usuario/usuarioVendas.vue"
import editarUsuario from "@/views/usuario/editarUsuario.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/produto/:id',
    name: 'produto',
    component: Produto,
    props: true,
  },
  {
  path: '/usuario',
  component: Usuario,
  children:[
    {
    path:"/",
    name:"usuario",
    component: UsuarioProdutos
    },
    {
      path:"vendas",
      name:"usuarioVendas",
      component: UsuarioVendas
    },
    {
      path:"compras",
      name:"usuarioCompras",
      component: UsuarioCompras
    },
    {
      path:"editar",
      name:"editarUsuario",
      component: editarUsuario
    }

  ]
  },
  {
    path: '/novoUsuario',
    name: 'novoUsuario',
    component: NovoUsuario,
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(){
    return window.scrollTo({top:0, behavior:"smooth"})
  }
})

export default router
