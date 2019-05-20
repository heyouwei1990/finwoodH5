<template>
    <div>
      <ul class="input-list">
        <li>
          <label>退款原因</label>
          <span class="val-txt">诸葛亮</span>
        </li>
        <li>
          <label>退款金额</label>
          <span class="val-txt">￥23000.00</span>
        </li>
        <li>
          <label>退款说明</label>
          <span class="desc">求求你退款吧</span>
        </li>
      </ul>
      <div class="fixed-bottom">
        <div class="btn-refuse">拒绝退款</div>
        <div class="btn-agree">同意退款</div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style scoped lang="scss">
  @import "src/styles/components/inputList.scss";
 	@media only screen and (min-width:500px){
    .fixed-bottom{
        max-width: $bodyWidth;
    }
	}
  .fixed-bottom{
    @include fj();
    @include cl;
    @include bt;
    padding-left:15px;
    padding-right:15px;
    position: fixed;
	  transform: translateX(-50%);
	  left:50%;
    bottom:0;
    height:px2rem(98px);
    background-color: #fff;
    width: 100%;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content:space-around;
    justify-content:space-around;
    >[class^="btn-"]{
      width: px2rem(260px);
      text-align: center;
      height:px2rem(60px);
      line-height:px2rem(60px);
      position: relative;
      font-size:14px;
      border-radius: px2rem(60px);
    }
    .btn-refuse{
      background-color: #fff;
      color: $primary;
      &:before{
        content: '';
        position: absolute;
        left:50%;
        top:50%;
        z-index:2;
        width: 200%;
        height:200%;
        -webkit-transform: translate3d(-50%,-50%,0) scale(0.5);
        transform: translate3d(-50%,-50%,0) scale(0.5);
        border: 1px solid $primary;
        border-radius: px2rem(60px);
      }
    }
    .btn-agree{
      background-color: $primary;
      color: #fff;
    }
  }
</style>
