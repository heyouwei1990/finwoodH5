<template>
	<div class="collect" v-title="'我的收藏'">
    <v-scroll
      style="height:100vh"
      class="wrapper"
      ref="scroll"
      pullUpLoad="true"
      @pullingUp="onPullingUp">
      <ul class="goods-list">
        <router-link tag="li" :to="{path:'/detail',query:{pkid:item.pkid}}" v-for="(item,index) in list" :key="index">
          <dl class="goods-dl">
            <dt><img v-lazy="item.imageUrl" alt=""></dt>
            <dd>
              <p class="desc">{{item.productName}}</p>
              <div class="seller">{{item.companyName}} <i class="iconfont icon-renzheng"></i></div>
              <div class="dd-bottom">
                <span class="price" v-if="item.salesPrice==0">面议</span>
                <span class="price" v-else>￥{{item.salesPrice}}</span>
                <button class="darkBtn" @click.stop="collect(item.pkid);">取消收藏</button>
              </div>
            </dd>
          </dl>
        </router-link>
      </ul>
    </v-scroll>
    <div class="no-data" v-if="list.length==0">
      <div class="empty-img"></div>
      <p>目前没有任何收藏</p>
      <router-link tag="div" class="goto" :to="{path:'/store'}">快去逛逛吧</router-link>
      <!-- <div class="goto">快去逛逛吧</div> -->
    </div>
	</div>
</template>

<script>
  import Scroll from 'vue2-better-scroll'
  import { mapGetters } from 'vuex'
  import app from '../../../utils/common'
  import { Toast } from "mint-ui";
	export default {
    data () {
      return {
        list:[],      //列表数据
        pageIndex:1,  //当前页码
        pageCount:1,  //总页码
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700
      }
    },
    components: {
      "v-scroll": Scroll
    },
    computed: {
			...mapGetters([
				'getToken'
			])
    },
    activated () {
      //解决返回当前页滚动组件失效bug
      this.$refs.scroll.initScroll();
    },
    mounted () {
      this.getData();
    },
    methods: {
      getData() {
        app.post('member/listfavorite',{
          token:this.getToken
        },(r)=>{
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
        },true,this)
      },
      // 上拉加载更多数据
      onPullingUp () {
        this.pageIndex++;
        this.getData();
      },
      //收藏操作
      collect(pkid) {
        app.post('product/collect',{
          token:this.getToken,
          pkid:pkid
        },(r)=> {
          Toast({
            message: '取消收藏成功！',
            position: 'bottom',
            duration: 1500
          });
          this.getData();
        },false,this)
      }
    }
	}
</script>

<style lang="scss">
  @import "src/styles/components/goods";
  .collect {
    .desc{
      display: block;
    }
    .seller img {
      width: px2rem(28px);
      height: px2rem(28px);
      position: relative;
      top: px2rem(4px);
    }
    .goods-dl .darkBtn{
      position: absolute;
      right: 0;
      bottom:0;
      z-index:2;
      font-size:14px;
      padding:0px 10px;
      height:26px;
      width: auto;
      min-width: 84px;
      line-height:24px;
      border-radius: 26px;
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
        background: url("../../../images/noFav.png") no-repeat;
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
