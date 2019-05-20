<template>
    <div class="success-page" v-title="pageTitle">
      <div class="page-inner">
        <div class="succ-hd">
          <img src="../../images/clock.png" alt="">
          <span>提交审核成功</span>
        </div>
        <p class="red">审核结果将通过手机短信的方式告知，敬请留意</p>
        <div class="mid-left">
          <div class="black-font">客服电话：<a class="tel-blue" :href="'tel:'+getGlobalInfo.serviceTel">{{getGlobalInfo.serviceTel}}</a></div>
          <div class="black-font">工作时间：9:00-18:00 <span class="gray">（全年无休）</span></div>
        </div>
      </div>
      <div @click="back()" class="greenBtn">{{getTitle}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
    export default {
      data(){
        return{
          pageTitle:'提交审核成功'
        }
      },
      computed: {
        ...mapGetters([
          'getPage',
          'getTitle',
          'getGlobalInfo'
        ])
      },
      methods: {
        back() {
          this.$router.go(this.getPage);
        }
      }
    }
</script>

<style lang="scss">
  .success-page{
    background-color: #fff;
    min-height:100vh ;
    .page-inner{
      padding:px2rem(60px) 15px px2rem(90px);
      text-align: center;
    }
    .succ-hd{
      color: #333;
      font-size:18px;
      line-height:28px;
      font-weight: bold;
      margin-bottom:px2rem(20px);
      >img{
        width: px2rem(84px);
        height: px2rem(84px);
        vertical-align: middle;
        margin-right:px2rem(15px);
      }
      >span{
        display: inline-block;
        vertical-align: middle;
      }
    }
    .red{
      font-size:14px;
      color: $danger;
      line-height:1.5;
      margin-bottom:10px;
    }
    .mid-left{
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
    }
  }
</style>
