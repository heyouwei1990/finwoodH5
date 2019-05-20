<template>
  <div class="page-fundManage" v-title="$route.query.title">
    <img src="../../../images/user/enchashment.png" class="enchashment" width="100%" alt="">
    <!-- <span class="deposit-hd">账户余额</span>
    <div class="deposit">￥{{amount}}</div> -->
    <p class="money">
      <span>账户余额:</span>
      ￥{{balance}}
    </p>
    <p class="money">
      <span>可提现金额:</span>
      ￥{{accBalance}}
    </p>
    <p class="money">
      <span>冻结中金额:</span>
      ￥{{frozenBalance}}
    </p>
    <div class="hint" v-if="$route.query.title == '资金账户'">
      <span>友情提示: &nbsp;</span>
      <span>
        如需充值，请登录电脑端www.finwood.cn<br>
        我是买家-账户管理进行充值
      </span>
    </div>
    <div v-if="parseInt(accBalance)>0 && $route.query.title == '提现管理'" class="greenBtn" @click="$router.push({path:'/enchashment',query:{title:'申请提现'}})">申请提现</div>
    <div v-if="parseInt(accBalance)>0 && $route.query.title == '资金账户'" class="greenBtn" @click="$router.push({path:'/enchashment',query:{title:'快速申请贷款'}})">申请提现</div>
    <div v-if="parseInt(accBalance)==0" class="greenBtn disabled" >申请提现</div>
    <div v-if="$route.query.title == '提现管理'" class="look-record" @click="$router.push({path:'/enchashRecord',query:{title:'提现管理'}})">查看提现记录</div>
    <!--<div v-if="$route.query.title == '资金账户'" class="look-record" @click="$router.push({path:'/enchashRecord',query:{title:'资金账户'}})">查看交易记录</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import app from '../../../utils/common'
  export default {
    data () {
      return {
        balance:0,
        accBalance:0,
        frozenBalance:0
      }
    },
    computed: {
			...mapGetters([
				'getToken'
			])
    },
    mounted () {
      this.dataInit();
    },
    methods: {
      dataInit() {
        if(this.$route.query.title == '提现管理') {
          app.post('member/accountbalance',{
            token:this.getToken
          },(r)=>{
            this.balance=r.result.balance;
            this.accBalance=r.result.accBalance;
            this.frozenBalance=r.result.frozenBalance;
          },true,this)
        }else if(this.$route.query.title == '账户管理') {

        }
      }
    }
  }
</script>

<style lang="scss">
  .page-fundManage{
    min-height:100vh;
    overflow: hidden;
    text-align: center;
    .hint {
      font-size: px2rem(26px);
      text-align: left;
      padding: 15px 15px 0 15px;
      @include fj;
      justify-content: flex-start;
      line-height: 1.5;
      color: #666;
    }
    .enchashment {
      display: block;
      width: 100%;
    }
    .money {
      text-align: left;
      background: #fff;
      line-height: px2rem(100px);
      padding: 0 15px;
      border-bottom: 1px solid #eee;
      color: #666;
      span {
        display: inline-block;
        width: 25vw;
        color: #333;
      }
    }
    .deposit-hd{
      font-size:14px;
      color: #333;
      line-height: 24px;
      margin-bottom:6px;
    }
    .deposit{
      font-size:18px;
      color: #666;
    }
    .look-record{
      color: $primary;
      font-size:14px;
      line-height:1;
    }
    .greenBtn.disabled{
      background-color: #ccc;
    }
  }
</style>
