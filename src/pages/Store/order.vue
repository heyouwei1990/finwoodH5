<template>
	<div class="order" v-title="'确认订单'">
		<div class="address" v-if="address!=null && distribution =='送货上门'">
      <span class="left iconfont icon-dizhi1 nav"></span>
      <i class="iconfont icon-jiantouyou push"></i>
      <div class="left ellipsis" @click="$router.push({path:'/address',query:{select:true}})">
        <p class="clearfix">
          <span class="left minWidth">{{consignee}}</span>
          <span class="right">{{consigneeMobile}}</span>
        </p>
        <p class="ellipsis">{{shippingAddress}}</p>
      </div>
    </div>
    <div class="address" v-if="distribution =='上门自提'">
      <span class="left iconfont icon-dizhi1 nav"></span>
      <div class="left ellipsis">
        <p class="clearfix">
          <span class="left minWidth">{{consignee}}</span>
          <span class="right"><a :href="'tel:'+consigneeMobile">{{consigneeMobile}}</a></span>
        </p>
        <p class="ellipsis">{{shippingAddress}}</p>
      </div>
    </div>
    <div class="address" v-if="address==null && distribution =='送货上门'">
      <button class="addAddress" @click="$router.push({path:'/addAddress',query:{pkid:0}})">添加收货地址</button>
    </div>
    <div class="shopDeatils">
      <h5>{{sellerCompanyName}}</h5>
      <ul class="goods-list">
        <router-link tag="li" :to="{path:'/detail',query:{pkid:item.productId}}" v-for="(item,index) in list" :key="index">
          <dl class="goods-dl">
            <dt><img v-lazy="item.imageUrl" alt=""></dt>
            <dd>
              <p class="desc">{{item.productName}}</p>
              <div class="seller">{{sellerCompanyName}} <i class="iconfont icon-renzheng"></i></div>
              <div class="dd-bottom">
                <span class="price"
                v-if="item.salesPrice!=item.salesPriceUpper">
                ¥{{item.salesPrice}}~{{item.salesPriceUpper}}</span>
                <span class="price"
                v-if="item.salesPrice==item.salesPriceUpper">
                ¥{{item.salesPrice}}</span>
                <time class="online-time">×{{item.quantity}}m³</time>
              </div>
            </dd>
          </dl>
        </router-link>
      </ul>
      <p class="clearfix" @click="openMenu();">
        <span class="left">配送方式</span>
        <span class="right">{{distribution}}<i class="iconfont icon-jiantouyou push"></i></span>
      </p>
      <mt-field class="align-top" label="买家留言" placeholder="选填：对本次交易的说明（建议填写已和商家协商的内容,200字以内）" type="textarea" rows="3" v-model="word"></mt-field>
      <!-- <p class="clearfix">
        <span class="left">查看电子合同</span>
        <span class="right"><i class="iconfont icon-jiantouyou push"></i></span>
      </p> -->
    </div>
    <div class="menu">
      合计金额：<span>¥{{sumPrice}}</span><!--&nbsp;&nbsp;&nbsp;预付金额：<span>¥3000</span>-->
      <div class="submitBtn" @click="submit();">提交订单</div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <p class="confirm">
        <button class="left" @click="cancel();">取消</button>
        <button class="right" @click="affirm();">确认</button>
      </p>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
	</div>
</template>

