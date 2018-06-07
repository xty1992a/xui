<template>
  <div class="x-field" :class="{field__line: line}">
    <cell :title="title" :left="1" :right="4">
      <template slot="right">
        <slot>
          <div class="x-field-content">
            <div class="field__printer">
              <input type="text" :value="value" ref="input" @input="print($event.target.value)" @blur="shouldCheck">
              <i class="iconfont icon-cancel-fill" @tap="clear"></i>
            </div>
            <slot name="btn" v-if="btn">
              <div class="field__btn-wrap">
                <x-btn :text="btnText" :type="btnType" @tap="$emit('btn-tap')" size="wrap"></x-btn>
              </div>
            </slot>
          </div>
        </slot>
      </template>
    </cell>
    <slot name="field__tip">
      <transition name="scale">
        <p class="field__error-tip" v-show="!valid.valid">{{valid.tip}}</p>
      </transition>
    </slot>
  </div>
</template>

<script>
  import Cell from '../cell/cell.vue'
  export default {
	name: 'x-field',
	components: {Cell},
	props: {
	  value: {
		required: true,
	  },
	  btn: Boolean,
	  line: Boolean,
	  btnText: {
		type: String,
		default: '按钮文本'
	  },
	  btnType: {
		type: String,
		default: 'primary'
	  },
	  title: {
		type: String,
		default: '标题'
	  },
	  validator: {
		type: Function,
		default: v => ({valid: true})
	  },
	  max: {
		type: [Number, String],
		default: 100
	  }
	},
	data () {
	  return {
		show: false,
		valid: {valid: true}
	  }
	},
	methods: {
	  print(value) {
		let v = this.$refs.input.value = value.trim().substr(0, +this.max)
		if (value.length > +this.max) return
		this.$emit('input', v)
	  },
	  shouldCheck() {
		this.valid = this.validator(this.value)
	  },
	  clear() {
		this.$emit('input', '')
		setTimeout(() => {
		  this.valid = {valid: true}
		})
//		requestAnimationFrame(step)
//		let self = this
//		console.log('clear')
//
//		function step() {
//		  if (!self.value) return
//		  self.$emit('input', self.value.substr(0, self.value.length - 1))
//		  requestAnimationFrame(step)
//		}
	  }
	},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "../style/index.less";

  .x-field {
    &.field__line {
      .line;
    }
    .x-field-content {
      display: flex;
      align-items: center;
    }
    .field__printer {
      flex: 1;
      position: relative;
      input {
        border: none;
        background-color: transparent;
        padding-right: 20px;
        width: 100%;
        height: 100%;
        outline: none;
        text-align: right;
        &:focus {
          text-align: left;
          padding-right: 30px;
          & + .iconfont {
            opacity: 1;
            z-index: 1;
          }
        }
      }
      .iconfont {
        .ex_click();
        opacity: 0;
        z-index: -1;
        position: absolute;
        color: #999;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .field__btn-wrap {
      width: 90px;
      height: 28px;
    }

    .field__error-tip {
      padding-left: 20%;
      margin-left: 10px;
      font-size: 12px;
      height: 26px;
      color: @dangerC;
      overflow: hidden;
    }
    .scale-enter, .scale-leave-to {
      height: 0;
    }

    .scale-enter-active, .scale-leave-active {
      transition: .2s;
    }
  }

</style>
