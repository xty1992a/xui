<template>
  <div class="x-tab-nav" ref="wrap">
    <ul :class="['tab-nav__list', 'nav__'+dir]" :style="{width: navListWidth}">
      <li class="nav__item"
          @tap="navTap(index)"
          :class="index===value?'nav__active':''"
          v-for="item,index in labels">
        <slot :nav-name="item">
          <p class="nav__name">{{item}}</p>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
  const halfScreen = document.documentElement.clientWidth / 2
  export default {
	name: 'x-tab-nav',
	components: {},
	props: {
	  labels: {
		type: Array,
		required: true
	  },
	  value: {
		type: Number
	  },
	},
	data () {
	  return {
		navListWidth: '100%',
		dir: 'left',
		offsetList: []
	  }
	},
	mounted() {
	  this.initWidth()
	  setTimeout(() => {
		let wrap = this.$refs.wrap
		let left = this.offsetList.slice(0, this.value).reduce((p, i) => p + i, 0)
		let half = this.offsetList[this.value] / 2
		let result = Math.max(0, left + half - halfScreen)
		if (wrap) {
		  let maxLeft = wrap.scrollWidth - wrap.clientWidth
		  result = Math.min(result, maxLeft)
		}
		this.scrollToEle(result)
	  }, 500)
	},
	methods: {
	  initWidth() {
		this.$nextTick(() => {
		  setTimeout(() => {
			let wrap = this.$refs.wrap
			let ul = wrap.children[0]
			let lis = this.items = Array.from(ul.children)
			let width = 0
			lis.forEach(li => {
			  width += li.clientWidth
			  this.offsetList.push(li.clientWidth)
			})
			if (width > wrap.clientWidth) {
			  this.navListWidth = width + 'px'
			}
		  }, 20)
		})
	  },
	  navTap(index) {
		this.$emit('input', index)
	  },
	  scrollToEle(target) {
		let wrap = this.$refs.wrap
		let now = wrap.scrollLeft
		let total = target - now
		let arr = []
		for (let i = 1; i < 11; i++) {
		  arr.push(now + i * total / 10)
		}
		requestAnimationFrame(step)
		function step() {
		  let gap = arr.shift()
		  if (!gap) return
		  wrap.scrollLeft = gap
		  gap && requestAnimationFrame(step)
		}
	  }
	},
	computed: {
	  left() {
		let wrap = this.$refs.wrap
		let left = this.offsetList.slice(0, this.value).reduce((p, i) => p + i, 0)
		let half = this.offsetList[this.value] / 2
		let result = Math.max(0, left + half - halfScreen)
		if (wrap) {
		  let maxLeft = wrap.scrollWidth - wrap.clientWidth
		  result = Math.min(result, maxLeft)
		}
		return result
	  }
	},
	watch: {
	  left(now) {
		this.scrollToEle(now)
	  },
	  value(now, old) {
		if (old > now) {
		  this.dir = 'left'
		} else {
		  this.dir = 'right'
		}
		this.$emit('dir', this.dir)
	  }
	}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .x-tab-nav {
    width: 100%;
    overflow-x: auto;
  }

  .tab-nav__list {
    overflow: hidden;
    background-color: #fff;
    white-space: nowrap;
    &.nav__left {
      .nav__item {
        &:not(.nav__active) {
          &:after {
            transform-origin: left;
          }
        }
        &.nav__active {
          &:after {
            transform-origin: right;
          }
        }
      }
    }
    &.nav__right {
      .nav__item {
        &:not(.nav__active) {
          &:after {
            transform-origin: right;
          }
        }
        &.nav__active {
          &:after {
            transform-origin: left;
          }
        }
      }
    }
    .nav__item {
      display: inline-block;
      position: relative;
      .nav__name {
        line-height: 36px;
        padding: 0 20px;
      }
      &.nav__active {
        color: #5574ff;
      }
      &:after {
        content: '';
        width: 100%;
        position: absolute;
        background-color: #5574ff;
        transform: scaleX(0);
        transition: transform .3s;
        height: 2px;
        bottom: 0;
        left: 0;
      }
    }

    .nav__active {
      &:after {
        transform: scaleX(1);
      }
    }
  }
</style>
