<template>
  <button @click="btnClick" :style="style" :class="[size, type]">
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
		// [‘#f7f7f7’，‘#fff’], '#f7f7f7,#fff'
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
		default: 'primary'
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
		  if (type === 'string' && colors.length) colors = this.colors.split(',').slice(0, 2)
		  style.backgroundColor = colors[0]
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
  .small {
    width: 80px;
    height: 32px;
  }

  .normal {
    width: 120px;
    height: 44px;
  }

  .large {
    width: 355px;
    height: 48px;
  }

  .wrap {
    width: 100%;
    height: 100%;
  }

  // endregion

  .primary {
    border: 1px solid #333;
  }
</style>