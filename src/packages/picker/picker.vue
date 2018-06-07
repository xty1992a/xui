<template>
  <div class="x-picker" ref="wrap" :style="{fontSize: font+'px'}"
       @touchstart="start" @touchmove="move" @touchend="end">
    <ul class="pick-list" :style="{transform:`translate3d(0,${offsetY}px,0)`, transition}" @transitionend="transitionEnd">
      <li class="pick-item" v-for="item,index in data"><p class="text">{{item.text}}</p></li>
    </ul>
  </div>
</template>

<script>
  import {ranger} from '../scripts/helper/index'
  import Touch from '../scripts/mixins/touch'

  export default {
	name: 'x-picker',
	props: {
	  font: {
		type: Number,
		default: 30
	  },
	  value: {
		type: Number,
		required: true
	  },
	  data: {
		type: Array,
		required: true
	  },
	  num: {
		type: Number,
		default: 5
	  }
	},
	mixins: [Touch],
	data () {
	  return {
		offsetY: 0,
		// 上一次偏移值
		offset: {
		  y: 0
		},
		transition: '',
		speed: 0,
	  }
	},
	created() {
	},
	methods: {
	  start(e) {
		this.touchStart(e)
	  },
	  move(e) {
		this.touchMove(e)
		e.preventDefault()
		this.offsetY = this.touch.deltaY + this.offset.y
	  },
	  end(e) {
		this.touchEnd(e)
		this.speed = this.touch.deltaY / this.touch.deltaTime
		this.scrollByValue()
	  },
	  scrollByValue() {
		let s = this.speed
		let self = this
		requestAnimationFrame(step)

		function step() {
		  s *= .96
		  s *= .96

		  // 根据速度计算出每一帧应处于的位置
		  let offset = self.offsetY + s * 17
		  let index = Math.round(offset / self.font)
		  index = ranger(index, -self.data.length + 1, 0)
		  offset = index * self.font
		  if (self.offset.y === offset || self.touch.down) {
			self.offset.y = self.offsetY = ranger(offset, (-self.data.length + 1) * self.font, 0)
			self.$emit('input', -index)
			return
		  }
		  self.transition = '.2s linear'
		  self.offset.y = self.offsetY = offset //  Math.round(offset - s * 8)
		  requestAnimationFrame(step)
		}
	  },
	  transitionEnd() {
		this.transition = ''
	  }
	},
	computed: {
	  scrollIndex() {
		let index = Math.round(this.offsetY / this.font)
		index = ranger(index, -this.data.length + 1, 0)
		return -index
	  }
	},
	watch: {
	  value: {
		handler(now, old) {
		  if (now !== old) {
			this.transition = '.2s linear'
			this.offset.y = this.offsetY = -now * this.font
		  }
		}, immediate: true
	  }
	}
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  .x-picker {
    width: 100%;
    z-index: 1;
    overflow: hidden;
    height: 5em;
    position: relative;
    .pick-list {
      left: 0;
      right: 0;
      top: 2em;
      position: absolute;
      .pick-item {
        text-align: center;
        height: 1em;
        line-height: 1em;
        .text {
          font-size: 15px;
        }
      }
    }
    &:before, &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 2em;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
    }
    &:after {
      bottom: 0;
      transform: rotateX(180deg);
    }
  }
</style>
