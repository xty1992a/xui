<template>
  <transition @enter="enter"
              @before-enter="beforeEnter"
              @before-leave="beforeLeave"
              @leave="leave"
              name="closePanel"
              class="x-close-panel">
    <slot></slot>
  </transition>
</template>

<script>
  import {getDefaultStyle} from '../scripts/dom/index'
  const tween = {
	linear: (t, b, c, d) => c * t / d + b,
	easeIn: (t, b, c, d) => c * (t /= d) * t + b,
	easeOut: (t, b, c, d) => -c * (t /= d) * (t - 2) + b,
	easeInOut: (t, b, c, d) => ((t /= d / 2) < 1) ? (c / 2 * t * t + b) : (-c / 2 * ((--t) * (t - 2) - 1) + b),
  }
  function transitionTo(el, style, opt = {easing: 'linear', duration: 300}) {
	let currentStyle = {}
	Object.keys(style).forEach(k => {
	  currentStyle[k] = el.style[k]
	})
  }

  // 等分传入的区间
  const cut = (start, end, len = 10) => Array(len).fill(0).map((n, i) => start + ((end - start) / len) * (i + 1))

  export default {
	name: 'x-close-panel',
	data () {
	  return {
		height: 0
	  }
	},
	methods: {
	  initHeight(el) {
		if (this.hadInit) return
		this.hadInit = true
		console.log(getDefaultStyle(el, 'display'), el.clientHeight)
		if (getDefaultStyle(el, 'display') === 'none') {
		  el.style.position = 'absolute'
		  el.style.visibility = 'hidden'
		}
	  },
	  beforeEnter(el) {
		this.initHeight(el)
	  },
	  enter(el, done){
		if (el.style.position === 'absolute') {
		  this.height = el.clientHeight
		  el.style.position = ''
		  el.style.visibility = ''
		  console.log(this.height)
		}
		let arr = cut(0, this.height)
		console.log('enter', this.height, arr)
		el.style.overflow = 'hidden'
		requestAnimationFrame(step)
		function step() {
		  let height = arr.shift()
		  el.style.height = height + 'px'
		  if (typeof height === 'undefined') {
			done()
		  } else {
			requestAnimationFrame(step)
		  }
		}
	  },

	  beforeLeave(el){
	  },
	  leave(el, done) {
		this.initHeight(el)
		let arr = cut(this.height, 0)
		el.style.overflow = 'hidden'
		requestAnimationFrame(step)
		function step() {
		  let height = arr.shift()
		  el.style.height = height + 'px'
		  if (typeof height === 'undefined') {
			done()
		  } else {
			requestAnimationFrame(step)
		  }
		}
	  }
	}
  }
</script>
