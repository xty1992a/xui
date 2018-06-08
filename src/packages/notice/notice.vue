<template>
  <div class="x-notice" :style="colorStyle">
    <div class="notice__left notice__icon">
      <i class="iconfont" :class="icon&&icon.split(',')[0]"></i>
    </div>
    <div class="notice__content" ref="wrap">
      <template v-if="text.length===1">
        <p class="notice__single-text notice__text" ref="single" :style="singleStyle">{{text[0]}}</p>
      </template>
      <template v-if="text.length>1">
        <div class="notice__slider" :style="{transition, transform}" @transitionend="endHandler">
          <p class="notice__multi-text notice__text" v-for="t in text">{{t}}</p>
          <p class="notice__multi-text notice__text">{{text[0]}}</p>
        </div>
      </template>
    </div>
    <div class="notice__right notice__icon" @tap="$emit('right-tap')">
      <i class="iconfont" :class="icon&&icon.split(',')[1]"></i>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'x-notice',
	components: {},
	props: {
	  text: {
		type: Array,
		required: true
	  },
	  icon: {
		type: String,
	  },
	  color: {
		type: String,
		default: '#000,#fff',
	  },
	  stay: {
		type: Number,
		default: 2000
	  }
	},
	data () {
	  return {
		index: 0,
		transition: '',
		transform: '',
		singleStyle: {
		  animationDuration: '0s',
		}
	  }
	},
	methods: {
	  scrollCol(stay = this.stay) {
		console.log('scroll')
		this.timer = setTimeout(() => {
		  this.index++
		  if (this.index === this.text.length + 1) {
			this.index = 0
			this.transform = `translate3d(0,0,0)`
			setTimeout(() => {
			  this.scrollCol(0)
			}, 30)
		  } else {
			this.transition = '.3s linear'
			this.transform = `translate3d(0,-${this.index * 30}px,0)`
			this.scrollCol()
		  }
		}, stay)
	  },
	  scrollRaw() {
		let text = this.$refs.single
		let wrap = this.$refs.wrap
		if (text) {
		  let duration = 0, left = 0
		  console.log(text.clientWidth)
		  if (text.clientWidth > wrap.clientWidth) {
			duration = text.clientWidth / 60
			left = wrap.clientWidth
		  }
		  this.singleStyle = {
			animationDuration: duration + 's',
			paddingLeft: left + 'px'
		  }
		}
	  },
	  endHandler() {
		this.transition = ''
	  }
	},
	watch: {
	  text: {
		handler(now) {
		  clearTimeout(this.timer)
		  setTimeout(() => {
			if (now.length === 1) {
			  this.scrollRaw()
			} else {
			  this.scrollCol()
			}
		  }, 20)
		}, immediate: true
	  }
	},
	destroyed() {
	  console.log('destroyed')
	  clearTimeout(this.timer)
	},
	computed: {
	  colorStyle() {
		if (!this.color) return ''
		return {color: this.color.split(',')[0], backgroundColor: this.color.split(',')[1]}
	  }
	}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .x-notice {
    width: 100%;
    display: flex;
    height: 30px;
    align-items: center;
    overflow: hidden;
    .notice__single-text {
      white-space: nowrap;
      float: left;
      animation: raw linear infinite;
    }
    .notice__left {
    }
    .notice__text {
      font-size: 14px;
      line-height: 30px;
    }
    .notice__content {
      height: 30px;
      overflow: hidden;
      flex: 1;
    }
    .notice__right {
    }
    .notice__icon {
      padding: 0 5px;
    }
  }

  @keyframes raw {
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }
</style>
