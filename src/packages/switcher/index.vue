<template>
  <div class="switcher" @click="change" :class="check?'switch-on':'switch-off'">
    <div key="ball" class="ball"></div>
  </div>
</template>

<script>
  export default {
	name: 'switcher',
	props: ["value"],
	data() {
	  return {
		check: this.value,
	  }
	},
	created() {
	  this.check = this.value
	},
	methods: {
	  change() {
		this.check = !this.check
		this.$emit('change', this.check)
	  }
	},
	watch: {
	  value(val) {
		this.check = val
	  }
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../styles/index";

  .switcher {
    -webkit-touch-callout: none;
    width: 48px;
    height: 28px;
    outline: none;
    user-select: none;
    position: relative;
    border-radius: 14px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #ebebeb;
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0, 0, 0, .05) inset;
    transition: @delay;
    .ball {
      user-select: none;
      transition: @delay;
      left: 0;
      top: 50%;
      width: 29px;
      height: 29px;
      border: 1px solid #c7c7c7; /*px*/
      position: absolute;
      border-radius: 50%;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
      background-color: #fff;
    }
  }

  @delay: .3s;
  .on-move, .off-move {
    transition: @delay;
  }

  .translate(@x,@y,@z) {
    transform: translate3d(@x, @y, @z);
  }

  .switch-off {
    background-color: #fff;
    .ball {
      .translate(0, -50%, 0);
    }
  }

  .switch-on {
    background-color: @baseC;
    .ball {
      .translate(20px, -50%, 0);
    }
  }

</style>
