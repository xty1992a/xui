<template>
  <div class="keyboard-page page">
    <p class="text">输入密码:</p>
    <x-password-input @tap.native="show=true" :value="password.length"></x-password-input>
    <x-number-keyboard :show.sync="show" v-model="password"></x-number-keyboard>
  </div>
</template>

<script>
  export default {
	name: 'keyboard-page',
	components: {},
	data () {
	  return {
		show: true,
		password: ''
	  }
	},
	methods: {},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .keyboard-page {
    width: 100%;
    .text {
      line-height: 40px;
      padding-left: 10px;
    }
  }
</style>
