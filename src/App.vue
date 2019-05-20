<template>
	<router-view />
</template>

<script>
  import app from './utils/common';
  import { Toast } from 'mint-ui';
  import { mapGetters, mapActions } from 'vuex';
  import wxshare from './utils/share'
	export default {
    mounted(){
      this.dataInit();
    },
    computed: {
			...mapGetters([
        'getGlobalInfo',
        'getUnionid',
        'getToken'
			])
    },
    methods:{
      ...mapActions([
        'setGlobalInfo'
      ]),
      //获取全局数据
      async dataInit(){
        app.post('common/globalinfo',{},(r)=>{
          this.setGlobalInfo(r.result);
          //百度统计
          if(!window.config.debug) {
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = `https://hm.baidu.com/hm.js?${r.result.baiduStatisticKey}`;
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
          }
          //微信分享
          wxshare.share({
            signUrl : `${window.location.href.split('#')[0]}#/`,
            title : '芬木网，买卖木材更轻松',
            desc : '木材交易、供应链金融、数据智能、产业服务等一站式服务平台',
            link : `${window.location.href.split('#')[0]}#/`,
            imgUrl : this.getGlobalInfo.logoUrl,
            dataShareUrl :'/',
            unionid:this.getUnionid,
            token:this.getToken
          });
        });
      }
    }
	}
</script>

<style lang="scss">
  @media screen and (min-width: 500px){
    body {
        max-width: $bodyWidth;
        margin: 0 auto;
    }
  }
</style>


