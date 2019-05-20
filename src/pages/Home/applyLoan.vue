<template>
    <div class="page-applyLoan" v-title="'申请贷款'">
      <div class="mark"></div>
      <div class="mark1"></div>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i>*</i>贷款种类</span>
          </div>
          <input v-model="loanStyle" @click="popup()" readonly placeholder="请选择贷款种类" type="text" class="mint-field-core">
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i>*</i>申请人</span>
          </div>
          <input v-model="applicant" placeholder="请输入申请人" type="text" class="mint-field-core">
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i>*</i>申请金额</span>
          </div>
          <input v-model="applyAmount" maxlength="7" placeholder="请输入申请金额" type="tel" class="mint-field-core">
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i>*</i>联系方式</span>
          </div>
          <input v-model="phone" @blur="testPhone()" placeholder="请输入联系方式" type="text" class="mint-field-core">
        </div>
      </a>
      <p class="hot-tel"><a :href="'tel:'+getGlobalInfo.serviceTel">咨询电话：{{getGlobalInfo.serviceTel}}</a></p>
      <div class="greenBtn" @click="submit();">提交申请</div>
      <mt-popup
        v-model="popupVisible"
        position="bottom">
        <p class="confirm">
          <button class="left" @click="cancel();">取消</button>
          <button class="right" @click="affirm();">确认</button>
        </p>
        <mt-picker :slots="slots" :valueKey="valKey" @change="onValuesChange"></mt-picker>
      </mt-popup>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from 'mint-ui'
  import app from '../../utils/common'
  import { mapGetters } from 'vuex'

  export default {
    computed: {
			...mapGetters([
        'getToken',
        'getGlobalInfo'
      ]),
      slots:function() {
        return [{
          flex: 1,
          defaultIndex: 0,
          values: this.getGlobalInfo.lstLoanType,
        }]
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     if(vm.getToken == null) {
    //       next('/login');
    //     }
    //   })
    // },
    data(){
      return{
        popupVisible:false,
        loanStyle:this.$route.query.text,
        loanValue:this.$route.query.type,
        applicant:'',
        applyAmount:'',
        phone:'',
        // slots:[{
        //   flex: 1,
        //   defaultIndex: 0,
        //   values: [],
        // }],
        valKey:'text',
        selected:''
      }
    },
    mounted () {
      this.dataInit();
      app.preventDefault();
    },
    methods:{
      dataInit() {
        app.post('member/centerinfo',{
          token:this.getToken
        },(r)=> {
          this.applicant=r.result.name;
          this.phone=r.result.mobile;
        },true,this)
      },
      //验证联系方式
      testPhone(){
        if(!/^1\d{10}$/.test(this.phone) && !/^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/.test(this.phone)){
          Toast({
            message:'联系方式不正确',
            position:'bottom',
            duration: 1500
          })
        }
      },
      onValuesChange(picker,value){
        this.selected=value;
      },
      popup(){
        event.target.blur()
        this.popupVisible = true;
      },
      cancel(){
        this.popupVisible = false;
      },
      affirm(){
        this.loanStyle=this.selected[0].text;
        this.loanValue=this.selected[0].value;
        this.popupVisible = false;
      },
      //提交
      submit() {
        //if(!app.isName(this.applicant))return;
        if(this.applicant.length>=10 && this.applicant.length<=1)return;
        if(!app.isuInteger(this.applyAmount))return;
        if(!app.isPhone(this.phone))return;
        app.post('data/applyloan',{
          token:this.getToken,
          contactMobile:this.phone,
          contactName:this.applicant,
          loanAmount:Number(this.applyAmount),
          loanType:Number(this.loanValue)
        },(r)=>{
          Toast({
            message: '提交成功!',
            position: 'bottom',
            duration: 1500
          });
          this.$router.go(-1);
        },false,this)
      }
    }
  }
</script>

<style lang="scss">
  .page-applyLoan{
    .mark {
      width: 100%;
      height: 48px;
      position: absolute;
      top: 48px;
      left: 0;
      z-index: 9;
    }
    .mark1 {
      width: 100%;
      height: 48px;
      position: absolute;
      top: 144px;
      left: 0;
      z-index: 9;
    }
    .mint-cell-wrapper{ //该默认label字体16px为14px
      font-size:14px;
    }
    .mint-cell-text i {
      font-style: normal;
      color: $danger;
    }
    .mint-popup {
       width: 100%;
    }
    .confirm {
      height: px2rem(60px);
      button {
        width: px2rem(110px);
        height: px2rem(60px);
      	font-size: 14px;
        background-color: transparent;
        border: none;
        &:nth-of-type(1) {
          color: #333;
        }
        &:nth-of-type(2) {
          color: $primary;
        }
      }
    }
    .custom {
      width: auto;
      margin-right: px2rem(30px);
      position: relative;
      top: -1px;
    }
    .width {
      width: px2rem(150px);
    }
    .input {
      width: px2rem(100px);
      height: 22px;
      line-height:20px;
      padding: 0 px2rem(15px);
      border: 1px solid #dcdcdc;
      border-radius: 2px;
    }
    .hot-tel{
      padding-left:15px;
      padding-right:15px;
      line-height:24px;
      font-size:12px;
      color: #666;
      margin-top:15px;
    }
  }
</style>
