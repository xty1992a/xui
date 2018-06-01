<template>
  <button @tap="btnClick" :style="style" :class="['btn__'+size, 'btn__'+type]">
    <slot>
      <i :class="['iconfont', icon.slice(2)]" v-if="icon&&icon.slice(0,1)==='l'"></i>
      <template>{{text}}</template>
      <i :class="['iconfont', icon.slice(2)]" v-if="icon&&icon.slice(0,1)==='r'"></i>
    </slot>
  </button>
</template>

<script>
  export default {
	name: 'btn',
	props: {
	  text: {
		type: String,
		default: '按钮'
	  },
	  radius: {
		// number尺寸为px，string则由外部决定
		type: [Number, String],
		default: 4
	  },
	  colors: {
		// [‘#f7f7f7’，‘#fff’], '#f7f7f7,#fff', bg,color,borderColor,如果没有第三个元素,bordercolor与背景色一致
		type: [Array, String],
		default: () => []
	  },
	  size: {
		// small, normal, large, wrap，其中，wrap为100%,由容器决定大小
		type: String,
		default: 'small'
	  },
	  type: {
		// 实际是class
		type: String,
		default: 'default'
	  },
	  icon: {
		// l,icon-arrow或r,icon-arrow，第一个字符决定icon的位置
		type: String,
	  }
	},
	data () {
	  return {}
	},
	methods: {
	  btnClick() {
		this.$emit('tap')
	  }
	},
	computed: {
	  style() {
		let style = {}
		if (this.colors.length) {
		  let colors = this.colors
		  let type = typeof this.colors
		  if (type === 'string' && colors.length) colors = this.colors.split(',')
		  style.backgroundColor = colors[0]
		  style.borderColor = colors[2] || colors[0]
		  style.color = colors[1]
		}
		if (this.radius) {
		  style.borderRadius = typeof this.radius === 'number' ? this.radius + 'px' : this.radius
		}
		return style
	  }
	}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  button {
    border: 0;
    outline: none;
    background-color: #fff;
  }

  // region size
  .btn__small {
    width: 80px;
    height: 32px;
    font-size: 14px; /*px*/
  }

  .btn__normal {
    width: 120px;
    height: 44px;
    font-size: 15px; /*px*/
  }

  .btn__large {
    width: 355px;
    height: 48px;
    font-size: 18px; /*px*/
  }

  .btn__wrap {
    width: 100%;
    height: 100%;
  }

  // endregion

  // region color
  .btn__default {
    border: 1px solid #333;
  }

  .btn__primary {
    background-color: #4b0;
    color: #fff;
  }

  .btn__danger {
    background-color: #f44;
    color: #fff;
  }

  // endregion
</style>