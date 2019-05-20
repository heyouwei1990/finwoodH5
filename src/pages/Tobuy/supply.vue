<template>
  <div class="supply-page" v-title="'我要供货'">
    <ul class="input-list">
      <li>
        <label><i class="red">*</i>数量</label>
        <input type="number" v-model="quantity" @keyup="fixNumber(1,quantity);" placeholder="请输入供货数量">
        <span class="unit-words">立方米</span>
      </li>
      <li>
        <label><i class="red">*</i>单价</label>
        <input type="number" v-model="price" @keyup="fixNumber(2,price);" placeholder="请输入商品单价">
        <span class="unit-words">元</span>
      </li>
      <li>
        <label><i class="red">*</i>联系人</label>
        <input type="text" v-model="contacts" placeholder="请输入您的真实地址">
      </li>
      <li>
        <label><i class="red">*</i>联系电话</label>
        <input type="number" v-model="phone" placeholder="请输入您的联系方式">
      </li>
      <li>
        <label>其他说明</label>
        <textarea v-model="detail" placeholder="请输入200字以内其他说明" maxlength="200"></textarea>
      </li>
    </ul>
    <div class="greenBtn" @click="confirm();">确定</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { mapGetters, mapActions } from 'vuex'
import app from '../../utils/common'
  export default {
    data () {
      return {
        quantity:null,
        price:null,
        contacts:null,
        phone:null,
        detail:null
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
    methods: {
      ...mapActions([
        'setValue'
      ]),
      dataInit() {
        app.post('member/centerinfo',{
          token:this.getToken
        },(r)=> {
          this.contacts=r.result.name;
          this.phone=r.result.mobile;
        },true,this)
      },
      confirm() {
        if(this.quantity==null) {
          Toast({
            message: '您输入的供货数量',
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(!app.isuInteger(this.quantity))return;
        if(this.price==null) {
          Toast({
            message: '您输入的商品单价',
            position: "bottom",
            duration: 1500
          });
          return;
        }
        if(!app.isuInteger(this.price))return;
        if(!app.isName(this.contacts))return;
        if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.phone))){
          Toast({
            message: '请正确输入的手机号',
            position: "bottom",
            duration: 1500
          });
          return;
        }
        app.post('data/supplyquotate',{
          token:this.getToken,
          inquiryId:Number(this.$route.query.pkid),
          salesPrice:Number(this.price),
          quantity:Number(this.quantity),
          mobile:this.phone,
          contact:this.contacts,
          details:this.detail
        },(r)=> {
          this.setValue({
            title:'返回热门求购',
            page:-3
          })
          this.$router.push({path:'/success'});
        },false,this)
      },
      fixNumber (index,value) {
        let fix;
        if (typeof value === 'string') {
          fix = Number(value.replace(/\D/g, ''));
        }else {
          fix = value
        }
        if(fix>99999999) {
          fix =Number(String(value).substr(0,8));
        }
        if(fix.length<0) {
          fix=0;
        }
        if(index == 1) {
          this.quantity=fix;
        }else if(index == 2) {
          this.price=fix;
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "src/styles/components/inputList";
</style>
