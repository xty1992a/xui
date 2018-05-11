<template>
  <div class="count" :class="[size]" ref="wrap" @click="copy">
    <canvas ref="canvas">您的浏览器不支持canvas，请升级或更换现代浏览器！</canvas>
  </div>
</template>

<script>
  export default {
	name: 'count',
	components: {},
	props: {
	  size: {
		type: String,
		default: 'wrap'
	  }
	},
	data () {
	  return {
		cvs: null,
		ctx: null,
		rect: {}
	  }
	},
	mounted() {
	  this.getContext()
	  this.write('hello world')
	},
	methods: {
	  getContext(){
		let wrap = this.$refs.wrap
		this.cvs = this.$refs.canvas
		this.ctx = this.cvs.getContext('2d')
		this.cvs.width = wrap.clientWidth
		this.cvs.height = wrap.clientHeight
	  },
	  write(text, size = 20, color) {
		let {ctx} = this
		if (!ctx) return
		ctx.save()
		ctx.font = `bold ${size}px Georgia`;
		ctx.fillStyle = '#058'
		ctx.fillText(text, 0, 20)
		this.rect.length = text.length
		this.rect.width = text.length * size
		this.rect.height = size
		ctx.restore()
	  },
	  copy() {
		let {ctx} = this
		let {width, height} = this.rect
		let imageData = ctx.getImageData(0, 0, width, height)
		console.log(imageData)
		for (let i = 0; i < imageData.data.length; i += 4) {
		  if (imageData.data[i + 3] == 0) continue;
		  imageData.data[i] = 255;
		  imageData.data[i + 1] = 0;
		  imageData.data[i + 2] = 0;
		  // imgData.data[i + 3] = 255;  这个代表的是透明度 透明度不变 255最高 0最低
		}
		ctx.putImageData(imageData, 0, 20);
	  },
	  getImageData() {
		let {ctx} = this
//        ctx.getImageData(0, )
	  }
	},
	computed: {}
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">

  .wrap {
    height: 100%;
    width: 100%;
  }

  .count {
  }
</style>
