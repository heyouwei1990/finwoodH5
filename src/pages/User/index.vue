<template>
	<div class="user-page" v-title="'个人中心'">
		<div class="userTop">
      <div class="info" @click="$router.push({path:'/userinfo',query:{

      }})">
        <img class="avatar" src="../../images/user/avatar.png" alt="">
        <div class="user-info">
          {{ userName }}&nbsp;<span v-show="personalVerifiedStatus!=2">{{ personalVerifiedStatusTxt }}</span><br>
          {{companyName}}&nbsp;<span v-show="companyVerifiedStatus!=2">{{companyVerifiedStatusTxt}}</span>
        </div>
        <i class="iconfont icon-jiantouyou"></i>
      </div>
      <p class="bottom">
        <!--<span v-show="personalVerifiedStatus==0 || personalVerifiedStatus==3" @click="$router.push({path:'/personapply'})">
          <img src="../../images/vip.svg" alt="">
          个人认证
        </span>
        <span v-show="personalVerifiedStatus==1">
          <img src="../../images/vip.svg" alt="">
          个人认证
        </span>
        <span v-show="personalVerifiedStatus==2">
          <img src="../../images/vip_active.svg" alt="">
          个人认证
        </span>-->
        <span v-if="personalVerifiedStatus==0 && userName!='真实姓名 (未填写)' || personalVerifiedStatus==3" @click="$router.push({path:'/personApply',query:{userName:userName}})">
          <img :src="personVip" alt="">
          个人认证
        </span>
        <span v-else-if="personalVerifiedStatus==0 && userName=='真实姓名 (未填写)'" @click="writeName('请先完善个人信息')">
          <img :src="personVip" alt="">
          个人认证
        </span>
        <span v-else="personalVerifiedStatus==1 || personalVerifiedStatus==2">
          <img :src="personVip" alt="">
          个人认证
        </span>
        <span v-if="companyVerifiedStatus==0 && companyName!='公司名称 (未填写)' || companyVerifiedStatus==3" @click="$router.push({path:'/companyApply',query:{companyName:companyName}})">
          <img :src="companyVip" alt="">
          企业认证
        </span>
        <span v-else-if="companyVerifiedStatus==0 && companyName=='公司名称 (未填写)'" @click="writeName('请先完善企业信息')">
          <img :src="companyVip" alt="">
          企业认证
        </span>
        <span v-else="companyVerifiedStatus==1 || companyVerifiedStatus==2">
          <img :src="companyVip" alt="">
          企业认证
        </span>
        <span>
          授信额度<br>
          <b>{{creditLimit}}元</b>
        </span>
      </p>
    </div>
    <!-- <ul>
      <li>
        <i class="iconfont icon-ziyuan"></i>
        账户管理
      </li>
      <li @click="$router.push({path:'/openAccount'})">
        <i class="iconfont icon-shenqingkaihu"></i>
        申请开户
      </li>
      <li @click="isComplete('/fundManage','资金账户');">
        <i class="iconfont icon-zhanghu"></i>
        资金账户
      </li>
    </ul> -->
    <!-- 买家 -->
    <ul>
      <li>
        <i class="iconfont icon-maijia"></i>
        我是买家
      </li>
      <li>
        <router-link :to="{path:'/buyerOrder'}">
          <i class="iconfont icon-dingdan"></i>
          我的订单
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/collect'}">
          <i class="iconfont icon-shoucang"></i>
          我的收藏
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/cart'}">
          <i class="iconfont icon-gouwuche"></i>
          我的购物车
        </router-link>
      </li>
      <li>
        <router-link :to="{path:'/address'}">
          <i class="iconfont icon-dizhi1"></i>
          收货地址
        </router-link>
      </li>
    </ul>
    <!-- 卖家 -->
    <ul>
      <li>
        <i class="iconfont icon-wosmaij"></i>
        我是卖家
      </li>
      <li>
        <router-link :to="{path:'/sellerOrder'}">
          <i class="iconfont icon-dingdanguanli"></i>
          订单管理
        </router-link>
      </li>
      <li @click="isComplete('/goodsManage');">
          <i class="iconfont icon-shangpinguanli"></i>
          商品管理
      </li>
      <li @click="isComplete('/storeset');">
          <i class="iconfont icon-dianpushezhi"></i>
          店铺设置
      </li>
      <li v-if="getSellerType == 1" @click="isComplete('/accountManage');">
        <i class="iconfont icon-shenqingkaihu"></i>
        多账号管理
      </li>
      <!--<li @click="isComplete('/fundManage','提现管理');">
          <i class="iconfont icon-tixianguanli"></i>
          提现管理
      </li>-->
    </ul>
    <div v-if="getToken!=null" @click="exit()" class="switch-btn">切换账号</div>
	</div>
