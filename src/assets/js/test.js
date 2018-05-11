/**
 * Created by TY-xie on 2018/5/7.
 */

function getNum(num) {
  return new Promise(r => {
	setTimeout(() => {
	  r(num)
	}, 2000)
  })
}
function getString(text) {
  return new Promise(r => {
	setTimeout(() => {
	  r(text)
	}, 2000)
  })
}
let i = 0
let t = setInterval(() => {
	  i > 4 && clearInterval(t)
	  console.log(i)
	  i++
	}, 1000)
;(async () => {
  let getN = getNum(30)
  let getS = getString('hello')
  let num = await getN
  console.log(num)
  let str = await getS
  console.log(num, str)
  let n = await getNum(20)
  console.log(n)
  let s = await getString('world')
  console.log(n, s)
})()
