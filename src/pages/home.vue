<template>
  <div class="home page">
    <count size="normal"
           v-model="goods.count"
           :max="goods.inventory"></count>
    <div class="btn-wrap">
      <btn text="底侧action" size="small" @tap="show=true"></btn>
      <btn text="右侧pop" size="normal" @tap="sideHandle('right')"></btn>
      <btn text="左侧pop" size="large" @tap="sideHandle('left')"></btn>
    </div>

    <tabs v-model="tabIndex">
      <tab-panel
              :label="item.name"
              :key="index"
              :index="index"
              v-for="item,index in tabs">
        <div class="item">{{item.desc}}</div>
      </tab-panel>
    </tabs>

    <ranger v-model="rangerNum" :start="10" :step="90"></ranger>
    <action v-show="show" @cancel="show=false">
      <div class="downer" slot="bottom"></div>
    </action>
    <side-pop :position="position" v-show="sideShow" @cancel="sideShow=false">
      <div class="left-side"></div>
    </side-pop>

  </div>
</template>

<script>
  import Request from 'api/index.js'
  export default {
	name: 'home',
	components: {},
	props: {},
	data () {
	  return {
		goods: {
		  count: 1,
		  inventory: 10
		},
		show: false,
		sideShow: false,
		position: 'right',
		rangerNum: 10,
		tabs: [
		  {
			name: '电影',
			desc: '第八艺术'
		  },
		  {
			name: '绘画',
			desc: '第一艺术'
		  },
		  {
			name: '音乐',
			desc: '第二艺术'
		  },
		],
		tabIndex: 2
	  }
	},
	created() {
	  Request({}) // {#}
	},
	methods: {
	  test(e) {
	  },
	  sideHandle(dir) {
		this.position = dir
		this.$nextTick(() => {
		  this.sideShow = true
		})
	  }
	},
	computed: {},
	watch: {
	  show(now) {
		if (!now) {
		  this.$dialog._confirm('豆花是啥味?', ['甜', '甜'])
			  .then(() => {
				console.log('甜')
				this.$dialog._toast('甜')
			  })
			  .catch(() => {
				console.log('还是甜')
				this.$dialog._toast('还是甜')
			  })
		}
	  }
	}
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/less">

  .home {
    background-color: #f7f7f7;
    .count {
      background-color: #fff;
    }
    .downer {
      height: 300px;
      background-color: #fff;
    }
    .btn-wrap {
      padding: 0 10px;
      margin: 20px 0;
      flex-wrap: wrap;
      justify-content: space-between;
      display: flex;
    }
    .left-side {
      height: 100vh;
      width: 100px;
      background-color: #fff;
    }

    .item {
      width: 100%;
      height: 300px;
      background-color: #fff;
    }

  }
</style>
<style>
  .action {
    bottom: 0;
  }
</style>