<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
	name: 'App',
	mounted() {
	  setTimeout(() => {
	  }, 1000)
	}
  }
</script>

<style>
  @import "./styles/index.less";

  #app {
  }
</style>
