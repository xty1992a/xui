/**
 * Created by TY-xie on 2018/5/30.
 */
const helper = require('./helper')

const initialOption = {
  loop: true,
  time: 3000,
  direction: 'horizontal',
  get scrollX() {
	return this.direction === 'horizontal'
  },
  get scrollY() {
	return this.direction === 'vertical'
  },
}

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

  set currentIndex(v) {
	if (this.$option.loop) {
	  if (v === 0) {
		v = this.$length - 1
	  } else if (v === this.$length - 1) {
		v = 0
	  }
	}
	this.$currentIndex = v
	this.scrollTo(v, 300)
  }

  get currentIndex() {
	return this.$currentIndex
  }

  constructor(el, opt = {}) {
	this.$el = el
	this.$slider = el.children[0]
	if (!this.$slider) throw new Error('el should contain an child')
	this.$option = Object.assign(initialOption, opt)
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
	if (this.$option.loop) {
	  console.log(this.$children.length, this.$slider.children.length)
	  let first = this.$children[0].cloneNode(true)
	  let last = this.$children.slice(-1)[0].cloneNode(true)
	  this.$children.unshift(first)
	  this.$children.push(last)
	  this.$slider.insertBefore(last, this.$children[1])
	  this.$slider.appendChild(first)
	  this.$slider.style.transform = `translate3d(-${this.$option.width}px, 0, 0)`
	  this.$currentIndex = 0
	}
	if (!this.$children.length) throw new Error('expect multi item')
	this.$slider.style.width = this.$children.length * this.$option.width + 'px'
	this.$children.forEach(child => {
	  child.classList.add('swipper__item')
	  child.style.width = this.$option.width + 'px'
	})
  }

  listen() {
	let {events} = helper
	console.log(this.$el, events)
	this.$el.addEventListener(events.down, this.down.bind(this))
	this.$el.addEventListener(events.move, this.move.bind(this))
	this.$el.addEventListener(events.up, this.up.bind(this))
	this.$el.addEventListener(events.leave, this.leave.bind(this))
  }

  down(e) {
	e.stopPropagation()
	let point = helper.isMobile ? e.touches[0] : e
	let touch = this.$touch
	touch.startX = point.pageX
	touch.startY = point.pageY
  }

  move(e) {
	e.stopPropagation()
	let point = helper.isMobile ? e.touches[0] : e
	let touch = this.$touch
	touch.nowX = point.pageX
	touch.nowY = point.pageY
	let deltaX = touch.offsetX = touch.nowX - touch.startX
	let deltaY = touch.offsetY = touch.nowY - touch.startY
	if (this.$option.loop) deltaX -= this.$option.width
	console.log(deltaX)
	this.$slider.style.transform = `translate3d(${deltaX}px, 0, 0)`
  }

  up(e) {
	e.stopPropagation()
	let point = helper.isMobile ? e.changedTouches[0] : e
	let touch = this.$touch
	console.log(touch.offsetX)
	if (Math.abs(touch.offsetX) > ( this.$option.width / 2)) {
	  if (touch.offsetX < 0) {
		this.currentIndex += 1
		console.log('向左 ++', this.currentIndex)
	  } else {
		console.log('向右 --')
		this.currentIndex -= 1
	  }
	} else {
	  // this.currentIndex = this.$currentIndex
	}
  }

  leave() {
  }

  refresh() {
  }

  // region API
  scrollTo(index, duration) {
	if (index instanceof Element) {
	  index = this.$children.find(child => child === index)
	  if (!index) throw new Error('arguments should be an index or swipper item[ELEMENT]')
	}
	let opt = this.$option
	this.$slider.style.transition = 'transform .3s linear'
	let offsetX = index * -opt.width
	if (opt.loop) {
	  offsetX -= opt.width
	}
	console.log(offsetX)
	this.$slider.style.transform = `translate3d(${offsetX}px, 0, 0)`
  }

  // endregion

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
