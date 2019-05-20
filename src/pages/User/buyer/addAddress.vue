<template>
	<div class="page-addAddress" v-title="$route.query.title">
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>收货人:</span>
        </div>
        <input v-model="name" placeholder="请输入收货人姓名" type="text" class="mint-field-core">
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>联系方式:</span>
        </div>
        <input v-model="phone" placeholder="请输入手机号" type="tel" class="mint-field-core">
      </div>
    </a>
    <!-- <mt-field label="收货人:" v-model="name" placeholder="请输入收货人姓名"></mt-field> -->
    <!-- <mt-field label="联系方式:" v-model="phone" type="tel" placeholder="请输入手机号"></mt-field> -->
    <a class="mint-cell mint-field" @click="openMenu(0);">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>所在省:</span>
        </div>
        <input readonly='readonly' v-model="showProvince" placeholder="请选择" type="text" class="mint-field-core">
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </a>
    <a class="mint-cell mint-field" @click="openMenu(1);">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>所在市:</span>
        </div>
        <input readonly='readonly' v-model="showCity" placeholder="请选择" type="text" class="mint-field-core">
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>详细地址:</span>
        </div>
        <input v-model="details" placeholder="请输入街道、楼牌号等" type="text" class="mint-field-core">
      </div>
    </a>
    <!-- <mt-field label="详细地址:" v-model="details" placeholder="请输入街道、楼牌号等"></mt-field> -->
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>设为默认:</span>
        </div>
        <mt-radio
          v-model="type"
          :options="['是', '否']">
        </mt-radio>
      </div>
    </a>
    <div class="greenBtn" @click="submit();">保存</div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <p class="confirm">
        <button class="left" @click="cancel();">取消</button>
        <button class="right" @click="confirm();">确认</button>
      </p>
      <mt-picker :slots="slots" valueKey='text' @change="onValuesChange"></mt-picker>
    </mt-popup>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapGetters } from 'vuex'
import app from '../../../utils/common'
export default {
  data() {
    return {
      type: "是", //是否为默认
      popupVisible: false, //显示弹出框
      listprovince:[],  //省数据
      listcity:[],      //市数据
      select:0,
      showProvince:null,
      province:null,
      showCity:null,
      showCityId:null,
      city:null,
      provinceId:null,    //省编号
      cityId:null,        //市编号
      name:null,
      phone:null,
      details:null,
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center",
        }
      ]
    };
  },
  mounted () {
    this.initData();
    app.preventDefault();
  },
  computed: {
    ...mapGetters([
      'getToken'
    ])
  },
  methods: {
    //数据初始化
    initData() {
      if(this.$route.query.pkid!=0){
        app.post('member/shoppingaddrdetail',{
          token:this.getToken,
          pkid:Number(this.$route.query.pkid),
        },(r)=>{
          this.name=r.result.consignee;
          this.phone=r.result.consigneeMobile;
          this.provinceId=r.result.provinceId;
          this.cityId=r.result.cityId;
          this.showCityId=r.result.cityId;
          this.details=r.result.address;
          this.type=r.result.isDefault==1?'是':'否';
          this.showProvince=r.result.provinceName;
          this.showCity=r.result.cityName;
          app.post('common/listprovince',{},(r)=>{
            this.listprovince=r.result;
            this.slots[0].values=this.listprovince;
          })
          app.post('common/listcity',{
            provinceCode:String(this.provinceId)
          },(r)=>{
            this.listcity=r.result;
          })
        },false,this)
      }else {
        app.post('common/listprovince',{},(r)=>{
          this.listprovince=r.result;
          this.slots[0].values=this.listprovince;
        },true)
      }
    },
    submit() {
      if(!app.isName(this.name))return;
      if(!app.isPhone(this.phone))return;
      if(this.showProvince==null || this.showProvince=='') {
        Toast({
          message: '请选择省!',
          position: 'bottom',
          duration: 1500
        });
        return;
      }
      if(this.showCity==null || this.showCity=='') {
        Toast({
          message: '请选择市!',
          position: 'bottom',
          duration: 1500
        });
        return;
      }
      if(this.details==null) {
        Toast({
          message: '请输入详细地址!',
          position: 'bottom',
          duration: 1500
        });
        return;
      }
      app.post('member/saveshoppingaddr',{
        token:this.getToken,
        pkid:Number(this.$route.query.pkid),
        provinceId:Number(this.provinceId),
        cityId:Number(this.showCityId),
        address:this.details,
        consignee:this.name,
        consigneeMobile:this.phone,
        isDefault:this.type=='是'?1:0
      },(r)=>{
        Toast({
          message: '保存成功!',
          position: 'bottom',
          duration: 1500
        });
        this.$router.go(-1);
      },false,this)
    },
    openMenu(type) {
      event.target.blur();
      if(type==0){
        this.slots[0].values=this.listprovince;
        this.select=type;
        this.popupVisible = true;
      }else{
        if(this.showProvince==null) {
          Toast({
            message: '请先选择省!',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(this.listcity.length==0) {
          Toast({
            message: '没有查到市数据!',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        this.slots[0].values=this.listcity;
        this.select=type;
        this.popupVisible = true;
      }

    },
    //取消选择
    cancel() {
      this.popupVisible = false;
    },
    //确认
    async confirm() {
      if(this.select==0){
        app.post('common/listcity',{
          provinceCode:this.provinceId
        },(r)=>{
          this.listcity=r.result;
        })
      }
      this.popupVisible = false;
      this.showProvince=this.province;
      this.showCity=this.city;
      this.showCityId=this.cityId;
    },
    async onValuesChange(picker, values) {
      if(values[0]) {
        if(this.select==0){
          //picker.setSlotValues(0,this.listprovince);
          this.province=values[0].text;
          this.provinceId=values[0].value;
          this.city=null;
          this.cityId=null;
        }else {
          //picker.setSlotValues(0,this.listprovince);
          this.city=values[0].text;
          this.cityId=values[0].value;
        }
      }
    }
  }
};
</script>

<style lang="scss">
.page-addAddress {
  .mint-radiolist{
    .mint-cell{
      min-height: px2rem(40px);
      background-image: none;
    }
    .mint-cell-wrapper{
      background-image: none;
    }
  }
  .mint-cell-wrapper{ //该默认label字体16px为14px
    font-size:14px;
  }
  .mint-button::after {
    background: $primary;
  }
  .mint-cell-text i {
    font-style: normal;
    color: $danger;
  }
  .mint-field-core {
    font-size: 14px;
  }
  .mint-radiolist {
    @include fj;
    position: absolute;
    left: 21%;
    top:50%;
    transform: translateY(-50%);
  }
  .mint-radio-input:checked + .mint-radio-core {
    background: $primary;
    border-color: $primary;
  }
  .mint-radiolist .mint-cell-title {
    width: auto;
  }
  .mint-popup {
    width: 100%;
  }
  .confirm {
    height: px2rem(60px);
    button {
      width: px2rem(110px);
	    height: px2rem(60px);
	    background-color: transparent;
	    border: none;
      	font-size: 14px;
	    &:nth-of-type(1) {
	      color: #333;
	    }
	    &:nth-of-type(2) {
	      color: $primary;
	    }
    }
  }
}
</style>
