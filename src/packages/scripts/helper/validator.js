/**
 * Created by TY-xie on 2018/6/7.
 */
// 一个验证器,提供一个use方法,可以挂载新的规则.
// 提供一个create方法,接受规则关键字,返回一个函数
// 该函数接受一个字符串,返回一个对象,表示该值是否合法,及原因
class Validator {
  constructor() {
	this.rules = []
  }

  use(rule, isCover = false) {
	if (!rule) throw new Error('expect a rule Object got ' + typeof rule)
	if (!rule.test) throw new Error('rule should contain an test function')
	if (!rule.name)  throw new Error('rule should had an name')
	rule.tip = rule.tip || `您的输入结果不符合${rule.name}校验规则`
	if (this.getRule(rule.name) && !isCover) {
	  console.warn('this validator had ' + rule.name + ' already\nchange another name or use second argument to cover it!')
	  return
	}
	this.rules.push(rule)
  }

  getRule(name) {
	return this.rules.find(rule => rule.name === name)
  }

  create(...ruleList) {
	if (!Array.isArray(ruleList)) throw new Error('expect an array, got ' + typeof ruleList)
	let self = this
	return function (value) {
	  for (let i = 0; i < ruleList.length; i++) {
		let rule = self.getRule(ruleList[i])
		if (!rule.test(value)) {
		  return {valid: false, tip: rule.tip}
		}
	  }
	  return {valid: true}
	}
  }
}

const validator = new Validator()

const ruleList = [
  {
	name: 'phone',
	test: v => /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(v),
	tip: '手机号码输入错误!',
  },
  {
	name: 'require',
	test: v => v !== '',
	tip: '该项不能为空!',
  },
]
ruleList.forEach(rule => {
  validator.use(rule)
})
// console.log(ruleList[0].test('1234'))
export default validator