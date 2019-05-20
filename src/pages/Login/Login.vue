<template>
	<div class="page-login" v-title="'登录'">
    <div class="mark" v-if="isAuthLogin">
      <div class="loader">Finwood</div>
    </div>
    <img class="logo" src="../../images/logo.svg" alt="">
    <form>
      <div class="input-row">
        <input placeholder="请输入手机号" type="text" v-model="phoneNumber">
        <span class="iconfont icon-wode"></span>
      </div>
      <div class="input-row">
        <input placeholder="请输入登录密码" type="password" v-model="password">
        <span class="iconfont icon-mima"></span>
      </div>
      <!-- <div class="input-row" v-if="loginWay==true">
        <input placeholder="请输入验证码" type="text" v-model="mobileCode">
        <span class="iconfont icon-wode"></span>
      </div> -->
      <button type="button" class="bntMobile" @click="mobileLogin();">登录</button>
      <div class="login-link clearfix">
        <router-link class="left" :to="{path:'/'}">返回首页</router-link>
        <router-link class="right" :to="{path:'/register'}">立即注册</router-link>
      </div>
      <!-- <p class="change-way" @click="changeWay()">
        <span v-if="loginWay==false">使用短信验证码登录</span>
        <span v-if="loginWay==true">使用账户密码登录</span>
      </p> -->
    </form>
  </div>
</template>

<script>
import Checked from "../../components/Checked";
import { Toast, Indicator } from 'mint-ui';
import app from '../../utils/common'
import { mapGetters, mapActions } from 'vuex'
import md5 from 'js-md5'

export default {
  data() {
    return {
      password:null, //密码
      phoneNumber: app.getStore('userPhone') //手机号
    };
  },
  components: {
    "v-checked": Checked
  },
  computed: {
    //判断手机号码
    rightPhoneNumber() {
      return /^1[234578]\d{9}$/gi.test(this.phoneNumber)
    },
    ...mapGetters([
      "getOpenid",
      "getUnionid",
      "getToken"
    ]),
    //判断是否自动登录
    isAuthLogin() {
      let ua = window.navigator.userAgent.toLowerCase();
      if(typeof(this.$route.query.authLogin) != 'undefined'
      && window.config.author && ua.indexOf('micromessenger') > 1) {
        return true;
      }
      return false;
    }
  },
  created () {
    this.autoLogin();
  },
  methods: {
    //判断是否自动登录
    autoLogin() {
      let ua = window.navigator.userAgent.toLowerCase();
      if(this.isAuthLogin) {
        app.post("social/wxauthen", {}, r => {
          this.outLogin();
          window.location.href = r.result;
        });
      }
    },
    ...mapActions([
      'login',
      'outLogin',
      'setSellerType'
    ]),
    //登录
    async mobileLogin(){
      if (!this.rightPhoneNumber) {
        Toast({
          message: '请输入正确的手机号',
          duration: 1500
        });
        return
      }
      if (this.password==null){
        Toast({
          message: '请输入密码',
          duration: 1500
        });
        return
      }
      app.post('member/login',{
        mobile:this.phoneNumber,
        password:md5(this.password),
        socialType:this.getOpenid==null?null:3,
        openid:this.getOpenid,
        unionid:this.getUnionid
      },(r)=>{
        this.login(r.result.token);
        this.setSellerType(r.result.sellerType);
        app.setStore('userPhone',this.phoneNumber);
        this.$router.go(-1);
      })
    }
  }
};
</script>

