<template>
  <div class="searchbox">
    <div class="searchbox-inner">
      <i class="iconfont icon-fangdajing"></i>
      <input class="box" type="text" v-model="query" :placeholder="placeholder">
      <i @click="clear()" v-if="query && query.length!=0" class="iconfont icon-shanchu"></i>
    </div>
    <span class="btn-search" @click="search()">搜索</span>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from 'vuex'
import { Toast } from 'mint-ui';
import app from '../utils/common'
  export default {
    props: {
      placeholder: {
        type: String,
        default: '请输入品牌/ 品种/商家'
      }
    },
    data() {
      return {
        query: null
      }
    },
    computed: {
			...mapGetters([
        'getSearchPage'
      ])
    },
    methods: {
      clear() {
        this.query = null;
      },
      ...mapActions([
        'setSearch'
      ]),
      //搜索
      search(){
        if(this.query != null) {
          app.setHistory('historyList',this.query);
        }
        this.setSearch(this.query);
        app.removeStore('storeSelected');
        if(this.getSearchPage == -1) {
          this.$router.go(this.getSearchPage);
        }else {
          this.$router.push({path:this.getSearchPage});
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/mixin";
	@media only screen and (min-width:500px){
    .searchbox{
        max-width: $bodyWidth;
    }
	}
  .searchbox {
    @include fj;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    z-index: 100;
    width: 100%;
    height:44px;
    background-color: #fff;
    padding: 6px 10px;
    -webkit-align-items: center;
    align-items: center;
  }

  .searchbox:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: $light;
    -webkit-transform: scaleY(0.5);
    -ms-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .searchbox-inner {
    position: relative;
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    flex: 1;
    height: 100%;
    min-width: 100px;
    input {
      display: block;
      width: 100%;
      background-color: #f5f5f5;
      border-radius: 2px;
      border: 1px solid $light;
      border-radius: 32px;
      height: 32px;
      line-height: 22px;
      padding:5px 30px 5px 38px;
      font-size: 12px;
      color: #333;
    }
    input:focus{
      background-color: #fff;
    }
  }

  .icon-fangdajing {
    width: 32px;
    height:32px;
    text-align: center;
    line-height:30px;
    position: absolute;
    left: 6px;
    top: 50%;
    font-size: 18px;
    margin-top: -15px;
    color: #ccc;
    z-index: 2;
  }

  .icon-shanchu {
    width: 30px;
    height:30px;
    line-height:30px;
    text-align: center;
    position: absolute;
    right: 0px;
    top: 50%;
    font-size: 14px;
    margin-top:-15px;
    color: #999;
    z-index: 2;
  }

  .btn-search {
    height:32px;
    line-height:32px;
    padding-left: 14px;
    padding-right:5px;
    font-size: 14px;
    color: #333;
  }
</style>
