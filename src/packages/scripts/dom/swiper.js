/**
 * Created by TY-xie on 2018/5/30.
 */

import Carousel from './carousel'
import helper from './helper'

// region 普通轮播方式
// 原理是额外添加两个元素,复制最后一个元素放在最前,第一个元素放在最后 -->3[1]231
// 当滚动到列表第一个元素,跳到列表倒数第二
// 当滚动到列表最后一个,跳到顺数第二
// endregion
export default class Swipper extends Carousel {

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
		// this.$slider.style.transform = `translate3d(${offsetX}px,0,0)`
		helper.css(this.$slider, {
		  transform: `translate3d(${offsetX}px, 0, 0)`,
		})
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
	super(el, opt)
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
	// this.$slider.style.transform = `translate3d(${offsetX}px,0,0)`
	helper.css(this.$slider, {
	  transform: `translate3d(${offsetX}px, 0, 0)`,
	})
	this.$slider.style.width = this.$children.length * this.$option.width + 'px'
	this.$children.forEach(child => {
	  child.classList.remove('swipper__item')
	  child.classList.add('swipper__item')
	  child.style.width = this.$option.width + 'px'
	})
  }

  scroll() {
	let {offsetX} = this.$touch
	offsetX += this.$preOffsetX
	// this.$slider.style.transform = `translate3d(${offsetX}px, 0, 0)`
	helper.css(this.$slider, {
	  transform: `translate3d(${offsetX}px, 0, 0)`,
	})
  }

  next() {
	this.currentIndex += 1
  }

  prev() {
	this.currentIndex -= 1
  }

  stay() {
	this.currentIndex = this.$currentIndex
  }

  refresh() {
	if (this.$option.loop) {
	  this.$slider.removeChild(this.$children.shift())
	  this.$slider.removeChild(this.$children.pop())
	  this.initWidth()
	  this.fire('scrollEnd', this.$currentIndex - 1)
	} else {
	  this.initWidth()
	  this.fire('scrollEnd', this.$currentIndex)
	}
  }

  scrollTo(index, duration = this.$option.duration, callback) {
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
	// this.$slider.style.transform = `translate3d(${offsetX}px, 0, 0)`
	helper.css(this.$slider, {
	  transform: `translate3d(${offsetX}px, 0, 0)`,
	})
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

}
