<template>
  <div class="page-shop">
    <v-scroll
      class="scroll"
      ref="scroll"
      :probeType="probeType"
      :listenScroll="listenScroll"
      @scroll="scroll">
      <!--<img ref="banner" class="shop-banner" @click="slideUp()" src="../../../images/shop-banner.jpg" v-if="shopDetail.adBannerUrl == null" alt="">-->
      <img ref="banner" class="shop-banner" @click="slideUp()" :src="bannerUrl" alt="">
      <div class="shop-goods" ref="content">
        <ul class="rank-tab">
          <li :class="['select-li',{active:dropDown}]" @click="slideDown()">
            <span :class="[{active:varietyId!=-1}]">{{ currentVariety }}</span>
            <em></em>
          </li>
          <li :class="['rank-item',{rise:rankPriceStatus==1,fall:rankPriceStatus==2}]" @click="rankPrice()">
            <span>价格</span>
            <em></em>
          </li>
        </ul>
        <div>
          <ul class="goods-list">
            <router-link tag="li" :to="{path:'/detail',query:{pkid:item.pkid}}" v-for="(item,index) in list" :key="index">
               <dl class="goods-dl">
                <dt><img v-lazy="item.imageUrl" alt=""></dt>
                <dd>
                  <p class="desc">{{item.productName}}</p>
                  <div class="seller">{{shopDetail.fullName}} <i class="iconfont icon-renzheng"></i></div>
                  <div class="dd-bottom">
                    <span class="price" v-if="item.salesPrice==0">面议</span>
                    <span class="price" v-else>￥{{item.salesPrice}}</span>
                    <time class="online-time">{{item.lastModifiedTime}}</time>
                  </div>
                </dd>
              </dl>
            </router-link>
          </ul>
        </div>
        <mt-popup v-model="dropDown" position="top">
          <ul class="sort-list">
            <li v-for="(item,index) in varieties" :key="index" @click="selectVarieties(item.pkid,item.name)">{{item.name}}</li>
          </ul>
        </mt-popup>
      </div>
    </v-scroll>
    <!--<a class="btn-contact">联系客服</a>-->
    <ul v-show="fixedTab" class="rank-tab fixed-tab">
      <li :class="['select-li',{active:dropDown || varietyId!=-1}]" @click="slideDown()">
        <span :class="[{active:varietyId!=-1}]">{{ currentVariety }}</span>
        <em></em>
      </li>
      <li :class="['rank-item',{rise:rankPriceStatus==2,fall:rankPriceStatus==1}]" @click="rankPrice()">
        <span>价格</span>
        <em></em>
      </li>
    </ul>
    <mt-popup v-model="dropDownFixed" position="top">
      <ul class="sort-list">
        <li v-for="(item,index) in varieties" :key="index" @click="selectVarieties(item.pkid,item.name)">{{item.name}}</li>
      </ul>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'vue2-better-scroll'
  import app from "../../../utils/common"
  import { mapGetters } from 'vuex'
  import wxshare from '../../../utils/share'
  export default {
    components:{
      "v-scroll":Scroll,
    },
    data(){
      return{
        shopDetail:'',
        bannerUrl:require('../../../images/shop-banner.jpg'),
        varieties:[
          {
            name:'全部品种',
            pkid:-1
          }
        ],
        currentVariety:'全部品种',
        varietyId:-1,
        list:[],
        probeType:3,  //滚动条件
        listenScroll:true, //是否监听滚动事件
        dropDown:false, //产品下拉选择弹框
        dropDownFixed:false,//产品下拉选择弹框
        rankPriceStatus:-1, //价格排序
        fixedTab:false, //固定tab是否显示
        pageIndex:1,
        pageCount:1
      }
    },
    computed: {
			...mapGetters([
        'getUnionid',
        'getToken',
        'getGlobalInfo'
			])
    },
    mounted(){
      this.$refs.scroll.refresh();
      this.dataInit();
    },
    methods:{
      //初始化
      dataInit() {
        app.post('shop/shopdetail',{
          pkid:Number(this.$route.query.pkid)
        },r=>{
          this.shopDetail=r.result.shopDetail;
          this.varieties=this.varieties.concat(r.result.varieties);
          window.document.title = `${this.shopDetail.abbrName}店铺`;
          this.bannerLoad();
          wxshare.share({
            signUrl : `${window.location.href.split('#')[0]}#${this.$route.path}?pkid=${this.$route.query.pkid}`,
            title : `【${this.shopDetail.abbrName}店铺】`,
            desc : '刚刚在芬木网发现了一个很不错的店铺，赶紧来看看吧',
            link : `${window.location.href.split('#')[0]}#${this.$route.path}?pkid=${this.$route.query.pkid}`,
            imgUrl : this.getGlobalInfo.logoUrl,
            dataShareUrl :`${this.$route.path}?pkid=${this.$route.query.pkid}`,
            unionid:this.getUnionid,
            token:this.getToken
          });
        })
        this.product();
      },
      //banner加载
      bannerLoad(){
        let _img=new Image();
        _img.src=this.shopDetail.adBannerUrl;
        _img.onload=()=>{
          this.bannerUrl=this.shopDetail.adBannerUrl;
        }
      },
      //更新列表
      product() {
        app.post('shop/shopproducts',{
          varietyId:this.varietyId,
          shopId:Number(this.$route.query.pkid),
          priceDirection:this.rankPriceStatus
        },r=>{
          for(let i=0;i<r.result.list.length;i++) {
            r.result.list[i].lastModifiedTime=r.result.list[i].lastModifiedTime.substring(0,10);
          }
          if(this.pageIndex>1) {
            this.list=this.list.concat(...r.result.list);
          }else {
            this.list=r.result.list;
          }
          this.pageIndex=r.result.paging.pageIndex;
          this.pageCount=r.result.paging.pageCount;
          if(this.pageIndex<this.pageCount) {
            this.$refs.scroll.forceUpdate(true)
          }else {
            this.$refs.scroll.forceUpdate(false)
          }
        })
      },
      // 上拉加载更多数据
      onPullingUp () {
        this.pageIndex++;
        this.product();
      },
      //产品下拉开关
      slideDown(){
        if(this.fixedTab){
          this.dropDownFixed=!this.dropDownFixed;
        }else{
          this.dropDown=!this.dropDown;
        }
        this.rankPriceStatus=-1;
      },
      //选择品种
      selectVarieties(pkid,called) {
        this.dropDown=false;
        this.dropDownFixed=false;
        this.currentVariety=called;
        this.varietyId=Number(pkid);
        this.fixedTab=false;
        this.$refs.scroll.scrollTo(0, 0, 100);
        this.product();
      },
      slideUp(){
        this.dropDown=false;
        this.dropDownFixed=false;
      },
      //价格排序
      rankPrice(){
        this.dropDown=false;
        this.dropDownFixed=false;
        if(this.rankPriceStatus==-1){
          this.rankPriceStatus=1;
          this.product();
          return;
        }
        if(this.rankPriceStatus == 1){
          this.rankPriceStatus=2;
        }else {
          this.rankPriceStatus=1;
        }
        this.product();
      },
      //滚动时tab固定
      scroll(){
        if(-this.$refs.scroll.scroll.y>=this.$refs.content.offsetTop){
          this.fixedTab=true;
        }else{
          this.fixedTab=false;
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../styles/components/goods";
 	@media only screen and (min-width:500px){
    .page-shop{
        max-width: $bodyWidth;
    }
	}
  .page-shop{
    position: fixed;
    left:50%;
    top:0;
	  transform: translateX(-50%);
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
    /*.btn-contact{
      @include bt;
      width: 100%;
      height:50px;
      display: block;
      background-color: #fff;
      text-align: center;
      line-height:50px;
      font-size:16px;
      color: #333;
    }*/
    .scroll{
      height:100px;
      flex: 1;
    }
    .scroll-content{
      min-height: 100vh;
    }
    .shop-banner{
      display: block;
      width: 100%;
      height:37.33333vw;
      position: relative;
      z-index:2;
      background-color: #fff;
    }
    .shop-goods{
      position: relative;
      z-index:1;
      width: 100%;
      padding-top:44px;
      overflow: hidden;
      min-height: 500px;
    }
    .shop-goods.fixed{
      .rank-tab{
        position: fixed;
      }
    }
    .rank-tab{
      @include fj;
      @include bb;
      justify-content: space-around;
      height:44px;
      width: 100%;
      position: absolute;
      left:0;
      top:0;
      z-index:3000;
      padding:0 15px;
      align-items:center;
      background-color: #fff;
      >li{
        display: flex;
        align-items: center;
        font-size:14px;
        color: #333;
        line-height:44px;
        >em{
          position: relative;
          margin-left:6px;
        }
      }
    }
    .select-li>em{
      display: block;
      width: 0;
      height:0;
      border:4px solid transparent;
      border-top:6px solid #999;
      margin-top:3px;
      transition: all 0.3s linear;
    }
    .select-li.active,.select-li .active{
      color: $primary;
    }
    .select-li.active>em{
      border-top:6px solid $primary;
      transform: rotate(-180deg);
      transform-origin: 4px 3px;
    }
    .rank-item>em{
      &:before,&:after{
        content: '';
        display: block;
        width: 0;
        height:0;
        border:4px solid transparent;
      }
      &:before{
        border-bottom:5px solid #999;
        margin-bottom:2px;
      }
      &:after{
        border-top:5px solid #999;
      }
    }
    .rank-item.rise,.rank-item.fall{
      color: $primary;
    }
    .rank-item.rise>em{
      &:before{
        border-bottom:5px solid $primary;
      }
      &:after{
        border-top:5px solid #999;
      }
    }
    .rank-item.fall>em{
      &:before{
        border-bottom:5px solid #999;
      }
      &:after{
        border-top:5px solid $primary;
      }
    }
    .mint-popup{
      position: absolute;
      width: 100%;
      top:44px;
      max-height: 300px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .sort-list {
      width: 100%;
      overflow-y: auto;
    }
    .sort-list > li {
      width: 100%;
      height: 44px;
      line-height: 44px;
      padding-left: 15px;
      padding-right: 15px;
      font-size: 14px;
      color: #333;
      background-color: #fff;
      &:after {
        content: "";
        width: 100%;
        height: 1px;
        display: block;
        background-color: $light;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      &:last-child:after {
        display: none;
      }
    }
    .sort-list > li.active {
      color: $primary;
    }
  }
</style>
