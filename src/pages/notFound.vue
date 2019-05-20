<template>
  <div class="notfound" v-title="'页面不存在'">
    <div class="error"></div>
    <p>
      页面报错啦! <br />
      您访问的页面已离开地球
    </p>
    <router-link tag="div" class="greenBtn" :to="{path:'/'}">返回首页</router-link>
  </div>
</template>

<style lang="scss">
  .notfound {
    background: #fff;
    height: 100vh;
    padding: px2rem(250px) 0 0 0;
    .error {
      width: px2rem(520px);
      height: px2rem(470px);
      @include bg('../images/error.png');
      display: block;
      margin: 0 auto;
    }
    p{
      padding: px2rem(67px) 0;
      text-align: center;
      font-size: px2rem(34px);
      line-height: 1.5;
    }
  }
</style>
