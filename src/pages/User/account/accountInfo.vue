<template>
  <div class="page-accountInfo" v-title="'开户信息'">
    <a class="mint-cell mint-field" @click="openMenu(2);">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">银行名称</span>
        </div>
        <input v-model="bankName.text" readonly placeholder="请选择" type="text" class="mint-field-core">
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </a>
    <mt-field label="银行账户名" placeholder="请输入银行账户名" v-model="accountName"></mt-field>
    <mt-field label="银行账号" placeholder="请输入银行账号" v-model="bankAccount"></mt-field>
    <mt-field label="支行名称" placeholder="请输入支行名称" v-model="branch"></mt-field>
    <a class="mint-cell mint-field" @click="openMenu(0);">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">开户省份</span>
        </div>
        <input v-model="showProvince" readonly placeholder="请选择" type="text" class="mint-field-core">
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </a>
    <a class="mint-cell mint-field" @click="openMenu(1);">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">开户地区</span>
        </div>
        <input v-model="showCity" readonly placeholder="请选择" type="text" class="mint-field-core">
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </a>
    <div class="greenBtn">保存</div>
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
import { MessageBox } from 'mint-ui';
  export default {
    data(){
      return{
        bankName:{
          text:null,
          value:null
        },
        bankName_:{},
        bankNameList:[],
        accountName:null,
        bankAccount:null,
        branch:null,
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
      }
    },
    computed: {
      ...mapGetters(["getToken"])
    },
    mounted() {
      this.dataInit();
    },
    beforeRouteLeave (to, from, next) {
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
        },true)
        app.post('common/listbank',{},r=>{
          this.bankNameList=r.result;
        })
      },
      openMenu(type) {
        event.target.blur();
        if (type == 0) {
          this.slots[0].values = this.listprovince;
          this.select = type;
          this.popupVisible = true;
        } else if(type == 1) {
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
        }else if(type == 2) {
          this.slots[0].values = this.bankNameList;
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
        this.bankName=this.bankName_;
      },
      async onValuesChange(picker, values) {
        if (values[0]) {
          if (this.select == 0) {
            //picker.setSlotValues(0,this.listprovince);
            this.province = values[0].text;
            this.provinceId = values[0].value;
            this.city = null;
            this.cityId = null;
          } else if(this.select == 1) {
            //picker.setSlotValues(0,this.listprovince);
            this.city = values[0].text;
            this.cityId = values[0].value;
          }else if(this.select == 2) {
            this.bankName_=values[0];
          }
        }
      }
    }
  }
</script>

<style lang="scss">
.page-accountInfo{
  //该默认label字体16px为14px
  .mint-cell-wrapper {
      font-size: 14px;
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
