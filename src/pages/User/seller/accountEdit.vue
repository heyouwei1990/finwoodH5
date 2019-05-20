<template>
    <div class="page-accountEdit" v-title="'新增帐号'">
      <mt-field label="手机号码" placeholder="请输入新成员手机号码" v-model="phone"></mt-field>
      <!--<mt-field label="成员名称" placeholder="请输入新成员名称" v-model="memberTitle"></mt-field>-->
      <div class="greenBtn" @click="save()">保存</div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  import app from "@/utils/common"
  import { mapGetters } from "vuex"
  export default {
    data(){
      return{
        phone:'',
        memberTitle:'',
      }
    },
    computed: {
      ...mapGetters(["getToken"])
    },
    methods:{
      save(){
        if(this.phone === '') {
          Toast({
            message: "请填写手机号",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(!/^1[234578]\d{9}$/gi.test(this.phone)) {
          Toast({
            message: "手机号格式不正确",
            position: "bottom",
            duration: 1500
          });
          return;
        }
        app.post('member/shopmemberadd',{
          token:this.getToken,
          mobile:this.phone
        },r=>{
          this.$router.go(-1);
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
