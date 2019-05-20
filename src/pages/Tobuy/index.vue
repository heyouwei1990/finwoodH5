<template>
    <div class="page-hotbuy" v-title="'热门求购'">
      <div class="searchbox">
        <div class="searchbox-inner">
          <i class="iconfont icon-fangdajing"></i>
          <input class="box" type="text" v-model="query" placeholder="请输入品种/交货地">
          <i @click="clear()" v-if="query && query!=''" class="iconfont icon-shanchu"></i>
        </div>
        <span class="btn-search" @click="dataInit()">搜索</span>
      </div>
      <!--<mt-search-->
        <!--v-model="query"-->
        <!--cancel-text="取消"-->
        <!--placeholder="请输入品种/交货地">-->
      <!--</mt-search>-->
      <div class="scroll-wrapper">
        <v-scroll
          class="wrapper"
          ref="scroll"
          pullUpLoad="true"
          @pullingUp="onPullingUp">
          <ul class="hotbuy-list">
            <router-link tag="li" :to="{path:'/publishdetail',query:{pkid:item.pkid,status:item.status,unitName:item.unitName}}" v-for="item in list" :key="item.id">
              <div class="fl">
                <div class="balck-font">{{ item.varietyName }}</div>
                <div class="dark-font">交货地：{{item.deliveryAddress}}</div>
                <div class="dark-font">发布时间：{{item.lastModifiedTime}}</div>
                <div class="dark-font">求购数量：{{item.quantity}}{{item.unitName}}</div>
                <!--<div class="dark-font">产品用途：XXXXXXXXXXXXXXXXXXXXX</div>-->
              </div>
              <div class="fr">
                <div :class="['status',{finish:item.status==2}]">{{item.statusName}}</div>
                <div v-if="item.purchasePrice!=0" class="price">{{item.purchasePrice}}元</div>
                <div v-if="item.purchasePrice==0" class="price">面议</div>
              </div>
            </router-link>
          </ul>
        </v-scroll>
        <div class="no-data" v-if="list.length==0">
          <div class="empty-img"></div>
          <div v-if="!queryTxt">
            <p>当前没有任何求购</p>
            <div class="goto">快去发布求购啦</div>
          </div>
          <div v-else="queryTxt && queryTxt!=''">
            <p>当前没有您搜索的求购</p>
            <div class="goto" @click="clear();dataInit()">快去查看其它求购</div>
          </div>
        </div>
      </div>
      <router-link tag="div" class="greenBtn fixed-bottom" :to="{path:'/publish'}">发布新的求购</router-link>
    </div>
</template>

<script type="text/ecmascript-6">
  import Searchbox from '@/components/searchbox';
  import app from "../../utils/common"
  import VScroll from 'vue2-better-scroll'
  export default {
    components:{
      Searchbox,
      VScroll
    },
    data(){
      return{
        query:null,
        list: [], //  求购列表
        pageIndex:1,  //当前页码
        pageCount:1,  //总页码
        pageSize:10, //每页显示10条
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
        queryTxt:null //前一次搜索的值
      }
    },
    activated () {
      //解决返回当前页滚动组件失效bug
      this.$refs.scroll.initScroll();
    },
    mounted(){
      this.dataInit();
    },
    methods:{
      //获取数据
      async dataInit(){
        app.post('data/searchinquiry',{
          searchKey:this.query,
          pageIndex:this.pageIndex,
          pageSize:this.pageSize
        },(res)=>{
          if(res.result.list){
            for(let i=0;i<res.result.list.length;i++) {
              res.result.list[i].lastModifiedTime=res.result.list[i].lastModifiedTime.substring(0,10);
            }
          }
          if(this.pageIndex>1) {
            this.list=this.list.concat(...res.result.list);
          }else {
            if(res.result.list){
              this.list=res.result.list;
            }else{
              this.list=[];
            }
          }
          this.queryTxt=this.query;
          this.pageIndex=res.result.paging.pageIndex;
          this.pageCount=res.result.paging.pageCount;
          if(this.pageIndex<this.pageCount) {
            this.$refs.scroll.forceUpdate(true)
          }else {
            this.$refs.scroll.forceUpdate(false)
          }
        },true)
      },
      // 滚动到页面顶部
      scrollTo () {
        this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
      },
      // 上拉加载更多数据
      onPullingUp () {
        this.pageIndex++;
        this.dataInit();
      },
      //清除搜索
      clear() {
        this.pageIndex=1;
        this.query=null;
      },
    }
  }
</script>

<style lang="scss">
 	@media only screen and (min-width:500px){
    .page-hotbuy{
        max-width: $bodyWidth;
        .scroll-wrapper, .fixed-bottom{
        	max-width: $bodyWidth;
        }
    }
    .searchbox {
      max-width: $bodyWidth;
    }
	}
  .page-hotbuy{
    background-color: #fff;
    .searchbox {
      @include fj;
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      z-index: 100;
      width: 100%;
      height:44px;
      background-color: #fff;
      padding: 6px 10px;
      -webkit-align-items: center;
      align-items: center;
    }

    .searchbox:after {
      content: '';
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

    .searchbox-inner {
      position: relative;
      -webkit-flex: 1;
      -webkit-box-flex: 1;
      flex: 1;
      height: 100%;
      min-width: 100px;
      input {
        display: block;
        width: 100%;
        background-color: #f5f5f5;
        border-radius: 2px;
        border: 1px solid $light;
        border-radius: 32px;
        height: 32px;
        line-height: 22px;
        padding:5px 30px 5px 38px;
        font-size: 12px;
        color: #333;
      }
      input:focus{
        background-color: #fff;
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

    .icon-shanchu {
      width: 30px;
      height:30px;
      line-height:30px;
      text-align: center;
      position: absolute;
      right: 0px;
      top: 50%;
      font-size: 14px;
      margin-top:-15px;
      color: #999;
      z-index: 2;
    }

    .btn-search {
      height:32px;
      line-height:32px;
      padding-left: 14px;
      padding-right:5px;
      font-size: 14px;
      color: #333;
    }
    .scroll-wrapper{
      height:100vh;
      width: 100%;
      position: fixed;
      left:50%;
      top:0;
      transform: translateX(-50%);
      padding-top:44px;
      padding-bottom:px2rem(88px);
      .wrapper{
        height:100%;
      }
    }
    .hotbuy-list>li{
      @include fj;
      @include bb;
      -webkit-align-items: center;
      align-items: center;
      padding:px2rem(15px) 15px;
      font-size:14px;
      line-height:24px;
      background-color: #fff;
      .fr{
        text-align: right;
        white-space:nowrap;
        margin-left:10px;
      }
    }
    .black-font{
      color: #333;
    }
    .dark-font{
      color: #666;
    }
    .price{
      color: $danger;
    }
    .status{
      color: $primary;
    }
    .finish.status{
      color: $secondary;
    }
    .greenBtn.fixed-bottom{
      position: fixed;
      left:50%;
      bottom:0;
      z-index:10;
      width: 100%;
      transform: translateX(-50%);
      height:44px;
      line-height:44px;
      font-size:16px;
      margin: 0;
      border-radius: 0;
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
        margin: 0 auto 10px;
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
