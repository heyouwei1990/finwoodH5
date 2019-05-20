<template>
    <div class="page-enchashment" v-title="$route.query.title">
      <div class="mock"></div>
      <mt-field label="提现账号" readonly v-model="account"></mt-field>
      <mt-field label="可提现金额" readonly v-model="amount">元</mt-field>
      <mt-field label="提现金额" type="number" placeholder="最低提现金额100元起" v-model="enchash">元</mt-field>
      <p class="tip" v-if="getGlobalInfo.cashType==1">友情提示：T+0提现，以银行实际到账时间为准</p>
      <p class="tip" v-if="getGlobalInfo.cashType==2">友情提示：T+1提现，以银行实际到账时间为准</p>
      <div class="greenBtn" @click="submit();">确认申请</div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Toast } from 'mint-ui';
import { mapGetters } from 'vuex'
import app from '../../../utils/common'
  export default {
    data(){
      return{
        account:'**** **** **** **** ***',
        amount:'0',
        enchash:null
      }
    },
    computed: {
			...mapGetters([
        'getToken',
        'getGlobalInfo'
			])
    },
    mounted () {
      this.dataInit();
    },
    methods: {
      dataInit() {
        app.post('member/accountbalance',{
          token:this.getToken
        },(r)=>{
          this.account=r.result.bankAccountNo;
          this.amount=r.result.amount;
        },true,this)
      },
      submit() {
        if(this.enchash>this.amount) {
          Toast({
            message: '输入金额超过可提现余额',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        app.post('member/withdraw',{
          token:this.getToken,
          amount:this.enchash
        },(r)=>{
          Toast({
            message: '提交成功!',
            position: 'bottom',
            duration: 1500
          });
          setTimeout(()=>{
            this.$router.go(-1);
          },1000)
        },true,this)
      }
    }
  }
</script>

<style lang="scss">
  .page-enchashment{
    .tip{
      color: #666;
      font-size:14px;
      line-height:1.5;
      padding:0 15px;
      margin-top:20px;
    }
    .mock {
      width: 100%;
      height: 96px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
    }
  }
</style>
