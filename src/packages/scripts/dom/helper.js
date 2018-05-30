/**
 * Created by TY-xie on 2018/5/30.
 */

const helper = {
	  isMobile: false,
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
	}
;(() => {
  try {
	document.createEvent('TouchEvent');
	helper.isMobile = true
  }
  catch (e) {
	helper.isMobile = false
  }
})()
module.exports = helper