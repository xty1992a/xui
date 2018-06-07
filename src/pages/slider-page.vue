<template>
  <div class="slider-page">
    <x-btn text="添加" @tap="add"></x-btn>
    <x-btn text="删除" @tap="minus"></x-btn>
    <div class="wrap">
      <x-swiper :data="itemList" loop auto>
        <ul class="img-list">
          <li class="img-wrap" :key="index" v-for="item,index in itemList">{{item}}</li>
        </ul>
      </x-swiper>
      <x-swiper :data="itemList" loop type="2" auto>
        <ul class="img-list">
          <li class="img-wrap" :key="index" v-for="item,index in itemList">{{item}}</li>
        </ul>
      </x-swiper>
    </div>

    <div class="clip">
      <div class="box"></div>
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

    .clip {
      .box {
        height: 100px;
        width: 100px;
        background-color: #f7f7f7;
        clip-path: circle(180px at 50px 50px);
        transition: .3s;
        &:hover {
          clip-path: circle(30px at 50px 50px);
        }
      }
    }
  }
</style>
