<template>
  <ul class="x-button-tab" :class="`button-tab__${size}`" :style="style">
    <li class="tab__item" v-for="item,index in labels" @tap="checkItem(index)" :style="getStyle(index)">{{item}}</li>
  </ul>
</template>

<script>
  export default {
	name: 'x-button-tab',
	components: {},
	props: {
	  value: {
		type: Number,
		required: true
	  },
	  labels: {
		type: Array,
		required: true
	  },
	  size: {
		type: String,
		default: 'normal'
	  },
	  color: {
		type: String,
		default: '#000,#fff'
	  },
	  margin: {
		type: String,
		default: '10px'
	  },
	  radius: {
		type: Number,
		default: 0
	  }
	},
	data () {
	  return {}
	},
	mounted() {
	},
	methods: {
	  checkItem(index) {
		this.$emit('input', index)
	  },

	  getStyle(index) {
		let color = this.color
		if (typeof color === 'string') color = color.split(',')
		let style = {
		  borderColor: color[0]
		}
		if (this.radius) {
		  if (!index) {
			style.borderRadius = `${this.radius}px 0 0 ${this.radius}px`
		  }
		  if (index === this.labels.length - 1) {
			style.borderRadius = `0 ${this.radius}px ${this.radius}px 0`
		  }
		}
		if (index === this.value) {
		  style.color = color[1]
		  style.backgroundColor = color[0]
		} else {
		  style.color = color[0]
		  style.backgroundColor = color[1]
		}
		return style
	  }
	},
	computed: {
	  style() {
		let style = {}
		if (this.margin) {
		  style.margin = this.margin
		}
		return style
	  }
	}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .x-button-tab {
    display: flex;
    &.button-tab__normal {
      height: 30px;
    }
    .tab__item {
      border-style: solid;
      border-width: 1px 0 1px 1px;
      justify-content: center;
      align-items: center;
      display: flex;
      flex: 1;
      &:last-child {
        border-right-width: 1px;
      }
    }
  }
</style>
