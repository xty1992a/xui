<template>
  <x-slider-cell>
    <div class="edit" slot="left">
      <div class="edit-btn slider-btn">编辑</div>
    </div>
    <div class="card">
      <div class="right">
        <p class="name">美国大樱桃</p>
      </div>
      <div class="left">
        <p class="text">领取</p>
      </div>
    </div>

    <div class="del" slot="right">
      <div class="del-btn slider-btn">删除</div>
    </div>
  </x-slider-cell>
</template>

<script>
  export default {
	name: 'card',
	components: {},
	data () {
	  return {}
	},
	methods: {},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .card {
    height: 90px;
    background-color: #fff;
    display: flex;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    justify-content: space-between;
    .right {
      padding: 10px;
      flex: 1;
    }
    .left {
      width: 70px;
      background-color: #f58d48;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        width: 1em;
        font-size: 15px;
      }
      .bite;
    }

  }

  .slider-btn {
    width: 70px;
    height: 90px;
    color: #fff;
  }

  .edit {
    .slider-btn {
      background-color: yellowgreen;
    }
  }

  .del {
    .slider-btn {
      background-color: orangered;
    }
  }

  .bite() {
    position: relative;
    &:before, &:after {
      content: '';
      position: absolute;
      background-color: #f7f7f7;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      left: -4px;
    }
    &:before {
      top: -4px;
      box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.1) inset;
    }
    &:after {
      bottom: -4px;
      box-shadow: 2px 1px 4px rgba(0, 0, 0, 0.1) inset;
    }
  }
</style>
