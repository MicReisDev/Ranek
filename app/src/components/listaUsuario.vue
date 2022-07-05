<template>

  <div class="box-container">
    <router-link :to="{name:'produto', params:{id:produto.id}}">
        <div  class="boxx">
          <div class="imag">
            <img v-if="produto.fotos" :src="produto.fotos" alt="">
          </div>
          <div class="div">
            <h1>{{produto.nome}} </h1>
            <p>{{produto.preco | numeroPreco}} </p>
            <slot name="quantidade"></slot>
          </div>
            <slot></slot>
        </div>
    </router-link>
</div>
</template>

<script>
export default {
props:["produto"],

}
</script>

<style scoped>

span{
  padding: 5px;

  padding-left:  150px;

}
h1{
  font-size: 28px;
}

.boxx div>p::after{
  content: "clique para ver";
  position: absolute;
  color: #8877FF;
  font-weight: 600;
  border:2px solid #8877FF;
  backdrop-filter: blur(2px);
  padding: 10px;
  font-size: 18px;
  left: 10px;
  border-radius: 4px;
  top:10px
}
p,h2{
  font-size: 20px;
}
.box-container{
display: flex;
flex-direction: column;
padding: 5px;
margin: 0 auto;
max-width: 800px;
}
.boxx{
position: relative;
margin-bottom: 10px;
display: grid;
grid-template-columns: 1fr 1fr;
box-shadow:  0px 5px 10px 1px rgba(0, 0, 0, 0.7);
border-radius: 4px;
height: 150px;
cursor: pointer;
transition: all 0.3s;
}
.boxx:hover {
  transform: scale(1.1);
}
.boxx .div{
  grid-column: 2;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.imag{
max-height: 150px;
}
.imag img {
  object-fit: fill;
}
</style>