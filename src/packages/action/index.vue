<template>
  <transition :name="position">
    <div class="x-action" :style="{top}" @mousewheel="mouseWheel">
      <div class="action__mask" @tap="cancel" :style="{top, opacity}"></div>
      <div class="action__top" v-if="position==='top'" :style="{height:topHeight}">
        <slot name="top"></slot>
      </div>
      <div class="action__bottom" v-if="position==='bottom'">
        <slot name="bottom"></slot>
      </div>
      <div class="action__center" v-if="position==='center'">
        <slot name="center"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
	name: 'x-action',
	props: {
	  topHeight: {
		type: String,
		default: 'auto'
	  },
	  opacity: {
		type: Number,
		default: 0.4
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

  .x-action {
    right: 0;
    left: 0;
    z-index: 20;
    .action__bottom {
      background-color: #fff;
      position: absolute;
      z-index: 2;
      width: 100%;
      bottom: 0;
    }
    .action__top {
      height: 100%;
      position: relative;
      background-color: #fff;
    }
    .action__mask {
      .fill;
      background-color: #000;
    }
    .action__center {
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
    .action__bottom {
      transform: translate3d(0, 100%, 0);
    }
    .action__mask {
      opacity: 0;
    }
  }

  .top-enter, .top-leave-to {
    .action__mask {
      opacity: 0;
    }
    .action__top {
      transform: translate3d(0, -100%, 0);
    }
  }

  .center-enter, .center-leave-to {
    .action__mask {
      opacity: 0;
    }
    .action__center {
      transform: translate3d(-50%, -50%, 0) scale(0);
    }
  }

</style>
<style>
  .action {
    position: absolute;
  }
</style>