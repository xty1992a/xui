<template>

  <div class="x-ranger-wrap">
    <div class="x-ranger" ref="wrap">
      <div class="ranger__filler" :style="fillStyle"></div>
      <div class="ranger__handler" :style="handStyle">
        <div class="ranger__num" v-show="mouse.isDown">{{value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import helper from '../scripts/dom/helper.js'

  export default {
	name: 'ranger',
	props: {
	  value: {
		type: Number,
		default: 0
	  },
	  // 起点
	  start: {
		type: Number,
		default: 0
	  },
	  // 级数
	  step: {
		type: Number,
		default: 90
	  }
	},
	data() {
	  return {
		width: 250,
		progress: 0,       // 组件的核心属性
		mouse: {
		  start: 0,
		  now: 0,
		  progress: 0,
		  isDown: false,
		},      // 鼠标数值容器
	  }
	},
	mounted() {
	  this.init()
	  this.listen()
	},
	methods: {
	  init() {
		this.width = this.$refs.wrap.clientWidth
		this.progress = (this.value - this.start) / this.step
	  },
	  listen() {
		this.$nextTick(() => {
		  let events = {
			down: this.isMobile ? 'touchstart' : 'mousedown',
			move: this.isMobile ? 'touchmove' : 'mousemove',
			up: this.isMobile ? 'touchend' : 'mouseup',
		  }
		  let wrap = this.$refs.wrap
		  wrap.addEventListener(events.down, this.down.bind(this))
		  document.addEventListener(events.move, e => {
			if (!this.mouse.isDown) return
			e.preventDefault();
			let point = this.isMobile ? e.touches[0] : e
			this.mouse.now = point.pageX
			let {now, start, progress} = this.mouse
			let deltaX = now - start
			this.progress = Math.min(1, Math.max(progress + (deltaX / this.width), 0))
			this.$emit('input', this.currentStep + this.start)
		  })
		  document.addEventListener(events.up, e => {
			if (!this.mouse.isDown) return
			this.mouse.isDown = false
			this.progress = this.currentStep / this.step
			this.$emit('done')
		  })
		})
	  },
	  down(e) {
		let point = this.isMobile ? e.touches[0] : e
		console.log('down')
		this.mouse.isDown = true
		this.mouse.start = point.pageX
		this.mouse.progress = this.progress
	  },
	},
	computed: {
	  handStyle() {
		let width = this.width * this.progress
		return {
		  transform: `translate3d(${width}px, -50%, 0)`
		}
	  },
	  isMobile: () => helper.isMobile,
	  fillStyle() {
		return {
		  width: this.width * this.progress + 'px'
		}
	  },
	  stepWidth() {
		return this.width / this.step
	  },
	  currentStep() {
		let width = this.width * this.progress
		return Math.round(width / this.stepWidth)
	  }
	},
	watch: {
	  value() {
		if (this.mouse.isDown) return
		this.progress = (this.value - this.start) / this.step
	  }
	}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>

  .x-ranger-wrap {
    padding: 0 20px;
    min-height: 30px;
    display: flex;
    align-items: center;
  }

  .x-ranger {
    width: 100%;
    height: 4px;
    border-radius: 2px;
    position: relative;
    background-color: #E5E5E5;
    .ranger__filler {
      background-color: #BBDDFF;
      border-radius: 2px;
      height: 100%;
    }
    .ranger__handler {
      cursor: pointer;
      height: 20px;
      width: 20px;
      background-color: #fff;
      border: 2px solid #BBDDFF;
      left: -7px;
      top: 50%;
      position: absolute;
      border-radius: 50%;
    }

    .ranger__num {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate3d(-50%, -150%, 0);
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 4px;
      color: #fff;
      width: 30px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate3d(-50%, 100%, 0);
        border: 6px solid transparent;
        border-top-color: rgba(0, 0, 0, 0.6);
      }
    }
  }
</style>
