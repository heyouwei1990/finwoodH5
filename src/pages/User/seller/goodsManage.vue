<template>
	<div class="goodsManage" v-title="'商品管理'">
    <v-scroll
      class="wrapper"
      ref="scroll"
      pullUpLoad="true"
      @pullingUp="pullUpAction">
      <ul class="goods-list">
        <li v-for="(item,index) in list" :key="index">
          <dl class="goods-dl" @click="$router.push({path:'/detail',query:{pkid:item.pkid,edit:1}});">
            <dt><img v-lazy="item.imageUrl" alt=""></dt>
            <dd>
              <p class="desc">{{ item.productName }}<i class="iconfont icon-shuoming"></i></p>
              <div class="dd-bottom">
                <span class="price" v-if="item.salesPrice==0">面议</span>
                <span class="price" v-if="item.salesPrice!=0 && item.salesPrice!=item.salesPriceUpper">￥{{item.salesPrice}}~{{item.salesPriceUpper}}</span>
                <span class="price" v-if="item.salesPrice!=0 && item.salesPrice==item.salesPriceUpper">￥{{item.salesPrice}}</span>
                <div class="order-status">{{ item.saleStatusText }}</div>
              </div>
            </dd>
          </dl>
          <div class="btn-group" v-if="item.saleStatus!=2">
            <span @click.stop="delet(item.pkid,index);">删除</span>
            <span @click.stop="out(item.pkid,index);" v-if="item.saleStatus==3">下架</span>
            <span @click.stop="pullOn(item.pkid);" v-if="item.saleStatus==1">上架</span>
            <span @click.stop="$router.push({path:'/commodity',query:{pkid:item.pkid,status:item.saleStatus}});">编辑</span>
          </div>
        </li>
      </ul>
    </v-scroll>
    <div class="no-data" v-if="list.length==0">
      <div class="empty-img"></div>
      <p>暂时没有商品</p>
      <div class="goto">快去发布商品啦</div>
    </div>
    <div class="greenBtn" @click="$router.push({path:'/commodity'})">+&nbsp;&nbsp;添加新商品</div>
	</div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui";
import app from "@/utils/common";
import VScroll from "vue2-better-scroll"
import { mapGetters } from "vuex";
export default {
  components:{
    VScroll
  },
  data() {
    return {
      list: [], //商品列表
      pageIndex:1,  //当前页码
      pageCount:1,  //总页码
    };
  },
  computed: {
    ...mapGetters(["getToken"])
  },
  mounted() {
    this.getData();
  },
  activated(){
    this.$refs.scroll.initScroll()
  },
  methods: {
    //获取数据
    async getData(){
      app.post('shop/myshopproducts',{
        token: this.getToken,
        pageIndex:this.pageIndex,
        pageSize:10,
        categoryId:-1,
        varietyId:-1
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
      },true,this);
    },
    //上拉加载
    pullUpAction(){
      this.pageIndex++;
      this.getData();
    },
    //删除
    delet(pkid,index) {
      MessageBox.confirm("您是否确认删除该商品？", "芬木提示")
        .then(action => {
          app.post('product/delete',{
            token:this.getToken,
            productIds:[pkid]
          },(res)=>{
            Toast({
              message:'删除成功',
              position: 'bottom',
              during:1500
            });
            this.list.splice(index,1)
            //this.getData();
          },false,this)
        })
        .catch(action => {});
    },
    //下架
    out(pkid,index) {
      MessageBox.confirm("您是否确认下架该商品？", "芬木提示")
        .then(action => {
          app.post('product/pulloff',{
            token:this.getToken,
            productIds:[pkid]
          },(res)=>{
            Toast({
              message:'商品已下架',
              position: 'bottom',
              during:1500
            });
            this.list[index].saleStatus=1;
            this.list[index].saleStatusText='已下架';
            //this.getData();
          },false,this)
        })
        .catch(action => {});
    },
    //上架
    pullOn(pkid){
      app.post('product/pullon',{
        token:this.getToken,
        productIds:[pkid]
      },(res)=>{
        this.$router.push({path:'/issuesuccess',query:{page:'-1'}});
      },false,this)
    }
  }
};
</script>

<style lang="scss">
@import "src/styles/components/goods.scss";
 	@media only screen and (min-width:500px){
	    .goodsManage{
        max-width: $bodyWidth;
        .greenBtn{
        	max-width: $bodyWidth;
        }
	    }
	}
.goodsManage {
  padding-bottom:50px;
  height:100%;
  width: 100%;
  transform: translateX(-50%);
  position: fixed;
  left:50%;
  top:0;
  .wrapper{
    height: 100%;
  }
  .goods-list {
    background-color: transparent;
    padding:0;
  }
  .goods-list > li {
    //@include bb;
    padding:0 15px;
    margin-bottom:15px;
    background-color: #fff;
    &:last-child{
      margin-bottom:0;
    }
  }
  .goods-dl>dd{
    padding-bottom:24px;
  }
  .order-status {
    color: $secondary;
    font-size: 14px;
    line-height: 1.5;
  }
  .red {
    color: $danger;
  }
  .btn-group {
    @include fj(flex-end);
    white-space: nowrap;
    position: relative;
    padding:10px 0;
    margin-top: 4px;
    &:before{
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background-color: #eee;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    span {
      display: block;
      min-width: 48px;
      padding-left: 10px;
      padding-right: 10px;
      text-align: center;
      font-size: 14px;
      height: 22px;
      line-height: 22px;
      color: $primary;
      background-color: #fff;
      position: relative;
      margin-left: px2rem(12px);
      &:before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0) scale(0.5);
        transform: translate3d(-50%, -50%, 0) scale(0.5);
        width: 200%;
        height: 200%;
        border: 1px solid $primary;
        -webkit-border-radius: 22px;
        border-radius: 22px;
      }
    }
  }
  @media only screen and (max-width:374px ) {
    .btn-group>span{
      font-size: 12px;
      padding-left: 6px;
      padding-right: 6px;
      min-width: 44px;
      margin-left:3px;
    }
  }
  .greenBtn{
    margin: 0;
    width: 100%;
	  transform: translateX(-50%);
    position: fixed;
    left:50%;
    bottom:0px;
    z-index:10;
    width: 100%;
    height:50px;
    line-height: 50px;
    font-size:16px;
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
      margin: 0 auto;
      background: url("../../../images/noStore.png") no-repeat;
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
