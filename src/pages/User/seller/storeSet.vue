<template>
	<div class="storesetPage" v-title="'店铺管理'">
    <div class="mark"></div>
    <mt-field label="店铺名称:" readonly="readonly" placeholder="请输入店铺名称" :value="companyName"></mt-field>
    <mt-field class="align-top" label="店铺简介:" placeholder="请输入200字以内公司简介" maxlength="200" v-model="intro" type="textarea" row="6"></mt-field>
    <div class="upload">
      <i>*</i>店铺头部广告<br>
      <ul class="file-list">
        <li class="file-box">
          <input type="file" accept="image/*" @change="upload1($event);">
          <img :src="bannerSrc" alt="">
        </li>
      </ul>
    </div>
    <div class="upload">
      <i>*</i>店铺广告<br>
      <ul class="file-list">
        <li class="file-box">
          <input type="file" accept="image/*" @change="upload2($event);">
          <img :src="adSrc" alt="">
        </li>
      </ul>
    </div>
    <div class="greenBtn" @click="submit();" v-if="btnText != null && btnText!='审核中'">{{btnText}}</div>
    <div class="greenBtn" style="background: #999" v-if="btnText != null && btnText=='审核中'">{{btnText}}</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import app from '../../../utils/common'
import { mapGetters } from 'vuex'
	export default {
    data(){
      return{
        companyName:null,
        bannerSrc:require('../../../images/upload.jpg'),
        bannerImg:null,      //api所需图片地址
        adSrc:require('../../../images/upload.jpg'),
        adImg:null,      //api所需图片地址
        intro:null,
        btnText:null
      }
    },
    computed: {
			...mapGetters([
				'getToken'
			])
    },
    mounted () {
      this.dataInit();
    },
    methods:{
      dataInit() {
        app.post('shop/manage',{
          token:this.getToken
        },(r)=> {
          this.companyName=r.result.companyName;
          this.intro=r.result.shopSummary;
          if(r.result.bannerUrl != null) {
            this.bannerImg=r.result.bannerUrl;
            this.bannerSrc=r.result.showPath+r.result.bannerUrl;
          }
          if(r.result.adUrl != null) {
            this.adImg=r.result.adUrl;
            this.adSrc=r.result.showPath+r.result.adUrl;
          }
          if(r.result.auditStatus == 0 || r.result.auditStatus == 3) {
            this.btnText='提交审核';
          }else if(r.result.auditStatus == 1) {
            this.btnText='审核中';
          }else if(r.result.auditStatus == 2) {
            this.btnText='修改店铺资料';
          }
        })
      },
      //提交
      submit() {
        if(this.intro==null) {
          Toast({
            message: '店铺简介不能为空',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(this.bannerImg==null) {
          Toast({
            message: '请上传店铺头部广告',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(this.adImg==null) {
          Toast({
            message: '请上传店铺广告',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        app.post('shop/submitshopsetting',{
          token:this.getToken,
          headBannerUrl:this.bannerImg,
          adBannerUrl:this.adImg,
          shopSummary:this.intro
        },(r)=>{
          Toast({
            message: '保存成功',
            position: 'bottom',
            duration: 1500
          });
          this.$router.go(-1);
        },false,this)
      },
      //上传图片
      async upload1(e) {
        app.upload(e,(url,suffix)=> {
          let base64=url.split(',');
          app.post('file/upload',{
            suffix:suffix,
            type:1,
            image:base64[base64.length-1]
          },(r)=> {
            this.bannerSrc=url;
            this.bannerImg=r.result;
          })
        });
      },
      //上传图片
      async upload2(e) {
        app.upload(e,(url,suffix)=> {
          let base64=url.split(',');
          app.post('file/upload',{
            suffix:suffix,
            type:1,
            image:base64[base64.length-1]
          },(r)=> {
            this.adSrc=url;
            this.adImg=r.result;
          })
        });
      }
    }
	}
</script>

<style lang="scss">
  @import "src/styles/components/upload";
  .storesetPage{
    .align-top .mint-cell-title{
      align-self: flex-start;
      padding-top:8px;
    }
    .align-top .mint-field-core{
      height:100px;
    }
    .mark {
      width: 100%;
      height: 48px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
    }
  }
</style>
