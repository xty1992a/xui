<template>
  <div class="picker-page page">
    <div class="picker-wrap">
      <x-picker v-model="pickIndex" :data="list" :font="40"></x-picker>
      <x-picker v-model="pickIndex" :data="list" :font="40"></x-picker>
      <x-picker v-model="pickIndex" :data="list" :font="40"></x-picker>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'picker-page',
	components: {},
	data () {
	  return {
		list: [],
		pickIndex: 9
	  }
	},
	created() {
	  this.list = Array(30).fill(0).map((t, i) => ({text: 'item' + (i + 1)}))
	},
	methods: {},
	computed: {
	  currentItem() {
		return this.list[this.pickIndex]
	  }
	}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .picker-page {
    .picker-wrap {
      display: flex;
    }
  }
</style>
