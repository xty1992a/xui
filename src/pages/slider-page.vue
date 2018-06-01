<template>
  <div class="slider-page">
    <btn text="添加" @tap="add"></btn>
    <btn text="删除" @tap="minus"></btn>
    <div class="wrap">
      <swiper :data="itemList" loop auto>
        <ul class="img-list">
          <li class="img-wrap" :key="index" v-for="item,index in itemList">{{item}}</li>
        </ul>
      </swiper>
      <swiper :data="itemList" loop type="2" auto>
        <ul class="img-list">
          <li class="img-wrap" :key="index" v-for="item,index in itemList">{{item}}</li>
        </ul>
      </swiper>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'slider-page',
	components: {},
	data () {
	  return {
		itemList: [1, 2, 3, 4]
	  }
	},
	mounted() {
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

    .wrap {
      margin: 0 auto;
      width: 375px;
    }
    img {
      width: 100%;
    }

    .img-wrap {
      height: 244px;
      line-height: 244px;
      text-align: center;
      font-size: 100px;
      font-weight: bold;
      background-color: #f7f7f7;
      &:nth-last-child(2n) {
        background-color: #fff;
      }
    }

  }
</style>
