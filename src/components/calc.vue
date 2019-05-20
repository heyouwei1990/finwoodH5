<template>
  <!-- 材积计算器 -->
  <div class="calc">
    <div @click="open();" @touchmove="preventDefault" class="mark" v-if="isShow"></div>
    <div class="menu">
      <i @click="open();" :class="isShow?'iconfont icon-shanchu rotateR':'iconfont icon-shanchu rotateL'"></i>
      <transition name="fade">
        <ul v-show="isShow">
          <li v-for="(item,index) in list" :key="index" @click="$router.push({path:item.link})">
            <span>{{item.title}}</span>
            <i :class="'iconfont '+item.icon"></i>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow:false
    }
  },
  props: ["list"],
  methods: {
    open() {
      this.isShow = !this.isShow;
    },
    preventDefault(e) {
      e.preventDefault();
    }
  }
}
</script>

<style lang="scss">
  .calc {
    .rotateR {
      transform:rotate(0deg);
      transition: all .5s;
    }
    .rotateL {
      transform:rotate(-45deg);
      transition: all .5s;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
    .mark {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      z-index: 99;
      background: rgba(0,0,0,0.5);
    }
    .menu {
      position: fixed;
      bottom: 70px;
      right:30px;
      z-index: 9999;
      >i {
        display: inline-block;
        width: px2rem(110px);
        height: px2rem(110px);
        line-height: px2rem(110px);
        text-align: center;
        color: #fff;
        font-size: px2rem(42px);
        background: $primary;
        border-radius: 50%;
      }
      ul {
        position: absolute;
        width: 32vw;
        right:px2rem(16px);
        bottom: px2rem(160px);
        li {
          @include fj;
          align-items: center;
          height: px2rem(130px);
          span {
            font-size: px2rem(30px);
            color: #fff;
            white-space: nowrap;
          }
          i {
            display: inline-block;
            width: px2rem(78px);
            height: px2rem(78px);
            line-height: px2rem(78px);
            text-align: center;
            color: #fff;
            font-size: px2rem(36px);
            background: #2dc4e4;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>