<script>
import app from "../../utils/common"
import { mapGetters, mapActions } from 'vuex'
import { Toast } from 'mint-ui';
  export default {
    data () {
      return {
        list:[],
        sellerCompanyName:null,
        sumPrice: 0,
        word:null,    //买家留言
        popupVisible:false,   //显示弹出框
        dis:'上门自提',
        distribution: app.getStore('distribution')==null?null:app.getStore('distribution'), //配送方式
        address:null,
        slots: [{
          flex: 1,
          values: ['上门自提','送货上门'],
        }],
        consignee:null,
        consigneeMobile:null,
        shippingAddress:null,
        sellerMemberMobile:null,
        warehouseAddress:null
      }
    },
    computed: {
			...mapGetters([
        'getToken',
        'getAddress',
        'getGlobalInfo'
      ]),
      cartIds() {
        let pkids=[];
        for(let i=0;i<this.list.length;i++) {
          pkids.push(this.list[i].pkid);
        }
        return pkids.join(",");;
      }
    },
    watch: {
      distribution:function(){
        this.computedAddress();
      },
      word:function() {
        if(this.word.length>200) {
          setTimeout(()=>{
            this.word=this.word.substring(0,200);
          },10)
        }
      }
    },
    mounted () {
      this.dataInit();
      app.preventDefault();
    },
    methods: {
      ...mapActions([
        'setAddress'
      ]),
      //数据初始化
      dataInit() {
        if(app.getStore('cartBack') && this.$route.query.type == 'cart'){
          this.$router.go(-1);
          return;
        }
        //来自购物车
        if(this.$route.query.type == 'cart') {
          app.post('order/settleinfo',{
            cartIds:this.$route.query.cartIds,
            token: this.getToken
          },(r)=>{
            if(this.getAddress == null && r.result.shippingAddress.length>0){
              this.setAddress(r.result.shippingAddress[0]);
              this.address=this.getAddress;
            }
            if(this.address == null) {
              this.address=this.getAddress;
            }
            this.list=r.result.orderInfo.cartProductList;
            this.sellerCompanyName=r.result.orderInfo.sellerCompanyName;
            this.sellerMemberMobile=r.result.orderInfo.sellerMemberMobile;
            this.warehouseAddress=r.result.orderInfo.warehouseAddress;
            this.sumPrice=r.result.orderInfo.totalGoodsAmount;
            this.computedAddress();
          },true,this)
        }else{
          //来自立即购买
          app.post('order/buynow',{
            productId:Number(this.$route.query.productId),
            quantity:Number(this.$route.query.quantity),
            token: this.getToken
          },(r)=>{
            if(this.getAddress == null && r.result.shippingAddress.length>0){
              this.setAddress(r.result.shippingAddress[0]);
              this.address=this.getAddress;
            }
            if(this.address == null) {
              this.address=this.getAddress;
            }
            this.list=r.result.orderInfo.cartProductList;
            this.sellerCompanyName=r.result.orderInfo.sellerCompanyName;
            this.sellerMemberMobile=r.result.orderInfo.sellerMemberMobile;
            this.warehouseAddress=r.result.orderInfo.warehouseAddress;
            this.sumPrice=r.result.orderInfo.totalGoodsAmount;
            this.computedAddress();
          },true,this)
        }
      },
      openMenu() {
        this.popupVisible=true;
      },
      computedAddress() {
        if(this.distribution == '送货上门' && this.address != null) {
          this.consignee=`收货人：${this.address.consignee}`;
          this.consigneeMobile=`${this.address.consigneeMobile}`;
          this.shippingAddress=`收货地址：${this.address.provinceName}${this.address.cityName}${this.address.address}`;
        }else if(this.distribution == '上门自提') {
          this.consignee=`卖家联系人：${this.sellerCompanyName}`;
          this.consigneeMobile=`${this.sellerMemberMobile}`;
          // this.consignee=`客服电话：${this.getGlobalInfo.serviceTel}`;
          // this.consigneeMobile='';
          this.shippingAddress=`提货地址：${this.warehouseAddress}`;
        }
        if(this.getAddress != null){
          this.address=this.getAddress;
        }
      },
      submit() {
        if(this.distribution !='上门自提' && this.distribution !='送货上门') {
          Toast({
            message: '请选择配送方式',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        let addressId;
        if(this.distribution=='上门自提') {
          addressId=null;
        }else if(this.distribution=='送货上门') {
          if(this.address == null){
            Toast({
              message: '请先添加地址!',
              position: 'bottom',
              duration: 1500
            });
            return;
          }else {
            addressId=this.address.pkid;
          }
        }
        app.post('member/centerinfo',{
          token:this.getToken
        },(r)=>{
          if(!(r.result.isPersonalVerified==1 || r.result.isCompanyVerified == 1)) {
            Toast({
              message: '请先完成个人实名认证或企业认证!',
              position: 'bottom',
              duration: 1000
            });
            setTimeout(()=>{
              this.$router.push('/userinfo');
            },1000)
          }else {
            app.post('order/confirmorder',{
              token:this.getToken,
              cartIds:this.cartIds,
              addressId:addressId,
              deliveryType:this.distribution=='上门自提'?1:2,
              comments:this.word
            },(r)=>{
              app.setStore('cartBack',true);
              this.$router.push({path:'/pay',query:{page:-3,pkid:r.result}});
            },true,this)
          }
        },false,this);
      },
      //取消选择
      cancel() {
        this.popupVisible=false;
      },
      affirm() {
        this.distribution=this.dis;
        this.popupVisible=false;
        app.setStore('distribution',this.dis);
      },
      async onValuesChange(picker, values) {
       if(picker.getValues()[0]){
        this.dis=picker.getValues()[0];
       }
      }
    }
  };
</script>

<style lang="scss">
@import "src/styles/components/goods";
.order {
  .mint-cell-wrapper {
    padding: 0;
  }
  .mint-cell-text {
    padding-left: 0;
  }
  .align-top .mint-cell-title{
    align-self: flex-start;
    padding-top:8px;
  }
  .mint-cell-wrapper {
    background-image: none;
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
  .shopDeatils {
    background: #fff;
    padding: 0 15px;
    margin-bottom:60px;
    h5 {
      line-height: px2rem(74px);
      border-bottom: 1px solid #eee;
      margin-bottom: 10px;
    }
    &>p:nth-of-type(1) {
      margin-top: 10px;
      border-top: 1px solid #eee;
    }
    &>p {
      line-height: px2rem(74px);
      border-bottom: 1px solid #eee;
      .push {
        color: #999;
        padding-left: 20px;
      }
    }
    .word {
      line-height: px2rem(80px);
      border: none;
      width: 80%;
      font-size: px2rem(24px);
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
      height: px2rem(95px);
      line-height: px2rem(95px);
      padding: 0 10px;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 50%;
      font-size: px2rem(28px);
      span {
        color: $danger;
      }
    }
    .submitBtn {
      background: $danger;
      color: #fff;
      text-align: center;
      width: px2rem(220px);
      height: px2rem(95px);
      line-height: px2rem(95px);
      position: absolute;
      top: 0;
      right: 0;
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
      	font-size: 14px;
        border: none;
        &:nth-of-type(1) {
          color: #333;
        }
        &:nth-of-type(2) {
          color: $primary;
        }
      }
    }
    .addAddress {
      @include center;
      border-radius:4px;
      width: px2rem(270px);
      height: px2rem(85px);
      font-size: px2rem(30px);
      color: #fff;
      border: none;
      background: $primary;
    }
}
</style>
