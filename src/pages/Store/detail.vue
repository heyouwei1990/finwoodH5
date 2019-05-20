<template>
  <div class="goods-detail" v-title="'商品详情'">
    <v-swiper :listImg="listImg"></v-swiper>
    <div class="goods-info">
      <div class="flex">
        <div>
          <div class="desc">{{product.productName}}</div>
          <span class="price" v-if="productItems.salesPrice==0">面议</span>
          <span class="price"
          v-if="productItems.salesPrice!=0&&productItems.salesPrice!=productItems.salesPriceUpper">
          ￥{{productItems.salesPrice}}~{{productItems.salesPriceUpper}}
          </span>
          <span class="price"
          v-if="productItems.salesPrice!=0&&productItems.salesPrice==productItems.salesPriceUpper">
          ￥{{productItems.salesPrice}}</span>
        </div>
        <div class="btn-icons" v-show="isfavorite" @click="fav();">
          <i class="iconfont icon-shoucanghou active"></i>
          <span class="active">已收藏</span>
        </div>
        <div class="btn-icons" v-show="!isfavorite" @click="fav();">
          <i class="iconfont icon-shoucang"></i>
          <span>收藏</span>
        </div>
        <!-- <div class="btn-icons">
          <i class="iconfont icon-fenxiang"></i>
          <span>分享</span>
        </div> -->
      </div>
      <div class="flex marginTop">
        <router-link tag="span" class="seller" :to="{path:'/sellershop',query:{pkid:product.shopId}}">
          {{product.shopName}} <i class="iconfont icon-renzheng"></i>
        </router-link>
        <span class="from">{{product.cityName}}</span>
        <time class="online-time">{{product.lastModifiedTime}}</time>
      </div>
    </div>
    <section class="sec">
      <h3>商品参数</h3>
      <ul class="txt-list">
        <!-- <li>编号：FM0001</li> -->
        <li>编号：{{product.productCode}}</li>
        <li>品种：{{product.varietyName}}</li>
        <li>类型：{{product.categoryName}}</li>
        <li>产地：{{product.originName}}</li>
        <li>品牌：{{product.brandName}}</li>
        <li>等级：{{product.gradeName}}</li>
        <li>规格：{{product.specification}}</li>
        <li v-if="product.categoryId == 1">是否烘干：{{product.isDryText}}</li>
        <li v-if="product.categoryId != 1">平均吨：{{product.meanSquare}} {{product.meanSquareUnitText}}</li>
        <li style="height:auto;" v-if="product.introduction != null">产品简介：{{product.introduction}}</li>
      </ul>
    </section>
    <section class="sec">
      <h3>交易方式</h3>
      <ul class="txt-list">
        <!--<li>是否担保：{{iSassure}}</li>-->
        <!--<li>能否议价：{{product.isBarginText}}</li>-->
        <li>结算方式：余额支付 / 银行转账</li>
        <li>起订数量：{{product.minimumOrderQuantity}}{{product.unitName}}</li>
        <li>交货地址：{{product.warehouseProvinceName}}{{product.warehouseCityName}}{{product.warehouseName}}</li>
        <!--<li>预付比例：{{product.advanceRatio}}%</li>-->
      </ul>
    </section>
    <div style="height:50px" v-if="product.saleStatus!=2"></div>
    <!-- 底部操作区 -->
    <div class="fixedBottom" v-if="$route.query.edit && product.saleStatus!=2">
      <div class="btn-ctrl" @click="refresh();">刷新</div>
      <div class="btn-ctrl" @click="delet();">删除</div>
      <div class="btn-ctrl" @click="out();" v-if="product.saleStatus==3">下架</div>
      <div class="btn-ctrl" @click="pullOn();" v-if="product.saleStatus==1">上架</div>
      <div class="btn-ctrl" @click="$router.push({path:'/commodity',query:{pkid:$route.query.pkid,status:product.saleStatus}});">编辑</div>
    </div>
    <!-- 底部操作区 -->
    <div class="fixed-bottom" v-if="!$route.query.edit">
      <router-link tag="div" class="btn-icons" :to="{path:'/sellershop',query:{pkid:product.shopId}}">
        <i class="iconfont icon-shangcheng"></i>
        <span>店铺</span>
      </router-link>
      <div class="btn-icons">
        <a :href="tel">
          <i class="iconfont icon-1"></i>
          <span>客服</span>
        </a>
      </div>
      <div class="btn-icons" @click="$router.push({path:'/cart'})">
        <i class="iconfont icon-gouwuche" ref="ballHome"></i>
        <em class="cart-num" v-if="parseInt(count)>0">{{ countTxt }}</em>
        <span>购物车</span>
      </div>
      <div class="btn-yellow" @click="joinCart" v-if="product.saleStatus ==3 && productItems.salesPrice!=0 && !yourself">加入购物车</div>
      <div class="btn-red" @click="buy();" v-if="product.saleStatus ==3 && productItems.salesPrice!=0 && !yourself">立即购买</div>
      <div class="btn-yellow dark" v-if="product.saleStatus !=3 || productItems.salesPrice==0 || yourself">加入购物车</div>
      <div class="btn-red dark" v-if="product.saleStatus !=3 || productItems.salesPrice==0 || yourself">立即购买</div>
    </div>
    <!--小球-->
    <div class="ball-container">
      <div v-for="(ball,index) in balls" :key="index">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show" :style="'left:' +cartIcon.x +'px;top:'+cartIcon.y+'px;'">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <mt-popup
      class="goods-picker"
      v-model="popupPick"
      position="bottom">
      <div class="picker-inner">
        <i @click="popupBuy()" class="close iconfont icon-shanchu"></i>
        <dl class="goods-mini">
          <dt style="position:relative"><img v-lazy='productImg' alt=""></dt>
          <dd class="price">￥{{ quantity*productItems.salesPrice }}</dd>
        </dl>
        <ul>
          <li>
            <span class="title">单价</span>
            <div class="price" v-if="productItems.salesPrice==0">面议</div>
            <div class="price"
            v-if="productItems.salesPrice!=0&&productItems.salesPrice!=productItems.salesPriceUpper">
            ￥{{productItems.salesPrice}}~{{productItems.salesPriceUpper}}元/{{product.unitName}}</div>
            <div class="price"
            v-if="productItems.salesPrice!=0&&productItems.salesPrice==productItems.salesPriceUpper">
            ￥{{productItems.salesPrice}}元/{{product.unitName}}</div>
          </li>
          <li>
            <span class="title">库存</span>
            <div class="total-goods">{{ productItems.stockQuantity }}立方米</div>
          </li>
          <li>
            <span class="title">数量</span>
            <counter ref="couter" :max="productItems.stockQuantity" :min="product.minimumOrderQuantity" @on-change="changeNum()"></counter>
          </li>
        </ul>
      </div>
      <div class="btn-ensure" @click="confirm();">确定</div>
    </mt-popup>
    <QuickNav/>
  </div>
