<template>
  <div class="x-tabs">
    <template v-if="!headLess">
      <x-tab-nav v-model="navIndex" :labels="labels" @dir="dirChange"></x-tab-nav>
    </template>

    <ul class="tab__content">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  export default {
	name: 'x-tabs',
	props: {
	  value: Number,
	  headLess: Boolean
	},
	data () {
	  return {
		labels: [],
		dir: 'left',
		navIndex: 0
	  }
	},
	created() {
	  this.navIndex = this.value
	},
	mounted() {
	  this.labels = this.$slots.default.reduce((p, it) => it.child ? [...p, it.child.label] : p, [])
	},
	methods: {
	  dirChange(dir) {
		this.dir = dir
	  }
	},
	watch: {
	  navIndex(index) {
		this.$emit('input', index)
	  },
	  value(now, old) {
		if (now < old) {
		  this.dir = 'left'
		} else {
		  this.dir = 'right'
		}
		this.navIndex = now
	  }
	}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  ul, li {
    list-style: none;
  }

  .x-tabs {
    .tab__content {
      overflow: hidden;
      position: relative;
    }
  }

</style>