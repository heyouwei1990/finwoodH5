<template>
  <div class="page-corporationInfo" v-title="'法人信息'">
    <mt-field label="法人姓名" placeholder="请输入法人的真实姓名" v-model="fullname"></mt-field>
    <mt-field label="法人手机号" placeholder="请输入法人的手机号码" v-model="phone"></mt-field>
    <mt-field label="法人邮箱" placeholder="请输入法人的联系邮箱" v-model="email"></mt-field>
    <mt-field label="法人身份证号" placeholder="请输入法人的真实身份证号码" v-model="cardId"></mt-field>
    <mt-field label="证件起始日期" placeholder="格式为2000-01-01" v-model="dateStart"></mt-field>
    <mt-field label="证件截止日期" placeholder="格式为2000-01-01" v-model="dateEnd"></mt-field>
    <div class="greenBtn" @click="submit();">保存</div>
  </div>
</template>

<script type="text/ecmascript-6">
import app from "../../../utils/common";
import { mapGetters } from "vuex";
import { Toast, MessageBox } from 'mint-ui';
  export default {
    data(){
      return{
        fullname:'',
        phone:null,
        email:null,
        cardId:null,
        dateStart:null,
        dateEnd:null,
        back:false
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
    methods: {
      submit() {
        if(this.fullname == null || this.fullname == '') {
          Toast({
            message: "请输入法人姓名!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(!app.isName(this.fullname))return;
        if(this.phone == null || this.phone == '') {
          Toast({
            message: "请输入法人手机号!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(!/^1\d{10}$/gi.test(this.phone)) {
          Toast({
            message: "手机号格式不正确!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(this.email == null || this.email == '') {
          Toast({
            message: "请输入法人邮箱!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(!app.isEmail(this.email))return;
        if(this.cardId == null || this.cardId == '') {
          Toast({
            message: "请输入法人身份证!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(!app.isCardID(this.cardId))return;
        if(this.dateStart == null || this.dateStart == '') {
          Toast({
            message: "请输入证件起始日期!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(!this.checkDate(this.dateStart)) {
          Toast({
            message: "证件起始日期格式不正确!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(this.dateEnd == null || this.dateEnd == '') {
          Toast({
            message: "请输入证件结束日期!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(!this.checkDate(this.dateEnd)) {
          Toast({
            message: "证件结束日期格式不正确!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(Number(this.dateEnd.substring(0,4))<=Number(this.dateStart.substring(0,4))) {
          Toast({
            message: "结束日期应大于起始日期!",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        Toast({
          message: "保存成功!",
          position: "bottom",
          duration: 1500
        });
      },
      checkDate(date) {
        var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (result == null)
            return false;
        var d = new Date(result[1], result[3] - 1, result[4]);
        return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);
      }
    }
  }
</script>

<style lang="scss">
  .page-corporationInfo{
    //该默认label字体16px为14px
    .mint-cell-wrapper {
      font-size: 14px;
    }
  }
</style>
