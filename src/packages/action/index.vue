<template>
  <transition :name="position">
    <div class="action" :style="{top}" @mousewheel="mouseWheel">
      <div class="action-mask" @click="cancel" :style="{top}"></div>
      <div class="top" v-if="position==='top'" :style="{height:topHeight}">
        <slot name="top"></slot>
      </div>
      <div class="bottom" v-if="position==='bottom'">
        <slot name="bottom"></slot>
      </div>
      <div class="center" v-if="position==='center'">
        <slot name="center"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
	name: 'action',
	props: {
	  topHeight: {
		type: String,
		default: 'auto'
	  },
	  position: {
		type: String,
		default: 'bottom'
	  },
	  prevent: {      //  是否阻止默认行为
		type: Boolean,
		default: true
	  },
	  top: {
		type: String,
		default: '0px'
	  },
	  list: {
		type: Array,
		default() {
		  return []
		}
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
	  mouseWheel(e) {
		this.prevent && e.preventDefault()
	  }
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
    right: 0;
    left: 0;
    z-index: 20;
    .bottom {
      background-color: #fff;
      position: absolute;
      z-index: 2;
      width: 100%;
      bottom: 0;
    }
    .top {
      height: 100%;
      position: relative;
      background-color: #fff;
    }
    .action-mask {
      .fill;
      background-color: rgba(0, 0, 0, 0.4);
    }
    .center {
      transform: translate3d(-50%, -50%, 0) scale(1);
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }

  .bottom-enter-active, .bottom-leave-active,
  .center-enter-active, .center-leave-active,
  .top-enter-active, .top-leave-active {
    transition: .3s;
    > div {
      transition: .3s;
    }
  }

  .bottom-enter, .bottom-leave-to {
    .bottom {
      transform: translate3d(0, 100%, 0);
    }
    .action-mask {
      opacity: 0;
    }
  }

  .top-enter, .top-leave-to {
    .action-mask {
      opacity: 0;
    }
    .top {
      transform: translate3d(0, -100%, 0);
    }
  }

  .center-enter, .center-leave-to {
    .action-mask {
      opacity: 0;
    }
    .center {
      transform: translate3d(-50%, -50%, 0) scale(0);
    }
  }

</style>
<style>
  .action {
    position: absolute;
  }
</style>