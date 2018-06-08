<template>
  <div class="address-picker page">

    <x-button-tab v-model="tabIndex" :labels="['注册','登录', '修改']" :radius="6"></x-button-tab>
    <x-tabs v-model="tabIndex" headLess>
      <x-tab-panel label="注册" key="register" index="0">
        <div class="cell-wrap">
          <x-field title="联系电话"
                   v-model="telPhone" line
                   max="11" :validator="phoneTest"></x-field>
          <x-field title="验证码"
                   v-model="verifyCode"
                   max="4" :btnText="btnText"
                   @btn-tap="verifyTel"
                   :validator="phoneTest" btn></x-field>
        </div>
      </x-tab-panel>
      <x-tab-panel label="登录" key="login" index="1">
        <div class="cell-wrap">
          <x-cell title="地区" :value="fullAddress.text" line @tap.native="pickShow=true"></x-cell>
          <x-field title="详细地址" v-model="subAddress" :validator="$XUI.validator.create('require')"></x-field>
        </div>
      </x-tab-panel>
      <x-tab-panel label="修改" key="edit" index="2">
        <div class="cell-wrap">
          <x-field title="联系电话"
                   v-model="telPhone" line
                   max="11" :validator="phoneTest"></x-field>
          <x-field title="验证码"
                   v-model="verifyCode"
                   max="4" btnText="发送验证码"
                   @btn-tap="verifyTel"
                   :validator="phoneTest" btn></x-field>
        </div>
      </x-tab-panel>
    </x-tabs>

    <x-action v-show="pickShow" @cancel="pickShow=false">
      <div class="picker-wrap" slot="bottom">
        <x-picker v-model="provinceIndex" :data="provinces" :font="40"></x-picker>
        <x-picker v-model="cityIndex" :data="cities" :font="40"></x-picker>
        <x-picker v-model="countryIndex" :data="countries" :font="40"></x-picker>
      </div>
    </x-action>
  </div>
</template>

<script>
  import {loadScript} from '../../scripts/lib'
  export default {
	name: 'address-picker',
	components: {},
	data () {
	  return {
		tabIndex: 0,
		pickShow: false,
		region: null,
		provinceIndex: 0,
		cityIndex: 0,
		countryIndex: 0,
		subAddress: '',
		telPhone: '',
		verifyCode: '',
		btnText: '发送验证码'
	  }
	},
	created() {

	  this.initRegion()
	},
	methods: {
	  phoneTest(v) {
		return this.$XUI.validator.create('require', 'phone')(v)
	  },
	  async initRegion(){
		let region = window.region
		if (!region) {
		  region = await  loadScript('/static/region.js')
		}
		this.region = region
	  },

	  verifyTel() {
		if (this.counting) return
		this.startCounting(10)
		console.log('should send msg')
	  },
	  startCounting(num) {
		this.counting = true
		let self = this
		step()
		function step() {
		  num--
		  if (!num) {
			self.btnText = '发送验证码'
			self.counting = false
			return
		  }
		  self.btnText = `${num}s后重新获取`
		  setTimeout(() => {
			step()
		  }, 1000)
		}
	  }
	},
	computed: {
	  provinces() {
		if (!this.region) return []
		return Object.keys(this.region).map(k => ({value: k, text: this.region[k].n}))
	  },
	  province() {
		if (!this.region) return {}
		return this.provinces[this.provinceIndex]
	  },
	  cities() {
		if (!this.region) return []
		let province = this.region[this.province.value]
		return Object.keys(province).reduce((p, k) => k === 'n' ? p : [...p, {value: k, text: province[k].n}], [])
	  },
	  city() {
		if (!this.region) return '1'
		return this.cities[this.cityIndex]
	  },
	  countries() {
		if (!this.region) return []
		let city = this.region[this.province.value][this.city.value]
		return Object.keys(city).reduce((p, k) => k === 'n' ? p : [...p, {value: k, text: city[k]}], [])
	  },
	  country() {
		if (!this.region) return '1'
		return this.countries[this.countryIndex]
	  },
	  fullAddress() {
		if (!this.region) return {text: '数据加载中...', value: []}
		return {text: `${this.province.text}-${this.city.text}-${this.country.text}`, value: [this.province.value, this.city.value, this.country.value]}
	  }
	},
	watch: {
	  provinceIndex(i) {
		this.cityIndex = 0
	  },
	  cityIndex() {
		this.countryIndex = 0
	  }
	}
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

  .address-picker {
    .picker-wrap {
      display: flex;
    }
    .cell-wrap {
      background-color: #fff;
      margin-bottom: 10px;
      input {
        background-color: #fff;
        border: none;
        outline: none;
        width: 100%;
        text-align: right;
        padding-right: 20px;
        &:focus {
          text-align: left;
        }
      }
    }
  }
</style>
