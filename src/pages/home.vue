<template>
  <div class="home">
    <h3 @click="show=!show">there is home</h3>
    <count size="normal" v-model="goods.count" :max="goods.inventory"></count>
    <action v-show="show" @cancel="show=false">
      <div class="downer" slot="bottom"></div>
    </action>
  </div>
</template>

<script>
  import Request from 'api/index.js'
  export default {
	name: 'home',
	components: {},
	props: {},
	data () {
	  return {
		goods: {
		  count: 1,
		  inventory: 10
		},
		show: false
	  }
	},
	created() {
	  Request({}) // {#}
	},
	methods: {},
	computed: {},
	watch: {
	  show(now) {
		if (!now) {
		  this.$dialog._toast('hello world')
		}
	  }
	}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped type="text/less">

  .home {
    .count-wrap {
      width: 100%;
      height: 200px;
    }
    .downer {
      height: 300px;
      background-color: #fff;
    }
  }
</style>
<style>
  .action {
    bottom: 0;
  }
</style>
