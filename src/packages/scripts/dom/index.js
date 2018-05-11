/**
 * Created by TY-xie on 2018/5/11.
 */
/*
 *  接受一个图片地址，返回一个promise，
 *  promise只会resolve，success为false时返回原地址
 * */
export const getGray = src => new Promise((resolve, reject) => {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  let img = new Image()
  img.src = src
  img.onload = function () {
	canvas.height = img.height
	canvas.width = img.width
	ctx.drawImage(img, 0, 0)
	let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
	let data = imgData.data
	/*灰度处理：求r，g，b的均值，并赋回给r，g，b*/
	for (let i = 0, n = data.length; i < n; i += 4) {
	  // 平均值法
	  let gray = (data[i] + data[i + 1] + data[i + 2]) / 3
	  // 浮点算法  gray = r * 0.3 + g * 0.59 + b * 0.11
	  data[i] = gray
	  data[i + 1] = gray
	  data[i + 2] = gray
	}
	ctx.putImageData(imgData, 0, 0)
	/*返回处理之后的src*/
	resolve({
	  success: true,
	  data: canvas.toDataURL(),
	})
  }
  img.onerror = function () {
	resolve({
	  success: false,
	  data: src,
	})
  }
})