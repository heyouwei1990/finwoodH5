<template>
  <div>
    <div class="fixed-right">
      <div @click="pullLeft()" :class="['btn-nav',{open:quickNav==true}]">
        <i class="iconfont icon-jiantouyou"></i>
        <span v-if="!quickNav">快速<br>导航</span>
        <span v-else>收起</span>
      </div>
    </div>
    <div @click="pullLeft()" :class="['quick-nav-wrap',{pullLeft:quickNav==true}]">
      <div class="mask"></div>
      <div class="dialog-inner">
        <ul class="quick-nav-list">
          <router-link tag="li" :to="{path:'/'}">
            <i class="iconfont icon-shouye"></i>
            <span>首页</span>
          </router-link>
          <router-link tag="li" :to="{path:'/cart'}">
            <i class="iconfont icon-gouwuche"></i>
            <span>购物车</span>
          </router-link>
          <router-link tag="li" :to="{path:'/user'}">
            <i class="iconfont icon-wode"></i>
            <span>我的</span>
          </router-link>
          <router-link tag="li" :to="{path:'/buyerOrder'}">
            <i class="iconfont icon-dingdan"></i>
            <span>我的订单</span>
          </router-link>
          <router-link tag="li" :to="{path:'/collect'}">
            <i class="iconfont icon-shoucang"></i>
            <span>我的收藏</span>
          </router-link>
          <router-link tag="li" :to="{path:'/address'}">
            <i class="iconfont icon-dizhi1"></i>
            <span>收货地址</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        quickNav:false, //快速导航弹框
    }
  },
  methods: {
    //快速导航弹框
    pullLeft() {
        this.quickNav = !this.quickNav;
    }
  }
}
</script>

<style scoped lang="scss">
  .fixed-right{
    position: fixed;
    right: 0;
    bottom:70px;
    z-index:2000;
    .btn-nav{
      display: flex;
      align-items: center;
      width: 54px;
      height:38px;
      line-height:38px;
      color: #fff;
      font-size:12px;
      background-color: rgba(0,0,0,.8);
      padding-left:4px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      transition: all 0.3s linear;
    }
    .btn-nav>span{
      line-height:14px;
    }
    .icon-jiantouyou{
      transform: rotate(180deg);
      margin-right:4px;
      font-size:12px;
    }
    .btn-nav.open{
      transform: translateX(-228px);
    }
    .btn-nav.open .icon-jiantouyou{
      transform: rotate(0deg);
    }
  }
  .quick-nav-wrap{
    width: 100%;
    position: fixed;
    left:0;
    bottom:0;
    z-index:999;
    .mask{
      position: absolute;
      left:0;
      bottom:0;
      width: 100vw;
      height:100vh;
      background-color: rgba(0,0,0,.5);
      display: none;
    }
    .dialog-inner{
      position: absolute;
      left:100%;
      bottom:25px;
      z-index:1000;
      transition: all 0.3s linear;
    }
    &.pullLeft{
      .mask{
        display: block;
      }
      left:0;
      .dialog-inner{
        transform: translateX(-100%);
      }
    }
  }
  .quick-nav-list{
    width: 228px;
    height:128px;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    padding:px2rem(30px) 0;
    >li{
      width: 33.33%;
      float: left;
      margin-bottom:10px;
      text-align: center;
      .iconfont{
        font-size:22px;
      }
      >span{
        display: block;
        margin-top:3px;
        font-size:10px;
        white-space:nowrap;
        line-height:14px;
      }
    }
  }
</style>


