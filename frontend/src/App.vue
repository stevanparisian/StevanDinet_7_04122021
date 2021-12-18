<template>


<div>
      <router-link to="/"></router-link> 
      

 <router-view/> 

</div>
</template>

<script>

import SignUp from './components/SignUp.vue' 

export default {
  name: 'App',
  components: {
SignUp 
  }
}
</script>

<style lang="scss">
html,body {
  padding:0 ;
  margin:0 ;
  margin: auto;
 
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f8f9fa
  ;

  a {
    font-weight: bold;
    color: black;
    margin-right: 50px;


    &.router-link-exact-active {
      color: #122441;
    }
  }
}
.groupo,.nav {
  display: flex;
  align-items: center;
}
.signup {
  margin-right: 5px;
}

</style>
