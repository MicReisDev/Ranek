<template>
<div>
  <cadastro-usuario>
    <h2 class="btn slot" >cadastrar</h2>
  </cadastro-usuario>
  
</div>
</template>

<script>
import CadastroUsuario from "../components/cadastroUsuario.vue"

export default {
components:{CadastroUsuario},


}
</script>

<style scoped>
.slot{
  text-transform: uppercase;
  font-weight: 600;
  font-size: 18px;
  max-width: 100px;
  background: #8877FF;
  margin: 0 auto;
  text-align: center;
}

</style>