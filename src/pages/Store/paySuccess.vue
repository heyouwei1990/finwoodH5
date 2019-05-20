<template>
	<div class="submit-page" v-title="'支付成功'">
		<i class="iconfont icon-chenggong"></i>
    <h2>支付成功</h2>
    <h3>我们将尽快为您联系商家确认发货</h3>
    <p>订单编号：{{orderNo}}</p>
    <p>支付方式：余额支付</p>
    <p>订单金额：{{goodsAmount}}元</p>
    <div class="greenBtn" @click="isOpen=false;$router.push({path:'/buyerorderdetail',query:{pkid:pkid}})">查看订单详情</div>
	</div>
</template>

<script>
import app from "../../utils/common"
import { mapGetters } from 'vuex'
	export default {
    data () {
      return {
        pkid:Number(this.$route.query.pkid),
        orderNo:'',
        goodsAmount:'',
        isOpen:true
      }
    },
    computed: {
      ...mapGetters([
        'getToken'
      ])
    },
    mounted() {
      this.dataInit();
    },
    beforeDestroy() {
      if(this.isOpen) {
        this.$router.go(-2);
      }
    },
    methods: {
      dataInit() {
        app.post('order/buyerdetail',{
          token:this.getToken,
          pkid:this.pkid
        },r=>{
          this.orderNo = r.result.order.detail.orderNo;
          this.goodsAmount = r.result.order.detail.goodsAmount;
        })
      }
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
