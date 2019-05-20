<template>
    <div class="deliver-goods" v-title="'发货'">
      <div class="mock" v-show="isInputInfo.length>0"></div>
      <div>
        <a class="mint-cell mint-field" @click="popup();">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text"><i>*</i>物流平台</span>
            </div>
            <input v-model="logisticsCompanyName" readonly placeholder="请选择" type="text" class="mint-field-core">
            <i class="iconfont icon-jiantouyou"></i>
          </div>
        </a>
        <mt-field label="物流单号:" placeholder="请输入物流单号" v-model="logisticsOrderNo"></mt-field>
        <!-- <mt-field label="保单号:" placeholder="请输入保单号" ></mt-field> -->
        <mt-field label="车牌号:" placeholder="请输入车牌号" v-model="carLicenseNo"></mt-field>
        <mt-field label="司机姓名:" placeholder="请输入司机姓名" v-model="driverName"></mt-field>
        <mt-field label="司机手机:" placeholder="请输入司机手机号码" v-model="driverMobile"></mt-field>
      </div>
      <mt-checklist
        v-model="isInputInfo"
        :options="['没有物流信息']">
      </mt-checklist>
      <mt-popup
        v-model="popupVisible"
        position="bottom">
        <!-- <p class="confirm">
          <button class="left" @click="popup();">取消</button>
          <button class="right" @click="popup();">确认</button>
        </p> -->
        <mt-picker valueKey="text" :slots="slots" @change="onValuesChange"></mt-picker>
      </mt-popup>
      <div class="greenBtn" @click="submit(0);">提交</div>
    </div>
</template>

<script type="text/ecmascript-6">
import {  Popup, Picker, Toast } from "mint-ui";
import app from "../../../utils/common"
import { mapGetters } from 'vuex'
export default {
  components: {
    Popup: "mt-popup",
    Picker: "mt-picker"
  },
  data() {
    return {
      logisticsCompanyName: null,    //物流公司名称
      logisticsCompanyId:null,      //物流id
      slots: [
        {
          flex: 1,
          values: [],
        }
      ],
      popupVisible: false, //显示弹出框
      logisticsOrderNo:null,  //物流单号
      carLicenseNo:null,      //车牌号
      driverName:null,        //司机名称
      driverMobile:null,       //司机手机
      isInputInfo:[],    //是否有物流信息
    };
  },
  computed: {
    ...mapGetters([
      'getToken'
    ])
  },
  mounted () {
    this.dataInit();
    app.preventDefault();
  },
  methods: {
    //数据初始化
    dataInit() {
      app.post('common/listlogistics',{},(r)=>{
        this.slots[0].values=r.result;
      },true)
    },
    onValuesChange(picker, value) {
      if(value[0]) {
        this.logisticsCompanyName=value[0].text;
        this.logisticsCompanyId=value[0].value;
      }
    },
    popup() {
      event.target.blur();
      this.popupVisible = !this.popupVisible;
    },
    //提交
    submit(isInputInfo) {
      if(this.isInputInfo.length==0) {
        if(this.logisticsOrderNo==null) {
          Toast({
            message:'请填写物流单号！',
            position:'bottom',
            duration: 1500
          });
          return;
        }
        if(this.carLicenseNo==null) {
          Toast({
            message:'请填写车牌号！',
            position:'bottom',
            duration: 1500
          });
          return;
        }
        if(!app.isName(this.driverName))return;
        if(this.phone!='') {
          if(!app.isPhone(this.driverMobile))return;
        }
      }
      app.post('order/delivery',{
        token:this.getToken,
        orderId:this.$route.query.orderId,
        logisticsOrderNo:this.logisticsOrderNo,
        logisticsCompanyId:this.logisticsCompanyId,
        logisticsCompanyName:this.logisticsCompanyName,
        driverName:this.driverName,
        driverMobile:this.driverMobile,
        carLicenseNo:this.carLicenseNo,
        isInputInfo:this.isInputInfo.length
      },(r)=>{
         Toast({
          message:'提交成功！',
          position:'bottom',
          duration: 1500
        })
        this.$router.go(-1);
      },false,this)
    }
  }
};
</script>

<style lang="scss">
.deliver-goods {
  .mock {
    width: 100%;
    height: 240px;
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 9;
  }
  .mint-cell-wrapper{ //该默认label字体16px为14px
    font-size:14px;
  }
  .mint-popup {
    width: 100%;
  }
  .confirm {
    height: px2rem(60px);
    button {
      width: px2rem(110px);
        height: px2rem(60px);
      	font-size: 14px;
        background-color: transparent;
        border: none;
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
