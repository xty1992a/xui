/**
 * Created by TY-xie on 2018/5/21.
 */
import helper from './helper'
const dftOpt = {maxTime: 120, maxDistance: 30,}
export default class TapCreator {
  touch = {
	touch: false,
	start: {},
	end: {},
  }
  maxDistance = 30
  maxTime = 120

  constructor(root, opt = {}) {
	this.$el = root
	Object.assign(this, dftOpt, opt)
	this.init()
  }

  init() {
	if (helper.isMobile) {
	  this.$el.addEventListener('touchstart', this.start.bind(this))
	  this.$el.addEventListener('touchmove', this.move.bind(this))
	  this.$el.addEventListener('touchend', this.end.bind(this))
	} else {
	  this.$el.addEventListener('click', e => {
		let ev = new Event('tap', {'bubbles': true, 'cancelable': false});
		ev.touches = e
		ev.originalEvent = e
		e.target.dispatchEvent(ev)
	  })
	}
  }

  start(e) {
	this.target = e.target
	this.touch.start = {
	  time: new Date().getTime(),
	  x: e.touches[0].pageX,
	  y: e.touches[0].pageY,
	}
  }

  move(e) {
  }

  end(e) {
	let {end, start, touch} = this.touch
	end = {
	  time: new Date().getTime(),
	  x: e.changedTouches[0].pageX,
	  y: e.changedTouches[0].pageY,
	}
	let delta = {
	  x: end.x - start.x,
	  y: end.y - start.y,
	  time: end.time - start.time,
	}
	let {abs} = Math
	if (abs(delta.x) > this.maxDistance || abs(delta.y) > this.maxDistance || delta.time > this.maxTime) {
	  return
	}
	let ev = new Event('tap', {'bubbles': true, 'cancelable': false});
	ev.touches = e.changedTouches
	ev.originalEvent = e
	this.target.dispatchEvent(ev)
  }
}
