<template>
	<div class="helper" v-title="'帮助中心'">
		<ol>
      <li v-for="(item,index) in helpList" :key="index">
        <router-link :to="{path:item.href}">
          {{index+1}}、{{item.title}}<i class="iconfont icon-jiantouyou right"></i>
        </router-link>
      </li>
    </ol>
	</div>
</template>

<script>
	export default {
    data () {
      return {
        helpList:[
          {
            title:'注册账号',
            href:'/helper1'
          },
          {
            title:'个人认证',
            href:'/helper2'
          },
          {
            title:'企业认证',
            href:'/helper3'
          },
          {
            title:'查找货源',
            href:'/helper4'
          },
          {
            title:'提交订单',
            href:'/helper5'
          },
          {
            title:'支付方式',
            href:'/helper6'
          },
          {
            title:'提货方式',
            href:'/helper7'
          },
          {
            title:'确认收货',
            href:'/helper8'
          },
          {
            title:'发布求购',
            href:'/helper9'
          },
          {
            title:'商城入驻',
            href:'/helper10'
          },
          {
            title:'商品管理',
            href:'/helper11'
          },
          {
            title:'订单管理',
            href:'/helper12'
          },
          {
            title:'提现管理',
            href:'/helper13'
          },
          {
            title:'确认发货',
            href:'/helper14'
          },
          {
            title:'融资服务',
            href:'/helper15'
          }
        ]
      }
    }
	}
</script>

<style lang="scss">
  .helper {
    ol {
      background: #fff;
      li {
        height: px2rem(78px);
        line-height: px2rem(78px);
        @include bb;
        font-size: px2rem(28px);
        padding: 0 px2rem(30px);
        a {
          display: block;
        }
        .iconfont {
          color: #999;
        }
      }
    }
  }
</style>
