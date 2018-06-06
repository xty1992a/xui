<template>
  <div class="not-found page">
    <p class="text">404 NOT FOUND</p>
  </div>
</template>

<script>
  export default {
	name: 'not-found',
	components: {},
	data () {
	  return {}
	},
	methods: {},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .not-found {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      font-size: 28px;
      font-weight: bold;
    }
  }
</style>
