<template>
<div>
  <div> 
    <div class="dados_comprador">
      <h1>Recibo</h1>
      <h3>Informações do comprador:</h3>
      <h3>Nome: {{compras.comprador_nome}}</h3>
      <h3>Email: {{compras.comprador_email}}</h3>
      <h3>Quantidade: {{compras.quantidade}}</h3>
    </div>
    <div class="dado">
      <h4>Endereço:</h4> 
      <div v-for="dado, key in compras.endereco" :key="key">
        {{key}}: {{dado}}
      </div> 
    </div>
  </div>
</div>
 
</template>
<script>
export default {
props:['compras'],

}
</script>

<style scoped>
h1{
  padding-bottom: 20px;
}
.dados_comprador h2,.dados_comprador h3{
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
  text-align: left;
  padding-bottom:20px;
}

.dado{
  text-align: left;
}
</style>