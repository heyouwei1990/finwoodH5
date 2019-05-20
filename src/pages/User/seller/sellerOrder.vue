<template>
	<div class="buyerOrder" v-title="'我的订单'">
		<mt-navbar v-model="selected" fixed>
		<mt-tab-item id="-1">全部</mt-tab-item>
		<mt-tab-item id="1">未付款</mt-tab-item>
		<mt-tab-item id="2">已付全款</mt-tab-item>
		<mt-tab-item id="3">已发货</mt-tab-item>
		<mt-tab-item id="4">交易完成</mt-tab-item>
		</mt-navbar>
    <v-scroll
      style="height:calc(100vh - 50px)"
      class="wrapper"
      ref="scroll"
      pullUpLoad="true"
      @pullingUp="onPullingUp">
      <div class="orderList" v-for="(item,index) in orderList" :key="index">
        <div class="shopItem">
          <div class="shopTitle">
            <div class="flex1">
              <b>订单号：{{item.detail.orderNo}}</b>
              <time>{{item.detail.createdTime}}</time>
            </div>
            <span v-show="item.detail.status==1">待付款</span>
            <span v-show="item.detail.status==2">已付定金</span>
            <span v-show="item.detail.status==3">已付全款</span>
            <span v-show="item.detail.status==4">已发货</span>
            <span v-show="item.detail.status==5">交易完成</span>
            <span v-show="item.detail.status==6">退款中</span>
            <span v-show="item.detail.status==7">已退款</span>
            <span v-show="item.detail.status==8">已取消</span>
          </div>
          <ul class="goods-list">
            <router-link tag="li" :to="{path:'/sellerorderdetail',query:{pkid:item.detail.pkid}}">
              <dl class="goods-dl" v-for="(value,index) in item.orderItemList" :key="index">
                <dt><img v-lazy="value.productImgUrl" alt=""></dt>
                <dd>
                  <p class="desc">{{value.originName}}{{value.gradeName}}{{value.varietyName}}{{value.specification}} <i></i></p>
                  <div class="seller">
                    <span>规格 {{value.specification}}</span>
                    <button v-show="item.detail.status==1" class="dangerBtn right" @click.stop="$router.push({path:'/reviseOrder',
                    query:{
                      orderId:item.detail.pkid,
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
            </router-link>
          </ul>
          <div class="summary">
            共{{item.orderItemList.length}}件商品&nbsp;&nbsp;合计：￥{{item.detail.goodsAmount}}&nbsp;&nbsp;预付：￥{{Math.round(item.detail.goodsAmount*item.detail.advanceRatio/100)}}
          </div>
          <div class="operate-area">
            <span>买家：{{item.detail.buyerCompanyName}}</span>
            <div class="operate" >
              <button v-show="item.detail.status==1" class="darkBtn" @click="cancel(item.detail.pkid,index);">取消订单</button>
              <button v-show="item.detail.status==2" class="darkBtn"><a :href="'tel:'+getGlobalInfo.serviceTel">联系客服</a></button>
              <button v-show="item.detail.status==3" class="dangerBtn" @click="$router.push({path:'/deliverGoods',query:{orderId:item.detail.pkid}})">确认发货</button>
              <!-- <button v-show="item.detail.orderStatus==9" class="darkBtn" @click="$router.push({path:'/watchrefund'})">查看退款</button> -->
            </div>
          </div>
        </div>
      </div>
    </v-scroll>
    <div class="no-data" v-if="orderList.length==0">
      <div class="empty-img"></div>
      <p>您的订单是空的</p>
      <div class="goto">快去逛逛吧</div>
    </div>
    <!--<div v-show="pouUp" class="mint-msgbox-wrapper" style="position: absolute; z-index: 2003;">-->
      <!--<div class="mint-msgbox" style="">-->
        <!--<div class="mint-msgbox-header">-->
          <!--<div class="mint-msgbox-title">修改订单</div>-->
        <!--</div>-->
        <!--<div class="mint-msgbox-content">-->
          <!--<div class="mint-msgbox-input custom">-->
            <!--订单价格：<input v-model="price" placeholder="" type="number"> 元<br>-->
            <!--采购数量：<input v-model="quantity" placeholder="" type="number"> 立方米-->
            <!--<div class="mint-msgbox-errormsg" style="visibility: hidden;"></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="mint-msgbox-btns">-->
          <!--<button class="mint-msgbox-btn mint-msgbox-cancel" @click="modify();">取消</button>-->
          <!--<button class="mint-msgbox-btn mint-msgbox-confirm" @click="confirm();">确定</button>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!-- <div v-show="pouUp" class="v-modal" style="z-index: 2002;"></div> -->
	</div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";
import Scroll from 'vue2-better-scroll'
import app from "../../../utils/common"
import { mapGetters } from 'vuex'
export default {
  components: {
    "v-scroll": Scroll
  },
  data() {
    return {
      selected: "-1",    //订单状态
      orderList:[],      //订单列表
      pageIndex:1,  //当前页码
      pageCount:1,  //总页码
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      pouUp: false, //弹出框状态
      price: null,	//订单价格
      quantity: null,	//采购数量
      orderId:null,   //修改选中订单号
      orderItemId:null,
    };
  },
  watch: {
    //tab切换
    selected(val) {
      this.pageIndex=1;
      this.getData();
      this.scrollTo();
    }
  },
  activated () {
    //解决返回当前页滚动组件失效bug
    this.$refs.scroll.initScroll();
  },
  computed: {
    ...mapGetters([
      'getToken',
      'getGlobalInfo'
    ]),
    orderStatus:function() {  //-1全部 1待确认 2已确认待付款 3已付订金待付尾款 4已付款待发货 5 已发货 6交易完成待评价 7已评价 8 已取消 9已申请退款 10已退款（多状态用逗号分隔）
      switch(this.selected){
        case '-1':
          return '-1';
          break;
        case '1':
          return '1,2';
        case '2':
          return '3';
        case '3':
          return '4';
        case '4':
          return '5';
        default:
          break;
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取数据
    async getData() {
      app.post('order/listorders',{
        token:this.getToken,
        memberType:2,   //1：买家 2：卖家
        orderStatus:this.orderStatus,
        pageIndex:this.pageIndex
      },(r)=> {
        if(this.pageIndex>1) {
          this.orderList=this.orderList.concat(...r.result.list);
        }else {
          this.orderList=r.result.list;
        }
        this.pageIndex=r.result.paging.pageIndex;
        if(r.result.paging.pageCount != 0) {
          this.pageCount=r.result.paging.pageCount;
        }
        if(this.pageIndex<this.pageCount) {
          this.$refs.scroll.forceUpdate(true)
        }else {
          this.$refs.scroll.forceUpdate(false)
        }
      },true,this)
    },
    // 上拉加载更多数据
    onPullingUp () {
      this.pageIndex++;
      this.getData();
    },
    // 滚动到页面顶部
    scrollTo () {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
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
    cancel(pkid,index) {
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
            //this.getData();
            this.orderList[index].detail.status=8;
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
            this.getData();
         },false,this)
      },false,this)
    }
  }
};
</script>

