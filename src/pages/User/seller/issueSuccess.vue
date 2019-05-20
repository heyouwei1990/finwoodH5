<template>
  <div class="issueSuccess-page" v-title="'发布成功'">
    <div class="page-inner">
      <div class="succ-hd">
        <img src="../../../images/clock.png" alt="">
        <span>提交审核成功</span>
      </div>
      <p class="red">我们会在1个工作日内完成审核</p>
      <div class="mid-left">
        <div class="black-font">审核通过后商品将自动上架</div>
      </div>
    </div>
    <div class="greenBtn" @click="back();">返回我发布的商品</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      back() {
        if(this.$route.query.page){
          this.$router.go(this.$route.query.page);
        }else {
          this.$router.push('/goodsManage');
        }
      }
    }
  }
</script>

<style lang="scss">
  .issueSuccess-page {
    background-color: #fff;
    min-height: 100vh;
    .page-inner {
      padding: px2rem(90px) 15px px2rem(36px);
      text-align: center;
    }

    .succ-hd {
      color: #333;
      font-size: 18px;
      line-height: 28px;
      font-weight: bold;
      margin-bottom: px2rem(20px);
      > img {
        width: px2rem(84px);
        height: px2rem(84px);
        vertical-align: middle;
        margin-right: px2rem(15px);
      }
      > span {
        display: inline-block;
        vertical-align: middle;
      }
    }

    .red {
      font-size: 14px;
      color: $danger;
      line-height: 1.5;
      margin-bottom: 10px;
    }

    .mid-left {
      text-align: left;
      font-size: 14px;
      display: inline-block;
      max-width: 100%;
      line-height: 24px;
    }

    .dark-font {
      color: #666;
    }

    .black-font {
      color: #333;
    }

    .gray {
      color: #999;
    }

    .tel-blue {
      color: #1fa1ff;
    }
  }
</style>