</template>

<script>
  import { Toast, MessageBox } from 'mint-ui';
  import { mapGetters, mapActions } from 'vuex'
  import app from '../../utils/common'
	export default {
    data () {
      return {
        userName:null,
        companyName:null,
        personalVerifiedStatus:0,
        personalVerifiedStatusTxt:'(未认证)',
        companyVerifiedStatus:0,
        companyVerifiedStatusTxt:'(未认证)',
        company:null,
        creditLimit:0,
        personVip:require('../../images/vip.svg'),
        companyVip:require('../../images/vip.svg'),
      }
    },
    computed: {
			...mapGetters([
        'getToken',
        'getSellerType'
			])
    },
    mounted () {
      if(this.getToken === null) {
        return;
      }
      this.dataInit();
    },
    methods: {
      ...mapActions([
        'outLogin',
        'setSellerType'
      ]),
      //退出
      exit() {
        setTimeout(()=>{
          MessageBox.confirm('是否切换当前帐号？','芬木提示').then(action => {
            app.post('member/logout',{
              token:this.getToken
            },r=>{
              this.outLogin();
              this.$router.push({path:'/login',query:{authLogin:1}});
            })
          }).catch(action=>{});
        },50)
      },
      //初始化数据
      async dataInit(personVip) {
        app.post('member/centerinfo',{
          token:this.getToken
        }, (r)=>{
          this.setSellerType(r.result.sellerType);
          if(r.result.name!=null && r.result.name!='') {
            if(r.result.isPersonalVerified ==0) {
              switch(r.result.personalVerifiedStatus) {
                case 0:
                  this.personalVerifiedStatusTxt='(未认证)';
                  this.personVip=require('../../images/vip.svg');
                  break;
                case 1:
                  this.personalVerifiedStatusTxt='(认证中)';
                  this.personVip=require('../../images/vip.svg');
                  break;
                case 2:
                  this.personalVerifiedStatusTxt='(已认证)';
                  this.personVip=require('../../images/vip_active.svg');
                  break;
                case 3:
                  this.personalVerifiedStatusTxt='(驳回)';
                  this.personVip=require('../../images/vip.svg');
                  break;
                default:
                  break;
              }
            }else {
              this.personalVerifiedStatusTxt='(已认证)';
              this.personVip=require('../../images/vip_active.svg');
            }
            this.userName=r.result.name;
          }else {
            this.userName='真实姓名 (未填写)';
          }
          if(r.result.companyName!=null && r.result.companyName!='') {
            if(r.result.isCompanyVerified == 0){
              switch(r.result.companyVerifiedStatus) {
                case 0:
                  this.companyVerifiedStatusTxt='(未认证)';
                  this.companyVip=require('../../images/vip.svg');
                  break;
                case 1:
                  this.companyVerifiedStatusTxt='(认证中)';
                  this.companyVip=require('../../images/vip.svg');
                  break;
                case 2:
                  this.companyVerifiedStatusTxt='(已认证)';
                  this.companyVip=require('../../images/vip_active.svg');
                  break;
                case 3:
                  this.companyVerifiedStatusTxt='(驳回)';
                  this.companyVip=require('../../images/vip.svg');
                  break;
                default:
                  break;
              }
            }else {
              this.companyVerifiedStatusTxt='(已认证)';
              this.companyVip=require('../../images/vip_active.svg');
            }
            this.companyName=r.result.companyName;
          }else {
            this.companyName='公司名称 (未填写)';
          }
          this.personalVerifiedStatus=r.result.personalVerifiedStatus;
          this.companyVerifiedStatus=r.result.companyVerifiedStatus;
          this.company=r.result.companyName;
          this.creditLimit=r.result.creditLimit;
        },false,this)
      },
      //先填写信息
      writeName(value){
        Toast({
          message:value,
          position:'bottom',
          during:'1000'
        })
        setTimeout(()=>{
          this.$router.push({ path: '/userinfo' });
        },1000)
        return;
      },
      isComplete(path,title) {
        app.post('shop/judgementshop',{
            token:this.getToken
          },(r)=>{
            if(r.result.companyVerifyStatus == 2 && r.result.hasShop ==1) {
              if(path == '/fundManage'){
                this.$router.push({ path: path, query:{title:title}});
              }else {
                this.$router.push({ path: path });
              }
            }else {
              Toast({
                message: '请先完成企业认证并且开通店铺后才能发布货源',
                position: 'bottom',
                duration: 1500
              });
            }
          },false,this);
      }
    }
	}
