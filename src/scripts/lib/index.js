/**
 * Created by TY-xie on 2018/6/7.
 */
export function loadScript(src) {
  return new Promise(resolve => {
	let script = document.createElement('script')
	script.type = 'text/javascript'
	script.src = src
	document.body.appendChild(script)
	script.onload = function () {
	  resolve(window.region)
	}
  })
}