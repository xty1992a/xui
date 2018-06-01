<template>
  <div class="x-swipper" ref="wrap">
    <slot></slot>
    <slot name="dot">
      <div class="swipper__dot-list"><span @click="active(i)" v-for="t,i in data" :class="{active: currentIndex===i}"></span></div>
    </slot>
  </div>
</template>

<script>
  import {Swipper, Slider} from '../scripts/dom/slider'
  export default {
	name: 'swiper',
	components: {},
	props: {
	  data: {
		type: Array,
		required: true
	  },
	  loop: Boolean,
	  bounce: Boolean,
	  auto: Boolean,
	  duration: Number,
	  type: {
		type: String,
		default: '1'
	  }
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
			  switch (this.type) {
				case '1':
				  this.swipper = new Swipper(wrap, opt)
				  break
				case '2':
				  this.swipper = new Slider(wrap, opt)
				  break
			  }
			  console.log(this.swipper)
			}
			else {
			  this.swipper.refresh()
			}
			this.swipper.on('scrollEnd', index => {
			  this.currentIndex = index
			  if (this.type === '2') console.log('end')
			  if (this.auto) {
				this.timer = setTimeout(() => {
				  this.swipper.next()
				}, 1000)
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
    /*overflow: hidden;*/
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
