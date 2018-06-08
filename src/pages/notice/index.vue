<template>
  <div class="notice-page page">
    <div class="layout-block">
      <h3 class="block-title">普通场景</h3>
      <x-notice :text="text" color="#f60,#fff7cc" icon="icon-tip-fill"></x-notice>
    </div>

    <div class="layout-block">
      <h3 class="block-title">垂直滚动</h3>
      <x-notice :text="textList" color="#f60,#fff7cc" icon=",icon-reject" v-if="show" @right-tap="show=false"></x-notice>
    </div>
    <div class="layout-block">
      <h3 class="block-title">水平滚动</h3>
      <div class="notice-wrap" v-if="show1">
        <x-notice :text="text" color="#f60,#fff7cc" icon="icon-tip-fill,icon-reject" @right-tap="show1=false"></x-notice>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'notice-page',
	components: {},
	data () {
	  return {
		show1: true,
		show: true,
		textList: [
		  '江南皮革厂倒闭啦!',
		  '原价100块,200块的钱包,',
		  '现在只要20块,20块,统统只要20块!',
//		  '江南皮革厂厂长黄鹤,',
//		  '带着小姨子跑了',
//		  '黄鹤你不是人',
//		  '你还我血汗钱!'
		],
		text: [
		  '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。'
		]
	  }
	},
	methods: {},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .notice-page {
    .notice-wrap {
      width: 200px;
    }
    .layout-block {
      margin: 10px 0;
      background-color: #fff;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
      padding: 0 0 20px;
    }
  }
</style>
