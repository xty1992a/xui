<template>
  <div class="tabs">
    <ul :class="['nav-list', dir]">
      <li class="nav-item"
          @tap="navTap(index)"
          :class="index===value?'active':''"
          v-for="item,index in labels">{{item}}<!----></li>
    </ul>
    <ul class="tab-content">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  export default {
	name: 'tabs',
	props: {
	  value: Number
	},
	data () {
	  return {
		labels: [],
		dir: 'left'
	  }
	},
	created() {
	},
	mounted() {
	  console.log(this)
	  this.labels = this.$slots.default.map((it) => it.child.label)
	},
	methods: {
	  navTap(index) {
		console.log('tap')
		if (this.value > index) {
		  this.dir = 'left'
		} else {
		  this.dir = 'right'
		}
		this.$emit('input', index)
	  }
	},
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .tabs {
    .nav-list {
      display: flex;
      align-items: center;
      background-color: #fff;
      &.left {
        .nav-item {
          &:not(.active) {
            &:after {
              transform-origin: 0;
            }
          }
          &.active {
            &:after {
              transform-origin: 100%;
            }
          }
        }
      }
      &.right {
        .nav-item {
          &:not(.active) {
            &:after {
              transform-origin: 100%;
            }
          }
          &.active {
            &:after {
              transform-origin: 0;
            }
          }
        }
      }
      .nav-item {
        line-height: 36px;
        padding: 0 20px;
        position: relative;
        &:after {
          content: '';
          width: 100%;
          position: absolute;
          background-color: #5574ff;
          transform: scaleX(0);
          transition: 30s;
          height: 1px;
          bottom: 0;
          left: 0;
        }
      }

      .active {
        &:after {
          transform: scaleX(1);
        }
      }
    }
    .tab-content {
      overflow: hidden;
      position: relative;
    }
  }

</style>