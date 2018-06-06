<template>
  <div class="x-picker" ref="wrap" :style="{fontSize: font+'px'}"
       @touchstart="start" @touchmove="move" @touchend="end">
    <ul class="pick-list" :style="{transform:`translate3d(0,${offsetY}px,0)`, transition}" @transitionend="transitionEnd">
      <li class="pick-item" v-for="item in data"><p class="text">{{item.text}}</p></li>
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
		let speed = this.touch.deltaY / this.touch.deltaTime
		let absS = Math.abs(speed)
		let end
		// 速度大于0.5px每毫秒,自动滚动
		if (absS > 0.5) {
		  end = this.touch.deltaY + this.offsetY
		  if (absS > 2) {
			if (speed > 0) {
			  end = 0
			} else {
			  end = (this.data.length - 1) * -this.font
			}
		  }
		  let time = .3
		  let gap = Math.abs(end - this.offsetY)
		  if (gap > 80) {
			time = .7
		  }
		  if (gap > 200) {
			time = 1
		  }
		  if (gap > 300) {
			time = 2
		  }
		  console.log(time)
		  this.offsetY = end
		  this.transition = time + 's cubic-bezier(0,.34,.06,.7)'
		}
		else {
		  this.transition = '.2s linear'
		}
		let index = Math.round(this.offsetY / this.font)
		index = ranger(index, -this.data.length + 1, 0)
		this.offsetY = index * this.font
		this.offset.y = this.offsetY
		this.$emit('input', -index)
	  },
	  transitionEnd() {
		this.transition = ''
	  }
	},
	computed: {},
	watch: {
	  value: {
		handler(now, old) {
		  if (Math.abs(now - old) > 5) {
			this.transition = '1s linear'
		  } else {
			this.transition = '.2s linear'
		  }
		  this.offset.y = this.offsetY = -now * this.font
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
