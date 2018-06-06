/**
 * Created by TY-xie on 2018/6/6.
 */
import helper from '../dom/helper.js'

export default {
  data(){
	return {
	  touch: {
		down: false,
		startX: 0,
		startY: 0,
		startTime: 0,
		nowX: 0,
		nowY: 0,
		nowTime: 0,
		direction: '',
		deltaX: 0,
		deltaY: 0,
	  },
	}
  },
  methods: {
	touchStart(e) {
	  let point = helper.isMobile ? e.touches[0] : e
	  this.touch.down = true
	  this.touch.startTime = +new Date
	  this.touch.startX = this.touch.nowX = point.pageX
	  this.touch.startY = this.touch.nowY = point.pageY
	},
	touchMove(e) {
	  let point = helper.isMobile ? e.touches[0] : e
	  this.touch.nowX = point.pageX
	  this.touch.nowY = point.pageY
	  let deltaX = this.touch.deltaX = this.touch.nowX - this.touch.startX
	  let deltaY = this.touch.deltaY = this.touch.nowY - this.touch.startY
	  const {abs} = Math
	  this.touch.direction = abs(deltaX) > abs(deltaY) ? 'x' : abs(deltaX) < abs(deltaY) ? 'y' : ''
	},
	touchEnd(e) {
	  this.touch.nowTime = +new Date
	  this.touch.deltaTime = this.touch.nowTime - this.touch.startTime
	  this.touch.down = false
	},
  },
}