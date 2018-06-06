/**
 * Created by TY-xie on 2018/6/5.
 */

// region 轮播基类
// 提供默认参数
// 提供容器上的事件监听,记录手指位移信息
// 提供简单的事件通知系统
// endregion
import helper from './helper'

const initialOption = Object.assign(Object.create(null), {
  loop: true,
  time: 3000,
  nextThreshold: 0.2,   // 翻页需要滑动的距离
  direction: 'horizontal',
  duration: 300,
  bounce: true,
  get scrollX() {
	return this.direction === 'horizontal'
  },
  get scrollY() {
	return this.direction === 'vertical'
  },
  containerCLS: 'swipper__container',
  sliderCLS: 'swipper__slider',
  itemCLS: 'swipper__item',
})

export default class Carousel {
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

  constructor(el, opt = Object.create(null)) {
	this.$el = el
	this.$slider = el.children[0]
	if (!this.$slider) throw new Error('el should contain an child')
	this.$option = Object.assign(Object.create(null), initialOption, opt)
	this.init()
  }

  init() {
	let {containerCLS, sliderCLS} = this.$option
	this.$option.width = this.$el.clientWidth
	this.$el.classList.add(containerCLS)
	this.$slider.classList.add(sliderCLS)

	this.initWidth()
	this.listen()
  }

  initWidth() {
	this.$children = Array.from(this.$slider.children)
	this.$length = this.$children.length
	if (!this.$length) throw new Error('expect multi item')
	this.$slider.style.width = this.$children.length * this.$option.width + 'px'
	this.$children.forEach(child => {
	  child.classList.remove(this.$option.itemCLS)
	  child.classList.add(this.$option.itemCLS)
	  child.style.width = this.$option.width + 'px'
	  child.style.transform = ''
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
	this.fire('touchDown')
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
	touch.offsetX = touch.nowX - touch.startX
	touch.offsetY = touch.nowY - touch.startY
	this.scroll && this.scroll()
  }

  up(e) {
	let touch = this.$touch
	if (this.$scrolling || !touch.down) return
	touch.down = false
	e.stopPropagation()
	let point = helper.isMobile ? e.changedTouches[0] : e
	if (Math.abs(touch.offsetX) > ( this.$option.width * this.$option.nextThreshold)) {
	  if (touch.offsetX < 0) {
		this.next && this.next()
	  } else {
		this.prev && this.prev()
	  }
	} else {
	  this.stay && this.stay()
	}
  }

  leave() {
  }

  refresh() {
  }

  scrollTo(offsetX, duration = 300, callback) {
	let self = this
	this.$slider.style.transition = `transform ${duration}ms linear`
	this.$slider.addEventListener('transitionend', end)
	helper.css(this.$slider, {
	  transform: `translate3d(${offsetX}px, 0, 0)`,
	})
	this.$scrolling = true
	function end() {
	  self.$slider.removeEventListener('transitionend', end)
	  self.$slider.style.transition = ''
	  self.$scrolling = false
	  callback && callback()
	}
  }

  on(event, callback) {
	if (!this.task[event]) {
	  this.task[event] = callback
	}
  }

  fire(event, payload) {
	this.task[event] && this.task[event](payload)
  }

  destroy() {
	let {events} = helper
	this.$el.removeEventListener(events.down, this.down)
	this.$el.removeEventListener(events.move, this.move)
	this.$el.removeEventListener(events.up, this.up)
	this.$el.removeEventListener(events.leave, this.leave)
  }
}