<template>
  <transition :name="transitionName">
    <div class="tab__panel" v-show="active">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  import {getParentByName} from '../scripts/helper/vue-helper'
  export default {
	name: 'tab-panel',
	props: {
	  label: {
		type: String,
		required: true
	  },
	  index: {
		type: [String, Number],
		required: true
	  },
	},
	computed: {
	  active() {
		return this.groupValue === this.index
	  },
	  groupValue() {
		let parent = getParentByName(this, 'tabs')
		return parent.value
	  },
	  dir() {
		let parent = getParentByName(this, 'tabs')
		return parent.dir
	  },
	  transitionName() {
		if (this.active) {
		  if (this.dir === 'left') {
			return 'right'
		  } else {
			return 'left'
		  }
		} else {
		  if (this.dir === 'left') {
			return 'left'
		  } else {
			return 'right'
		  }
		}
	  }
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .left-enter, .left-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .right-enter, .right-leave-to {
    transform: translate3d(-100%, 0, 0);
  }

  .right-leave-active, .left-leave-active {
    position: absolute;
    top: 0;
  }

  .right-enter-active, .right-leave-active,
  .left-enter-active, .left-leave-active {
    width: 100%;
    transition: .3s;
  }
</style>