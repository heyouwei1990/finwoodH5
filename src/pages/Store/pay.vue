<template>
	<div class="pay" v-title="'支付'">
		<div class="headTop">
      <div class="left">
        <p>等待买家付款</p>
        <p>超过24小时订单将自动关闭</p>
      </div>
      <span class="right iconfont icon-dengdai"></span>
    </div>
    <div class="address">
      <span class="left iconfont icon-dizhi1"></span>
      <div class="left ellipsis">
        <p class="clearfix">
          <span class="left minWidth" v-if="consigneeMobile != null">{{consignee}}</span>
          <span class="left" v-if="consigneeMobile == null"><a :href="'tel:'+consignee">{{consignee}}</a></span>
          <span class="right">{{consigneeMobile}}</span>
        </p>
        <p class="ellipsis">{{shippingAddress}}</p>
      </div>
    </div>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">支付比例</span>
        </div>
        <mt-radio
          v-model="type"
          :options="options">
        </mt-radio>
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">支付方式</span>
        </div>
        <mt-radio
          v-model="paytType"
          :options="payOptions">
        </mt-radio>
      </div>
    </a>
    <p class="payType ellipsis" v-if="paytType == '余额支付'">
      <!-- 电脑登录www.finwood.cn会员中心-我的订单付款 -->
      当前账户余额：{{balance}}元
    </p>
    <p class="payType ellipsis" v-if="paytType == '银行转账'">
      请通过银行转账至商家对公账户并提交转账凭证
    </p>
    <!-- <p class="noopenAccount" v-if="paytType == '银行转账' && !openAccount">
      商家未开户，请联系客服<a :href="'tel:'+getGlobalInfo.serviceTel">{{getGlobalInfo.serviceTel}}</a>，平台将为您尽快联系商家完成开户。
    </p> -->
    <!-- <p class="payTitle">支付方式</p>
    <p class="payType ellipsis">
      <i class="iconfont icon-zaixianzhifu blue"></i>
      在线支付
      <span>(电脑登录www.finwood.cn会员中心-我的订单付款)</span>
    </p>
    <p class="payType ellipsis">
      <i class="iconfont icon-zhuanzhang orange"></i>
      银行转账
      <span>(请通过银行转账至芬木网对公账户并提交转账凭证)</span>
    </p> -->
    <div class="bankInfo" v-if="paytType == '银行转账'">
      <h3>{{myBrandAccountName}}银行账户信息</h3>
      <p><span>公司户名</span><em>{{myBrandAccountName}}</em></p>
      <p><span>开户行</span><em>{{myBrandBranch}}</em></p>
      <p><span>银行卡号</span><em>{{myBrandAccountNo}}</em></p>
    </div>
    <div class="menu">
      {{showText}}金额：<span>¥{{sumPrice}}</span><!--&nbsp;&nbsp;&nbsp;预付金额：<span>¥3000</span>-->
      <div class="submitBtn" @click="submit()" v-if="paytType == '银行转账'">提交凭证</div>
      <div class="submitBtn" @click="pay()" v-if="paytType == '余额支付'&&sumPrice<=balance">确认支付</div>
      <div class="submitBtn dark" v-if="paytType == '余额支付'&&sumPrice>balance">确认支付</div>
    </div>
	</div>
</template>

