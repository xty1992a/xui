<template>
  <div :class="['x-cell', `cell__${type}`, {'cell__line':line}]" @tap="goToLink">
    <div class="cell__left" :style="{width: left/ (right+left) * 100 + '%'}">
      <slot name="left">
        <slot name="icon" v-if="icon||img">
          <div class="cell__icon">
            <i v-if="icon" :class="['iconfont', icon]"></i>
            <img v-if="img" :src="img" alt="">
          </div>
        </slot>
        <div class="cell__text">{{title}}</div>
      </slot>
    </div>
    <div class="cell__right" :style="{width: right/ (right+left) * 100 + '%'}">
      <slot name="right">
        <div class="cell__text">{{value}}</div>
        <i :class="['iconfont', linkIcon]" v-if="link"></i>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'cell',
	components: {},
	props: {
	  type: {
		type: String,
		default: 'normal'
	  },
	  link: String,
	  line: Boolean,
	  img: String,
	  icon: String,
	  title: String,
	  value: String,
	  linkIcon: {
		type: String,
		default: 'icon-arrow-right'
	  },
	  left: {
		type: Number,
		default: 1
	  },
	  right: {
		type: Number,
		default: 2
	  }
	},
	data () {
	  return {}
	},
	methods: {
	  goToLink() {
		this.link && (window.location.href = this.link)
	  }
	},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .x-cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
    margin-left: 10px;
    position: relative;
    .cell__text {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .cell__left {
      display: flex;
      align-items: center;
    }
    .cell__right {
      text-align: right;
      .cell__text {
        padding-right: 20px;
      }
      .iconfont {
        position: absolute;
        margin: auto;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
    .cell__icon {
      height: 20px;
      width: 20px;
      margin-right: 10px;
      line-height: 20px;
      text-align: center;
      .iconfont {
        font-size: 18px;
      }
      img {
        height: 18px;
        width: 18px;
      }
    }
  }

  .cell__normal {
    height: 45px;
  }

  .cell__line {
    border-bottom: 1px solid #e5e5e5;
  }
</style>
