<template>
  <div class="count" :class="[size]">
    <div class="count-btn"
         :class="value===0?'disable':''"
         @click="changeVal(false)">-<!----></div>
    <input type="text"
           ref="input"
           @input="inputChange($event.target.value)"
           @blur="blur($event.target.value)"
           :value="value">
    <div class="count-btn"
         :class="value===max?'disable':''"
         @click="changeVal(true)">+<!----></div>
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
  .wrap {
    --w: 100%;
    --h: 100%;
  }

  .normal {
    --w: 120px;
    --h: 28px;
  }

  // endregion
  .count {
    border: 1px solid #000;
    width: var(--w);
    height: var(--h);
    display: flex;
    text-align: center;
    line-height: var(--h);
    .count-btn {
      width: 30%;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      cursor: pointer;
      user-select: none;
      &.disable {
        background-color: #f7f7f7;
        cursor: not-allowed;
        color: #999;
      }
    }
    input {
      border-width: 0;
      border-color: #000;
      -webkit-appearance: none;
      -moz-appearance: textfield;
      outline: none;
      text-align: center;
      border-left-width: 1px;
      border-right-width: 1px;
      width: 40%;
    }
  }
</style>
