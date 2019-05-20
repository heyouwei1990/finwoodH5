<template>
	<div class="buyerOrderDetails" v-title="'订单详情'">
		<div v-show="detail.status==5" class="orderStatus clearfix">
      <i class="iconfont icon-jiaoyichenggong"></i>
      交易完成
      <!-- <span class="look">查看电子合同 <i class="iconfont icon-jiantouyou"></i></span> -->
    </div>
		<div v-show="detail.status==1" class="orderStatus clearfix">
      <i class="iconfont icon-daifukuan-copy"></i>
      待付款
    </div>
    <div v-show="detail.status==2" class="orderStatus clearfix">
      <i class="iconfont icon-iconfontcolor65"></i>
      已付定金
    </div>
		<div v-show="detail.status==3" class="orderStatus clearfix">
      <i class="iconfont icon-iconfontcolor65"></i>
      已付全款
    </div>
    <div v-show="detail.status==6" class="orderStatus clearfix">
      <i class="iconfont icon-tuikuan"></i>
      退款中
    </div>
    <div v-show="detail.status==7" class="orderStatus clearfix">
      <i class="iconfont icon-jiaoyichenggong"></i>
      已退款
    </div>
		<!-- <div v-show="detail.orderStatus==4" class="orderStatus clearfix">
      <i class="iconfont icon-yifu"></i>
      已付款
      <span class="look">查看电子合同 <i class="iconfont icon-jiantouyou"></i></span>
    </div> -->
		<div v-show="detail.status==4" class="orderStatus clearfix">
      <i class="iconfont icon-yifahuo"></i>
      已发货
    </div>
		<div v-show="detail.status==8" class="orderStatus clearfix">
      <i class="iconfont icon-jiaoyiguanbi"></i>
      交易关闭
    </div>
    <div class="address">
      <span class="left iconfont icon-dizhi1 nav"></span>
      <div class="left ellipsis">
        <p class="clearfix">
          <span class="left minWidth" v-if="consigneeMobile != null">{{consignee}}</span>
          <span class="left" v-if="consigneeMobile == null"><a :href="'tel:'+getGlobalInfo.serviceTel">{{consignee}}</a></span>
          <span class="right">{{consigneeMobile}}</span>
        </p>
        <p class="ellipsis">{{shippingAddress}}</p>
      </div>
    </div>
    <div class="shopItem">
      <p class="shopTitle">
        <span>卖家：{{detail.sellerCompanyName}}</span>
      </p>
      <ul class="goods-list">
        <li v-for="(value,index) in orderItemList" :key="index">
          <dl class="goods-dl">
            <dt><img v-lazy="value.productImgUrl" alt=""></dt>
            <dd>
              <p class="desc">{{value.originName}}{{value.gradeName}}{{value.varietyName}}{{value.specification}} <i></i></p>
              <div class="seller">规格 {{value.specification}}</div>
              <div class="dd-bottom">
                <span class="price">¥{{value.salesPrice}}</span>
                <time class="online-time">x{{value.quantity}} {{value.unitText}}</time>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
      <p class="remarks">
        <span>订单备注：</span>
        <span>{{detail.buyerComments}}</span>
      </p>
      <p class="sum">
        <span>订单金额</span>
        <span class="price">￥{{detail.goodsAmount}}</span>
      </p>
      <p class="service">
        <a :href="'tel:'+getGlobalInfo.serviceTel">
          <i class="iconfont icon-lianxi-copy"></i>
          联系客服
        </a>
      </p>
    </div>
    <div class="orderDetails">
      <p>订单编号：{{detail.orderNo}}</p>
      <p>订单金额：￥{{detail.goodsAmount}}</p>
      <p>合计数量：{{totalQuantity}}</p>
      <p v-if="detail.deliveryType==2">配送方式：送货上门</p>
      <p v-if="detail.deliveryType!=2">配送方式：上门自提</p>
      <p>支付方式：{{detail.paymentTypeText}}</p>
      <!-- <p>支付流水号：501710181001001090247567569</p> -->
      <!-- <p>支付金额：￥{{detail.goodsAmount}}</p> -->
      <p>已付金额：￥{{detail.amountPaid}}</p>
      <p>信用金额：￥{{detail.creditPaid}}</p>
      <p>待付金额：￥{{detail.goodsAmount-detail.amountPaid}}</p>
      <p>下单时间：{{detail.orderTime}}</p>
      <p>付款时间：{{payTime}}</p>
      <p>发货时间：{{deliveryTime}}</p>
    </div>
    <p v-show="detail.status==1" class="operate">
      <button class="darkBtn" @click="cancel();">取消订单</button>
      <button class="dangerBtn" @click="$router.push({path:'/pay',query:{page:-2,pkid:$route.query.pkid}});">去付款</button>
    </p>
    <p v-show="detail.status==2" class="operate">
      <button class="darkBtn" @click="apply();">申请退款</button>
      <button class="dangerBtn" @click="$router.push({path:'/pay',query:{page:-2,pkid:$route.query.pkid}});">支付尾款</button>
    </p>
    <p v-show="detail.status==3" class="operate">
      <button class="darkBtn" @click="apply();">申请退款</button>
    </p>
    <!-- <p v-show="detail.orderStatus==9" class="operate">
      <button class="darkBtn" @click="cancelRefund(detail.pkid);">取消退款</button>
    </p> -->
    <p v-show="detail.status==4" class="operate">
      <button class="dangerBtn" @click="affirm();">确认收货</button>
    </p>
    <!-- <p v-show="detail.orderStatus==8" class="operate">
      <button class="darkBtn" @click="delet();">删除订单</button>
    </p> -->

  </div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";
