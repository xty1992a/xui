<template>
  <div class="x-switcher" @click="change" :class="value?'x-switch-on':'x-switch-off'">
    <div class="switch__btn"></div>
  </div>
</template>

<script>
  export default {
	name: 'switcher',
	props: ['value'],
	methods: {
	  change() {
		this.$emit('change', !this.value)
	  }
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../styles/index";

  .x-switcher {
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
    .switch__btn {
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
  .translate(@x,@y,@z) {
    transform: translate3d(@x, @y, @z);
  }

  .x-switch-off {
    background-color: #fff;
    .switch__btn {
      .translate(0, -50%, 0);
    }
  }

  .x-switch-on {
    background-color: @baseC;
    .switch__btn {
      .translate(20px, -50%, 0);
    }
  }

</style>
