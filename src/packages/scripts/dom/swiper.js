/**
 * Created by TY-xie on 2018/5/30.
 */
import helper from './helper'
const initialOption = Object.assign(Object.create(null), {
  loop: true,
  time: 3000,
  nextThreshold: 0.2,   // 翻页需要滑动的距离
  direction: 'horizontal',
  bounce: true,
  get scrollX() {
	return this.direction === 'horizontal'
  },
  get scrollY() {
	return this.direction === 'vertical'
  },
})

class Swipper {
  $touch = {
	startX: 0,
	startY: 0,
	startTime: 0,
	nowX: 0,
	nowY: 0,
	nowTime: 0,
	offsetX: 0,
	offsetY: 0,
  }

  task = {}

  set currentIndex(v) {
	if (this.$option.loop) {
	  this.$currentIndex = v
	  this.scrollTo(v, 300, () => {
		let offsetX
		if (this.$currentIndex === 0) {
		  let len = this.$currentIndex = this.$length
		  offsetX = this.$preOffsetX = len * -this.$option.width
		}
		if (this.$currentIndex === this.$length + 1) {
		  let len = this.$currentIndex = 1
		  offsetX = this.$preOffsetX = len * -this.$option.width
		}
		this.$slider.style.transform = `translate3d(${offsetX}px,0,0)`
		this.fire('scrollEnd', this.$currentIndex - 1)
	  })
	} else {
	  v = Math.min(Math.max(v, 0), this.$length - 1)
	  this.$currentIndex = v
	  this.scrollTo(v, 300, () => {
		this.fire('scrollEnd', this.$currentIndex)
	  })
	}
  }

  get currentIndex() {
	return this.$currentIndex
  }

  constructor(el, opt = Object.create(null)) {
	this.$el = el
	this.$slider = el.children[0]
	if (!this.$slider) throw new Error('el should contain an child')
	this.$option = Object.assign(Object.create(null), initialOption, opt)
	this.init()
  }

  init() {
	this.$option.width = this.$el.clientWidth
	this.$el.classList.add('swipper__container')
	this.$slider.classList.add('swipper__slider')

	this.initWidth()
	this.listen()
  }

  initWidth() {
	this.$children = Array.from(this.$slider.children)
	this.$length = this.$children.length
	if (!this.$length) throw new Error('expect multi item')
	this.$currentIndex = 0
	if (this.$option.loop) {
	  let first = this.$children[0].cloneNode(true)
	  let last = this.$children.slice(-1)[0].cloneNode(true)
	  this.$children.unshift(first)
	  this.$children.push(last)
	  this.$slider.insertBefore(last, this.$children[1])
	  this.$slider.appendChild(first)
	  this.$currentIndex = 1
	}
	let offsetX = this.$preOffsetX = this.$currentIndex * -this.$option.width
	this.$slider.style.transform = `translate3d(${offsetX}px,0,0)`
	this.$slider.style.width = this.$children.length * this.$option.width + 'px'
	this.$children.forEach(child => {
	  child.classList.remove('swipper__item')
	  child.classList.add('swipper__item')
	  child.style.width = this.$option.width + 'px'
	})
  }

  listen() {
	let {events} = helper
	this.$el.addEventListener(events.down, this.down.bind(this))
	this.$el.addEventListener(events.move, this.move.bind(this))
	this.$el.addEventListener(events.up, this.up.bind(this))
	this.$el.addEventListener(events.leave, this.leave.bind(this))
  }

  down(e) {
	if (this.$scrolling) return
	e.stopPropagation()
	let point = helper.isMobile ? e.touches[0] : e
	let touch = this.$touch
	touch.down = true
	touch.startX = point.pageX
	touch.startY = point.pageY
  }

  move(e) {
	let touch = this.$touch
	if (this.$scrolling || !touch.down) return
	e.stopPropagation()
	e.preventDefault()
	let point = helper.isMobile ? e.touches[0] : e
	touch.nowX = point.pageX
	touch.nowY = point.pageY
	let deltaX = touch.offsetX = touch.nowX - touch.startX
	let deltaY = touch.offsetY = touch.nowY - touch.startY
	deltaX += this.$preOffsetX
	this.$slider.style.transform = `translate3d(${deltaX}px, 0, 0)`
  }

  up(e) {
	let touch = this.$touch
	if (this.$scrolling || !touch.down) return
	touch.down = false
	e.stopPropagation()
	let point = helper.isMobile ? e.changedTouches[0] : e
	let index = this.currentIndex
	if (Math.abs(touch.offsetX) > ( this.$option.width * this.$option.nextThreshold)) {
	  if (touch.offsetX < 0) {
		this.currentIndex += 1
	  } else {
		this.currentIndex -= 1
	  }
	} else {
	  this.currentIndex = this.$currentIndex
	}
	this.fire('touchUp', {
	  point,
	  prevIndex: index,
	  nextIndex: this.currentIndex,
	})
  }

  leave() {
	console.log('leave')
  }

  refresh() {
	console.log('refresh')
	if (this.$option.loop) {
	  // this.scrollTo(0, 300, () => {
	  this.$slider.removeChild(this.$children.shift())
	  this.$slider.removeChild(this.$children.pop())
	  this.initWidth()
	  this.fire('scrollEnd', this.$currentIndex - 1)
	  // })
	} else {
	  // this.scrollTo(1, 300, () => {
	  this.initWidth()
	  this.fire('scrollEnd', this.$currentIndex)
	  // })
	}
  }

  scrollTo(index, duration = 300, callback) {
	let opt = this.$option
	this.$slider.style.transition = `transform ${duration}ms linear`
	let self = this

	function end() {
	  self.$slider.removeEventListener('transitionend', end)
	  self.$slider.style.transition = ''
	  self.$scrolling = false
	  callback && callback()
	}

	this.$slider.addEventListener('transitionend', end)
	let offsetX = index * -opt.width
	this.$preOffsetX = offsetX
	this.$slider.style.transform = `translate3d(${offsetX}px, 0, 0)`
	this.$scrolling = true
  }

  // region API
  goToPage(index) {
	if (index instanceof Element) {
	  index = this.$children.find(child => child === index)
	  if (!index) throw new Error('arguments should be an index or swipper item[ELEMENT]')
	}
	if (this.$option.loop) {
	  this.currentIndex = index + 1
	} else {
	  this.currentIndex = index
	}
  }

  // endregion

  on(event, callback) {
	if (!this.task[event]) {
	  this.task[event] = callback
	}
  }

  fire(event, payload) {
	this.task[event] && this.task[event](payload)
  }

  destroy() {
	console.log(this.$el)
	let {events} = helper
	this.$el.removeEventListener(events.down, this.down)
	this.$el.removeEventListener(events.move, this.move)
	this.$el.removeEventListener(events.up, this.up)
	this.$el.removeEventListener(events.leave, this.leave)
  }
}
export default Swipper