<style lang="scss">
@import "src/styles/components/goods";
.buyerOrder {
  .is-fixed{
    z-index:10;
  }
  .mint-tab-item-label {
    font-size: 14px;
  }
  
 	@media only screen and (min-width:500px){
	    .tab-hd-wrapper{
	        max-width: $bodyWidth;
	    }
	}
  .tab-hd-wrapper {
    @include fj;
    position: fixed;
    width: 100%;
	  transform: translateX(-50%);
    left: 50%;
    top: px2rem(100px);
    z-index: 3000;
    align-items: center;
    background-color: #fff;
    height: px2rem(80px);
  }

  .tab-hd-wrapper:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: $light;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .mint-tab-container {
    margin-top: px2rem(180px);
    margin-bottom: 63px;
  }

  .mint-navbar {
    padding-left: 15px;
    padding-right: 5%;
    -webkit-box-flex: 1;
    flex: 1;
    position: relative;
    justify-content: space-between;
    @include bb;
  }

  .mint-navbar .mint-tab-item {
    flex: none;
    -webkit-box-flex: none;
    margin-bottom: 0;
    border-bottom-width: 2px;
    height: px2rem(80px);
    padding: px2rem(25px) 0 px2rem(20px);
  }

  .mint-tab-item.is-selected {
    border-bottom-color: $primary;
    color: $primary;
  }

  .mint-tab-item:last-child {
    margin-right: 0;
  }

  .orderList {
    background: #fff;
  }

  .shopTitle {
    @include fj;
    @include bb;
    line-height: px2rem(72px);
    padding: 6px 15px;
    margin-bottom: 10px;
    font-size: px2rem(28px);
    color: #333;
    align-items: center;
    .flex1{
      width: 50%;
      flex:1;
      line-height:20px;
      >b{
        display: block;
        font-weight:normal;
        font-size:px2rem(28px);
        margin-right:10px;
      }
      time{
        font-size:px2rem(24px);
        color: #999;
      }
    }
    span {
      color: $primary;
    }
  }
  .summary {
    font-size: px2rem(26px);
    text-align: right;
    margin: 0 15px;
    line-height: px2rem(72px);
    border-top: 1px solid #eee;
    @include bb;
  }
  .operate-area{
    @include fj;
    align-items: center;
    width: 100%;
    padding: 6px 15px;
    min-height: px2rem(75px);
    span{
      flex: 1;
      width: 60px;
      font-size:px2rem(28px);
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
    }
    .operate {
      button:nth-last-of-type(2) {
        margin-right: px2rem(30px);
      }
    }
  }
  .custom input {
    width: 50%;
    margin-bottom: px2rem(20px);
  }
  .no-data{
    position: absolute;
    left:0;
    top:0;
    z-index:2;
    width: 100%;
    height:100%;
    background-color: #fff;
    padding-bottom:px2rem(88px);
    padding:px2rem(188px) 15px px2rem(88px);
    text-align: center;
    .empty-img{
      width: px2rem(233px);
      height:px2rem(233px);
      margin: 0 auto;
      background: url("../../../images/noOrder.png") no-repeat;
      background-size: cover;
    }
    >p{
      font-size:16px;
      color: #666;
      line-height:1.5;
      margin-top:22px;
      margin-bottom:10px;
    }
    .goto{
      font-size:14px;
      color: $primary;
      line-height:1.5;
    }
  }
}
</style>
