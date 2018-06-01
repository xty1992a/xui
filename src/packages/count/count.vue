<template>
  <div class="x-count" :class="['count__'+size]">
    <div class="count__btn count__minus"
         :class="{count__disable: value===0}"
         @click="changeVal(false)"></div>
    <input type="text"
           ref="input"
           @input="inputChange($event.target.value)"
           @blur="blur($event.target.value)"
           :value="value">
    <div class="count__btn count__plus"
         :class="{count__disable: value===max}"
         @click="changeVal(true)"></div>
  </div>
</template>

<script>
  export default {
	name: 'count',
	components: {},
	props: {
	  value: {
		type: [Number, String],
		default: 0
	  },
	  max: {
		type: [Number, String],
		required: true
	  },
	  size: {
		type: String,
		default: 'wrap'
	  }
	},
	data () {
	  return {}
	},
	mounted() {
	},
	methods: {
	  inputChange(val){
		console.log(val)
		val = parseInt(val.trim())
		if (isNaN(val)) {
		  val = 0
		}
		this.outPut(val)
	  },
	  changeVal(isAdd = true) {
		let val = this.value
		if (isAdd) {
		  val++
		} else {
		  val--
		}
		this.outPut(val)
	  },
	  outPut(val) {
		val = Math.min(Math.max(0, val), this.max)
		console.log(val)
		this.$emit('input', val)
		this.blur(val)
	  },
	  blur(val) {
		let input = this.$refs.input
		val = parseInt(val)
		if (isNaN(val)) {
		  val = 1
		}
		if (val < 0) {
		  val = 1
		}
		if (val > this.max) {
		  val = this.max
		}
		input.value = val
	  }
	},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
  :root {
    --w: 120px;
    --h: 40px;
  }

  // region size
  .count__wrap {
    --w: 100%;
    --h: 100%;
  }

  .count__normal {
    --w: 120px;
    --h: 28px;
  }

  // endregion
  .x-count {
    width: var(--w);
    height: var(--h);
    display: flex;
    text-align: center;
    line-height: var(--h);
    .count__btn {
      width: 30%;
      cursor: pointer;
      user-select: none;
      position: relative;
      &.count__disable {
        background-color: #f8f8f8;
        border-color: #c7c7c7;
        cursor: not-allowed;
        &:before, &:after {
          background-color: #c7c7c7;
        }
      }
    }
    input {
      -webkit-appearance: none;
      -moz-appearance: textfield;
      border: 1px solid #000;
      border-width: 1px 0;
      outline: none;
      text-align: center;
      width: 40%;
    }
    .count__minus, .count__plus {
      border: 1px solid #000;
      &:before, &:after {
        content: '';
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
        background-color: #000;
      }
    }
    .count__minus {
      &:before {
        height: 1px;
        width: 9px;
      }
      &:after {
        content: none;
      }
    }
    .count__plus {
      &:before {
        height: 1px;
        width: 9px;
      }
      &:after {
        height: 9px;
        width: 1px;
      }
    }
  }
</style>
