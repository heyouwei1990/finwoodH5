<template>
  <div class="page-openAccount" v-title="'申请开户'">
    <div class="open-enter" @click="$router.push({path:'/corporateAccount'})">
      <i class="iconfont icon-qiyeyonghukaihu"></i>
      <span>企业用户开户</span>
    </div>
    <div class="open-enter" @click="$router.push({path:'/personalAccount'})">
      <i class="iconfont icon-getiyonghukaihu"></i>
      <span>个人用户开户</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="scss">
 	@media only screen and (min-width:500px){
    .page-openAccount{
        max-width: $bodyWidth;
    }
	}
  .page-openAccount{
    position: fixed;
    width: 100%;
    height:100%;
	  transform: translateX(-50%);
    left:50%;
    top:0;
    .open-enter{
      position: absolute;
      left:50%;
      top:50%;
      width: px2rem(630px);
      height:px2rem(240px);
      background-color: #fff;
      text-align: center;
      border-radius: 4px;
      margin-left:px2rem(-315px);
      &:first-child{
        transform: translateY(-100%);
        margin-bottom:px2rem(15px);
      }
      &:last-child{
        margin-top:px2rem(15px);
      }
      .iconfont{
        display: block;
        margin: px2rem(60px) auto px2rem(22px);
        font-size:px2rem(72px);
        color: #999;
      }
      span{
        color: #333;
        font-size:14px;
        line-height:24px;
      }
    }
  }
</style>
