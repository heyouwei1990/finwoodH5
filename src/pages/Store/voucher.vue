<template>
	<div class="voucher" v-title="'提交转账凭证'">
    <!--<a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i>*</i>转账类型</span>
        </div>
        <mt-radio
          v-model="type"
          :options="['企业', '个人']">
        </mt-radio>
      </div>
    </a>-->
    <div class="mark"></div>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>{{inputTex.title}}</span>
        </div>
        <input v-model="name" :placeholder="inputTex.pla" type="text" class="mint-field-core">
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>转账金额</span>
        </div>
        <input v-model="money" placeholder="请输入转账金额" type="text" class="mint-field-core">元
      </div>
    </a>
    <mt-field class="align-top" maxlength="200" label="付款说明" placeholder="请输入200字以内付款说明" max-length="200" type="textarea" rows="3" v-model="intro"></mt-field>
    <div class="upload">
      <i class="required-mark">*</i>银行转账凭证<br>
      <ul class="file-list">
        <li class="file-box">
          <input type="file" accept="image/*" @change="upload($event);">
          <img :src="uploadImg" alt="">
        </li>
      </ul>
    </div>
    <!-- <mt-checklist
      v-model="isConfirmTrade"
      :options="['已阅读并同意芬木交易合同']">
    </mt-checklist> -->
    <div class="greenBtn" @click="submit();">提交</div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapGetters } from 'vuex'
import app from '../../utils/common'

export default {
  data() {
    return {
     // type: "企业", //转账类型
      name: null, //公司或者用户名
      money: this.$route.query.sumPrice, //金额
      intro: null, //付款说明
      isConfirmTrade:['已阅读并同意芬木交易合同'],
      inputTex: {
        title: "公司抬头",
        pla: "请输入公司抬头"
      },
      uploadImg: require('../../images/upload/voucher.png'),
      voucher:null      //api所需图片地址
    };
  },
  computed: {
    ...mapGetters([
      'getToken'
    ])
  },
  created () {
    this.dataInit();
  },
  watch: {
    intro:function() {
      if(this.intro.length>200) {
        setTimeout(()=>{
          this.intro=this.intro.substring(0,200);
        },10)
      }
    },
  },
  methods: {
    dataInit() {
      app.post('member/centerinfo',{
        token:this.getToken
      },(r)=>{
        if (r.result.isCompanyVerified != 1) {//(r.result.companyName == null || r.result.companyName == '') && 
          this.inputTex.title = "开户姓名";
          this.inputTex.pla = "请输入开户姓名";
          this.name=r.result.name;
        } else {
          this.inputTex.title = "公司抬头";
          this.inputTex.pla = "请输入公司抬头";
          this.name=r.result.companyName;
        }
      })
    },
    submit: function() {
      // if(this.name==null) {
      //   Toast({
      //     message: "请输入公司抬头!",
      //     position: "bottom",
      //     duration: 1500
      //   });
      //   return;
      // }
      // if(this.money==null) {
      //   Toast({
      //     message: "请输入转账金额!",
      //     position: "bottom",
      //     duration: 1500
      //   });
      //   return;
      // }
      // if(!app.isuInteger(this.money))return;
      if(this.intro != null && this.intro != '') {
        if(this.intro.length>200) {
          Toast({
            message: "付款说明不可超过200字!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
      }
      if(this.voucher==null) {
        Toast({
          message: "请上传银行转账截图!",
          position: "bottom",
          duration: 1500
        });
        return;
      }
      app.post('order/payvoucher',{
        token:this.getToken,
        pkid:Number(this.$route.query.pkid),
        payRatioType:Number(this.$route.query.payType),
        companyName:this.name,
        paymentAmount:Number(this.money),
        paymentComment:this.intro,
        bankSlipUrl:this.voucher,
        isConfirmTrade:this.isConfirmTrade.length>0?true:false,
        isConfirmCredit:false
      },(r)=>{
        Toast({
          message: "提交成功！",
          position: "bottom",
          duration: 1500
        });
        //this.$router.go(this.$route.query.page);
        this.$router.push({path:'/buyerorderdetail',query:{pkid:this.$route.query.pkid}});
      },false,this);
    },
    //上传图片
    async upload(e) {
      app.upload(e,(url,suffix)=> {
        let base64=url.split(',');
        app.post('file/upload',{
          suffix:suffix,
          type:3,
          image:base64[base64.length-1]
        },(r)=> {
          this.uploadImg=url;
          this.voucher=r.result;
        })
      });
    }
  }
};
</script>

<style lang="scss">
@import "src/styles/components/upload";

.voucher {
  .align-top .mint-cell-title{
    align-self: flex-start;
    padding-top:8px;
  }
  .mark{
    position: absolute;
    top: 0;
    left:0;
    width: 100%;
    height: 96px;
    z-index: 9;
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
  }
  .mint-radio-input:checked + .mint-radio-core {
    background: $primary;
    border-color: $primary;
  }
  .mint-radiolist .mint-cell-title {
    width: auto;
  }
}
</style>