<script>
import app from "../../utils/common"
import { mapGetters } from 'vuex'
	export default {
    data () {
      return {
        type:'支付定金',   //支付比例 定金或者全款
        options:['支付定金','支付全款'],
        payOptions:['银行转账'],
        paytType:'银行转账',
        consignee:null,
        consigneeMobile:null,
        shippingAddress:null,
        goodsAmount:null,  //总额
        advanceAmount:null, //定金
        unpaidAmount:null,  //剩余未付金额
        showText:'定金',
        sellerAccountName:null,
        sellerBank:null,
        sellerAccount:null,
        openAccount:false,   //是否开户
        myBrandAccountName:'',
        myBrandBranch:'',
        myBrandAccountNo:'',
        balance:0,   //可用余额
        payRatioType:0,
        time:0,
        fullPay:false
      }
    },
    computed: {
			...mapGetters([
        'getToken',
        'getGlobalInfo'
      ]),
      "sumPrice":function() {
        if(this.type == '支付定金') {
          this.payRatioType = 1;
          this.showText='定金';
          return this.advanceAmount;
        }else if(this.type == '支付全款') {
          this.payRatioType = 2;
          this.showText='全款';
          return this.goodsAmount;
        }else if(this.type == '支付尾款') {
          this.payRatioType = 3;
          this.showText='尾款';
          return this.unpaidAmount;
        }
      }
    },
    created () {
      this.dataInit();
    },
    methods: {
      dataInit() {
        // app.post('member/accountbalance',{
        //   token:this.getToken
        // },r=>{
        //   this.balance = r.result.accBalance;
        // })
        app.post('order/payinfo',{
          pkid:Number(this.$route.query.pkid),
          token:this.getToken
        },(r)=>{
          if(r.result.deliveryType == 2) {
            this.consignee=`收货人：${r.result.contact}`;
            this.consigneeMobile=r.result.contactMobile;
            this.shippingAddress=`收货地址：${r.result.contactAddress}`;
          }else {
            // this.consignee=`客服电话：${this.getGlobalInfo.serviceTel}`;
            // this.consigneeMobile=null;
            this.consignee=`卖家联系人：${r.result.contact}`;
            this.consigneeMobile=r.result.contactMobile;
            this.shippingAddress=`提货地址：${r.result.contactAddress}`;
          }
          if(r.result.paymentStatus==1){
            this.type='支付定金';
            this.options=['支付定金','支付全款'];
          }else if(r.result.paymentStatus==2) {
            this.type='支付尾款';
            this.options=['支付尾款'];
          }
          this.sellerAccountName=r.result.sellerAccountName;
          this.sellerBank=r.result.sellerBank;
          this.sellerAccount=r.result.sellerAccount;
          this.goodsAmount=r.result.totalAmount;
          this.unpaidAmount=r.result.unpaidAmount;
          this.advanceAmount=r.result.advanceAmount;
          this.openAccount=r.result.openAccount;
          if(r.result.buyerOpenAccount && this.openAccount) {
            this.payOptions = ['余额支付','银行转账'];
            this.paytType = this.payOptions[0];
          }
          this.myBrandAccountName = r.result.myBrandAccountName;
          this.myBrandBranch = r.result.myBrandBranch;
          this.myBrandAccountNo = r.result.myBrandAccountNo;
          this.balance = r.result.buyerBalance;
          this.fullPay = r.result.fullPay;
          if(this.fullPay) {
            this.options = ['支付全款'];
            this.type = '支付全款';
            this.showText = '全款';
          }
        },true,this)
      },
      //余额支付
      pay() {
        if(this.time != 0) {
          return;
        }
        this.time = 1;
        app.post('order/transferpay',{
          token:this.getToken,
          pkid:Number(this.$route.query.pkid),
          credit:0,
          isUseCredit:0,
          paymentType:4,
          payRatioType:this.payRatioType,
          confirmCredit:false,
          confirmTrade:true
        },(r)=> {
          this.$router.push({
            path:'/paysuccess',
            query: {
              pkid:this.$route.query.pkid
            }
          })
        },false,this)
      },
      submit() {
        let payType;
        if(this.type == '支付定金') {
          payType=1;
        }else if(this.type == '支付尾款') {
          payType=3;
        }else if(this.type == '支付全款') {
          payType=2;
        }
        this.$router.push({
          path:'/voucher',
          query:{
            page:this.$route.query.page,
            pkid:Number(this.$route.query.pkid),
            payType:payType,
            sumPrice:this.sumPrice
          }
        });
      }
    }
	}
