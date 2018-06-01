<template>
  <transition :name="position">
    <div class="x-side-pop" v-show="show">
      <div class="side-pop__mask" @tap="cancel"></div>
      <div :class="['side-pop__wrap','side-pop__'+position]">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
	name: 'side-pop',
	props: {
	  position: {
		type: String,
		default: 'left'
	  },
	  show: {
		type: Boolean,
		default: false
	  }
	},
	data () {
	  return {
		scrollbar: {
		  fade: false
		}
	  }
	},
	methods: {
	  cancel() {
		console.log('cancel')
		this.$emit('cancel')
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .fill(@bottom: 0,@top: 0) {
    position: fixed !important;
    bottom: @bottom;
    right: 0;
    left: 0;
    top: @top;
  }

  .x-side-pop {
    overflow: hidden;
    position: absolute;
    z-index: 20;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    .side-pop__mask {
      .fill;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .side-pop__wrap {
      position: absolute;
      transform: translate3d(0, -50%, 0);
      top: 50%;
    }
    .side-pop__left {
      left: 0;
    }
    .side-pop__right {
      right: 0;
    }
    &.left-enter, &.left-leave-to {
      .side-pop__mask {
        opacity: 0;
      }
      .side-pop__wrap {
        transform: translate3d(-100%, -50%, 0);
      }
    }
    &.right-enter, &.right-leave-to {
      .side-pop__mask {
        opacity: 0;
      }
      .side-pop__wrap {
        transform: translate3d(100%, -50%, 0);
      }
    }
  }

  @d: .3s;
  .left-enter-active, .left-leave-active,
  .right-enter-active, .right-leave-active {
    transition: @d;
    .side-pop__mask {
      transition: @d;
    }
    .side-pop__wrap {
      transition: @d;
    }
  }
</style>