import app from "../../../utils/common"
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      detail:{
        orderStatus:null
      },
      orderItemList:null,
      totalQuantity:null,
      consignee:null,
      consigneeMobile:null,
      shippingAddress:null,
      payTime:null,
      deliveryTime:null
    }
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getGlobalInfo'
    ]),
  },
  mounted() {
    this.dataInit();
  },
  methods: {
    //数据初始化
    dataInit() {
      app.post('order/buyerdetail',{
        pkid:Number(this.$route.query.pkid),
        token:this.getToken
      },(r)=>{
        if(r.result.order.detail.deliveryType == 2) {
          this.consignee=`收货人：${r.result.order.detail.consignee}`;
          this.consigneeMobile=r.result.order.detail.consigneeMobile;
          this.shippingAddress=`收货地址：${r.result.order.detail.shippingAddress}`;
        }else {
          // this.consignee=`客服电话：${this.getGlobalInfo.serviceTel}`;
          // this.consigneeMobile=null;
          this.consignee=`卖家联系人：${r.result.order.detail.sellerCompanyName}`;
          this.consigneeMobile=`${r.result.order.detail.sellerMemberMobile}`;
          this.shippingAddress=`提货地址：${r.result.order.detail.shippingAddress}`;
        }
        this.payTime=r.result.payTime;
        this.deliveryTime=r.result.deliveryTime;
        this.totalQuantity=r.result.totalQuantity+r.result.unitText;
        this.detail=r.result.order.detail;
        this.orderItemList=r.result.order.orderItemList;
      },true,this)
    },
    //取消订单
    cancel() {
      MessageBox.confirm('您是否确认取消订单？','芬木提示').then(action => {
        app.post('order/cancel',{
          token:this.getToken,
          pkid:Number(this.$route.query.pkid),
          memberType:1
        },(r)=>{
          Toast({
            message: '取消成功！',
            position: 'bottom',
            duration: 1500
          });
          this.dataInit();
        },false,this)
      }).catch(action=>{});
    },
    //确认收货
    affirm() {
      MessageBox.confirm('您是否确认收货？','芬木提示').then(action => {
        app.post('/order/confirmreceipt',{
          token:this.getToken,
          pkid:Number(this.$route.query.pkid)
        },(res)=>{
          Toast({
            message: '确认收货成功！',
            position: 'bottom',
            duration: 1500
          });
          this.dataInit();
        },false,this)
      }).catch(action=>{});
    },
    //申请退款
    apply() {
      MessageBox.confirm('您是否确认申请退款？','芬木提示').then(action => {
        app.post('order/refundapply',{
          token:this.getToken,
          pkid:Number(this.$route.query.pkid)
        },(r)=>{
          Toast({
            message: '申请退款成功！',
            position: 'bottom',
            duration: 1500
          });
          this.dataInit();
        },false,this)
        //this.$router.push({path:'/applyrefund'});
      }).catch(action=>{});
    },
    //取消退款
    // cancelRefund() {
    //   MessageBox.confirm('您是否确认取消退款？','芬木提示').then(action => {

    //   }).catch(action=>{});
    // },
    // //删除订单
    // delet() {
    //   MessageBox.confirm('您是否确认删除订单？','芬木提示').then(action => {

    //   }).catch(action=>{});
    // }
  }
};
</script>