</script>

<style lang="scss">
  .pay {
    margin-bottom:60px;
    .headTop {
      height: px2rem(226px);
      background: $primary;
      div {
        padding: px2rem(40px) 0 0 30px;
      }
      p {
        color: #fff;
        font-size: px2rem(32px);
        line-height: px2rem(70px);
      }
      .iconfont {
        font-size: px2rem(150px);
        color: #fff;
        line-height: px2rem(220px);
        padding-right: 40px;
      }
    }
    .address {
      display: flex;
      background: #fff;
      height: 64px;
      padding-left:15px;
      padding-right:15px;
      margin-bottom: px2rem(20px);
      align-items: center;
      .iconfont {
        font-size: 24px;
        color: #666;
        line-height: 54px;
        margin-right:12px;
      }
      div {
        width: 75vw;
        flex:1;
      }
      p {
        color: #666;
        line-height: 24px;
        font-size: 12px;
      }
      span {
        color: #333;
        font-size: 14px;
      }
      .minWidth {
        display: inline-block;
        width: 45vw;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .mint-field .mint-cell-title{
      width: auto;
    }
    .mint-cell{
      min-height: 40px;
    }
    .mint-cell-text{
      padding-left:0;
    }
    .mint-radiolist {
      @include fj(flex-start);
    }
    .mint-cell-wrapper{
      background-image: none;
    }
    .mint-radiolist .mint-cell-wrapper{
      background-image: none;
      padding-left:0;
    }
    .mint-radiolist .mint-cell{
      background-image: none;
      border-bottom:0;
      font-size:14px;
    }
    .mint-radio-input:checked + .mint-radio-core {
      background: $primary;
      border-color: $primary;
    }
    .mint-radiolist .mint-cell-title {
      width: auto;
    }
    .mint-cell {
      border-bottom: 1px solid $light;
    }
    .payTitle {
      background: #fff;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      font-size: 16px;
      border-bottom: 1px solid $light;
    }
    .noopenAccount {
      height: 50px;
      background: #fff;
      border-bottom: 1px solid $light;
      font-size: 14px;
      padding: 5px 10px;
    }
    .payType {
      height: 40px;
      background: #fff;
      border-bottom: 1px solid $light;
      font-size: 14px;
      line-height: 40px;
      padding: 0 10px;
      span {
        color: #999;
        font-size: 12px;
      }
      .iconfont {
        font-size: 20px;
        position: relative;
        top: 2px;
        padding-left: 10px;
      }
      .blue {
        color: #3fa9f5;
      }
      .orange {
        color: $secondary;
      }
    }
    .bankInfo {
      background: #fff;
      margin-top:px2rem(20px);
      p,h3 {
        min-height: 40px;
        border-bottom: 1px solid $light;
      }
      h3 {
        color: #333;
        font-size: 14px;
        line-height: 40px;
        padding-left:10px;
        padding-right:10px;
      }
      p {
        color: #666;
        font-size: 14px;
        display: flex;
        padding:6px 10px;
        line-height:24px;
      }
      span {
        display: inline-block;
        width: 70px;
        color: #333;
      }
      em{
        flex: 1;
      }
    }
 	@media only screen and (min-width:500px){
	    .menu{
	        max-width: $bodyWidth;
	    }
	    .address>div{
	    	width: 75%;
	    }
	    .address .minWidth{
	    	width: 42%;
	    }
	}
    .menu {
      width: 100%;
      transform: translateX(-50%);
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 50%;
      font-size: 14px;
      span {
        color: $danger;
      }
    }
    .submitBtn {
      background: $danger;
      color: #fff;
      text-align: center;
      width: px2rem(220px);
      height:50px;
      line-height: 50px;
      position: absolute;
      top: 0;
      right: 0;
    }
    .dark {
      background: #999;
    }
  }
</style>
