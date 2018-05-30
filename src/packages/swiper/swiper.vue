<template>
  <div class="swipper" ref="wrap">
    <slot></slot>
  </div>
</template>

<script>
  import Swipper from '../scripts/dom/swiper'
  export default {
	name: 'swiper',
	components: {},
	props: {
	  data: {
		type: Array,
		required: true
	  }
	},
	data () {
	  return {
		swipper: null,
	  }
	},
	mounted() {
	  this.$nextTick(this.freshSwipper)
	},
	methods: {
	  freshSwipper() {
		setTimeout(() => {
		  let wrap = this.$refs.wrap
		  if (wrap) {
			if (this.swipper) {
			  this.swipper.refresh()
			} else {
			  this.swipper = new Swipper(wrap)
			}
		  }
		}, 20)
	  }
	},
	computed: {
	  index() {
		return this.swipper.currentIndex
	  }
	},
	watch: {
	  data: {
		handler() {
		  this.freshSwipper()
		}, immediate: true
	  }
	},
	destroyed() {
	  this.swipper && this.swipper.destroy()
	}
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  @import "../style/swipper";

  .swipper {
    height: 244px;
    overflow: hidden;
  }
</style>
