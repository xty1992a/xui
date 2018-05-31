<template>
  <div class="swipper" ref="wrap">
    <slot></slot>
    <slot name="dot">
      <div class="dot-list"><span @click="active(i)" v-for="t,i in data" :class="{active: currentIndex===i}"></span></div>
    </slot>
  </div>
</template>

<script>
  import Swipper from '../scripts/dom/swiper'
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
	  duration: Number
	},
	data () {
	  return {
		swipper: null,
		currentIndex: 0
	  }
	},
	mounted() {
	  this.$nextTick(this.freshSwipper)
	},
	methods: {
	  freshSwipper() {
		setTimeout(() => {
		  let wrap = this.$refs.wrap
		  if (wrap) {
			if (this.swipper) {
			  this.swipper.refresh()
			} else {
			  this.swipper = new Swipper(wrap, Object.assign(Object.create(null), {
				loop: this.loop,
				auto: this.auto,
				bounce: this.bounce,
				duration: this.duration,
			  }))
			}
			this.swipper.on('scrollEnd', index => {
			  console.log(index)
			  this.currentIndex = index
			})
		  }
		}, 20)
	  },
	  active(i) {
		this.swipper.goToPage(i)
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

  .swipper {
    overflow: hidden;
    .dot-list {
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
