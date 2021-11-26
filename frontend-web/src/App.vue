<template>
  <div id="nav">
    <router-link to="/">Produtos</router-link> |
    <router-link to="/new-product">Novo Produto</router-link>
  </div>
  <router-view />
</template>

<style>
body {
  display: flex;
  justify-content: center;
  height: "100%";
  width: "100%";
}
#app {
  display: flex;
  justify-content: center;
  flex-direction: column;

  font-family: sans-serif, Avenir, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
