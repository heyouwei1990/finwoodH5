<template>
  <div class="publish-page" v-title="'发布求购'">
    <ul class="input-list">
      <li>
        <label><i class="red">*</i>品种</label>
        <input type="text" v-model="goodName" placeholder="请输入产品名称">
      </li>
      <li>
        <label><i class="red">*</i>数量</label>
        <input type="text" v-model="amount" placeholder="请输入求购数量">
        <span class="unit-words">m³</span>
      </li>
      <li>
        <label><i class="red">*</i>规格</label>
        <input type="text" v-model="specification" placeholder="请输入规格数量">
        <span class="unit-words">mm</span>
      </li>
      <li>
        <label><i class="red">*</i>交货地</label>
        <input type="text" v-model="address" placeholder="请输入交货地址">
      </li>
      <li>
        <label><i class="red">*</i>双方议价</label>
          <mt-radio class="radio-box" v-model="bargaining" :options="name">
        </mt-radio>
      </li>
      <li v-if="bargaining=='否'">
        <label><i class="red">*</i>意向价格</label>
        <input type="number" v-model="price" placeholder="请输入期望价格">
        <span class="unit-words">元</span>
      </li>
      <li>
        <label><i class="red">*</i>联系人</label>
        <input type="text" v-model="buyer" placeholder="请输入您的真实姓名">
      </li>
      <li>
        <label><i class="red">*</i>联系电话</label>
        <input type="number" v-model="tel" placeholder="请输入您的联系方式">
      </li>
      <!--<li>
        <label>产品用途</label>
        <input type="text" v-model="todo" placeholder="选填，您可以输入用作家具或其他用途">
      </li>-->
      <li>
        <label>其他要求</label>
        <textarea v-model="demand" maxlength="200" placeholder="请输入200字以内其他要求"></textarea>
      </li>
    </ul>
    <div class="greenBtn" @click="warn">立即发布</div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import { mapGetters, mapActions } from 'vuex'
  import app from '../../utils/common'
  export default {
    data() {
      return {
        bargaining: '是',//双方议价
        name: ['是', '否'],
        goodName: '', //品名
        amount: '',   //数量
        address: '',  //交货地址
        price: null,    //意向价格
        buyer: '',    //联系人
        tel: '',      //联系方式
        todo: '',     //用途
        demand: '',    //其他要求
        specification:null,   //规格
      }
    },
    computed: {
      ...mapGetters([
				'getToken'
			]),
      testAmount() {
        return /^[1-9]\d*$/g.test(this.amount)
      },
      testPrice() {
        return /^[1-9]\d*$/g.test(this.price)
      }
    },
    created () {
      this.dataInit();
    },
    watch: {
      amount:function() {
        if(this.amount.length>10) {
          setTimeout(()=>{
            this.amount=this.amount.substring(0,10);
          },10)
        }
      },
//      specification:function() {
//        if(this.specification.length>10) {
//          setTimeout(()=>{
//            this.specification=this.specification.substring(0,10);
//          },10)
//        }
//      },
      goodName:function() {
        if(this.goodName.length>40) {
          setTimeout(()=>{
            this.goodName=this.goodName.substring(0,40);
          },10)
        }
      },
      address:function() {
        if(this.address.length>20) {
          setTimeout(()=>{
            this.address=this.address.substring(0,20);
          },10)
        }
      },
      demand:function() {
        if(this.goodName.length>200) {
          setTimeout(()=>{
            this.goodName=this.goodName.substring(0,200);
          },10)
        }
      }
    },
    methods: {
      ...mapActions([
        'setValue'
      ]),
      dataInit() {
        app.post('member/centerinfo',{
          token:this.getToken
        },(r)=> {
          this.buyer=r.result.name;
          this.tel=r.result.mobile;
        },true,this)
      },
      warn() {
        //产品名称不能为空
        if (this.goodName.trim() == '') {
          Toast({
            message: '请输入产品名称',
            position: 'bottom',
            duration: 1500
          })
          return;
        }
        if(this.amount == ''){
          Toast({
            message: '请输入数量',
            position: 'bottom',
            duration: 1500
          })
          return;
        }
        if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(this.amount)){
          Toast({
            message: '数量格式不正确',
            position: 'bottom',
            duration: 1500
          })
          return;
        }
        if(this.specification==null) {
          Toast({
            message: '请输入规格',
            position: 'bottom',
            duration: 1500
          })
          return;
        }
        //交货地址不能为空
        if(this.address==''){
          Toast({
            message: '请输入交货地址',
            position: 'bottom',
            duration: 1500
          })
          return;
        }
        //意向价格不能为空
        if(this.bargaining=='否' && this.price==null){
          Toast({
            message: '请输入意向价格',
            position: 'bottom',
            duration: 1500
          })
          return;
        }
        if(this.bargaining=='否' && !this.testPrice){
          Toast({
            message: '价格必须是正整数',
            position: 'bottom',
            duration: 1500
          })
          return;
        }
        if(!app.isName(this.buyer))return;
        if(!app.isPhone(this.tel))return;
        app.post('data/submitinquiry',{
          token:this.getToken,
          varietyName:this.goodName,
          specification:this.specification,
          quantity:Number(this.amount),
          deliveryAddress:this.address,
          purchasePrice:this.bargaining=='是'?0:Number(this.price),
          contact:this.buyer,
          mobile:this.tel,
          details:this.demand
        },(r)=>{
          if(this.$route.query.page == 'item2') {
            app.setStore('selected','item2');
            this.setValue({
              title:'返回最新求购',
              page:-2
            })
          }else {
            this.setValue({
              title:'返回热门求购',
              page:-2
            })
          }
          this.$router.push({path:'/success'});
        },false,this)
      }
    }
  }
</script>

<style lang="scss">
@import "src/styles/components/inputList";
  .publish-page {
    .radio-box .mint-radiolist-title{
      margin:0;
    }
    .radio-box .mint-cell-wrapper,
    .radio-box .mint-radiolist-label{
      padding:0;
    }
    .mint-radiolist {
      @include fj;
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      left:15px;
    }
    .mint-radio-input:checked + .mint-radio-core {
      background:$primary;
      border-color:$primary;
    }
    .mint-cell {
      min-height: inherit;
    }
    .mint-cell:last-child {
      background-image: none;
    }
    .mint-cell-wrapper {
      background-image: none;
    }
  }
</style>
