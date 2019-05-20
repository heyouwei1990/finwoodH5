<template>
	<div class="personApply" v-title="'收款账户'">
		<mt-field label="公司抬头" placeholder="xx发展有限公司" v-model="companyName"></mt-field>
    <a class="mint-cell mint-field" @click="openMenu();">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">开户银行</span>
        </div>
        <input readonly='readonly' v-model="bankName" placeholder="请选择" type="text" class="mint-field-core">
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </a>
    <mt-field label="对公帐号" placeholder="请输入对公银行卡号" v-model="account"></mt-field>
    <p class="perch"></p>
    <div class="upload">
      开户许可证<br>
      <ul class="file-list">
        <li class="file-box">
          <input type="file" accept="image/*" @change="upload($event);">
          <img :src="uploadImg" alt="">
        </li>
      </ul>
    </div>
    <div class="greenBtn">提交验证</div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <p class="confirm">
        <button class="left" @click="cancel();">取消</button>
        <button class="right" @click="cancel();">确认</button>
      </p>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
	</div>
</template>

<script>
  import { Field,Picker,Popup } from 'mint-ui';
  import app from '../../utils/common'
	export default {
    data () {
      return {
        readonly:true,
        companyName:null, //公司抬头
        bankName:null,    //银行名称
        account:null,      //对公帐号
        popupVisible:false,   //显示弹出框
        slots: [{
          flex: 1,
          values: ['工商银行','建设银行','农业银行','交通银行','招商银行'],
        }],
        uploadImg: require('../../images/upload/account.png'),
        account:null      //api所需图片地址
      }
    },
    components: {
      "mt-field" :Field,
      "mt-picker":Picker,
      "mt-popup":Popup
    },
    mounted () {
      app.preventDefault();
    },
    methods: {
      openMenu() {
        this.popupVisible=true;
      },
      //取消选择
      cancel() {
        this.popupVisible=false;
      },
      async onValuesChange(picker, values) {
       if(picker.getValues()[0]){
        this.bankName=picker.getValues()[0];
       }
      },
      //上传图片
      async upload(e) {
        app.upload(e,(url,suffix)=> {
          let base64=url.split(',');
          app.post('file/upload',{
            suffix:suffix,
            type:1,
            image:base64[base64.length-1]
          },(r)=> {
            this.uploadImg=url;
            this.voucher=r.result;
          })
        });
      }
    }
	}
</script>

<style lang="scss">
  @import "src/styles/components/upload";
  .personApply {
    input {
        font-size: px2rem(26px);
    }
    .perch {
      height: px2rem(20px);
    }
    &>a:nth-of-type(2) .mint-field-clear {
      display: none;
    }
    .iconfont {
      color: #999;
    }
    .mint-popup{
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
