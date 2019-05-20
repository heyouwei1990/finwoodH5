<template>
	<div class="submit-page" v-title="'申请退款成功'">
		<i class="iconfont icon-chenggong"></i>
    <h2>提交申请成功</h2>
    <h3>请耐心等待芬木网处理！</h3>
    <p>客服电话：<a :href="'tel:'+getGlobalInfo.serviceTel">{{getGlobalInfo.serviceTel}}</a></p>
    <p>工作时间：9:00~18:00（全年无休）</p>
    <div class="greenBtn" @click="$router.go(-2)">返回订单详情</div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
	export default {
    computed: {
			...mapGetters([
        'getGlobalInfo'
			])
    }
	}
</script>

<style lang="scss">
  .submit-page {
    text-align: center;
    background: #fff;
    height: 100vh;
    padding-top: px2rem(38px);
    .iconfont {
      color: $primary;
      font-size: px2rem(120px);
    }
    h2 {
      font-size: px2rem(36px);
      padding:px2rem(20px) 0 px2rem(10px) 0;
    }
    h3 {
      font-size: px2rem(30px);
      color: #666;
      padding-bottom: px2rem(46px);
    }
    p {
      color: #999;
      font-size: px2rem(26px);
      line-height: 1.7;
      text-align: left;
      padding-left:px2rem(190px);
      a {
        color: $blue;
      }
    }
  }
</style>
