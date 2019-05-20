<template>
  <div class="store" v-title="'现货商城'">
      <div class="searchbox">
        <div :class="['input-div',{hasval:false}]">
          <router-link class="input-div-inner" :to="{path:'/search'}">
            <i class="iconfont icon-fangdajing"></i>
            <span class="span-val">{{getSearch}}</span>
          </router-link>
          <i class="iconfont icon-shanchu right" @click="clear()" v-if="getSearch!='请输入品牌/品种/商家'"></i>
        </div>
      </div>
      <div class="tab-hd-wrapper">
        <mt-navbar v-model="selected">
          <mt-tab-item id="-1">全部</mt-tab-item>
          <mt-tab-item :id="item.value" v-for="(item,index) in selectItm" :key="index">{{item.text}}</mt-tab-item>
        </mt-navbar>
        <div @click="popUpTop()" :class="['sort-style',{active:this.popupVisible}]">{{category}}</div>
      </div>
      <div class="container">
        <v-scroll
          style="height:calc(100vh - 132px)"
          class="wrapper"
          ref="scroll"
          pullUpLoad="true"
          @pullingUp="onPullingUp">
          <ul class="goods-list">
            <router-link tag="li" :to="{path:'/detail',query:{pkid:item.pkid}}" v-for="(item,index) in items" :key="index">
              <dl class="goods-dl">
                <dt><img v-lazy="item.imageUrl" alt=""></dt>
                <dd>
                  <p class="desc">{{item.productName}}</p>
                  <div class="seller">{{item.shopName}} <i class="iconfont icon-renzheng"></i></div>
                  <div class="dd-bottom">
                    <span class="price" v-if="item.salesPrice==0">面议</span>
                    <span class="price" v-if="item.salesPrice!=0 && item.salesPrice!=item.salesPriceUpper">￥{{item.salesPrice}}~{{item.salesPriceUpper}}</span>
                    <span class="price" v-if="item.salesPrice!=0 && item.salesPrice==item.salesPriceUpper">￥{{item.salesPrice}}</span>
                    <time class="online-time">{{item.lastModifiedTime}}</time>
                  </div>
                </dd>
              </dl>
            </router-link>
          </ul>
        </v-scroll>
        <div class="no-data" v-if="items.length==0">
          <div class="empty-img"></div>
          <p>该条目下没有任何信息</p>
          <div class="goto">快去发布商品啦</div>
        </div>
      </div>
      <mt-popup v-model="popupVisible" position="top">
        <ul class="sort-list">
          <li @click="pickSortStyle(item);" v-for="item in categoryList" :key="item" :class="item==category?'active':null">
            {{ item }}
          </li>
        </ul>
      </mt-popup>
  </div>
</template>

