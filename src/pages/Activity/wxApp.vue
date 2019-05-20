<template>
    <div class="page-wxApp" v-title="'申请商户版小程序'">
      <div class="activity-banner">
        <img src="../../images/activity.png" alt="">
      </div>
      <div class="form">
        <h3 class="title">免费申请</h3>
        <div class="input-row">
          <label>联系人:</label>
          <input type="text" v-model="negotiator" placeholder="请输入联系人姓名">
        </div>
        <div class="input-row">
          <label>联系电话:</label>
          <input type="tel" v-model="phone" placeholder="请输入联系人电话">
        </div>
        <div class="input-row">
          <label>推荐人:</label>
          <input type="text" v-model="inviter" maxlength="100" placeholder="请输入推荐人">
        </div>
        <div class="greenBtn" @click="submit">提交</div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  import app from '../../utils/common'
  export default {
    data(){
      return{
        negotiator:'',
        phone:'',
        inviter:'' //推荐人
      }
    },
    methods:{
      submit(){
        if(this.negotiator.trim()==''){
          Toast({
            message:'请输入联系人',
            position:'bottom',
            duration: 1500
          })
          return;
        }
        if(!app.isPhone(this.phone))return;
        app.post('member/addBusinessProgram',{
          contact:this.negotiator,
          tel:this.phone,
          userVersion:2,//
          sourceType:2,
          inviter:this.inviter
        },(r)=>{
          this.$router.push('/applySuccess');
        },false,this)
      }
    }
  }
</script>

<style scoped lang="scss">
  .page-wxApp{
    width: 100%;
    min-height:100vh;
    background-color: #fff;
    .activity-banner{
      width: 100%;
      img{
        display: block;
        width: 100%;
        height:px2rem(612px);
      }
    }
    .form{
      width: 100%;
      padding-top:px2rem(36px);
      padding:px2rem(36px) 15px 10px;
    }
    .title{
      font-size:16px;
      line-height:2;
      font-weight:500;
      color: $dark;
      text-align: center;
      margin-bottom:px2rem(44px);
    }
    .input-row{
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom:px2rem(20px);
    }
    label{
      width: 5em;
      font-size:14px;
      color: $dark;
      line-height:2;
    }
    input{
      min-width:100px;
      flex:1;
      border: 1px solid $light;
      height:px2rem(88px);
      padding:px2rem(14px) 10px;
      line-height:px2rem(60px);
      font-size:14px;
      color: $dark;
    }
    .greenBtn{
      margin-top:px2rem(60px);
      width: 100%;
    }
  }
</style>
