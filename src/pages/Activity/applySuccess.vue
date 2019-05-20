<template>
  <div class="success-page" v-title="pageTitle">
    <div class="page-inner">
      <div class="succ-hd">
        <img src="../../images/clock.png" alt="">
        <span>提交成功！</span>
      </div>
      <p class="red">感谢您的支持，芬木顾问会在24小时内联系您。</p>
      <router-link tag="div" class="back" :to="{path:'/'}">返回首页</router-link>
      <!--<div class="mid-left">
        <div class="black-font">客服电话：<a class="tel-blue" :href="'tel:'+getGlobalInfo.serviceTel">{{getGlobalInfo.serviceTel}}</a></div>
        <div class="black-font">工作时间：9:00-18:00 <span class="gray">（全年无休）</span></div>
      </div>-->
    </div>
    <!--<div @click="back()" class="greenBtn">{{getTitle}}</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return{
        pageTitle:'申请成功'
      }
    },
//    computed: {
//      ...mapGetters([
//        'getPage',
//        'getTitle',
//        'getGlobalInfo'
//      ])
//    },
//    methods: {
//      back() {
//        this.$router.go(this.getPage);
//      }
//    }
  }
</script>

<style lang="scss">
  .success-page{
    background-color: #fff;
    min-height:100vh ;
    .page-inner{
      padding:px2rem(120px) 15px px2rem(90px);
      text-align: center;
    }
    .succ-hd{
      margin-bottom:px2rem(20px);
      >img{
        width: px2rem(120px);
        height: px2rem(120px);
        vertical-align: middle;
        margin-right:px2rem(15px);
      }
      >span{
        display: block;
        color: #333;
        font-size:18px;
        line-height:28px;
        margin-top:10px;
        font-weight: bold;
      }
    }
    .red{
      font-size:14px;
      color: $danger;
      line-height:1.5;
      margin-top:10px;
      margin-bottom:10px;
    }
    .back{
      font-size:16px;
      color: $primary;
      line-height:1.5;
      margin-top:10px;
    }
    /*.mid-left{
      text-align: left;
      font-size:14px;
      display: inline-block;
      max-width: 100%;
      line-height:24px;
    }
    .dark-font{
      color: #666;
    }
    .black-font{
      color: #333;
    }
    .gray{
      color: #999;
    }
    .tel-blue{
      color: #1fa1ff;
    }*/
  }
</style>
