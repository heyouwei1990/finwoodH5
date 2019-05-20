<template>
    <div class="page-reviseOrder" v-title="'修改订单'">
      <mt-field label="修改数量" placeholder="请输入数量" v-model="revisedAmount">{{unitText}}</mt-field>
      <mt-field label="修改价格" placeholder="请输入价格" v-model="revisedPrice">元</mt-field>
      <div class="greenBtn" @click="reviseOrder()">确定</div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Toast } from "mint-ui"
  import app from "../../../utils/common"
  import { mapGetters } from 'vuex'
  export default {
    computed:{
      ...mapGetters([
        'getToken'
      ])
    },
    data(){
      return {
        revisedAmount:this.$route.query.quantity,
        revisedPrice:this.$route.query.salesPrice,
        unitText:this.$route.query.unitText
      }
    },
    methods:{
      reviseOrder(){
        if(this.revisedAmount && !/^[1-9]\d*$/.test(this.revisedAmount)){
          Toast({
            message: '数量应为正整数!',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(this.revisedAmount>this.$route.query.productStockNum){
          Toast({
            message: `当前最大库存为${this.$route.query.productStockNum}`,
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(this.revisedPrice && !/^[1-9]\d*$/.test(this.revisedPrice)){
          Toast({
            message: '价格应为正整数!',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(/^[1-9]\d*$/.test(this.revisedPrice) && !this.revisedAmount){
          //只改价格
          app.post('order/updateprice',{
            token:this.getToken,
            salePrice:this.revisedPrice,
            orderId:this.$route.query.orderId,
            orderItemId:Number(this.$route.query.pkid)
          },(r)=>{
            Toast({
              message: "修改成功!",
              position: "bottom",
              duration: 1500
            });
            this.revisedAmount=null;
            this.revisedPrice=null;
            this.$router.go(-1);
          },false,this)
        }else if(/^[1-9]\d*$/.test(this.revisedAmount) && !this.revisedPrice){
          //只改数量
          app.post('order/updateqty',{
            token:this.getToken,
            quantity:this.revisedAmount,
            orderId:this.$route.query.orderId,
            orderItemId:Number(this.$route.query.pkid)
          },(r)=>{
            Toast({
              message: "修改成功!",
              position: "bottom",
              duration: 1500
            });
            this.revisedAmount=null;
            this.revisedPrice=null;
            this.$router.go(-1);
          },false,this)
        }else if(/^[1-9]\d*$/.test(this.revisedAmount) && /^[1-9]\d*$/.test(this.revisedPrice)){
          //数量价格一起改
          app.post('order/updateqty',{
            token:this.getToken,
            quantity:Number(this.revisedAmount),
            orderId:Number(this.$route.query.orderId),
            orderItemId:Number(this.$route.query.pkid)
          },(r)=>{
            app.post('order/updateprice',{
              token:this.getToken,
              salePrice:Number(this.revisedPrice),
              orderId:Number(this.$route.query.orderId),
              orderItemId:Number(this.$route.query.pkid)
            },(r)=>{
              Toast({
                message: "修改成功!",
                position: "bottom",
                duration: 1500
              });
              this.revisedAmount=null;
              this.revisedPrice=null;
              this.$router.go(-1);
            },false,this)
          },false,this)
        }
      }
    }
  }
</script>
