<template>
    <div class="page-index" v-title="'芬木网'">
      <v-scroll
          style="height:calc(100vh - 48px)"
          class="wrapper"
          ref="scroll"
          pullUpLoad="true"
          @pullingUp="onPullingUp">
        <div class="searchbox">
            <div :class="['input-div',{hasval:false}]" @click="goSearch();">
              <i class="iconfont icon-fangdajing"></i>
              <span class="span-val">请输入品牌/品种/商家</span>
            </div>
        </div>
        <v-swiper :listImg="sliders"></v-swiper>
        <ul class="module-nav">
          <li @click="$router.push({path:'/store'})">
            <i class="iconfont icon-maihuo"></i>
            <span>买现货</span>
          </li>
          <li @click="$router.push({path:'/publish',query:{page:'item2'}})">
            <i class="iconfont icon-faqiugou"></i>
            <span>发求购</span>
          </li>
          <li @click="$router.push({path:'/market'})">
            <i class="iconfont icon-kanhangqin"></i>
            <span>看行情</span>
          </li>
          <li @click="$router.push({path:'/finance'})">
            <i class="iconfont icon-zijin"></i>
            <span>找资金</span>
          </li>
        </ul>
        <mt-navbar class="navbar" v-model="selected">
          <mt-tab-item id="item1">最新现货</mt-tab-item>
          <mt-tab-item id="item2">最新求购</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="item1">
            <ul class="goods-list">
              <router-link tag="li" :to="{path:'/detail',query:{pkid:item.pkid}}" v-for="(item,index) in sellList" :key="index">
                <dl class="goods-dl">
                  <dt><img v-lazy="item.imageUrl" alt=""></dt>
                  <dd>
                    <p class="desc">{{item.productName}}</p>
                    <div class="seller">{{item.shopName}} <i class="iconfont icon-renzheng"></i></div>
                    <div class="dd-bottom">
                      <span class="price" v-if="item.salesPrice==0">面议</span>
                      <span class="price" v-if="item.salesPrice!=0 && item.salesPrice!=item.salesPriceUpper">￥{{item.salesPrice}}~{{item.salesPriceUpper}}</span>
                      <span class="price" v-if="item.salesPrice!=0 && item.salesPrice==item.salesPriceUpper">￥{{item.salesPrice}}</span>
                      <time class="online-time">{{item.lastModifiedTime | dateTime}}</time>
                    </div>
                  </dd>
                </dl>
              </router-link>
            </ul>
          </mt-tab-container-item>
            <mt-tab-container-item id="item2">
              <ul class="hotbuy-list">
                <router-link tag="li" :to="{path:'/publishDetail',query:{pkid:item.pkid}}" v-for="item in buyList" :key="item.id">
                  <div class="hot-buy-item">
                    <div class="item-l">
                      <div class="goods-name">{{item.varietyName}}</div>
                      <div>交 货 地：{{item.deliveryAddress}}</div>
                      <div>发布时间：{{item.lastModifiedTime | dateTime}}</div>
                      <div>求购数量：{{item.quantity}} {{item.unitName}}</div>
                    </div>
                    <div class="item-r">
                      <div>{{statusTxt[item.status]}}</div>
                      <div v-if="item.purchasePrice!=0">{{item.purchasePrice}}元/m³</div>
                      <div v-if="item.purchasePrice==0">面议</div>
                    </div>
                  </div>
                </router-link>
              </ul>
            </mt-tab-container-item>
        </mt-tab-container>
        <!-- <calc :list="calcList"></calc> -->
      </v-scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import Swiper from "../../components/swiper";
import { mapActions } from 'vuex'
import app from "../../utils/common"
import calc from "../../components/calc"
import Scroll from 'vue2-better-scroll'

