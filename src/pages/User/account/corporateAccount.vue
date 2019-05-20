<template>
    <div class="page-corporateAccount" v-title="'企业用户开户'">
      <div class="mark"></div>
      <mt-field label="企业名称" placeholder="" readonly v-model="companyName"></mt-field>
      <mt-field label="企业固话" placeholder="格式021-12345678" v-model="tel"></mt-field>
      <mt-field label="经营地址" placeholder="请输入企业经营地址" v-model="address"></mt-field>
      <a class="mint-cell mint-field" @click="back=false;$router.push({path:'/corporationInfo'})">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">法人信息</span>
          </div>
          <div class="mint-field-core"></div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </a>
      <a class="mint-cell mint-field" @click="back=false;$router.push({path:'/accountInfo'})">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">开户信息</span>
          </div>
          <div class="mint-field-core"></div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </a>
      <a class="mint-cell mint-field" @click="back=false;$router.push({path:'/shareholdersInfo'})">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <div class="mint-field-core"></div>
            <span class="mint-cell-text">股东信息</span>
          </div>
          <div class="mint-field-core"></div>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </a>
      <div class="upload">
        <div class="upload-label">
          <i class="required-mark">*</i>图片信息
          <span>需加盖公司红章，支持jpg，png，bmp</span>
        </div>
        <ul class="file-list">
          <li v-for="(item,index) in uploadImg" :key="index">
            <div class="file-box">
              <input type="file" accept="image/*" @change="upload($event,index);" >
              <img v-lazy="item" alt="">
            </div>
          </li>
        </ul>
      </div>
      <div class="greenBtn">提交审核</div>
      <mt-popup
        class="pop-templet"
        v-model="popupPick"
        position="middle">
        <img class="full-img" src="../../../images/shop-banner.jpg" alt="">
      </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
import app from "../../../utils/common";
import Vue from "vue";
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
  export default {
    data(){
      return{
        popupPick:false,
        companyName:'',
        tel:null,
        address:null,
        back:false,
        uploadImg: [
          require("../../../images/upload/uploadImg.png"),
          require("../../../images/upload/uploadImg.png"),
          require("../../../images/upload/uploadImg.png"),
          require("../../../images/upload/uploadImg.png")
        ],
        shopImg: [] //api所需图片地址
      }
    },
    computed: {
      ...mapGetters(["getToken"])
    },
    beforeRouteLeave (to, from, next) {
      if(this.back) {
        MessageBox.confirm('是否离开当前页面，已输入内容会丢失','芬木提示',{closeOnClickModal:false}).then(action => {
          next();
        }).catch(action=>{
          next(false);
        });
      }else {
        next();
      }
    },
    mounted () {
      this.dataInit();
    },
    methods:{
      dataInit() {
        app.post('member/info',{
          token:this.getToken
        },(r)=>{
          this.companyName=r.result.companyName;
        },false,this)
      },
      pupupSwitch(){
        this.popupPick=!this.popupPick;
      },
      //上传图片
      async upload(e, index) {
        app.upload(e, (url, suffix) => {
          let base64 = url.split(",");
          app.post("file/upload",{
              suffix: suffix,
              type: 1,
              image: base64[base64.length - 1],
              isThumb:0
            },r => {
              Vue.set(this.uploadImg, index, url);
              Vue.set(this.shopImg, index, r.result);
            }
          );
        });
      },
    }
  }
</script>

<style lang="scss">
  @import "src/styles/components/upload";
  .page-corporateAccount{
    .mark {
      position: absolute;
      width: 100%;
      height: 48px;
      top: 0;
      left: 0;
      z-index: 9;
    }
    //该默认label字体16px为14px
    .mint-cell-wrapper {
      font-size: 14px;
    }
    .upload-label{
      color: #333;
      span{
        display: inline-block;
        white-space:nowrap;
        color: #f00;
        font-size:12px;
      }
    }
    .btn-templet{
      font-size:14px;
      text-align: center;
      line-height:24px;
      color: $blue;
      margin-top:10px;
    }
    .full-img{
      max-width:100vw;
      max-height:100vh;
    }
  }

</style>
