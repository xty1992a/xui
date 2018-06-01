/**
 * Created by TY-xie on 2018/5/30.
 */


const helper = {
	  isMobile: false,
	  vendor: false,
	  get events() {
		return this.isMobile ? {
		  down: 'touchstart',
		  move: 'touchmove',
		  up: 'touchend',
		  leave: 'touchleave',
		} : {
		  down: 'mousedown',
		  move: 'mousemove',
		  up: 'mouseup',
		  leave: 'mouseleave',
		}
	  },
	  prefixStyle(style) {
		if (this.vendor === false) {
		  return false
		}
		if (this.vendor === 'standard') {
		  if (style === 'transitionEnd') {
			return 'transitionend'
		  }
		  return style
		}
		return this.vendor + style.charAt(0).toUpperCase() + style.substr(1)
	  },
	  css(el, style) {
		Object.keys(style).forEach(k => {
		  let val = style[k]
		  if (['transform', 'transition'].includes(k)) {
			k = this.prefixStyle(k)
		  }
		  el.style[k] = val
		})
	  },
	  getParentByClassName(el, className) {
		if (el.classList.contains(className)) return el
		let parent = el.parentNode
		let target = null
		while (parent) {
		  if (parent.classList.contains(className)) {
			target = parent
			parent = null
		  } else {
			parent = parent.parentNode
		  }
		}
		return target
	  },
	}
;(() => {
  helper.vendor = (() => {
	let elementStyle = document.createElement('div').style
	let transformNames = {
	  webkit: 'webkitTransform',
	  Moz: 'MozTransform',
	  O: 'OTransform',
	  ms: 'msTransform',
	  standard: 'transform',
	}
	for (let key in transformNames) {
	  if (elementStyle[transformNames[key]] !== undefined) {
		return key
	  }
	}
	return false
  })()
  try {
	document.createEvent('TouchEvent');
	helper.isMobile = true
  }
  catch (e) {
	helper.isMobile = false
  }
})()

export default helper