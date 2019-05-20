<template>
  <div class="page-shareholdersInfo" v-title="'添加股东信息'">
    <ul class="info-list">
      <li @click="$router.push({path:'/editShareholder'})">
        <div class="info-dl">
          <div class="top">
            <span>张大三</span>
            <em>个人股东</em>
          </div>
          <p>123456789012345</p>
        </div>
        <i class="iconfont icon-jiantouyou"></i>
      </li>
      <li>
        <div class="info-dl">
          <div class="top">
            <span>张大三</span>
            <em>机构股东</em>
          </div>
          <p>123456789012345</p>
        </div>
        <i class="iconfont icon-jiantouyou"></i>
      </li>
    </ul>
    <!--没有股东信息时-->
    <!--<div class="no-data">
      <img src="../../../images/noShareholder.png" alt="">
      <p>请添加完善股东信息</p>
    </div>-->
    <div class="greenBtn" @click="$router.push({path:'/addShareholder'})">添加新股东</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>

<style lang="scss">
  .page-shareholdersInfo{
    margin-bottom:50px;
    .info-list{
      width: 100%;
      overflow: hidden;
      >li{
        @include fj;
        margin-bottom:10px;
        background-color: #fff;
        padding:12px 15px;
        .icon-jiantouyou{
          line-height:24px;
          color: #999;
          font-size:14px;
        }
      }
      .info-dl{
        flex: 1;
        color: #666;
        line-height:24px;
        margin-right:12px;
        font-size:14px;
        overflow: hidden;
        .top{
          @include fj;
          align-items: center;
          span{
            font-size:15px;
          }
        }
      }
    }
	 	@media only screen and (min-width:500px){
		    .greenBtn{
		        max-width: $bodyWidth;
		    }
		}
    .greenBtn{
      margin:0;
      border-radius: 0;
      position: fixed;
      left:50%;
      bottom:0;
      z-index:10;
      width: 100%;
      transform: translateX(-50%);
    }
    .no-data{
      position: absolute;
      left:50%;
      top:0;
      width: 100%;
      height:100%;
      transform: translateX(-50%);
      z-index:2;
      text-align: center;
      overflow: hidden;
      padding:15px;
      background-color: #f5f5f5;
      img{
        width: px2rem(233px);
        height:px2rem(233px);
        margin-top:px2rem(96px);
      }
      p{
        font-size:16px;
        color: #666;
        line-height:1.5;
        margin-top:15px;
      }
    }
  }

</style>
