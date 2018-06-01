<template>
  <action class="keyboard-action" v-show="show" :opacity="0" position="bottom" @cancel="cancel">
    <div class="x-number-keyboard" slot="bottom">
      <div class="key__cell" v-for="cell in cellList" @tap="cellTap(cell.key)">
        <i :class="['iconfont', cell.icon]" v-if="cell.icon"></i>
        <span v-if="cell.text">{{cell.text}}</span>
      </div>
    </div>
  </action>
</template>

<script>
  export default {
	name: 'number-keyboard',
	components: {},
	props: {
	  show: Boolean,
	  value: ''
	},
	data () {
	  return {
		cellList: [
		  {key: 1, text: '1'},
		  {key: 2, text: '2'},
		  {key: 3, text: '3'},
		  {key: 4, text: '4'},
		  {key: 5, text: '5'},
		  {key: 6, text: '6'},
		  {key: 7, text: '7'},
		  {key: 8, text: '8'},
		  {key: 9, text: '9'},
		  {key: -2, icon: 'icon-close-keyboard'},
		  {key: 0, text: '0'},
		  {key: -1, icon: 'icon-backspace-unfill'},
		]
	  }
	},
	mounted() {
	},
	methods: {
	  cancel() {
		this.$emit('update:show', false)
	  },
	  cellTap(key) {
		console.log(this.value.substr(0, this.value.length - 1))
		switch (key) {
		  case -1:
			this.$emit('input', this.value.substr(0, this.value.length - 1))
			break
		  case -2:
			this.cancel()
			break
		  default:
			if (this.value.length >= 6) break
			this.$emit('input', this.value + key)
			break
		}
	  }
	},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">

  .keyboard-action {
    bottom: 0;
  }

  .x-number-keyboard {
    overflow: hidden;
    .key__cell {
      width: 33.33333%;
      float: left;
      line-height: 50px;
      height: 50px;
      text-align: center;
      border-color: #e5e5e5;
      border-style: solid;
      border-width: 1px 0 0 1px;
      &:nth-child(3n+1) {
        border-left-width: 0;
      }
      span {
        font-size: 24px;
      }
      i {
        font-size: 32px;
      }
    }
  }
</style>
