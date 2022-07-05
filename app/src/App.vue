<template>
  <div id="app">
    <header-top/>
    <main>
      <transition mode="out-in">
        <router-view/>
      </transition>
    </main>
    <footer-bottom/>
  </div>
</template>

<script>
import HeaderTop from "./components/header.vue"
import FooterBottom from "./components/footer.vue"

export default {
components:{HeaderTop, FooterBottom}
}
</script>

<style>

h1{font-weight: 300;}
h2{font-weight: 200;}
h3{font-weight: 100;}
p{font-weight: 100;}
header-top{
  z-index: 1;
}
body, div, p, h1 ,h2 ,h3, ul, li, a{
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
  font-family: "Oswald", Arial, Helvetica, sans-serif;
  color:black;
}

body{
background: rgb(255,255,255);
background: linear-gradient(0deg, rgba(255,255,255,1) 100%, rgba(102,0,255,0.41220238095238093) 0%) no-repeat;
}

.btn{
  color: white;
  display: block;
  padding: 10px 30px;
  border-radius: 4px;
  text-align: center;
  box-shadow:  0px 1px 3px 1px rgba(0, 0, 0, 0.7);
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  background: #8877FF;
}
.btn:hover{
  transform: scale(1.06);
  box-shadow:  0px 5px 10px 1px rgba(0, 0, 0, 0.7);
}

#app{
  display: flex;
  min-height: 100vh;
  flex-direction: column;

}
main{
  flex: 1;
  text-align: center;
  font-size: 32px;
  z-index: 99;
  padding: 20px;
}


.v-enter,
.v-leave-to {
  transform: translate3d(0,900px,300px);
  display: none;
  opacity: 0;
  z-index: -1;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
  display: block;
  opacity: 1;
    z-index: -1;
}
.usuario{
  font-size: 24px;
  border: none;
  background: #8877FF;
  color: white;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.19);
}

img{
  max-height: 100%;
  max-width: 100%;
}
</style>