export default {
  components: {
    "v-swiper": Swiper,
    calc,
    "v-scroll": Scroll
  },
  activated () {
    //解决返回当前页滚动组件失效bug
    this.$refs.scroll.initScroll();
  },
  data() {
    return {
      hasval: false,
      sliders: [],
      selected: app.getStore('selected')==null?'item1':app.getStore('selected'),
      sellList: [], //最新现货
      buyList: [], //最新求购
      statusTxt:['待审核','交易中','交易成功','交易取消','审核不通过'],
      calcList:[{
        title:'材积计算',
        icon:'icon-jisuanqi',
        link:'/volume'
      }],
      pageIndex:0,  //当前页码
      pageCount:1,  //总页码
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700
    };
  },
  filters:{
    //只显示日期
    dateTime:function (value) {
      return value.substring(0,10);
    }
  },
  mounted () {
    this.getData();
  },
  watch: {
    "selected":function() {
      this.$refs.scroll.forceUpdate(true);
      if(this.sellList.length==0 || this.buyList.length ==0){
        this.getData();
      }
      app.setStore('selected',this.selected);
    }
  },
  activated () {
    //解决返回当前页滚动组件失效bug
    this.$refs.scroll.initScroll();
  },
  methods: {
    ...mapActions([
      'setSearchPage'
    ]),
    // 上拉加载更多数据
    onPullingUp () {
      this.getProduct();
    },
    //获取首页数据
    async getData() {
      app.post('data/homedata',{
        asc:0,
        orderType:3,
        pageIndex:1
      },(r)=>{
        //this.sellList=r.result.lastestProduct;
        this.buyList=r.result.lastestInquiry;
        for(let i=0;i<r.result.banners.length;i++){
          this.sliders.push({
            url:r.result.banners[i].text,
            href:r.result.banners[i].value
          })
        }
      });
      this.getProduct();
    },
    //获取最新现货
    getProduct() {
      if(this.sellList.length>0 && this.selected == "item2") {
        this.$refs.scroll.forceUpdate(false);
        return;
      }
      this.pageIndex++;
      app.post('data/lastestproduct',{
        pageIndex:this.pageIndex
      },r=>{
        if(this.pageIndex>1) {
          this.sellList=this.sellList.concat(...r.result.list);
        }else {
          this.sellList=r.result.list;
        }
        this.pageIndex=r.result.paging.pageIndex;
        if(r.result.paging.pageCount!=0) {
          this.pageCount=r.result.paging.pageCount;
        }
        if(this.pageIndex<this.pageCount) {
          this.$refs.scroll.forceUpdate(true)
        }else {
          this.$refs.scroll.forceUpdate(false)
        }
      })
    },
    //前往搜索页
    goSearch() {
      this.setSearchPage('/store');
      this.$router.push({path:'/search'});
    }
  }
};
</script>

<style lang="scss">
@import "src/styles/components/goods";
.page-index {
  padding-bottom:48px;
  .searchbox {
    @include bb;
    width: 100%;
    background-color: #f5f5f5;
    height:44px;
    padding: 6px 10px;
    .span-val {
      display: inline-block;
      width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .input-div {
    position: relative;
    min-width: 100px;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid $light;
    height: 32px;
    line-height: 32px;
    border-radius: 32px;
    padding-left: 38px;
    padding-right: 30px;
    font-size: 12px;
    color: #999;
    &.hasval {
      color: #333;
    }
  }

  .icon-fangdajing {
    width: 32px;
    height:32px;
    text-align: center;
    line-height:30px;
    position: absolute;
    left: 6px;
    top: 50%;
    font-size: 18px;
    margin-top: -15px;
    color: #ccc;
    z-index: 2;
  }
  .module-nav {
    @include fj;
    background-color: #fff;
    padding: 10px 15px 6px;
    > li {
      text-align: center;
      > a {
        display: inline-block;
      }
      i {
        display: inline-block;
        width: px2rem(108px);
        height: px2rem(108px);
        border-radius: 50%;
        line-height: px2rem(108px);
        color: #fff;
        font-size: px2rem(100px);
      }
      span {
        display: block;
        font-size: px2rem(28px);
        line-height: 1.5;
        margin-top: 5px;
      }
      &:nth-child(1) i {
        color: #43c753;
      }
      &:nth-child(2) i {
        color: #2dc4e4;
      }
      &:nth-child(3) i {
        color: #908bff;
      }
      &:nth-child(4) i {
        color: #fe6f4e;
      }
    }
  }
  .mint-navbar {
    @include bb;
    margin-top: 10px;
  }
  .navbar {
    .mint-tab-item-label {
      font-size: 16px;
    }
  }
  .mint-tab-item.is-selected {
    color: $primary;
    border-bottom-color: transparent;
  }
  .goods-list {
    padding-top: 0;
    padding-bottom: 0;
  }
  .page-infinite-loading {
    @include bt;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #fff;
    > span {
      border-radius: 50%;
      display: inline-block;
      width: 24px;
      height: 24px;
      border: 2px solid #999;
      border-left-color: transparent;
      vertical-align: middle;
      margin-top: -2px;
      -webkit-animation: roll 1s linear infinite;
      animation: roll 1s linear infinite;
    }
  }
  .hotbuy-list {
    background-color: #fff;
    > li {
      @include bb;
      padding: px2rem(20px) 15px;
    }
  }
  .hot-buy-item {
    @include fj;
    align-items: center;
    .item-l {
      font-size: 14px;
      line-height: 24px;
      color: #666;
      flex: 1;
      min-width: 10px;
      padding-right: 10px;
      .goods-name {
        color: #333;
        margin-bottom: 6px;
      }
    }
    .item-r {
      font-size: 16px;
      color: $danger;
      line-height: 24px;
      text-align: right;
    }
  }
}
@keyframes roll{
  from{
    transform:rotate(0deg);
  }
  to{
    transform:rotate(360deg);
  }
}
</style>
