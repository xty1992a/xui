<template>
  <div class="slider-page">
    <btn text="添加" @tap="add"></btn>
    <btn text="删除" @tap="minus"></btn>
    <swiper :data="itemList">
      <ul class="img-list">
        <li class="img-wrap" :key="index" v-for="item,index in itemList">{{item}}</li>
      </ul>
    </swiper>
    <swiper :data="itemList" loop>
      <ul class="img-list">
        <li class="img-wrap" :key="index" v-for="item,index in itemList">{{item}}</li>
      </ul>
    </swiper>
  </div>
</template>

<script>
  export default {
	name: 'slider-page',
	components: {},
	data () {
	  return {
		itemList: [1, 2, 3]
	  }
	},
	mounted() {
	  setTimeout(() => {
		this.itemList = [1, 2, 3, 4, 5, 6]
	  }, 1000)
	},
	methods: {
	  add() {
		this.itemList.push(parseInt(this.itemList.slice(-1)) + 1)
	  },
	  minus() {
		this.itemList.pop()
	  },
	},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .slider-page {

    img {
      width: 100%;
    }

    .img-wrap {
      height: 244px;
      line-height: 244px;
      text-align: center;
      font-size: 100px;
      font-weight: bold;
    }

  }
</style>
