<template>
  <div class="request-animation">
    <div class="info">
      <p v-for="i in info">{{i}}</p>
    </div>
    <scroll :data="list" :done="isDone"
            @scrollEnd="scrollEnd"
            @infinite="infiniteHandler"
            @refresh="refreshHandler">
      <ul class="list">
        <img src="/static/phone/1.jpeg" alt="">
        <li class="item" v-for="item in list">{{item}}</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  export default {
	name: 'request-animation',
	data () {
	  return {
		list: [],
		info: [],
		touch: {},
		isDone: false
	  }
	},
	created() {
	  this.list = Array(40).fill(0).map((i, n) => n + 1)
	},
	methods: {
	  scrollEnd(y) {
		this.info.splice(0, 1, y)
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
		}, 3000)
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

  .scroll {
    height: 100%;
    ul {
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
      img {
        width: 100%;
      }
    }
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
