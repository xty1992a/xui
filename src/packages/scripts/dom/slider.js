/**
 * Created by TY-xie on 2018/5/30.
 */
import helper from './helper'
// 默认参数
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

// region 轮播基类
// 提供默认参数
// 提供容器上的事件监听,记录手指位移信息
// 提供简单的事件通知系统
// endregion
class Carousel {
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

// region 普通轮播方式
// 原理是额外添加两个元素,复制最后一个元素放在最前,第一个元素放在最后 -->3[1]231
// 当滚动到列表第一个元素,跳到列表倒数第二
// 当滚动到列表最后一个,跳到顺数第二
// endregion
export class Swipper extends Carousel {

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

// region 有赞的轮播方式
// 原理是当处于第一个元素,将最后一个元素移到列表最左侧-->3[1]2
// 处于最后一个元素,将最开始的元素移到最右侧-->2[3]1
// endregion
export class Slider extends Carousel {
  $preOffsetX = 0

  set currentIndex(v) {
	this.$currentIndex = v
	let {width} = this.$option
	if (v === -1) {
	  v = this.$currentIndex = this.$length - 1
	  let offsetX = this.$preOffsetX = -width * this.$currentIndex
	  helper.css(this.$slider, {
		transform: `translate3d(${offsetX}px, 0, 0)`,
	  })
	  helper.css(this.$children[this.$currentIndex], {
		transform: `translate3d(0, 0, 0)`,
	  })
	}
	if (v === this.$length) {
	  v = this.$currentIndex = 0
	  let offsetX = this.$preOffsetX = -width * this.$currentIndex
	  helper.css(this.$slider, {
		transform: `translate3d(${offsetX}px, 0, 0)`,
	  })
	  helper.css(this.$children[this.$currentIndex], {
		transform: `translate3d(0, 0, 0)`,
	  })
	}
	if (v === 0) {
	  helper.css(this.$children[this.$length - 1], {
		transform: `translate3d(-${this.$length * width}px, 0, 0)`,
	  })
	} else if (v === this.$length - 1) {
	  helper.css(this.$children[0], {
		transform: `translate3d(${this.$length * width}px, 0, 0)`,
	  })
	} else {
	  helper.css(this.$children[0], {
		transform: `translate3d(0, 0, 0)`,
	  })
	  helper.css(this.$children[this.$length - 1], {
		transform: `translate3d(0, 0, 0)`,
	  })
	}

	this.fire('scrollEnd', this.$currentIndex)
  }

  get currentIndex() {
	return this.$currentIndex
  }

  constructor(el, opt) {
	super(el, opt)
	// 这种模式至少需要3个元素,需要补足
	if (this.$length === 2) {
	  let item = this.$children[0].cloneNode(true)
	  let item2 = this.$children[1].cloneNode(true)
	  this.$slider.appendChild(item)
	  this.$slider.appendChild(item2)
	  this.refresh()
	}
	if (this.$length === 1) {
	  let item = this.$children[0].cloneNode(true)
	  let item2 = this.$children[0].cloneNode(true)
	  this.$slider.appendChild(item)
	  this.$slider.appendChild(item2)
	  this.refresh()
	}
	this.currentIndex = 0
  }

  // 拖拽时移动函数
  scroll() {
	let {offsetX} = this.$touch
	offsetX += this.$preOffsetX
	helper.css(this.$slider, {
	  transform: `translate3d(${offsetX}px, 0, 0)`,
	})
  }

  next() {
	let offsetX = this.$preOffsetX = -((this.currentIndex + 1) * this.$option.width)
	this.scrollTo(offsetX, this.$option.duration, () => {
	  this.currentIndex++
	})
  }

  prev() {
	let offsetX = this.$preOffsetX = -((this.currentIndex - 1) * this.$option.width)
	this.scrollTo(offsetX, this.$option.duration, () => {
	  this.currentIndex--
	})
  }

  stay() {
	let offsetX = -(this.currentIndex * this.$option.width)
	this.scrollTo(offsetX, this.$option.duration, () => {
	  this.fire('scrollEnd', this.$currentIndex)
	})
  }

  refresh() {
	this.initWidth()
	this.currentIndex = this.$currentIndex
  }
}
