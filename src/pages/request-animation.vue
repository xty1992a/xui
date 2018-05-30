<template>
  <div class="request-animation">
    <div class="info" @tap="show=!show">
      <p v-for="i in info">{{i}}</p>
    </div>
    <!--<scroll :data="list" :done="isDone"-->
    <!--@scrollEnd="scrollEnd"-->
    <!--@infinite="infiniteHandler"-->
    <!--@refresh="refreshHandler">-->
    <swiper :data="imgList">
      <ul class="img-list">
        <li class="img-wrap" :key="index" v-for="item,index in imgList">
          <img :src="item" alt="">
        </li>
      </ul>
    </swiper>
    <ul class="list">
      <li class="item" v-for="item in list">{{item}}</li>
    </ul>
    <!--</scroll>-->
    <!--<load-more requireRefresh :onInfinite="onInfinite" :onRefresh="onRefresh">-->
    <!--<ul class="list">-->
    <!--<li class="item" v-for="item in list">{{item}}</li>-->
    <!--</ul>-->
    <!--</load-more>-->
  </div>
</template>

<script>
  import LoadMore from 'components/load-more1'
  export default {
	name: 'request-animation',
	data () {
	  return {
		show: false,
		list: [],
		info: [],
		touch: {},
		isDone: false,

		imgList: [
		  'http://s9.knowsky.com/bizhi/l/1-5000/200952813561872091113.jpg',
		  'http://s9.knowsky.com/bizhi/l/1-5000/200952813566804880856.jpg',
		  'http://s9.knowsky.com/bizhi/l/1-5000/2009528135610758113800.jpg',
		  'http://s9.knowsky.com/bizhi/l/1-5000/2009528135613456901907.jpg',
		  'http://s9.knowsky.com/bizhi/l/1-5000/2009528135622695757924.jpg',
		  'http://s9.knowsky.com/bizhi/l/1-5000/2009528135627780489920.jpg',
		]
	  }
	},
	components: {LoadMore},
	created() {
	  this.list = Array(40).fill(0).map((i, n) => n + 1)
	},
	methods: {
	  scrollEnd(y) {
		this.info.splice(0, 1, y)
	  },

	  onInfinite(done) {
		console.log('should load more')
		let l = this.list[this.list.length - 1]
		setTimeout(() => {
		  if (this.list.length > 60) {
			done(true)
		  } else {
			this.list = [...this.list, ...Array(20).fill(0).map((i, n) => n + 1 + l)]
			done(false)
		  }
		}, 1000)
	  },
	  onRefresh(done) {
		console.log('should refresh')
		setTimeout(() => {
		  console.log('list back')
		  this.list = Array(40).fill(0).map((i, n) => n + 1)
		  done()
		}, 1000)
	  },

	  refreshHandler() {
		console.log('should refresh')
		setTimeout(() => {
		  this.isDone = false
		  console.log('list back')
		  this.list = Array(40).fill(0).map((i, n) => n + 1)
		}, 1000)
	  },
	  infiniteHandler() {
		console.log('should load more')
		let l = this.list[this.list.length - 1]
		setTimeout(() => {
		  if (this.list.length > 60) {
			this.isDone = true
		  } else {
			this.list = [...this.list, ...Array(20).fill(0).map((i, n) => n + 1 + l)]
		  }
		}, 400)
	  }
	},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .request-animation {
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 0;
  }

  .list {
    margin: 0;
    padding: 0 0 0 10px;
    li {
      list-style: none;
      line-height: 30px;
      padding-left: 10px;
      &:nth-child(2n+1) {
        background-color: #f7f7f7;
      }
    }
  }

  img {
    width: 100%;
  }

  .info {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    transform: translateY(-100%);
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    p {
      line-height: 28px;
      text-align: center;
      margin: 0;
    }
  }

</style>
