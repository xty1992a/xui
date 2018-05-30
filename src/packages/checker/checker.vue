<template>
  <div class="checker" :class="{active: isCheck, disable, radio}" @click="checkMe">{{text}}</div>
</template>

<script>
  export default {
	name: 'checker',
	components: {},
	props: {
	  disable: Boolean,
	  text: {
		type: String,
		default: '标题'
	  },
	  val: {
		type: String,
		default: 'title'
	  },
	},
	data() {
	  return {
		checked: false
	  }
	},
	methods: {
	  checkMe() {
		if (this.disable) return
		this.$parent.checkSomeOne(this.val)
	  }
	},
	computed: {
	  groupValue() {
		return this.$parent.value
	  },
	  isCheck() {
		if (Array.isArray(this.groupValue)) {
		  return this.groupValue.includes(this.val)
		} else {
		  return this.groupValue === this.val
		}
	  },
	  radio() {
		return this.$parent.radio
	  }
	}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../style/theme.less";

  .v-check() {
    height: 24px;
    position: relative;
    padding-left: 20px;
    display: flex;
    margin-right: 8px;
    cursor: pointer;
    align-items: center;
    &:before {
      content: '';
      transition: .3s;
      position: absolute;
      transform: translateY(-50%);
      left: 0;
      top: 50%;
      width: 16px;
      height: 16px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      border-radius: 2px;
    }
    &.radio {
      &:before {
        border-radius: 50%;
      }
    }
    &:not(.radio) {

      &:after {
        content: '';
        height: 8px;
        width: 4px;
        border: 1px solid #fff;
        position: absolute;
        left: 2px;
        top: 35%;
        transition: .1s .3s;
        transform-origin: 50% 50%;
        transform: rotate(45deg) translateY(-50%) scale(0);
        border-top-color: transparent;
        border-left-color: transparent;
      }
    }
    &.active {
      &:before {
        background-color: #fff;
        border: 4px solid @activeColor;
      }
      &.disable {
        &:before {
          background-color: #fff;
          border-color: #ccc;
        }
      }
      &:not(.radio) {
        &:before {
          border-width: 8px;
        }
        &:after {
          transform: rotate(45deg) translateY(-50%) scale(1);
        }
      }
    }
    &.disable {
      color: #ccc;
      cursor: not-allowed;
    }
  }

  .checker {
    .v-check();
  }
</style>
