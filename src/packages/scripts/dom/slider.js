/**
 * Created by TY-xie on 2018/5/30.
 */

import Carousel from './carousel'
import helper from './helper'

// region 有赞的轮播方式
// 原理是当处于第一个元素,将最后一个元素移到列表最左侧-->3[1]2
// 处于最后一个元素,将最开始的元素移到最右侧-->2[3]1
// endregion
export default class Slider extends Carousel {
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
