<template>
  <transition name="scale">
    <div class="v_dialog" v-if="show">
      <div class="dialog-mask" :class="type!=='confirm'?'transparent':''"></div>
      <div class="center">
        <template v-if="this.type === 'toast'">
          <div class="toast">
            <i class="iconfont" :class="toastImg"></i>
            <p>{{msg}}</p>
          </div>
        </template>
        <template v-if="this.type === 'loading'">
          <div class="v-loading">
            <img src="./loading.svg" alt="">
          </div>
        </template>
        <template v-if="this.type === 'alert'">
          <div class="alert">
            <i class="iconfont icon-tishi"></i>
            <p class="msg">{{msg}}</p>
            <p class="dialog-btn" @click="cancel">我知道了</p>
          </div>
        </template>
        <template v-if="this.type === 'confirm'">
          <div class="confirm">
            <p class="msg">{{msg}}</p>
            <div class="dialog-btns">
              <p class="ok" @click="ok">{{confirmOptions[0]}}</p>
              <p class="no" @click="no">{{confirmOptions[1]}}</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
	name: 'XDialog',
	data() {
	  return {
		show: false,
		msg: '',
		type: '',
		toastStatus: 0,
		confirmOptions: ['确定', '取消']
	  }
	},
	created() {
	  this.$eventBus.$on('dialog', ({type, payload}) => {
		this.type = type
		switch (type) {
		  case 'toast':
			this.toast(payload)
			break
		  case 'loading':
			this.loading(payload)
			break
		  case 'alert':
			this.alert(payload)
			break
		  case 'confirm':
			this.confirm(payload)
			break
		}
	  })
	},
	methods: {
	  toast({msg, delay, status}) {
		this.msg = msg
		this.show = true
		this.toastStatus = status
		setTimeout(() => {
		  this.cancel()
		}, delay)
	  },
	  loading({show}) {
		this.show = show
	  },
	  alert({msg}) {
		this.msg = msg
		this.show = true
	  },
	  cancel() {
		this.msg = ''
		this.show = false
	  },
	  confirm({key, msg, options}) {
		this.show = true
		console.log(key)
		this.pro = key
		this.msg = msg
		this.confirmOptions = options
	  },
	  ok() {
		this.cancel()
		setTimeout(() => {
		  console.log('ok')
		  this.pro.resolve()
		  this.confirmOptions = ['确定', '取消']
		  this.pro = null
		}, 300)
	  },
	  no() {
		this.cancel()
		setTimeout(() => {
		  console.log('no')
		  this.pro.reject()
		  this.confirmOptions = ['确定', '取消']
		  this.pro = null
		}, 300)
	  }
	},
	computed: {
	  toastImg() {
		switch (this.toastStatus) {
		  case 0: // 警告
			return 'icon-waring-fill'
		  case 1: // 成功
			return 'icon-success-unfill'
		  case 2: // 失败
			return 'icon-closed'
		}
	  }
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .v_dialog {
    .full(fixed);
    z-index: 1000;
    .dialog-mask {
      .bc(rgba(0, 0, 0, 0.4));
      .full(absolute);
      &.transparent {
        background-color: transparent;
      }
    }
    .center {
      position: absolute;
      .translate;
      left: 50%;
      top: 50%;
    }
    .v-loading {
      text-align: center;
      img {
        height: 40px;
        width: 40px;
      }
    }
    .toast {
      .block;
    }
    .alert {
      .block(rgba(0, 0, 0, 0.6), 10px 0 0);
      .msg {
        width: 100%;
        .border;
        padding: 10px;
      }
      .dialog-btn {
        width: 100%;
        line-height: 36px;
      }
    }
    .confirm {
      background-color: #fff;
      min-height: 50px;
      padding-bottom: 36px;
      position: relative;
      width: 250px;
      border-radius: 4px;
      .msg {
        line-height: 1.6;
        padding: 10px;
        text-align: center;
      }
      .dialog-btns {
        border-top: 1px solid #f0f0f0;
        display: flex;
        position: absolute;
        height: 36px;
        bottom: 0;
        right: 0;
        left: 0;
        p {
          flex: 1;
          text-align: center;
          font-size: 15px;
          line-height: 36px;
          &:first-child {
            border-right: 1px solid #f0f0f0;
          }
        }
      }
    }
  }

  .scale-enter, .scale-leave-to {
    .dialog-mask {
      opacity: 0;
    }
    .center {
      .translate(-50%, -50%, 0, scale(0));
    }
  }

  .scale-enter-active, .scale-leave-active {
    transition: .3s;
    > div {
      transition: .3s;
    }
  }

  .block(@bc: rgba(0, 0, 0, 0.6), @p: 10px,@w: 250px) {
    width: @w;
    display: flex;
    padding: @p;
    min-height: 100px;
    border-radius: 4px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .bc(@bc);
    .iconfont {
      font-size: 50px;
      color: #fff;
    }
    p {
      line-height: 1.6;
      text-align: center;
      color: #fff;
    }
  }

  .full(@pos) {
    position: @pos;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;
  }

  .translate(@x:-50%, @y:-50%, @z:0, @more: scale(1)) {
    transform: translate3d(@x, @y, @z) @more;
  }

  .bc(@color: #f7f7f7) {
    background-color: @color;
  }

  .border(@color: #f0f0f0) {
    position: relative;
    &:before {
      transform: scaleY(.5);
      transform-origin: 50% 0;
      background-color: @color;
      pointer-events: none;
      position: absolute;
      height: 1px;
      content: '';
      bottom: 0;
      right: 0;
      left: 0;
    }
  }
</style>
