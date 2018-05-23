<template>
  <transition :name="position">
    <div class="action" v-show="show">
      <div class="action-mask" @click="cancel"></div>
      <div :class="['wrap',position]">
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

  .action {
    overflow: hidden;
    position: absolute;
    z-index: 20;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    .action-mask {
      .fill;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .wrap {
      position: absolute;
      transform: translate3d(0, -50%, 0);
      top: 50%;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
    &.left-enter, &.left-leave-to {
      .action-mask {
        opacity: 0;
      }
      .wrap {
        transform: translate3d(-100%, -50%, 0);
      }
    }
    &.right-enter, &.right-leave-to {
      .action-mask {
        opacity: 0;
      }
      .wrap {
        transform: translate3d(100%, -50%, 0);
      }
    }
  }

  @d: .3s;
  .left-enter-active, .left-leave-active,
  .right-enter-active, .right-leave-active {
    transition: @d;
    .action-mask {
      transition: @d;
    }
    .wrap {
      transition: @d;
    }
  }
</style>