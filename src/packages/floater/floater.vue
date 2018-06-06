<template>
  <div class="x-floater" ref="wrap"
       :style="{transform:`translate3d(${offsetX}px,${offsetY}px,0)`}"
       @touchstart="start" @touchmove="move" @touchend="end">
    <slot></slot>
  </div>
</template>

<script>
  import {ranger} from '../scripts/helper/index'
  import Touch from '../scripts/mixins/touch'

  export default {
	name: 'x-floater',
	props: {
	  value: {
		type: Object,
		default: () => ({x: 0, y: 0})
	  },
	  padding: {
		type: String,
		default: '10,10'
	  },
	  stick: Boolean
	},
	mixins: [Touch],
	data () {
	  return {
		offsetX: 0,
		offsetY: 0,
		// 上一次偏移值
		offset: {
		  x: 0,
		  y: 0
		},
		// 容器的宽高
		wrap: {
		  width: 375,
		  height: 667
		},
		// 自身的宽高
		width: 50,
		height: 50
	  }
	},
	created() {
	  this.offset.x = this.offsetX = this.value.x
	  this.offset.y = this.offsetY = this.value.y
	  setTimeout(() => {
		this.getParent()
	  }, 30)
	},
	methods: {
	  getParent() {
		let el = this.$refs.wrap
		let parent = el.parentNode
		this.wrap.width = parent.clientWidth
		this.wrap.height = parent.clientHeight
		this.width = el.clientWidth
		this.height = el.clientHeight
		console.log(parent, el.clientWidth)
	  },
	  start(e) {
		this.touchStart(e)
		console.log('start')
	  },
	  move(e) {
		this.touchMove(e)
		console.log('move')
		e.preventDefault()
		this.offsetX = this.touch.deltaX + this.offset.x
		this.offsetY = this.touch.deltaY + this.offset.y
	  },
	  end(e) {
		this.touchEnd(e)
		let [x, y] = this.padding.split(',').map(i => parseInt(i))
		console.log(x, y)
		if (this.stick) {
		  if (this.offsetX < this.wrap.width / 2) {
			this.offsetX = x
		  } else {
			this.offsetX = this.wrap.width - this.width - x
		  }
		}
		this.offsetY = Math.min(this.wrap.height - this.height - y, Math.max(y, this.offsetY))
		this.offset.x = this.offsetX
		this.offset.y = this.offsetY
		this.emitValue()
	  },
	  emitValue() {
		this.$emit('input', {
		  x: this.offsetX,
		  y: this.offsetY
		})
	  }
	},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  .x-floater {
    z-index: 1;
  }
</style>
