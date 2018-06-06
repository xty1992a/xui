<template>
  <div class="x-slider-cell" @touchstart="start" @touchmove="move" @touchend="end" @touchcancel="end">
    <div class="x-slider__left" ref="left">
      <slot name="left"></slot>
    </div>
    <div class="x-slider__center" ref="center">
      <slot></slot>
    </div>
    <div class="x-slider__right" ref="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  import {Tween, getFrameArray, rAF} from '@/packages/scripts/dom/tween.js'
  import helper from '../scripts/dom/helper'
  export default {
	name: 'x-slider-cell',
	components: {},
	data () {
	  return {
		touch: {
		  offsetX: 0
		},
		left: 0,
		right: 0
	  }
	},
	mounted() {
	  this.$nextTick(() => {
		this.left = this.$refs.left.clientWidth
		this.right = -this.$refs.right.clientWidth
	  })
	},
	methods: {
	  start(e){
		this.scrollX = false
		let point = helper.isMobile ? e.touches[0] : e
		let touch = this.touch
		touch.startTime = new Date().getTime()
		touch.startX = touch.nowX = point.clientX
		touch.startY = touch.nowY = point.clientY
	  },
	  move(e){
		let center = this.$refs.center
		let point = helper.isMobile ? e.touches[0] : e
		let touch = this.touch
		touch.nowTime = new Date().getTime()
		touch.nowX = point.clientX
		touch.nowY = point.clientY
		let deltaX = touch.nowX - touch.startX
		let deltaY = touch.nowY - touch.startY
		let deltaTime = touch.nowTime - touch.startTime

//		if (deltaTime < 100) {
//		e.stopPropagation()
		this.scrollX = Math.abs(deltaX) > Math.abs(deltaY)
//		} else {
		if (this.scrollX) {
		  e.stopPropagation()
		  deltaX += touch.offsetX
		  deltaX = Math.min(Math.max(this.right, deltaX), this.left)
		  touch.deltaX = deltaX
		  helper.css(center, {
			transform: `translate3d(${deltaX}px, 0,0)`
		  })
		}
//		}
	  },
	  end(e){
		if (!this.scrollX) return
		let point = helper.isMobile ? e.changedTouches[0] : e
		let touch = this.touch
		let deltaX = touch.nowX - touch.startX
		let deltaY = touch.nowY - touch.startY
		let center = this.$refs.center

		let offsetX = 0
		if (deltaX < 0) {
		  if (deltaX + touch.offsetX < this.right / 2) {
			offsetX = this.right
		  }
		} else {
		  if (deltaX + touch.offsetX > this.left / 2) {
			offsetX = this.left
		  }
		}
		touch.offsetX = offsetX
		this.scroll(touch.deltaX, offsetX)
	  },
	  scroll(start, end) {
		let center = this.$refs.center
		let arr = getFrameArray(start, end, 200)
		rAF(step)
		function step() {
		  let offsetX = arr.shift()
		  if (offsetX === undefined) return
		  helper.css(center, {
			transform: `translate3d(${offsetX}px, 0,0)`
		  })
		  rAF(step)
		}
	  }
	},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .x-slider-cell {
    overflow: hidden;
    width: 100%;
    position: relative;
    .x-slider__left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .x-slider__center {
      position: relative;
      z-index: 1;
    }
    .x-slider__right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
</style>