<style lang="scss">
@import "src/styles/components/goods";
.buyerOrderDetails {
  .orderStatus {
    height: px2rem(120px);
    line-height: px2rem(105px);
    background: $primary;
    color: #fff;
    font-size: px2rem(32px);
    text-align: center;
    position: relative;
    & > i {
      font-size: px2rem(55px);
      position: relative;
      top: px2rem(10px);
    }
    .look {
      position: absolute;
      top: 0;
      font-size: px2rem(24px);
      line-height: px2rem(120px);
      right: 15px;
      i {
        font-size: px2rem(24px);
      }
    }
  }
  .address {
    background: #fff;
    height: px2rem(126px);
    margin-bottom: px2rem(20px);
    position: relative;
    .nav {
      font-size: px2rem(50px);
      color: #666;
      line-height: px2rem(110px);
      padding: 0 px2rem(25px);
    }
    .push {
      float: right;
      font-size: px2rem(36px);
      color: #999;
      line-height: px2rem(110px);
      padding-right: 15px;
    }
    div {
      width: 75vw;
      padding-top: px2rem(10px);
    }
    p {
      color: #666;
      line-height: px2rem(50px);
      font-size: px2rem(28px);
    }
    span {
      color: #333;
      font-size: px2rem(30px);
    }
    .minWidth {
      display: inline-block;
      width: 45vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .shopItem {
    background: #fff;
  }
  .shopTitle {
    @include bb;
    line-height: px2rem(72px);
    padding: 0 15px;
    margin-bottom: 10px;
    font-size: px2rem(28px);
  }
  .remarks {
    font-size: px2rem(26px);
    margin: 0 15px;
    padding: px2rem(20px) 0;
    border-top: 1px solid #eee;
    @include bb;
    @include fj;
    span:nth-of-type(1) {
      display: inline-block;
      width: px2rem(260px);
      white-space: nowrap;
    }
    span:nth-last-of-type(1) {
      color: #999;
    }
  }
  .sum {
    @include fj;
    @include bb;
    line-height: px2rem(72px);
    font-size: px2rem(26px);
    margin: 0 15px;
  }
  .service {
    @include bb;
    line-height: px2rem(72px);
    font-size: px2rem(28px);
    margin: 0 15px;
    .iconfont {
      color: $primary;
      font-size: px2rem(45px);
    }
  }
  .orderDetails {
    background: #fff;
    margin-top:px2rem(10px);
    padding: px2rem(20px) px2rem(30px) px2rem(30px) px2rem(30px);
    p {
      font-size: px2rem(26px);
      color: #999;
      line-height: 1.7;
    }
  }
  .operate {
    background: #fff;
    margin-top:px2rem(20px);
    padding: px2rem(30px) 15px px2rem(60px) 15px;
    line-height: px2rem(72px);
    text-align: right;
    button:nth-last-of-type(2) {
      margin-right: px2rem(30px);
    }
  }
}
</style>
