<template>
  <div class="password-input">
    <span v-for="i in 6" :class="{fill: i <= value}"></span>
  </div>
</template>

<script>
  export default {
	name: 'x-password-input',
	components: {},
	props: {
	  value: {
		required: true
	  }
	},
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .password-input {
    width: calc(100% - 20px);
    margin: 0 auto;
    position: relative;
    z-index: 21;
    overflow: hidden;
    span {
      float: left;
      height: 45px;
      width: 16.66667%;
      border: 1px solid #e5e5e5;
      background-color: #fff;
      &:not(:last-child) {
        border-right-width: 0;
      }
      &.fill {
        position: relative;
        &:before {
          content: '';
          width: 8px;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          height: 8px;
          background-color: #333;
          border-radius: 50%;
        }
      }
    }
  }
</style>
