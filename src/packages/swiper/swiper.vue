<template>
  <div class="x-swipper" ref="wrap">
    <slot></slot>
    <slot name="dot">
      <div class="swipper__dot-list"><span @click="active(i)" v-for="t,i in data" :class="{active: currentIndex===i}"></span></div>
    </slot>
  </div>
</template>

<script>
  import Swipper from '../scripts/dom/swiper'
  export default {
	name: 'x-swiper',
	components: {},
	props: {
	  data: {
		type: Array,
		required: true
	  },
	  loop: Boolean,
	  bounce: Boolean,
	  auto: Boolean,
	  duration: {
		type: Number,
		default: 2000
	  },
	},
	data () {
	  return {
		currentIndex: 0,
		swipper: null
	  }
	},
	mounted() {
	  this.$nextTick(this.freshSwipper)
	},
	methods: {
	  freshSwipper() {
		setTimeout(() => {
		  let wrap = this.$refs.wrap
		  this.auto && clearTimeout(this.timer)
		  if (wrap) {
			if (!this.swipper) {
			  let opt = Object.assign(Object.create(null), {
				loop: this.loop,
				auto: this.auto,
				bounce: this.bounce,
				duration: this.duration,
			  })
			  this.swipper = new Swipper(wrap, opt)
			}
			else {
			  this.swipper.refresh()
			}
			this.swipper.on('scrollEnd', index => {
			  this.currentIndex = index
			  if (this.auto) {
				this.timer = setTimeout(() => {
				  this.swipper.next()
				}, this.duration)
			  }
			})
			this.swipper.on('touchDown', () => {
			  if (this.auto) {
				clearTimeout(this.timer)
			  }
			})
		  }
		}, 20)
	  },
	  active(i) {
		clearTimeout(this.timer)
		this.swipper.goToPage(i)
	  },
	  autoPlay(){
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

  .x-swipper {
    overflow: hidden;
    height: 273px;
    .swipper__dot-list {
      text-align: center;
      span {
        height: 10px;
        width: 10px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: #000;
        opacity: .4;
        display: inline-block;
        &.active {
          background-color: #62aaff;
        }
      }
    }
  }
</style>