</script>

<style lang="scss">
	.user-page {
    padding-bottom:58px;
    .switch-btn{
      width: 100%;
      text-align: center;
      line-height:px2rem(80px);
      height:px2rem(80px);
      background-color: #fff;
      font-size:16px;
      color: $primary;
      margin-top:10px;
    }
    .userTop {
      @include bg('../../images/user/userBg.png');
      @include wh(100%,px2rem(371px));
      padding-top:px2rem(35px);
      color: #fff;
      position: relative;
      .info {
        @include fj;
        align-items: center;
        font-size: px2rem(28px);
        .user-info{
          display: inline-block;
          line-height: 2;
          font-size:14px;
          min-width: 50%;
        }
        .iconfont {
           margin-right: px2rem(30px);
        }
      }
      .avatar {
        width: px2rem(135px);
        height: px2rem(135px);
        margin-left: px2rem(46px);
        border-radius: 50%;
        border: 2px solid #fff;
      }
      .bottom {
        width: 100%;
        height: px2rem(140px);
        background: rgba(0,0,0,0.1);
        position: absolute;
        bottom:0;
        @include fj(space-around);
        align-items: center;
        font-size: px2rem(32px);
        text-align: center;
        b {
          font-weight: normal;
          font-size: px2rem(36px);
        }
        img {
          width: px2rem(50px);
          width: px2rem(50px);
          position: relative;
          top: px2rem(10px);
        }
        &:before {
          content: ' ';
          display: inline-block;
          background: #fff;
          @include wh(1px,80%);
          position: absolute;
          top: 10%;
          left: 35%;
        }
        &:after {
          content: ' ';
          display: inline-block;
          background: #fff;
          @include wh(1px,80%);
          position: absolute;
          top: 10%;
          right: 30%;
        }
      }
    }
    ul {
      background: #fff;
      margin-top:px2rem(18px);
      li {
        height: px2rem(80px);
        line-height: px2rem(80px);
        @include bb;
        font-size: px2rem(30px);
        color: #666;
        a {
          display: block;
        }
        &:nth-of-type(1) {
          font-size: px2rem(32px);
          color: #333;
        }
        &:nth-of-type(1) .iconfont {
          color: $primary;
        }
        .iconfont {
          margin: 0 px2rem(10px) 0 px2rem(26px);
          font-size: px2rem(38px);
          color: #999;
        }
      }
    }
  }
</style>
