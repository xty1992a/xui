<template>
  <div class="clip page">
    <div class="slider" ref="slider" :style="{transform:`translate3d(${offsetX}px,0,0)`, transition, webkitClipPath: clipPath}"
         @transitionend="transitionEnd"
         @touchstart="start" @touchmove="move" @touchend="end">
      <scroll :data="list">
        <div class="page-content">
          <ul class="list">
            <li class="item" v-for="i in list">{{i}}</li>
          </ul>
        </div>
      </scroll>
    </div>
    <x-floater class="float" v-model="floatPos" :style="{opacity}" ref="float" stick>
      <div class="icon" @tap="showPage"></div>
    </x-floater>
  </div>
</template>

<script>
  import Touch from '@/packages/scripts/mixins/touch.js'
  let html = document.documentElement
  export default {
	name: 'clip',
	mixins: [Touch],
	components: {},
	data () {
	  return {
		offsetX: 0,
		show: true,
		opacity: 0,
		transition: '',
		floatPos: {
		  x: html.clientWidth - 60,
		  y: html.clientHeight - 60,
		},
		list: Array(30).fill(0).map((n, i) => i)
	  }
	},
	methods: {
	  start(e) {
		this.touchStart(e)
	  },
	  move(e) {
		this.touchMove(e)
		if (this.touch.direction === 'y') return
		e.preventDefault()
		if (this.touch.deltaX < 0) return
		this.opacity = this.offsetX / 300
		this.offsetX = this.touch.deltaX
	  },
	  end(e) {
		if (!this.offsetX) return
		this.transition = '.3s linear'
		if (this.offsetX > 150) {
		  this.show = false
		} else {
		  this.opacity = 0
		}
		this.offsetX = 0
	  },
	  showPage() {
		this.transition = '.3s linear'
		this.opacity = 0
		this.show = !this.show
	  },
	  transitionEnd() {
		this.transition = ''
	  }
	},
	computed: {
	  clipPath() {
		let {x, y} = this.floatPos
		x += 25
		x -= this.offsetX
		y += 25
		// ellipse(radiusX radiusY at cx cy)
		return this.show ? `circle(800px at ${x}px ${y}px)` : `circle(0px at ${x}px ${y}px)`
//		return this.show ? `ellipse(550px 900px at ${x}px ${y}px)` : `ellipse(0px 0px at ${x}px ${y}px)`
	  }
	}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .clip {
    background-color: #fff;
    .slider {
      background-color: #f7f7f7;
      height: 100%;
      .list {
        padding-left: 10px;
        .item {
          line-height: 45px;
          border-bottom: 1px solid #e5e5e5;
          &:nth-child(2n) {
          }
        }
      }
    }

    .icon {
      height: 50px;
      width: 50px;
      background-color: rgba(0, 0, 0, 0.7);
    }
    .float {
      position: absolute;
      left: 0;
      top: 0;
      transition: opacity .2s;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
