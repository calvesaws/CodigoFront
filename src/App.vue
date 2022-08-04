<template>
  <nav>
    
    <router-link to="/">Criptografar mensagem</router-link> |
    <router-link to="/decrypt">Descriptografar mensagem</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #131516;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #b8b8c5;
}

nav a.router-link-exact-active {
  color: #0e0e0f;
}

body {

  background: url(assets/header-3.jpg) no-repeat  ;
  height: 80%;
  object-fit: fill;
}
</style>
