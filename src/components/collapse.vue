<template>
    <div class="collapse-components">
      <div :class="['collapse-dl', {active:isDrop}]">
        <div class="collapse-dt" @click="toggle">
          <div class="collapse-title">
            <i class="mark"></i>
            {{title}}
          </div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
        <transition
          name="slider">
          <div v-show="isDrop" ref="inner" class="collapse-content" >
            <slot></slot>
          </div>
        </transition>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        isDrop:this.drop,
        height:0
      }
    },
    props:{
      title:{
        type:String,
        default:''
      },
      drop:{
        type:Boolean,
        default:false
      },
      goBottom:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      toggle(){
        this.isDrop=!this.isDrop;
        if(this.isDrop && this.goBottom) {
          setTimeout(()=>{
            document.body.scrollTop = document.body.scrollHeight;
            document.documentElement.scrollTop = document.documentElement.scrollHeight;
          },50);
        }
      }
    }
  }
</script>

<style lang="scss">
.collapse-components{
  .mark {
    display: inline-block;
    width: 3px;
    height: 1em;
    background-color: $primary;
    position: relative;
    top: 2px;
  }
  .collapse-dl{
    background-color: #fff;
    width: 100%;
    &:before{
      content: '';
      display: block;
      width: 100%;
      height:1px;
      background-color: $light;
      transform: scaleY(0.5);
    }
  }
  .collapse-dt{
    @include fj;
    align-items: center;
    height:px2rem(90px);
    padding:0 10px;
  }
  .collapse-title{
    flex:1;
    min-width:1px;
    font-size:16px;
    color: $dark;
  }
  .collapse-dd{
    transition: all 0.4s linear 0.1s;
  }
  .icon-jiantouyou{
    transition: all 0.4s;
    font-size:14px;
    color: #999;
  }
  .slider-enter-active, .slider-leave-active {
    transition: all .5s;
    height:auto;
  }
  .slider-enter, .slider-leave-to{
    height:0;
  }
  .collapse-content{
    overflow: hidden;
    width: 100%;
    /*&:before{
      content: '';
      display: block;
      width: 100%;
      height:1px;
      background-color: $light;
      transform: scaleY(0.5);
    }*/
  }
  /*.collapse-dl.active .collapse-content{
    height:auto;
  }*/
  .collapse-dl.active .collapse-dt .icon-jiantouyou{
    transform: rotate(90deg);
  }
}
</style>
