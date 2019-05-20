<template>
  <div class="volume-page" v-title="'材积计算'">
    <ul>
      <router-link tag="li" :to="{path:'/volumeCalc'}" class="item-list">
        <div>
          <h2>原木</h2>
          <span>原木L:2-10m,D:14-220cm;</span>
          <span>小径原木L:2-10m,D:4-13cm</span>
          <span>短原木L:0.5-1.9m,D:8-100cm;</span>
          <span>长原木L:10.1-30m,D:4-250cm</span>
        </div>
        <i class="iconfont icon-jiantouyou"></i>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .volume-page {
    ul {
      margin-bottom:10px;
    }
    .item-list {
      @include fj;
      align-items: center;
      padding: 10px 15px;
      background: #fff;
      i {
        color: #999;
        font-size: 20px;
      }
      h2 {
        font-size: px2rem(34px);
        margin-bottom: 2px;
      }
      span {
        display: inline-block;
        width: 50%;
        float: left;
        font-size: px2rem(20px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 1.5;
      }
    }
  }
</style>


