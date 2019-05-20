<template>
    <div class="main-page">
        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="/">
                <span :class="selected!='/'?'iconfont icon-shouye':'iconfont icon-shouye-mian'"></span><br>
                首页
            </mt-tab-item>
            <mt-tab-item id="/store">
                <span :class="selected!='/store'?'iconfont icon-shangcheng':'iconfont icon-shangc-mian'"></span><br>
                商城
            </mt-tab-item>
            <mt-tab-item id="/hotbuy">
                <span class="iconfont icon-caigou"></span><br>
                采购专区
            </mt-tab-item>
            <mt-tab-item id="/commodity">
                <span class="iconfont icon-fabu"></span><br>
                发布货源
            </mt-tab-item>
            <mt-tab-item id="/user">
                <span :class="selected!='/user'?'iconfont icon-wode':'iconfont icon-wode-mian'"></span><br>
                我的
            </mt-tab-item>
        </mt-tabbar>
      <router-view class="container"></router-view>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import app from '../utils/common'
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      selected: this.$route.path
    };
  },
  computed: {
    ...mapGetters([
      'getToken'
    ])
  },
  watch: {
    selected: function(value) {
      // if(value!='/store'){
      //   this.setSearch(null);
      // }
      if(value == '/commodity') {
        if(this.getToken==null) {
          this.$router.push({ path: '/login' });
        }else {
          app.post('shop/judgementshop',{
            token:this.getToken
          },(r)=>{
            if(r.result.companyVerifyStatus == 2 && r.result.hasShop ==1) {
              this.$router.push({ path: value });
            }else {
              Toast({
                message: '请先完成企业认证并且开通店铺后才能发布货源',
                position: 'bottom',
                duration: 1500
              });
              this.selected=this.$route.path;
            }
          },false,this);
        }
        return;
      }
      // app.removeStore('selected');      //首页最新现货热门求购tab
      // app.removeStore('storeSelected'); //商城tab
      this.$router.push({ path: value });
    },
    $route: function(value) {
      this.selected = value.path;
    }
  },
  methods: {
    ...mapActions([
      'setSearch'
    ]),
  }
};
</script>

<style lang="scss">
@media screen and (min-width: 500px){
  .main-page,.main-page .mint-tabbar {
      max-width: $bodyWidth;
      margin: 0 auto;
  }
}
.main-page {
  .mint-tabbar {
    height: 48px;
    color: #666;
    letter-spacing: 1px;
    border-top: 1px solid $light;
    background: #f3f3f3;
    z-index: 10;
    .iconfont {
      font-size: 22px;
      display: inline-block;
      padding: 6px 0 4px;
    }
  }
  .mint-tabbar > .mint-tab-item{
    padding-top:0;
    background-color: #fff;
  }
  .mint-tabbar > .mint-tab-item.is-selected {
    color: $primary;
  }
}
</style>