<script>
import Scroll from 'vue2-better-scroll'
import app from "../../utils/common"
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    "v-scroll": Scroll
  },
  data() {
    return {
      selected: app.getStore('storeSelected')==null?'-1':app.getStore('storeSelected'),
      popupVisible: false,
      items: [], //商品列表
      categoryList:['最新发布','价格最高','价格最低'],  //排序列表
      category:'排序',    //当前选中排序参数
      pageIndex:1,  //当前页码
      pageCount:1,  //总页码
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700
    };
  },
  activated () {
    //解决返回当前页滚动组件失效bug
    this.$refs.scroll.initScroll();
  },
  watch: {
    //tab切换
    selected(val) {
      app.setStore('storeSelected',val);
      this.pageIndex=1;
      this.getData();
      this.scrollTo();
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters([
      'getSearch',
      'getGlobalInfo'
    ]),
    selectItm:function() {
      return this.getGlobalInfo.originZoneId.slice(0,4);
    },
    key:function() {
      return this.getSearch=='请输入品牌/品种/商家'?null:this.getSearch;
    },
    itemType:function() {
      switch(this.category){
        case '最新发布':
          return {asc:0,orderType:3};
        case '价格最高':
          return {asc:0,orderType:2};
        case '价格最低':
          return {asc:1,orderType:2};
        default:
          return {asc:0,orderType:1};
      }
    }
  },
  methods: {
    ...mapActions([
      'setSearch'
    ]),
    // 滚动到页面顶部
    scrollTo () {
      this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
    },
    //获取数据
    async getData() {
      app.post('product/list',{
        key:this.key,
        asc:this.itemType.asc,
        orderType:this.itemType.orderType,
        pageIndex:this.pageIndex,
        originZoneId:Number(this.selected),
      },(r)=>{
        for(let i=0;i<r.result.list.length;i++) {
          r.result.list[i].lastModifiedTime=r.result.list[i].lastModifiedTime.substring(0,10);
        }
        if(this.pageIndex>1) {
          this.items=this.items.concat(...r.result.list);
        }else {
          this.items=r.result.list;
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
      });
    },
    // 上拉加载更多数据
    onPullingUp () {
      this.pageIndex++;
      this.getData();
    },
    //清除搜索
    clear() {
      this.pageIndex=1;
      this.setSearch('');
      this.getData();
    },
    popUpTop() {
      //打开、关闭筛选列表
      this.popupVisible = !this.popupVisible;
      //发送请求，刷新列表
    },
    async pickSortStyle(value) {
      this.popupVisible = !this.popupVisible;
      this.category=value;
      this.getData();
    },
  }
};
</script>
<style lang="scss">
@import "src/styles/components/goods";
 	@media only screen and (min-width:500px){
 		.store{
 			.searchbox,.tab-hd-wrapper{
	      max-width: $bodyWidth;
	    }
 		}

	}
.store {
  .container {
    position: relative;
    top:84px;
  }
  .tab-hd-wrapper {
    .mint-tab-item-label{
      font-size: 14px;
      line-height: inherit;
    }
    .mint-tab-item{
      padding:0;
      line-height:40px;
    }
  }
  .mint-popup-top {
    width: 100%;
    top: 84px;
    .v-modal {
      z-index: 99;
    }
  }

  .searchbox {
    @include bb;
    position: fixed;
    left: 50%;
	  transform: translateX(-50%);
    top: 0;
    z-index: 3000;
    width: 100%;
    height:44px;
    background-color: #f5f5f5;
    padding: 6px 10px;
    .width {
      display: inline-block;
      width:90%;
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
    padding-left: 38px;
    padding-right: 30px;
    font-size: 12px;
    color: #999;
    border-radius: 32px;
    &.hasval {
      color: #333;
    }
    .input-div-inner{
      display: block;
      width: 100%;
      height:100%;
    }
    .span-val{
      display: inline-block;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .icon-shanchu{
    width: 30px;
    height:30px;
    text-align: center;
    line-height:30px;
    font-size:14px;
    position: absolute;
    right:0;
    top:50%;
    transform: translateY(-50%);
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

  .tab-hd-wrapper {
    @include fj;
    @include bb;
    position: fixed;
    width: 100%;
    left: 50%;
    top: 44px;
    z-index: 3000;
    transform: translateX(-50%);
    align-items: center;
    background-color: #fff;
    height: 40px;
  }

  .mint-tab-container {
    margin-top: 84px;
    margin-bottom: 48px;
  }

  .mint-navbar {
    padding-left: 15px;
    padding-right: 5%;
    -webkit-box-flex: 1;
    flex: 1;
    position: relative;
    justify-content: space-between;
  }

  .mint-navbar .mint-tab-item {
    flex: none;
    -webkit-box-flex: none;
    margin-bottom: 0;
    border-bottom-width: 2px;
    height: 40px;
  }

  .mint-tab-item.is-selected {
    border-bottom-color: $primary;
    color: $primary;
  }

  .mint-tab-item:last-child {
    margin-right: 0;
  }

  .sort-style {
    margin-left: 10px;
    font-size: 14px;
    margin-right: 15px;
    padding-right: 15px;
    position: relative;
    height: px2rem(80px);
    line-height: px2rem(80px);
  }

  .sort-style.active {
    color: $primary;
  }

  .sort-style:after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top: 7px solid #666;
    margin-top: -2px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .sort-style.active:after {
    border-top-color: $primary;
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
    -webkit-transform-origin: 5px 5px;
    transform-origin: 5px 5px;
  }

  .sort-list {
    width: 100%;
  }

  .sort-list > li {
    width: 100%;
    height: px2rem(65px);
    line-height: px2rem(64px);
    padding-left: 15px;
    padding-right: 15px;
    font-size: 14px;
    color: #333;
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
      background: url("../../images/noStore.png") no-repeat;
      background-size: cover;
    }
    >p{
      font-size:16px;
      color: #666;
      line-height:1.5;
      margin-bottom:10px;
      margin-top:22px;
    }
    .goto{
      font-size:14px;
      color: $primary;
      line-height:1.5;
    }
  }
}
</style>