</template>

<script>
import Swiper from "../../components/swiper"
import Counter from "@/components/counter"
import app from "../../utils/common"
import { MessageBox, Toast } from "mint-ui"
import { mapGetters, mapActions } from 'vuex'
import wxshare from '../../utils/share'
import QuickNav from '../../components//quickNav'

export default {
  components: {
    "v-swiper": Swiper,
    Counter,
    QuickNav
  },
  data() {
    return {
      listImg: [],    //商品轮播
      tel:null,       //客服电话
      product:{       //商品信息
        productName:null
      },
      productItems:{  //商品参数
        salesPrice:null
      },
      isfavorite:false,   //是否收藏
      popupPick: false,
      quantity: 1,   //商品已选数量
      count:0,      //购物车数量
      productImg:null,
      selectType:false,       //true为选购物车，false为选购买
      event:null,
      balls:[
        {
          show:false
        },
        {
          show:false
        },
        {
          show:false
        }
      ],
      dropBalls:[],
      cartIcon:{},
      shareImageUrl:null,
      yourself:true,      //是否为自己的商品
      isajax:false,   //是否请求到数据
      quickNav:false, //快速导航弹框
    };
  },
  computed: {
    iSassure:function() {
      return this.product.isSecuried==1?'担保交易':'否';
    },
    //购物车数量
    countTxt(){
      return this.count>99? 99+'+': this.count;
    },
    ...mapGetters([
      'getToken',
      'getGlobalInfo',
      'getUnionid'
    ])
  },
  created () {
    window.scrollTo(0,0);
    this.dataInit();
    this.getFav();
  },
  beforeDestroy () {
    //微信分享
    wxshare.share({
      signUrl : `${window.location.href.split('#')[0]}#/`,
      title : '芬木网，买卖木材更轻松',
      desc : '木材交易、供应链金融、数据智能、产业服务等一站式服务平台',
      link : `${window.location.href.split('#')[0]}#/`,
      imgUrl : this.getGlobalInfo.logoUrl,
      dataShareUrl :'/',
      unionid:this.getUnionid,
      token:this.getToken
    });
  },
  methods: {
    ...mapActions([
      'setAddress'
    ]),
    //初始化数据
    async dataInit() {
      app.post('order/cartqty',{
        token:this.getToken
      },(r)=>{
        this.count=r.result;
      },false,this)
      app.post('product/detail',{
        pkid:Number(this.$route.query.pkid),
        token:this.getToken
      },(r)=>{
        this.isajax=true;
        for(let i=0;i<r.result.images.length;i++) {
          this.listImg.push({url:r.result.images[i]})
        }
        this.productImg=r.result.images[0];
        this.tel='tel:'+r.result.serviceTel;
        this.product=r.result.product;
        this.productItems=r.result.productItems[0];
        this.shareImageUrl=r.result.shareImageUrl;
        this.yourself=r.result.yourself;
        //微信分享
        wxshare.share({
          signUrl : `${window.location.href.split('#')[0]}#${this.$route.path}?pkid=${this.$route.query.pkid}`,
          title : `【芬木网】${this.product.productName}`,
          desc : `${this.product.shopName}新到一批很不错的${this.product.varietyName}，数量不多了，速来抢购吧！`,
          link : `${window.location.href.split('#')[0]}#${this.$route.path}?pkid=${this.$route.query.pkid}`,
          imgUrl : this.shareImageUrl,
          dataShareUrl :`${this.$route.path}?pkid=${this.$route.query.pkid}`,
          unionid:this.getUnionid,
          token:this.getToken
        });
      },false,this)
    },
    //获取收藏状态
    getFav() {
      app.post('product/isfavorite',{
        token:this.getToken,
        pkid:Number(this.$route.query.pkid)
      },(r)=>{
        this.isfavorite=r.result;
      },false,this)
    },
    //刷新
    refresh() {
      app.post('product/refresh',{
        token:this.getToken,
        productIds:[this.$route.query.pkid]
      },(res)=>{
        Toast({
          message:'刷新成功',
          position: 'bottom',
          during:1500
        });
        this.dataInit();
      },false,this)
    },
    //删除
    delet() {
      MessageBox.confirm("您是否确认删除该商品？", "芬木提示")
        .then(action => {
          app.post('product/delete',{
            token:this.getToken,
            productIds:[this.$route.query.pkid]
          },(res)=>{
            Toast({
              message:'删除成功',
              position: 'bottom',
              during:1500
            });
            this.$router.go(-1);
          },false,this)
        })
        .catch(action => {});
    },
    //下架
    out() {
      MessageBox.confirm("您是否确认下架该商品？", "芬木提示")
        .then(action => {
          app.post('product/pulloff',{
            token:this.getToken,
            productIds:[this.$route.query.pkid]
          },(res)=>{
            Toast({
              message:'商品已下架',
              position: 'bottom',
              during:1500
            });
            this.dataInit();
          },false,this)
        })
        .catch(action => {});
    },
    //上架
    pullOn(){
      app.post('product/pullon',{
        token:this.getToken,
        productIds:[this.$route.query.pkid]
      },(res)=>{
        this.$router.push({path:'/issuesuccess',query:{page:'-2'}});
      },false,this)
    },
    //收藏
    fav() {
      app.post('product/collect',{
        token:this.getToken,
        pkid:Number(this.$route.query.pkid)
      },(r)=>{
        Toast({
          message:this.isfavorite==true?'取消收藏成功！':'收藏成功！',
          position: 'bottom',
          duration: 1000
        })
        this.getFav();
      },false,this);
    },
    //获取购物车图标坐标
    setCartAxis(){
      try {
        let tar=this.$refs.ballHome.getBoundingClientRect();
        this.cartIcon.x=tar.left;
        this.cartIcon.y=tar.top;
      } catch (error) {

      }
    },
    //快速导航弹框
    pullLeft() {
      this.quickNav = !this.quickNav;
    },
    //购买弹框
    popupBuy() {
      this.$refs.couter.fixNumber();
      this.quantity=this.$refs.couter.quantity;
      this.popupPick = !this.popupPick;
    },
    changeNum() {
      this.quantity =this.$refs.couter.quantity;
    },
    //购买
    buy() {
      if(!this.isajax) {
        return;
      }
      if(this.yourself){
        Toast({
          message:'无法购买自己的商品!',
          position: 'bottom',
          duration: 1500
        })
        return;
      }
      this.selectType=false;
      this.popupBuy();
    },
    //加入购物车
    joinCart(event) {
      if(this.yourself){
        Toast({
          message:'无法购买自己的商品!',
          position: 'bottom',
          duration: 1500
        })
        return;
      }
      this.event=event;
      this.selectType=true;
      this.popupBuy();
    },
    //加入购物车||确认购买
    confirm() {
      if(typeof this.quantity != 'number') {
        Toast({
          message:'商品数量输入不合法!',
          position: 'bottom',
          duration: 1500
        })
        return;
      }
      if(this.selectType) {
        app.post('order/addtocart',{
          token:this.getToken,
          productId:Number(this.$route.query.pkid),
          quantity:this.quantity
        },(r)=>{
          this.popupBuy();
          setTimeout(() => {
            this.drop(this.event.target);
            app.post('order/cartqty',{
			        token:this.getToken
			      },(r)=>{
			        this.count=r.result;
			      },false,this)
          }, 500);
        },false,this)
      }else {
        this.setAddress(null);
        app.removeStore('distribution');
        this.$router.push({path:'/order',query:{
          productId:Number(this.$route.query.pkid),
          quantity:this.quantity,
        }});

        // app.post('order/buynow',{
        //   productId:this.$route.query.pkid,
        //   quantity:this.quantity,
        //   token:this.getToken,
        // },(r)=>{
        //   this.$router.push('/order');
        // },false,this)
      }
    },
    // none() {
    //   if(this.productItems.salesPrice==0){
    //     return;
    //   }else{
    //     Toast({
    //       message:'该商品已下架或删除!',
    //       position: 'bottom',
    //       duration: 1500
    //     })
    //   }
    // },
    //抛物
    drop(el){
      for (let i=0;i<this.balls.length;i++){
        let ball=this.balls[i];
        if (!ball.show){
          ball.show=true;
          ball.el=el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el){
      let count=this.balls.length;
      while(count--){
        let ball=this.balls[count];
        if(ball.show){
          try {
            let rect=ball.el.getBoundingClientRect();//元素相对于视口的位置
            let x=rect.left-this.cartIcon.x+25;
            let y=rect.top-this.cartIcon.y-16;
            el.style.display='';
            el.style.webkitTransform='translateY('+ y +'px)';
            el.style.transform='translateY('+ y +'px)';
            let inner=el.querySelectorAll('.inner-hook')[0];
            inner.style.webkitTransform='translateX('+ x +'px)';
            inner.style.transform='translateX('+ x +'px)';
          } catch (error) {

          }
        }
      }
    },
    dropping(el,done){
      let ballSize=el.offsetHeight;
      el.style.webkitTransform='translate3d(0,0,0)';
      el.style.transform='translate3d(0,0,0)';
      let inner=el.querySelectorAll('.inner-hook')[0];
      inner.style.webkitTransform='translate3d(0,0,0)';
      inner.style.transform='translate3d(0,0,0)';
      el.addEventListener('transitionend',done);
    },
    afterDrop(el){
      let ball=this.dropBalls.shift();
      if(ball){
        ball.show=false;
        el.style.display='none';
      }
    }
  },
  mounted(){
    //初次加载或者resize时重新获取购物车图标坐标
    if(!this.$route.query.edit){
      this.setCartAxis()
      window.addEventListener('resize',() => {
        setTimeout(()=>{
          this.setCartAxis()
        },800)
      })
    }
  }
};
</script>

<style lang="scss">
.goods-detail {
  margin-bottom: 10px;
  .mint-toast .iconfont {
    font-size: px2rem(120px)!important;
  }
  .ball{
    position: fixed;
    z-index:9999;
    -webkit-transition: all 0.2s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    transition: all 0.2s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }
  .inner{
    width: 16px;
    height:16px;
    border-radius: 50%;
    background-color: $secondary;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }
  .swiper-container {
    height: 100vw;
    max-height:$bodyWidth;
  }

  .goods-info {
    background-color: #fff;
    padding: px2rem(15px) 15px;
    .price {
      margin-top: 6px;
      margin-bottom: 6px;
    }
  }

  .flex {
    @include fj;
  }

  .marginTop {
    margin-top: 10px;
  }

  .desc {
    font-size: 14px;
    color: #333;
    line-height: 20px;
    height:auto;
    max-height: 40px;
    -webkit-box-flex: 1;
    flex: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .btn-icons {
    text-align: center;
    color: #999;
    margin-right: px2rem(20px);
    i {
      display: inline-block;
      font-size: px2rem(44px);
      position: relative;
      top: px2rem(8px);
    }
    span {
      display: block;
      font-size: 12px;
      margin-top: 4px;
      line-height: 1.5;
      white-space:nowrap;
    }
    .active {
      color: $danger;
    }
  }
  .btn-icons:first-of-type{
    margin-left:px2rem(30px);
  }
  .goods-info{
    position: relative;
    .btn-icons{
      text-align: right;
      i{
        min-width:24px;
        text-align: center;
      }
      span{
        white-space:nowrap;
        width:36px;
      }
    }
  }

  .price {
    font-size: 14px;
    color: $danger;
    display: block;
    margin-bottom:0;
    //line-height: 24px;
  }

  .seller,
  .from,
  .online-time {
    font-size: 12px;
    color: #999;
    line-height: 1;
    margin-top:0;
  }

  .seller .iconfont {
    color: $secondary;
    font-size: 14px!important;
    margin-left: 3px;
  }

  .sec {
    background-color: #fff;
    margin-top: px2rem(15px);
  }

  .sec > h3 {
    font-size: 16px;
    height: px2rem(72px);
    padding: px2rem(12px) 15px;
    line-height: px2rem(48px);
    color: #333;
    position: relative;
    &:before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      margin-right: px2rem(18px);
      width: 3px;
      height: 1em;
      background-color: $primary;
      margin-top: -2px;
    }
    &:after {
      content: "";
      display: block;
      width: 100%;
      height: 1px;
      background-color: $light;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }

  .txt-list {
    overflow: hidden;
    > li {
      padding: 0 15px;
      height: px2rem(64px);
      font-size: 14px;
      line-height: px2rem(64px);
      color: #333;
      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: $light;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      &:last-child:after {
        display: none;
      }
    }
  }

 	@media only screen and (min-width:500px){
	    .fixed-bottom,.fixedBottom{
	        max-width: $bodyWidth;
	    }
	}
  .fixed-bottom {
    @include fj;
    width: 100%;
	  transform: translateX(-50%);
    height:50px;
    position: fixed;
    bottom: 0;
    left: 50%;
    z-index: 99;
    background-color: #fff;
    transform: translateX(-50%);
    align-items: center;
    .btn-icons {
      color: #666;
      -webkit-box-flex: 1;
      flex: 1;
      position: relative;
      i{
        font-size:22px;
      }
    }
    .btn-yellow,
    .btn-red {
      width: px2rem(220px);
      text-align: center;
      height:50px;
      line-height: 50px;
      color: #fff;
      font-size: 14px;
    }
    .btn-yellow {
      background-color: $secondary;
    }
    .btn-red {
      background-color: $danger;
    }
  }
  .dark {
    background: #666!important;
  }

  .cart-num {
    white-space: nowrap;
    width: 18px;
    height: 18px;
    -webkit-border-radius: 18px;
    border-radius: 18px;
    background-color: #fff;
    color: $danger;
    text-align: center;
    line-height: 19px;
    font-size: 10px;
    font-weight: 300;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: 4px;
    margin-top: -26px;
    &:after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 200%;
      height: 200%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
      border: 1px solid $danger;
      -webkit-transform: scale(0.5) translate3d(-100%, -100%, 0);
      transform: scale(0.5) translate3d(-100%, -100%, 0);
    }
  }

  .goods-picker {
    width: 100%;
    background-color: #fff;
  }

  .picker-inner {
    ul {
      padding-left: 15px;
      padding-right: 15px;
    }
    li {
      padding: px2rem(20px) 0;
      position: relative;
      line-height: px2rem(48px);
      overflow: hidden;
      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background-color: $light;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        position: absolute;
        left: 0;
        bottom: 0;
      }
      > span {
        font-size: 16px;
      }
      &:last-child {
        @include fj;
        align-items: center;
        -webkit-align-items: center;
      }
      .minus,
      .plus {
        display: inline-block;
        vertical-align: middle;
        width: px2rem(68px);
        height: px2rem(52px);
        line-height: px2rem(48px);
        border: 1px solid $light;
        color: #333;
        background-color: #fff;
        text-align: center;
        font-size: px2rem(48px);
      }
      input {
        border: 0;
        width: px2rem(70px);
        text-align: center;
        line-height: px2rem(52px);
        height: px2rem(52px);
        font-size: 14px;
      }
    }
  }

  .close {
    position: absolute;
    right: 15px;
    top: 10px;
    font-size: px2rem(36px);
    color: #999;
  }

  .goods-mini {
    @include fj;
    padding: px2rem(20px) 15px;
  }

  .goods-mini > dt {
    @include borderRadius;
    width: px2rem(280px);
    height: px2rem(280px);
    background-color: #fff;
    border: 1px solid $light;
    margin-top: px2rem(-88px);
    overflow: hidden;
    padding: px2rem(14px);
  }

  .goods-mini > dt > img {
    @include center;
    max-height: 100%;
  }

  .goods-mini > dd {
    -webkit-box-flex: 1;
    flex: 1;
    margin-left: px2rem(26px);
  }

  .btn-ensure {
    width: 100%;
    height: px2rem(98px);
    line-height: px2rem(98px);
    text-align: center;
    font-size: 18px;
    color: #fff;
    background-color: $danger;
  }
  .total-goods {
    font-size: 14px;
  }
  .fixedBottom {
    @include fj(space-around);
    @include bt;
    width: 100%;
    height:px2rem(98px);
    position: fixed;
    bottom: 0;
    left: 50%;
    z-index: 99;
    background-color: #fff;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    align-items: center;
    -webkit-align-items: center;
    .btn-ctrl{
      width: px2rem(126px);
      height:px2rem(60px);
      border-radius: px2rem(60px);
      color: $primary;
      text-align: center;
      line-height:px2rem(60px);
      position: relative;
      &:before{
        content: '';
        position: absolute;
        left:50%;
        top:50%;
        z-index:2;
        width: 200%;
        height:200%;
        -webkit-transform: translate3d(-50%,-50%,0) scale(0.5);
        transform: translate3d(-50%,-50%,0) scale(0.5);
        border: 1px solid $primary;
        border-radius: px2rem(60px);
      }
    }
  }
}
</style>
