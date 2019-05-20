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
        <span>买家：{{detail.buyerMemberName}}</span>
      </p>
      <ul class="goods-list">
        <li v-for="(value,index) in orderItemList" :key="index">
          <dl class="goods-dl">
            <dt><img v-lazy="value.productImgUrl" alt=""></dt>
            <dd>
              <p class="desc">{{value.originName}}{{value.gradeName}}{{value.varietyName}}{{value.specification}} <i></i></p>
              <div class="seller">
                规格 {{value.specification}}
                <button v-show="detail.status==1" class="dangerBtn right" @click.stop="$router.push({path:'/reviseOrder',
                query:{
                  orderId:$route.query.pkid,
                  salesPrice:value.salesPrice,
                  quantity:value.quantity,
                  unitText:value.unitText,
                  productStockNum:value.productStockNum,
                  pkid:value.pkid}})">
                修改订单</button>
              </div>
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
      <p>配送方式：{{detail.deliveryTypeText}}</p>
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
    <p class="operate" v-show="detail.status==1 || detail.status==2 || detail.status==3">
      <button v-show="detail.status==1" class="darkBtn" @click="cancel(detail.pkid);">取消订单</button>
      <button v-show="detail.status==2" class="darkBtn"><a :href="'tel:'+getGlobalInfo.serviceTel">联系客服</a></button>
      <button v-show="detail.status==3" class="dangerBtn" @click="$router.push({path:'/deliverGoods',query:{orderId:$route.query.pkid}})">确认发货</button>
      <!-- <button v-show="detail.orderStatus==9" class="darkBtn" @click="$router.push({path:'/watchrefund'})">查看退款</button> -->
    </p>
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
      pouUp: false, //弹出框状态
      price: null,	//订单价格
      quantity: null,	//采购数量
      orderId:null,   //修改选中订单号
      orderItemId:null,
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
      app.post('order/sellerdetail',{
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
    //修改订单
    modify(orderId,orderItemId) {
      if(orderId!='undefined') {
        this.orderId=orderId;
        this.orderItemId=orderItemId;
      }
      this.pouUp = !this.pouUp;
    },
    //取消订单
    cancel(pkid) {
      setTimeout(()=>{
        MessageBox.confirm('您是否确认取消订单？','芬木提示').then(action => {
          app.post('order/cancel',{
            token:this.getToken,
            pkid:pkid,
            memberType:2
          },(r)=>{
            Toast({
              message: '取消成功！',
              position: 'bottom',
              duration: 1500
            });
            this.dataInit();
          },false,this)
        }).catch(action=>{});
      },50)
    },
    //确认修改
    confirm() {
      if(this.price==null || Number(this.price)<=0) {
        Toast({
          message: "请输入正确的订单价格!",
          position: "bottom"
        });
        return;
      }
      if(this.quantity==null || Number(this.quantity)<=0) {
        Toast({
          message: "请输入正确的采购数量!",
          position: "bottom"
        });
        return;
      }
      app.post('order/updateqty',{
        token:this.getToken,
        quantity:this.quantity,
        orderId:this.orderId,
        orderItemId:this.orderItemId
      },(r)=>{
         app.post('order/updateprice',{
          token:this.getToken,
          salePrice:this.price,
          orderId:this.orderId,
          orderItemId:this.orderItemId
         },(r)=>{
           Toast({
              message: "修改成功!",
              position: "bottom"
            });
            this.pouUp = !this.pouUp;
            this.price=null;
            this.quantity=null;
            this.dataInit();
         },false,this)
      },false,this)
    }
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
  .custom input {
    width: 50%;
    margin-bottom: px2rem(20px);
  }
}
</style>
