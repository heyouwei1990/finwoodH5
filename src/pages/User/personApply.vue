<template>
	<div class="personApply" v-title="'个人认证'">
		<!--<mt-field label="真实姓名" placeholder="请输入您的真实姓名" readonly v-model="username"></mt-field>-->
    <!--<mt-field label="身份证号" placeholder="请输入您的身份证号" v-model="IDnumber"></mt-field>-->
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>真实姓名</span>
        </div>
        <input v-model="username" readonly placeholder="请输入您的真实姓名" type="text" class="mint-field-core">
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>身份证号</span>
        </div>
        <input v-model="IDnumber" placeholder="请输入您的身份证号" type="text" class="mint-field-core">
      </div>
    </a>
    <div class="upload">
      <div class="label-txt"><i class="required-mark">*</i>身份证正面和反面</div>
      <ul class="file-list">
        <li class="file-box">
          <input type="file" accept="image/*" @change="upload1($event);">
          <img v-lazy="IDnumberImg1" alt="">
        </li>
        <li class="file-box">
          <input type="file" accept="image/*" @change="upload2($event);">
          <img v-lazy="IDnumberImg2" alt="">
        </li>
        <li class="file-box hidden"></li>
        <li class="file-box hidden"></li>
      </ul>
    </div>
    <div v-show="!isVerified" class="greenBtn" @click="submit();">提交审核</div>
    <div v-show="isVerified" class="mask"></div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import app from "../../utils/common";
import { mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      username: null, //姓名
      IDnumber: "", //身份证号
      IDnumberImg1: require('../../images/upload/IDnumber2.png'), //身份证正面
      IDnumberImg2: require('../../images/upload/IDnumber1.png'), //身份证反面
      IDnumberUrl1: null,
      IDnumberUrl2: null, //api所需图片地址
      isVerified: false //是否通过
    };
  },
  mounted() {
    this.dataInit();
  },
  computed: {
    ...mapGetters(["getToken"])
  },
  methods: {
    //数据初始化
    async dataInit() {
      this.username=this.$route.query.userName;
      app.post("member/presonalauthen",{
          token: this.getToken
        },(r) => {
          if(r.result.isVerified!=null){
            this.username = r.result.authResult.memberName;
            this.IDnumber = r.result.authResult.idCardNumber;
            this.IDnumberImg1 = r.result.authResult.idCardFrontUrl;
            this.IDnumberImg2 = r.result.authResult.idCardBackUrl;
            this.isVerified = r.result.isVerified;
          }
      },true,this);
    },
    //提交
    submit() {
      //if(!app.isName(this.username))return;
      if(!app.isCardID(this.IDnumber))return;
      if(this.IDnumberUrl1==null&&this.IDnumberUrl2==null) {
        Toast({
          message: '请上传身份证正反面',
          position: "bottom",
          duration: 1500
        });
        return;
      }
      app.post("member/personalapply",{
          token: this.getToken,
          realName: this.username,
          identifyCode: this.IDnumber,
          cardFrontUrl: this.IDnumberUrl1,
          cardBackUrl: this.IDnumberUrl2
        },(r) => {
          this.setValue({
            title: "返回账户信息",
            page: -2
          });
          this.$router.push({ path: "/success" });
        },false,this);
    },
    //上传正面
    async upload1(e) {
      app.upload(e, (url, suffix) => {
        let base64 = url.split(",");
        app.post("file/upload",{
            suffix: suffix,
            type: 1,
            image: base64[base64.length - 1]
          },r => {
            this.IDnumberImg1 = url;
            this.IDnumberUrl1 = r.result;
          }
        );
      });
    },
    //上传反面
    async upload2(e) {
      app.upload(e, (url, suffix) => {
        let base64 = url.split(",");
        app.post("file/upload",{
            suffix: suffix,
            type: 1,
            image: base64[base64.length - 1]
          },r => {
            this.IDnumberImg2 = url;
            this.IDnumberUrl2 = r.result;
          }
        );
      });
    },
    ...mapActions([
      'setValue'
    ]),
  }
};
</script>

<style lang="scss">
@import "src/styles/components/upload";
.personApply {
  .mint-cell-wrapper{ //该默认label字体16px为14px
    font-size:14px;
  }
  .label-txt{
    position: relative;
    font-size:14px;
    color: #333;
  }
  input {
    font-size: 14px;
  }
  .hidden {
    visibility: hidden;
  }
  .mask {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 9;
  }
}
</style>
