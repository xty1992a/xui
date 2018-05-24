<template>
  <div class="tabs">
    <tab-nav v-model="navIndex" :labels="labels" @dir="dirChange"></tab-nav>
    <ul class="tab-content">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  export default {
	name: 'tabs',
	props: {
	  value: Number
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
	  this.labels = this.$slots.default.map((it) => it.child.label)
	},
	methods: {
	  dirChange(dir) {
		this.dir = dir
	  }
	},
	watch: {
	  navIndex(index) {
		if (this.value > index) {
		  this.dir = 'left'
		} else {
		  this.dir = 'right'
		}
		this.$emit('input', index)
	  },
	  value(now) {
		this.navIndex = now
	  }
	}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  ul, li {
    list-style: none;
  }

  .tabs {
    .tab-content {
      overflow: hidden;
      position: relative;
    }
  }

</style>