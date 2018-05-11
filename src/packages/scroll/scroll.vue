<template>
  <div class="wrap">
    <div class="refresh-text" ref="refresh" v-show="holdRefresh">
      <div>
        <slot name="refresh">
          <template v-if="!hadEmitReFresh">
            <p class="default-text" v-if="freshHeight===freshOffset">松开加载！</p>
            <p class="default-text" v-else>下拉加载更多</p>
          </template>
          <template v-else>
            <p class="default-text">正在加载中。。。</p>
          </template>
        </slot>
      </div>
    </div>
    <div class="scroll" ref="wrap"
         @touchstart="start"
         @touchmove="move"
         @touchend="end"
         @scroll="scroll">
      <slot></slot>
      <div class="infinite-text" v-show="hadEmitInfinite||done">
        <slot name="infinite">
          <p class="default-text" v-if="done">暂无更多。。。</p>
          <p class="default-text" v-else>加载中。。。</p>
        </slot>
      </div>
    </div>
    <div ref="fixed" class="fixed" v-show="scrollY>100" @click="backTop">top</div>
  </div>
</template>

<script>
  export default {
	name: 'scroll',
	components: {},
	props: {
	  freshHeight: {
		type: [Number, String],
		default: 100
	  },
	  loadHeight: {
		type: [Number, String],
		default: 100
	  },
	  done: {
		type: Boolean,
		default: false
	  },
	  data: {
		type: Array,
		required: true
	  },
	},
	data () {
	  return {
		touch: {},
		holdRefresh: false,
		scrollY: 0,
		freshOffset: 0,
		hadEmitReFresh: false,
		hadEmitInfinite: false,
	  }
	},
	methods: {
	  backTop() {
		let wrap = this.$refs.wrap
		let height = wrap.scrollTop
		let arr = []
		let lang = height / 10
		while (height > 0) {
		  let gap = height -= lang
		  arr.push(Math.round(Math.max(gap, 0)))
		}
		requestAnimationFrame(step)
		function step() {
		  let gap = arr.shift()
		  wrap.scrollTop = gap
		  gap && requestAnimationFrame(step)
		}
	  },
	  freshBack() {
		this.freshOffset = 0
		this.holdRefresh = false
		this.$refs.wrap.style.transform = `translateY(0px)`
		this.$refs.refresh.style.transform = `translateY(0px)`
		this.$refs.wrap.style.transition = 'transform 0.3s linear'
		this.$refs.refresh.style.transition = 'transform 0.3s linear'
		setTimeout(() => {
		  this.$refs.wrap.style.transform = ''
		  this.$refs.refresh.style.transform = ''
		  this.$refs.wrap.style.transition = ''
		  this.$refs.refresh.style.transition = ''
		}, 300)
	  },
	  scroll() {
		clearTimeout(this.timer)
		this.scrollY = this.$refs.wrap.scrollTop
		if (this.touch.down) return
		this.timer = setTimeout(() => {
		  this.emitScrollEnd()
		}, 50)
	  },
	  start(e) {
		clearTimeout(this.timer)
		this.touch.down = true
		this.touch.startY = e.touches[0].pageY
		this.touch.offsetY = this.$refs.wrap.scrollTop
//		console.log('start', this.touch.offsetY)
	  },
	  move(e) {
		clearTimeout(this.timer)
		if (!this.touch.down) return
		if (this.$refs.wrap.scrollTop <= 0) {
		  this.holdRefresh = true
//		  console.log('back top')
		  let deltaY = (this.touch.nowY = e.touches[0].pageY, this.touch.nowY) - this.touch.startY
		  if (deltaY < 0) return
		  let offset = deltaY *= 0.85
		  offset -= this.touch.offsetY
		  this.freshOffset = Math.min(offset, +this.freshHeight)
		  e.preventDefault()
		  this.$refs.wrap.style.transform = `translateY(${offset}px)`
		  this.$refs.refresh.style.transform = `translateY(${this.freshOffset}px)`
//		  console.log(deltaY)
//		  console.log('move')
		}
	  },
	  end() {
		clearTimeout(this.timer)
		if (!this.touch.down) return
		this.touch.down = false
		this.emitScrollEnd()
		this.$emit('touchEnd', this.$refs.wrap.scrollTop)
		this.emitReFresh()
//		console.log('end', this.$refs.wrap.scrollTop)
	  },
	  emitInfinite() {
		if (this.hadEmitInfinite || this.done) return
		if (this.scrollY + this.loadHeight >= this.$refs.wrap.scrollHeight - this.$refs.wrap.clientHeight) {
		  this.$emit('infinite')
		  this.hadEmitInfinite = true
		}
	  },
	  emitReFresh() {
		if (this.freshHeight === this.freshOffset) {
		  if (this.hadEmitReFresh) return
		  this.$emit('refresh')
		  this.hadEmitReFresh = true
		} else {
		  this.freshBack()
		}
	  },
	  emitScrollEnd() {
		this.emitInfinite()
		this.$emit('scrollEnd', this.scrollY)
	  },
	},
	watch: {
	  data() {
		console.log('data change', this.hadEmitReFresh)
		if (this.hadEmitReFresh) {
		  this.freshBack()
		}
		this.hadEmitInfinite = false
		this.hadEmitReFresh = false
	  },
	  done(now) {
		if (now) {
		  this.hadEmitInfinite = false
		  this.hadEmitReFresh = false
		}
	  }
	}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .wrap {
    height: 100%;
    position: relative;
    .refresh-text {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      > div {
        transform: translateY(-100%);
        position: absolute;
        left: 0;
        right: 0;
      }
    }
    .default-text {
      text-align: center;
      margin: 0;
      padding: 10px 0;
    }
    .fixed {
      @size: 40px;
      position: absolute;
      right: 10px;
      bottom: 60px;
      background-color: #fff;
      width: @size;
      height: @size;
      border-radius: 50%;
      line-height: @size;
      text-align: center;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
  }

  .scroll {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
