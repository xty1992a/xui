<template>
  <div class="x-check-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
	name: 'x-check-group',
	components: {},
	props: {
	  value: {
		type: [String, Number, Array],
		required: true
	  },
	  radio: {
		type: [String, Boolean],
		default: true
	  }
	},
	methods: {
	  checkSomeOne(val) {
		if (this.isRadio) {
		  this.$emit('input', val)
		} else {
		  if (!Array.isArray(this.value)) return
		  let list = [...this.value]
		  let index = list.findIndex(v => v === val)
		  if (index === -1) {
			list = [...list, val]
		  } else {
			list.splice(index, 1)
		  }
		  this.$emit('input', list)
		}
	  }
	},
	computed: {
	  isRadio() {
		return this.radio === 'true' || this.radio === true
	  },
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .x-check-group {
    display: flex;
  }
</style>
