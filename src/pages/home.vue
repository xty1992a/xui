<template>
  <div class="home page">


    <div class="btn-wrap">
      <x-btn colors="#fff,#000,#333" text="底侧action" size="small" @tap="show=true"></x-btn>
      <x-btn type="primary" text="右侧pop" size="normal" @tap="sideHandle('right')"></x-btn>
      <x-btn type="danger" text="左侧pop" size="large" @tap="sideHandle('left')"></x-btn>
    </div>

    <x-tab-nav v-model="tabIndex" :labels="tabs.map(({name}) => name)">
      <div class="custom-name" slot-scope="name">{{name.navName}}</div>
    </x-tab-nav>
    <x-tabs v-model="tabIndex">
      <x-tab-panel
              :label="item.name"
              :key="index"
              :index="index"
              v-for="item,index in tabs">
        <div class="item">{{item.desc}}</div>
      </x-tab-panel>
    </x-tabs>

    <x-ranger v-model="goods.count" :start="0" :step="goods.inventory"></x-ranger>
    <div class="cell-list">

      <x-cell title="计数器" icon="icon-edit-unfill" line>
        <template slot="right">
          <x-count size="normal"
                   v-model="goods.count"
                   :max="goods.inventory"></x-count>
        </template>
      </x-cell>

      <x-cell title="标题" icon="icon-edit-unfill" link="http://www.baidu.com" line value="去买单"></x-cell>

      <x-cell title="豆花口味" icon="icon-edit-unfill" line>
        <x-check-group v-model="taste" slot="right" style="float: right;">
          <x-checker val="0" text="甜豆花"></x-checker>
          <x-checker val="1" text="咸豆花"></x-checker>
        </x-check-group>
      </x-cell>

      <x-cell title="豆花口味" icon="icon-edit-unfill" line>
        <x-switcher v-model="open" slot="right" style="float: right;"></x-switcher>
      </x-cell>
    </div>

    <x-close-panel v-show="open">
      <div>
        <div class="panel-block">
          <x-check-group v-model="flavor" :radio="false">
            <x-checker val="0" disable text="甜豆花"></x-checker>
            <x-checker val="1" text="咸豆花"></x-checker>
            <x-checker val="2" text="咸豆花"></x-checker>
            <x-checker val="3" text="咸豆花"></x-checker>
          </x-check-group>
        </div>
      </div>
    </x-close-panel>
    <div class="box-wrap">
      <div class="box"></div>
    </div>

    <x-action v-show="show" @cancel="show=false">
      <div class="downer" slot="bottom"></div>
    </x-action>
    <x-side-pop :position="position" v-show="sideShow" @cancel="sideShow=false">
      <div class="left-side"></div>
    </x-side-pop>

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
		taste: '0',
		flavor: ['0', '1', '2', '3'],
		open: false,
		show: false,
		sideShow: false,
		position: 'right',
		rangerNum: 10,
		tabs: [
		  {
			name: '绘画',
			desc: '第一艺术'
		  },
		  {
			name: '音乐无极限',
			desc: '第二艺术'
		  },
		  {
			name: '雕刻',
			desc: '第三艺术'
		  },
		  {
			name: '建筑',
			desc: '第四艺术'
		  },
		  {
			name: '诗歌',
			desc: '第五艺术'
		  },
		  {
			name: '舞蹈',
			desc: '第六艺术'
		  },
		  {
			name: '戏剧',
			desc: '第七艺术'
		  },
		  {
			name: '电影',
			desc: '第八艺术'
		  },
		  {
			name: '游戏',
			desc: '第九艺术'
		  },

		],
		tabIndex: 5,
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
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 20px;
    background-color: #f7f7f7;
    color: #000;
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
      height: 200px;
      background-color: #fff;
    }

    .box-wrap {
      width: 100%;
      overflow-x: auto;
      .box {
        height: 30px;
        width: 200%;
        background: linear-gradient(to left, #000, #fff);
      }
    }

    .custom-name {
      line-height: 45px;
      padding: 0 30px;
      border-bottom: 1px solid #e5e5e5;
    }

    .panel-block {
      height: 50px;
      display: flex;
      align-items: center;
      padding-left: 10px;
    }

    .cell-list {
      background-color: #fff;
    }
  }
</style>