<style lang="scss">
.agree-label{
  color:#fff;
  display: inline-block;
}
.page-login {
 	@media only screen and (min-width:500px){
    .mark{
        max-width: $bodyWidth;
    }
	}
  .mark {
    position: fixed;
    left: 50%;
    top: 0;
    width: 100%;
    height: 100vh;
	  transform: translateX(-50%);
    z-index: 9;
    background: #f5f5f5;
    .loader {
      display: inline-block;
      position: absolute;
      top: 47%;
      margin: 0 auto;
      padding: 5px 0;
      position: relative;
      font: normal 18px/1em Helvetica, Arial, sans-serif;
      text-transform: uppercase;
      color: #333;
      &:after {
				content: "";
				-moz-border-radius: 2px;
				-webkit-border-radius: 2px;
				border-radius: 2px;
				-moz-animation: wormsPong cubic-bezier(0.77, 0, 0.175, 1) 0.8s infinite;
				-webkit-animation: wormsPong cubic-bezier(0.77, 0, 0.175, 1) 0.8s infinite;
				animation: wormsPong cubic-bezier(0.77, 0, 0.175, 1) 0.8s infinite;
				background-color: #13ae2f;
				position: absolute;
				bottom: -6px;
				left: 0;
				width: 4px;
				height: 4px;
			}
    }

    @-moz-keyframes wormsPong {
      25% {
        width: 100%;
      }
      50% {
        width: 0;
        left: auto;
        right: 0;
      }
      75% {
        width: 100%;
      }
      100% {
        width: 0;
        right: auto;
        left: 0;
      }
    }

    @-webkit-keyframes wormsPong {
      25% {
        width: 100%;
      }
      50% {
        width: 0;
        left: auto;
        right: 0;
      }
      75% {
        width: 100%;
      }
      100% {
        width: 0;
        right: auto;
        left: 0;
      }
    }

    @keyframes wormsPong {
      25% {
        width: 100%;
      }
      50% {
        width: 0;
        left: auto;
        right: 0;
      }
      75% {
        width: 100%;
      }
      100% {
        width: 0;
        right: auto;
        left: 0;
      }
    }
  }
  @include bg('../../images/loginBg.jpg');
  width: 100%;
  min-height:100vh;
  text-align: center;
  color: #fff;
  overflow: hidden;
  .logo {
    margin: px2rem(148px) auto px2rem(116px);
    display:block;
    height: px2rem(152px);
    vertical-align: middle;
    fill: #fff;
    overflow: hidden;
  }
  .input-row {
    position: relative;
    width: 78%;
    height:px2rem(88px);
    margin: 0 auto px2rem(30px);
    .iconfont {
      font-size: px2rem(32px)!important;
      position: absolute;
      top:50%;
      left: px2rem(34px);
      font-size: px2rem(44px);
      transform: translateY(-50%);
      opacity: 0.8;
    }
    .code {
      position: absolute;
      top: 50%;
      right: 0;
      color: $primary;
      text-align: center;
      width: px2rem(211px);
      height: px2rem(60px);
      line-height: px2rem(60px);
      border-left: 1px solid rgba(255,255,255,.8);
      transform: translateY(-50%);
      font-size:px2rem(28px);
    }
  }
  input {
    width: 100%;
    height: px2rem(88px);
    border-radius: 4px;
    border: none;
    background: rgba(51, 51, 51, 0.4);
    color: #fff;
    font-size:px2rem(28px);
    padding: px2rem(20px) px2rem(100px);
    line-height: px2rem(48px);
    opacity: 0.8;
  }
  input::-webkit-input-placeholder {
    font-size:px2rem(28px);
    color: rgba(255,255,255,.6);
  }
  .bntMobile {
    width: 78%;
    height: px2rem(88px);
    line-height: px2rem(88px);
    font-size: px2rem(30px);
    color: #fff;
    background: $primary;
    border: none;
    border-radius:4px;
    margin-top:px2rem(30px);
  }
  .login-link{
    width: 70%;
    opacity:0.8;
    margin:px2rem(30px) auto 0;
  }
  .change-way{
    width: 100%;
    text-align: center;
    font-size:px2rem(28px);
    color: $primary;
    margin-top:px2rem(30px);
    margin-bottom:px2rem(30px);
  }
}
</style>
