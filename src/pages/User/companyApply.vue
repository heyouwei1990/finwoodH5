<template>
	<div class="personApply" v-title="'企业认证'">
		<mt-field v-if="!$route.query.edit" label="公司名称" placeholder="请输入公司名称" disabled v-model="companyName"></mt-field>
		<mt-field v-if="$route.query.edit" label="公司名称" placeholder="请输入公司名称" v-model="companyName"></mt-field>
		<!--<mt-field label="公司名简称" placeholder="请输入公司名简称" v-model="abbrName"></mt-field>
		<mt-field label="联系姓名" placeholder="请输入授权人姓名" v-model="name"></mt-field>
    <mt-field label="联系电话" placeholder="请输入联系方式" v-model="phone"></mt-field>-->
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>公司名简称</span>
        </div>
        <input v-model="abbrName" placeholder="请输入公司名简称" type="text" class="mint-field-core">
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>联系姓名</span>
        </div>
        <input v-model="name" placeholder="请输入授权人姓名" type="text" class="mint-field-core">
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>联系电话</span>
        </div>
        <input v-model="phone" placeholder="请输入联系方式" type="text" class="mint-field-core">
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">三证合一</span>
        </div>
        <mt-radio
          v-model="type"
          :options="options">
        </mt-radio>
      </div>
    </a>

    <!--<a v-show="type==2" class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">社会信用代码</span>
        </div>
        <input v-model="code" placeholder="请输入社会信用代码" type="text" class="mint-field-core">
      </div>
    </a>
    <a v-show="type!=2" class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>营业执照代码</span>
        </div>
        <input v-model="code" placeholder="请输入营业执照代码" type="text" class="mint-field-core">
      </div>
    </a>-->
    <p class="perch"></p>
    <div class="upload">
      <div class="label-txt"><i class="required-mark">*</i>营业执照正面照片<br></div>
      <ul class="file-list">
        <li class="file-box">
          <input type="file" accept="image/*" @change="upload($event);">
          <img :src="uploadImg" alt="">
        </li>
      </ul>
    </div>
    <div class="greenBtn" @click="submit();">提交审核</div>
	</div>
</template>

<script>
  import { Toast } from "mint-ui";
  import app from '../../utils/common'
  import { mapGetters, mapActions } from 'vuex'
	export default {
    data () {
      return {
        companyName:null, //公司名
        abbrName:null,    //公司名简称
        name:null,        //联系人
        phone:null,       //联系电话
        options:[
          {
            label:'是',
            value:'2'
          },
          {
            label:'否',
            value:'1'
          }
        ],
        type:'2',         //是否三证合一
        code:null,          //社会信用代码||营业执照代码
        uploadImg: require('../../images/upload/business.png'),
        business:null      //api所需图片地址
      }
    },
    mounted() {
      this.dataInit();
    },
    computed: {
      ...mapGetters(["getToken","getGlobalInfo"])
    },
    methods: {
      ...mapActions([
        'setValue'
      ]),
      dataInit() {
        this.companyName=this.$route.query.companyName;
        app.post('member/companyauthen',{
          token: this.getToken
        },(r)=>{
          if(r.result != null) {
            this.companyName=r.result.authResult.companyName;
            this.abbrName=r.result.authResult.abbrName;
            this.name=r.result.authResult.contact;
            this.phone=r.result.authResult.telephone;
            if(r.result.authResult.businessLicenseUrl!=="" && r.result.authResult.businessLicenseUrl!==null) {
              this.uploadImg = this.getGlobalInfo.imgPrefixUrl+ r.result.authResult.businessLicenseUrl
              this.business = r.result.authResult.businessLicenseUrl
            }
            //this.businessLicenseUrl=r.result.uploadImg;
            //this.code=r.result.authResult.businessLicenseCode;
          }
        },true,this)
      },
      //上传图片
      async upload(e) {
        app.upload(e,(url,suffix)=> {
          let base64=url.split(',');
          app.post('file/upload',{
            suffix:suffix,
            type:1,
            image:base64[base64.length-1]
          },(r)=> {
            this.uploadImg=url;
            this.business=r.result;
          })
        });
      },
       //提交
      submit() {
        if(this.companyName == null) {
          Toast({
            message: '请输入公司名称',
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(this.abbrName == null) {
          Toast({
            message: '请输入公司名简称',
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(!this.name || this.name=='') {
          Toast({
            message: '请输入联系姓名',
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(this.name>10 ) {
          Toast({
            message: '联系姓名限10个字符',
            position: "bottom",
            duration: 1500
          });
          return;
        }
        //if(!app.isName(this.name))return;
        if(!app.isPhone(this.phone))return;
        /*if(this.code == null && this.type==1) {
          Toast({
            message: '请输入营业执照代码',
            position: "bottom",
            duration: 1500
          });
          return;
        }*/
        if(this.business == null) {
          Toast({
            message: '请上传营业执照正面',
            position: "bottom",
            duration: 1500
          });
          return;
        }
        app.post('member/companyapply',{
          token: this.getToken,
          companyName:this.companyName,
          abbrName:this.abbrName,
          telephone:this.phone,
          contact:this.name,
          businessLicense:this.business,
          companyAuthType:Number(this.type),
          //licenseCode:this.code
        },(r)=>{
          this.setValue({
            title:'返回账户信息',
            page:-2
          })
          this.$router.push({path:'/success'});
        })
      }
    }
	}
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
    .mint-button::after {
      background: $primary;
    }
    .mint-cell-text i {
      font-style: normal;
      color: $danger;
    }
    .mint-field-core {
      font-size: 14px;
    }
    .mint-radiolist {
      @include fj;
    }
    .mint-radio-input:checked + .mint-radio-core {
      background: $primary;
      border-color: $primary;
    }
    .mint-radiolist .mint-cell-title {
      width: auto;
    }
    .mint-radiolist .mint-cell-wrapper{
      padding-left:0;
    }
    .mint-radiolist-label{
      padding-left:0;
    }
    .mint-radiolist .mint-cell{
      background-image: none;
    }
    .mint-radiolist-title{
      margin:0;
    }
    .perch {
      height: 10px;
    }
  }
</style>
