<template>
  <div class="page-market" v-title="'行情'">
    <div class="fixed-bg"></div>
    <div class="tab-hd-wrapper">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">西非</mt-tab-item>
        <!-- <mt-tab-item id="2">东非</mt-tab-item> -->
        <mt-tab-item id="3">巴新</mt-tab-item>
        <mt-tab-item id="4">所罗门</mt-tab-item>
      </mt-navbar>
    </div>
    <!-- tab-container -->
    <div class="tab-bd">
      <div class="market-table">
        <ul class="ul-th">
          <li>品种</li>
          <li>涨跌</li>
          <li>价格区间</li>
          <li>发布日期</li>
        </ul>
        <ul class="ul-td" v-for="(item,index) in list" :key="index">
          <li>{{item.varietyName}}</li>
          <li>
            <div v-if="item.priceChange>0" class="rise">{{item.priceChange}}</div>
            <div v-if="item.priceChange<0" class="fall">{{-item.priceChange}}</div>
            <div v-if="item.priceChange==0">-</div>
          </li>
          <li>
            <div v-if="item.priceChange>0" class="rise">￥{{item.minimumPrice}}-{{item.maximumPrice}}</div>
            <div v-if="item.priceChange<0" class="fall">￥{{item.minimumPrice}}-{{item.maximumPrice}}</div>
            <div v-if="item.priceChange==0">￥{{item.minimumPrice}}-{{item.maximumPrice}}</div>
          </li>
          <li>{{item.priceReleaseDate}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {Navbar, TabItem } from 'mint-ui';
  import app from '../../utils/common';

  export default {
    components: {
      Navbar: 'mt-tabbar',
      TabItem:'mt-tab-item'
    },
    data() {
      return {
        selected: '1',
        showItem: 'item1',
        market:{},
        list:[{}]
      }
    },
    watch: {
      //tab切换
      selected(val) {
        this.showItem = 'item' + val;
        if(val==1){
          this.list=this.market.WesternAfrica;
        }else if(val==2){
          this.list=this.market.EastenAfrica;
        }else if(val==3){
          this.list=this.market.Png;
        }else if(val==4){
          this.list=this.market.Solomon;
        }
      }
    },
    mounted(){
      this.dataInit();
    },
    methods: {
      //获取数据
      async dataInit(){
        app.post('/data/market',{},(res)=>{
          this.market=res.result;
          this.list=res.result.WesternAfrica;
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "src/styles/components/goods";
  .page-market{
    .fixed-bg{
      position: fixed;
      left:50%;
      top:0;
      width: 100%;
      transform: translateX(-50%);
      height:100%;
      background-color: #fff;
      z-index:0;
    }
    @media screen and (min-width: 500px){
		  .fixed-bg,.tab-hd-wrapper {
		      max-width: $bodyWidth;
		  }
		}
    .tab-hd-wrapper .mint-tab-item-label {
      font-size: 14px;
      line-height: inherit;
    }
    .tab-hd-wrapper {
      @include fj;
      @include bb;
      position: fixed;
      width: 100%;
      transform: translateX(-50%);
      left: 50%;
      top: 0;
      z-index: 3000;
      align-items: center;
      background-color: #fff;
      height: 40px;
    }
    .tab-bd{
      margin-top: 40px;
      position: relative;
      z-index:2;
    }
    .mint-tab-container {
      margin-top: 40px;
      margin-bottom: 63px;
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
      padding:0;
      line-height:40px;
    }

    .mint-tab-item.is-selected {
      border-bottom-color: $primary;
      color: $primary;
    }

    .mint-tab-item:last-child {
      margin-right: 0;
    }
    .market-table{
      width: 100%;
      background-color: #fff;
      text-align: center;
      font-size:14px;
      border-collapse: collapse;
      color: #333;
      ul{
        display: flex;
        width: 100%;
        overflow: hidden;
      }
      .ul-th>li{
        float: left;
        text-align: center;
        line-height:px2rem(74px);
        border-bottom:1px solid $light;
      }
      .ul-td>li{
        float: left;
        line-height:px2rem(66px);
        border-bottom:1px solid $light;
        overflow: hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
      }
      .ul-th>li:first-child,
      .ul-td>li:first-child{
        text-align: left;
        width: 20%;
        padding-left:15px;
        flex: 1;
      }
      .ul-th>li:nth-child(2),
      .ul-td>li:nth-child(2){
        width: 20%;
      }
      .ul-th>li:nth-child(3),
      .ul-td>li:nth-child(3){
        width: 31%;
      }
      .ul-th>li:nth-child(4),
      .ul-td>li:nth-child(4){
        width: 98px;
        padding-right:15px;
      }
      .ul-td>li:last-child{
        color: #999;
      }
      .ul-td>li:nth-child(3)>div{
        width: 100%;
        overflow: hidden;
        white-space:nowrap;
        text-overflow: ellipsis;
      }
      .ul-td>li:nth-child(2)>.rise{
        position: relative;
        &:before{
          content: '';
          border: 5px solid transparent;
          border-bottom:7px solid $danger;
          display: inline-block;
          vertical-align: baseline;
          margin-right:3px;
          margin-bottom:1px;
        }
      }
      .ul-td>li:nth-child(2)>.fall{
        position: relative;
        &:before{
          content: '';
          border: 5px solid transparent;
          border-top:7px solid $primary;
          display: inline-block;
          vertical-align: middle;
          margin-right:3px;
          margin-top:4px;
        }
      }
      .rise{
        color: $danger;
      }
      .fall{
        color: $primary;
      }
    }
  }


</style>
