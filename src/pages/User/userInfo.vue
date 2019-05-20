<template>
	<div class="userInfo" v-title="'个人信息'">
    <div class="mask" v-show="personStatus || (!personStatus && verifiedStatus==1)"></div>
    <div class="mask2" v-show="companyStatus"></div>
    <div class="mask3"></div>
    <mt-field label="手机" readonly="readonly" type="tel" v-model="mobile"></mt-field>
    <!--<mt-field label="姓名" ref="userName" placeholder="请输入您的真实姓名" v-model="userName"></mt-field>-->
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>姓名</span>
        </div>
        <input v-model="userName" placeholder="请输入您的真实姓名" type="text" class="mint-field-core">
        <div class="blue" @click="toPersonApply()" v-if="!personStatus && verifiedStatus!=1">
          去认证<i class="iconfont icon-jiantouyou"></i>
        </div>
        <span class="dark" v-if="!personStatus && verifiedStatus==1">(认证中)</span>
        <span class="dark" v-if="personStatus">(已认证)</span>
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>性别</span>
        </div>
        <mt-radio
          class="radio-box"
          v-model="sex"
          :options="['先生', '女士']">
        </mt-radio>
      </div>
    </a>
    <mt-field label="公司" placeholder="请输入您的公司名称" v-model="companyName">
      <div class="blue" @click="toConpanyApply()" v-if="!companyStatus && companyVerifiedStatus!=1">
        去认证<i class="iconfont icon-jiantouyou"></i>
      </div>
      <div class="blue" @click="$router.push({path:'/companyApply',query:{
        companyName:companyName,
        edit:1
      }})" v-if="!companyStatus && companyVerifiedStatus==1">
        (认证中)
      </div>
      <!-- <span class="dark" v-if="!companyStatus && companyVerifiedStatus==1">(认证中)</span> -->
      <span class="dark" v-if="companyStatus">(已认证)</span>
    </mt-field>
    <mt-field label="职位" placeholder="请输入您的职位名称" v-model="jobName"></mt-field>
    <mt-field label="电话" placeholder="请输入您的联系方式" v-model="phone"></mt-field>
    <mt-field label="传真" placeholder="传真格式xxx-88888888" v-model="fax"></mt-field>
    <mt-field label="邮箱" placeholder="请输入您的邮箱地址" v-model="email"></mt-field>
    <mt-field class="align-top" maxlength="200" label="公司简介" placeholder="请输入200字以内简介" max-length="200" type="textarea" rows="3" v-model="intro"></mt-field>
    <!-- <p class="perch"></p> -->
    <!-- <div class="apply-list">
      <mt-field label="个人认证" disabled placeholder="未实名认证" v-show="!personStatus && verifiedStatus!=1">
        <div class="blue" @click="toPersonApply()">
          去认证<i class="iconfont icon-jiantouyou"></i>
        </div>
      </mt-field>
      <mt-field label="个人认证" disabled placeholder="个人信息认证中" v-show="!personStatus && verifiedStatus==1">
      </mt-field>
      <mt-field label="个人认证" disabled placeholder="已认证" v-show="personStatus"></mt-field>
      <mt-field label="企业认证" disabled placeholder="未认证企业信息" v-show="!companyStatus && companyVerifiedStatus!=1">
        <div class="blue" @click="toConpanyApply()">
          去认证<i class="iconfont icon-jiantouyou"></i>
        </div>
      </mt-field>
      <mt-field label="企业认证" disabled placeholder="企业信息认证中" v-show="!companyStatus && companyVerifiedStatus==1">
      </mt-field>
      <mt-field label="企业认证" disabled placeholder="已认证" v-show="companyStatus"></mt-field>
    </div> -->
    <!-- <p class="perch"></p>
    <mt-field label="收款账户" readonly="readonly" placeholder="(未绑定)" v-show="!account">
      <router-link class="blue" :to="{path:'/receivingaccount'}">
        立即绑定<i class="iconfont icon-jiantouyou"></i>
      </router-link>
    </mt-field>
    <mt-field label="收款账户" readonly="readonly" placeholder="(已绑定)" v-show="account"></mt-field> -->
    <div class="greenBtn" v-tap="{ methods:submit }">保存</div>
	</div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { mapGetters } from 'vuex'
  import app from '../../utils/common'
	export default {
    data () {
      return {
        readonly:true,
        mobile:null,  //用户手机
        userName:null,        //姓名
        serveUserName:null,
        sex:'先生',          //性别
        companyName:null,     //公司名
        serveCompanyName:null,
        jobName:null,         //职位
        phone:null,           //电话
        fax:null,             //传真
        email:null,            //邮箱
        intro:null,            //公司简介
        personStatus:false,     //个人认证状态
        companyStatus:false,    //企业认证状态
        account:false,           //收款账户绑定状态
        companyVerifiedStatus:null,
        verifiedStatus:null,
      }
    },
    computed: {
			...mapGetters([
				'getToken'
			])
    },
    mounted () {
      this.initData();
    },
    watch: {
      jobName:function() {
        if(this.jobName.length>20) {
          setTimeout(()=>{
            this.jobName=this.jobName.substring(0,20);
          },10)
        }
      },
    },
    methods: {
      //初始化数据
      async initData() {
        app.post('member/info',{
          token:this.getToken
        }, (r)=>{
          this.mobile=r.result.mobile;
          this.userName=r.result.name;
          this.serveUserName=r.result.name;
          this.sex=r.result.sex==0?'女士':'先生';
          this.companyName=r.result.companyName;
          this.serveCompanyName=r.result.companyName;
          this.jobName=r.result.position;
          this.phone=r.result.telephone;
          this.fax=r.result.fax;
          this.email=r.result.email;
          this.intro=r.result.companyDescription;
          this.personStatus=r.result.isIdCardVerified==0?false:true;
          this.verifiedStatus=r.result.verifiedStatus;
          this.companyVerifiedStatus=r.result.companyVerifiedStatus;
          this.companyStatus=r.result.isCompanyVerified==0?false:true;
        },false,this)
      },
      submit() {
        if(this.userName ==null || this.userName =='') {
          Toast({
            message: "请填写姓名!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(!app.isName(this.userName))return;
        if(this.phone!=null && this.phone!='') {
          if(!app.isPhone(this.phone))return;
        }
        if(this.fax!=null && this.fax!='') {
          if(!/^(\d{3,4}-)\d{7,8}$/.test(this.fax)){
            Toast({
              message: "传真格式不正确!",
              position: "bottom",
              duration: 1500
            });
            return;
          }
        }
        if(this.email!=null && this.email!='') {
          if(!app.isEmail(this.email))return;
        }
        app.post('member/updateinfo',{
          token:this.getToken,
          mobile:this.mobile,
          name:this.userName,
          sex:this.sex=='先生'?1:0,
          companyName:this.companyName,
          position:this.jobName,
          telephone:this.phone,
          fax:this.fax,
          email:this.email,
          companyDescp:this.intro
        },(r)=>{
          Toast({
            message: '保存成功',
            position: 'bottom',
            duration: 1500
          });
          this.initData();
        },false,this)
      },
      toPersonApply(){
        if(this.serveUserName == this.userName && this.userName != null && this.userName != '') {
          this.$router.push({path:'/personApply',query:{userName:this.userName}});
        }else {
          Toast({
            message: '请先录入"姓名"并保存',
            position: 'bottom',
            duration: 1500
          });
        }
      },
      toConpanyApply(){
        if(this.serveCompanyName == this.companyName && this.companyName != null && this.companyName != '') {
          this.$router.push({path:'/companyApply',query:{conpanyName:this.companyName}});
        }else {
          Toast({
            message: '请先录入"企业名称"并保存',
            position: 'bottom',
            duration: 1500
          });
        }
      }
    }
	}
</script>

<style lang="scss">
  .userInfo {
    .dark {
      color: #999;
    }
    .apply-list input[disabled]{
      background-color: transparent;
      -webkit-text-fill-color: #b2b2b2;
      -webkit-opacity: 1;
      color: #b2b2b2;
    }
    .mint-radiolist {
      @include fj;
    }
    .align-top .mint-cell-title{
      align-self: flex-start;
      padding-top:8px;
    }
    .radio-box .mint-radiolist-title{
      margin:0;
    }
    .radio-box .mint-cell-wrapper,
    .radio-box .mint-radiolist-label{
      padding-left:0;
    }
    .mint-radio-input:checked + .mint-radio-core {
      background: $primary;
      border-color: $primary;
    }
    .mint-radiolist .mint-cell{
      background-image: none;
    }
    .mint-cell {
      min-height: px2rem(80px);
    }
    .mask {
      width: 100%;
      height: px2rem(80px);
      position: absolute;
      top: px2rem(80px);
      z-index: 9;
    }
    .mask2 {
      width: 100%;
      height: px2rem(80px);
      position: absolute;
      top: px2rem(240px);
      z-index: 9;
    }
    .mask3 {
      width: 100%;
      height: px2rem(80px);
      position: absolute;
      top: 0;
      z-index: 9;
    }
    .mint-radiolist .mint-cell-title {
      width: auto;
    }
    &>a:nth-of-type(1) .mint-field-clear {
      display: none;
    }
    .perch {
      height: px2rem(20px);
    }
    input {
      font-size: 14px;
    }
    /*textarea::-webkit-input-placeholder {
      color: #777;
      font-size: 14px;
      font-family: 'Arial';
    }*/
    .blue {
      font-size: 14px;
      color: $blue;
      .iconfont {
        font-size: px2rem(30px);
        color: #999;
        margin-left: 7px;
      }
    }
    .mint-cell-wrapper{ //该默认label字体16px为14px
      font-size:14px;
    }
  }
</style>
