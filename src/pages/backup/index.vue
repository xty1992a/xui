<template>
  <div class="backup page" ref="wrap">
    <ul class="list">
      <li class="item" v-for="i in 50">{{count}}</li>
    </ul>
    <div class="back-top" @tap="goToTop">
      <i class="iconfont">top</i>
    </div>
  </div>
</template>

<script>
  import {Tween, getFrameArray, rAF} from '@/packages/scripts/dom/tween.js'
  export default {
	name: 'backup',
	components: {},
	data () {
	  return {
		count: 100
	  }
	},
	mounted() {
	  this.setCount()
	},
	methods: {
	  goToTop() {
		let wrap = this.$refs.wrap
		let top = wrap.scrollTop
		let arr = getFrameArray(top, 0, 1000)
		rAF(step)

		function step() {
		  let top = arr.shift()
		  if (top === undefined) return
		  wrap.scrollTop = top
		  rAF(step)
		}
	  },

	  setCount() {
		let arr = getFrameArray(0, 100, 9000).map(Math.round)
		let self = this
		rAF(step)

		function step() {
		  let count = arr.shift()
		  if (count === undefined) return
		  self.count = count
		  rAF(step)
		}
	  }
	},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .backup {
    background-color: #f7f7f7;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .list {
      padding: 10px;
      .item {
        list-style: none;
        height: 90px;
        background-color: #fff;
        margin-bottom: 10px;
      }
    }
    .back-top {
      position: fixed;
      right: 10px;
      bottom: 10px;
      height: 40px;
      width: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 50%;
    }
  }
</style>
