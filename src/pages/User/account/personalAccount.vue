<template>
  <div class="page-personalAccount" v-title="'个人用户开户'">
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">个体户</span>
        </div>
        <mt-radio
          class="radio-box"
          v-model="selfEmployed"
          :options="['是', '否']">
        </mt-radio>
      </div>
    </a>
    <div class="mark"></div>
    <mt-field label="真实姓名" placeholder="" readonly v-model="personalName"></mt-field>
    <mt-field label="手机号码" placeholder="" readonly v-model="phone"></mt-field>
    <mt-field label="身份证号" placeholder="请输入身份证号码" type="tel" v-model="cardId"></mt-field>
    <a class="mint-cell mint-field" @click="openMenu(0);">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">用户省份</span>
        </div>
        <input v-model="showProvince" readonly placeholder="请选择" type="text" class="mint-field-core">
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </a>
    <a class="mint-cell mint-field" @click="openMenu(1);">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">用户地区</span>
        </div>
        <input v-model="showCity" readonly placeholder="请选择" type="text" class="mint-field-core">
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </a>
    <mt-field label="住址" placeholder="请输入居住地址" v-model="address"></mt-field>
    <mt-field label="职业" placeholder="请输入个人职业" v-model="job"></mt-field>
    <div class="upload">
      <div class="upload-label">
        <i class="required-mark">*</i>图片信息
        <span>需加盖公司红章，支持1MB以内jpg，png，bmp</span>
      </div>
      <ul class="file-list">
        <li v-for="(item,index) in uploadImg" :key="index">
          <div class="file-box">
            <input type="file" accept="image/*" @change="upload($event,index);" >
            <img v-lazy="item" alt="">
          </div>
        </li>
      </ul>
    </div>
    <div class="greenBtn">提交审核</div>
    <div class="greenBtn" @click="submit();">提交审核</div>
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

<script type="text/ecmascript-6">
import app from "../../../utils/common";
import { mapGetters } from "vuex";
import { MessageBox, Toast } from "mint-ui";
export default {
  data() {
    return {
      personalName: "",
      phone: "",
      cardId: "",
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
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center",
        }
      ],
      back:false
    };
  },
  computed: {
    ...mapGetters(["getToken"])
  },
  mounted() {
    this.dataInit();
  },
  beforeRouteLeave (to, from, next) {
    if(this.cardId != "") {
      this.back=true;
    }
    if(this.showCity != null) {
      this.back=true;
    }
    if(this.showProvince != null) {
      this.back=true;
    }
    if(this.back) {
      MessageBox.confirm('是否离开当前页面，已输入内容会丢失','芬木提示',{closeOnClickModal:false}).then(action => {
        next();
      }).catch(action=>{
        next(false);
      });
    }else {
      next();
    }
  },
  methods: {
    dataInit() {
      app.post('common/listprovince',{},(r)=>{
        this.listprovince=r.result;
        this.slots[0].values=this.listprovince;
      })
      app.post('member/info',{
        token:this.getToken
      },(r)=>{
        this.personalName=r.result.name;
        this.phone=r.result.mobile;
      },false,this)
    },
    //提交
    submit() {
      if(this.cardId == '' || this.cardId == null) {
        Toast({
          message: '请输入身份证号码！',
          position: 'bottom',
          duration: 1500
        });
        return;
      }
      if(!app.isCardID(this.cardId)) return;
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
      app.post('member/applypersonalaccount',{
        token:this.getToken,
        certId:Number(this.cardId),
        provinceCode:Number(this.provinceId),
        cityCode:Number(this.showCityId),
        isSubmit:1
      },r=>{
        Toast({
          message: '提交成功!',
          position: 'bottom',
          duration: 1500
        });
        this.back=false;
        this.$router.go(-1);
      })
    },
    data() {
      return {
        selfEmployed: null,
        personalName: '张三',
        phone: '15555855526',
        ID: '34292115555855526',
        province: null,
        city: null,
        popupPick: false,
        address: null,
        job: null,
      }
    },
    openMenu(type) {
      event.target.blur();
      if (type == 0) {
        this.slots[0].values = this.listprovince;
        this.select = type;
        this.popupVisible = true;
      } else {
        if (this.showProvince == null) {
          Toast({
            message: "请先选择省!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if (this.listcity.length == 0) {
          Toast({
            message: "没有查到市数据!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        this.slots[0].values = this.listcity;
        this.select = type;
        this.popupVisible = true;
      }
    },
    //取消选择
    cancel() {
      this.popupVisible = false;
    },
    //确认
    async confirm() {
      if (this.select == 0) {
        app.post("common/listcity",{
            provinceCode: this.provinceId
          },r => {
            this.listcity = r.result;
          }
        );
      }
      this.popupVisible = false;
      this.showProvince = this.province;
      this.showCity = this.city;
      this.showCityId = this.cityId;
    },
    async onValuesChange(picker, values) {
      if (values[0]) {
        if (this.select == 0) {
          //picker.setSlotValues(0,this.listprovince);
          this.province = values[0].text;
          this.provinceId = values[0].value;
          this.city = null;
          this.cityId = null;
        } else {
          //picker.setSlotValues(0,this.listprovince);
          this.city = values[0].text;
          this.cityId = values[0].value;
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "src/styles/components/upload";
.page-personalAccount {
  .mint-radiolist {
    @include fj;
  }
  .radio-box .mint-radiolist-title{
    margin:0;
  }
  .radio-box .mint-cell-wrapper,
  .radio-box .mint-radiolist-label{
    padding-left:0;
  }
  .mint-radio-input:checked + .mint-radio-core {
    background: $primary;
    border-color: $primary;
  }
  .mint-radiolist .mint-cell{
    background-image: none;
  }
  .mint-cell {
    min-height: px2rem(80px);
  }
  .mark {
    position: absolute;
    width: 100%;
    height: 96px;
    top: 0;
    left: 0;
    z-index: 9;
  }
  //该默认label字体16px为14px
  .mint-cell-wrapper {
    font-size: 14px;
  }
  .mint-popup {
    width: 100%;
  }
  .upload-label{
    color: #333;
    span{
      display: inline-block;
      white-space:nowrap;
      color: #f00;
      font-size:12px;
    }
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
    /*.greenBtn{
      position: fixed;
      transform: translateX(-50%);
      left:50%;
      bottom:0;
      z-index:100;
      width: 100%;
      height:50px;
      line-height:50px;
      border-radius: 0;
      margin:0;
    }*/
  }
}
</style>
