<template>
  <div class="cart-page" v-title="'购物车'">
    <div>
      <section v-if="cartList[0].shopId!=null" class="cart-group" v-for="(item,index) in cartList" :key="item.shopId">
        <div class="hd" @click="itemCheck(item.shopName);">
          <checkbox ref='shopName' :name="item.shopName"><span>{{item.shopName}}</span></checkbox>
        </div>
        <ul class="cart-list">
          <li @click="inspect();" v-for="(value,Index) in item.products" :key="Index" :class="[value.stockQuantity==0?'empty':'']" v-if="value.saleStatus == 3">
            <mt-cell-swipe :right="[{
              content: '删除',
              style: { background: 'red', color: '#fff' },
              handler: () => remove(value.pkid)
            }]">
              <checkbox ref='goods' :name="item.shopName" :row="index" :line="Index">
                <dl class="goods-dl">
                  <dt @click="$router.push({path:'/detail',query:{pkid:value.productId}})"><img v-lazy='value.imageUrl' alt=""></dt>
                  <dd>
                    <div class="desc" @click="$router.push({path:'/detail',query:{pkid:value.productId}})">{{value.productName}}</div>
                    <!--<div class="gray">规格：{{value.specification}}</div>-->
                    <div class="flex">
                      <span class="price"
                      v-if="value.salesPrice!=value.salesPriceUpper">
                      ￥{{value.salesPrice}}~{{value.salesPriceUpper}}</span>
                      <span class="price"
                      v-if="value.salesPrice==value.salesPriceUpper">￥{{value.salesPrice}}</span>
                      <!-- 加减区域 -->
                      <div class="counter-component" v-if="value.stockQuantity>0">
                        <div class="counter-btn" @click="edit(index,Index,value.quantity-1);"></div>
                        <div class="counter-show">
                          <input type="number" v-model="value.quantity" @blur="fixNumber(index,Index);">
                        </div>
                        <div class="counter-btn" @click="edit(index,Index,value.quantity+1);"></div>
                      </div>
                      <!-- 加减区域 end -->
                      <span v-show="!value.status" class="vol">m³</span>
                    </div>
                  </dd>
                </dl>
              </checkbox>
            </mt-cell-swipe>
          </li>
          <li @click="inspect();" v-for="(value,Index) in item.products" :key="Index" class="empty1" v-if="value.saleStatus != 3">
            <mt-cell-swipe :right="[{
              content: '删除',
              style: { background: 'red', color: '#fff' },
              handler: () => remove(value.pkid)
            }]">
              <dl class="goods-dl">
                <dt><img v-lazy='value.imageUrl' alt=""></dt>
                <dd>
                  <div class="desc">{{value.productName}}</div>
                  <!--<div class="gray">规格：{{value.specification}}</div>-->
                  <div class="flex">
                      <span class="price"
                            v-if="value.salesPrice!=value.salesPriceUpper">
                      ￥{{value.salesPrice}}~{{value.salesPriceUpper}}</span>
                    <span class="price"
                          v-if="value.salesPrice==value.salesPriceUpper">￥{{value.salesPrice}}</span>
                    <!--<span class="price" v-else>￥{{value.salesPrice}}</span>-->
                  </div>
                </dd>
              </dl>
            </mt-cell-swipe>
          </li>
        </ul>
      </section>
    </div>
    <div class="fixed-bottom">
      <div class="flex-left">
        <span @click="allCheck();"><checkbox ref='all'><span>全选</span></checkbox></span>
        <div class="total-price">合计：<span class="price">¥{{sumPrice}}</span></div>
      </div>
      <div class="btn-submit" @click="affirmOrder();">确认下单 <span>({{sum}})</span></div>
    </div>
    <div class="no-data" v-show="cartList.length==0">
      <div class="empty-img"></div>
      <p>购物车竟然是空的</p>
      <div class="goto" @click="$router.push({path:'/store'})">快去逛逛吧</div>
    </div>
  </div>
</template>

<script>
  import Checkbox from '@/components/checkbox';
  import { MessageBox,Toast } from 'mint-ui';
  import app from "../../utils/common"
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      Checkbox
    },
    data() {
      return {
        checkStatus:false,
        cartList:[],
        sum:0,
        sumPrice:0,
        timeout:0
      }
    },
    mounted () {
      this.getCartList();
    },
    computed: {
      ...mapGetters([
        'getToken'
      ]),
    },
    methods: {
      ...mapActions([
        'setAddress'
      ]),
      //获取购物车列表
      getCartList() {
        app.post('member/mycart',{
          token:this.getToken
        },(r)=>{
          this.cartList=r.result;
          this.inspect();
        },true,this)
      },
      updateproductcount(pkid,quantity) {
        app.post('order/updateproductcount',{
          token:this.getToken,
          cartId:pkid,
          quantity:quantity
        },(r)=>{
          this.getCartList();
        },false,this)
      },
      //计算购物车金额
      calcartamount(cartIds) {
        app.post('order/calcartamount',{
          token:this.getToken,
          cartIds:cartIds
        },(r)=>{
          this.sumPrice=r.result.total;
          this.sum=r.result.quantity;
        },false,this)
      },
      //商品单选
      async inspect() {
        var self=this;
        setTimeout(()=> {
          let cartIds=[];
          if(!self.$refs.goods){
            return;
          }
          for(var i=0;i<self.$refs.goods.length;i++) {
            let row=self.$refs.goods[i].row;
            let line=self.$refs.goods[i].line;
            if(self.$refs.goods[i].isCheck) {
              self.cartList[row].products[line].isCheak=true;
              cartIds.push(self.cartList[row].products[line].pkid);
            }else {
              self.cartList[row].products[line].isCheak=false;
            }
          }
          if(cartIds.length>0){
            this.calcartamount(cartIds)
          }else {
            this.sum=0;
            this.sumPrice=0;
          }
        })
      },
      //店铺全选
      itemCheck(name) {
        setTimeout(()=>{
          if(!this.$refs.goods){
            return;
          }
          let type=false;
          for(var i=0;i<this.$refs.shopName.length;i++) {
            if(this.$refs.shopName[i].name == name) {
              type=this.$refs.shopName[i].isCheck;
            }
          }
          for(var i=0;i<this.$refs.goods.length;i++) {
            if(this.$refs.goods[i].name == name) {
              this.$refs.goods[i].isCheck=type;
              let row=this.$refs.goods[i].row;
              let line=this.$refs.goods[i].line;
              this.cartList[row].products[line].isCheak=type;
            }
          }
          this.inspect();
        },20);
      },
      //全选
      allCheck() {
        setTimeout(()=>{
          let self=this;
          if(self.cartList.length==0) {
            MessageBox.alert('购物车是空的！').then(action => {
              self.$refs.all.cancel();
            });
            return;
          }
          if(self.cartList.length>1) {
            MessageBox.alert('当前购物车包含多个商家，无法全选').then(action => {
              self.$refs.all.cancel();
            });
            return;
          }
          var type=false;
          type=this.$refs.all.isCheck;
          this.$refs.shopName[0].isCheck=type;
          for(var i=0;i<this.$refs.goods.length;i++) {
            this.$refs.goods[i].isCheck=type;
            let row=this.$refs.goods[i].row;
            let line=this.$refs.goods[i].line;
            this.cartList[row].products[line].isCheak=type;
          }
          this.inspect();
        },20);
      },
      //下单
      affirmOrder () {
        let count=0;
        let data=[];
        let shopId=null;
        for (let i=0;i<this.cartList.length;i++) {
          let goods=this.cartList[i];
          for(let j=0;j<goods.products.length;j++) {
            if (goods.products[j].isCheak) {
              if(goods.products[j].shopId != shopId){
                count++;
                shopId=goods.products[j].shopId;
              }
              data.push(goods.products[j].pkid);
            }
          }
        }
        if(count==0) {
          Toast({
            message: '请选择商品',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        if(count>1) {
          Toast({
            message: '当前购物车包含多个商家，无法下单',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        this.setAddress(null);
        app.removeStore('distribution');
        app.removeStore('cartBack');
        this.$router.push({path:'/order',query:{cartIds:data.join(","),type:'cart'}});
      },
      //删除
      remove (pkid) {
        setTimeout(()=>{
          MessageBox.confirm('确定删除该商品?').then(action => {
            app.post('order/delcartproduct',{
              token:this.getToken,
              pkid:pkid,
            },(r)=>{
              // for(let i=0;i<this.cartList.length;i++) {
              //   let detail=this.cartList[i].products;
              //   for(let j=0;j<detail.length;j++) {
              //     if(detail[j].pkid == pkid){
              //       if(detail.length == 1) {
              //         this.cartList.splice(i,1);
              //         this.inspect();
              //       }else {
              //         detail.splice(j,1);
              //         this.inspect();
              //       }
              //     }
              //   }
              // }
              this.getCartList();
            },false,this)
          }).catch(action=>{});
        },50)
      },
      fixNumber (index,Index) {
        if(this.timeout!=0){
          return;
        }
        this.timeout=1;
        setTimeout(()=>{
          this.timeout=0;
        },200)
        let number=this.cartList[index].products[Index].quantity;
        let minimumOrderQuantity=this.cartList[index].products[Index].minimumOrderQuantity;
        let stockQuantity=this.cartList[index].products[Index].stockQuantity;
        if (typeof number === 'string') {
          number = Number(number.replace(/\D/g, ''));
        }
        if (number < minimumOrderQuantity) {
          number = minimumOrderQuantity;
          Toast({
            message: '最小数量不能少于最小起订量',
            position: 'bottom',
            duration: 1500
          });
        }
        if (number > stockQuantity) {
          number = stockQuantity;
          Toast({
            message: '库存已上限',
            position: 'bottom',
            duration: 1500
          });
        }
        this.updateproductcount(this.cartList[index].products[Index].pkid,number)
      },
      edit(index,Index,quantity) {
        if(this.timeout!=0){
          return;
        }
        this.timeout=1;
        setTimeout(()=>{
          this.timeout=0;
        },200)
        let minimumOrderQuantity=this.cartList[index].products[Index].minimumOrderQuantity;
        let stockQuantity=this.cartList[index].products[Index].stockQuantity;
        if (quantity < minimumOrderQuantity) {
          Toast({
            message: '最小数量不能少于最小起订量',
            position: 'bottom'
          });
          return;
        }
        if (quantity > stockQuantity) {
          Toast({
            message: '库存已上限',
            position: 'bottom'
          });
          return;
        }
        this.updateproductcount(this.cartList[index].products[Index].pkid,quantity)
      }
    }
  }
</script>

<style lang="scss">
  @import "src/styles/components/goods";
  @import "src/styles/components/counter";
  .cart-page{
    margin-bottom:44px;
    .mint-cell-value,
    .mint-cell-value .checkbox,
    .mint-cell-value .check-label{
      width: 100%;
    }
    .hd {
      @include bb;
      background-color: #fff;
      height: px2rem(75px);
      padding: px2rem(14px) 10px;
    }
    .cart-group{
      margin-bottom:px2rem(15px);
    }
    .cart-list{
      background-color: #fff;
      padding-top:px2rem(10px);
    }
    .cart-list>li{
      padding:px2rem(18px) 0px;
    }
    .gray{
      font-size:14px;
      line-height:20px;
      color: #999;
      margin-top: 4px;
    }
    .flex{
      @include fj;
      align-items: center;
      -webkit-align-items: center;
      white-space:nowrap;
      position: absolute;
      left:0;
      bottom:0;
      width: 100%;
      .price{
        flex: 1;
        min-width: 1px;
      }
      .vol{
        font-size:14px;
        color: #666;
      }
      .iconfont{
        font-size:12px;
        color: #666;
      }
    }
    .goods-dl{
      z-index:4;
      width: 100%;
      padding:0 0 0 px2rem(160px);
      margin: 0;
      min-height: px2rem(140px);
    }
    .goods-dl>dt{
      left:0;
      width: px2rem(140px);
      height:px2rem(140px);
    }
    .goods-dl>dd{
      padding-bottom:30px;
      min-height: px2rem(140px);
    }
    .mint-cell-title{
      display: none;
    }
    .empty{
      .price{
        color: #999;
      }
      .goods-dl>dt:before{
        content: '';
        position: absolute;
        width: 100%;
        height:100%;
        left:0;
        top:0;
        z-index:2;
        background:rgba(0,0,0,.5) url("../../images/empty.png") no-repeat center;
        -webkit-background-size: 60%;
        background-size: 60%;
      }
    }
    .empty1{
      .price{
        color: #999;
      }
      .goods-dl {
        margin-left: 30px;
      }
      .goods-dl>dt:before{
        content: '';
        position: absolute;
        width: 100%;
        height:100%;
        left:0;
        top:0;
        z-index:2;
        background:rgba(0,0,0,.5) url("../../images/empty1.png") no-repeat center;
        -webkit-background-size: 60%;
        background-size: 60%;
      }
    }
    .mint-cell-wrapper{
      background-image: none;
      padding:0 10px;
    }
    .mint-cell{
      background-image: none;
    }
    .mint-cell-swipe-buttongroup{
      display: table;
    }
    .mint-cell-swipe-button{
      display: table-cell;
      vertical-align: middle;
    }
	 	@media only screen and (min-width:500px){
		    .fixed-bottom{
		        max-width: $bodyWidth;
		    }
		}
    .fixed-bottom{
      @include fj;
      @include cl;
      align-items: center;
      -webkit-align-items: center;
      height:44px;
      position: fixed;
      z-index:9;
      bottom:0;
      left: 50%;
      width: 100%;
      transform: translateX(-50%);
      background-color: #fff;
      border-top:1px solid $light;
      font-size:14px;
      padding-left:15px;
      .flex-left{
        @include fj('start');
        align-items: center;
      }
      .total-price{
        margin-left:10px;
        .price{
          color: $danger;
          font-size:16px;
        }
      }
      .btn-submit{
        width: px2rem(236px);
        text-align: center;
        font-size:14px;
        color: #fff;
        background-color: $danger;
        height:100%;
        line-height:44px;
        >span{
          font-size:12px;
        }
      }
    }
    .no-data{
    position: absolute;
    left:0;
    top:0px;
    z-index:10;
    width: 100%;
    height:100%;
    background-color: #fff;
    padding-bottom:px2rem(88px);
    padding:px2rem(188px) 15px px2rem(88px);
    text-align: center;
    .empty-img{
      width: px2rem(233px);
      height:px2rem(233px);
      margin: 0 auto;
      background: url("../../images/noCart.png") no-repeat;
      background-size: cover;
    }
    >p{
      font-size:16px;
      color: #666;
      line-height:1.5;
      margin-top:22px;
      margin-bottom:10px;
    }
    .goto{
      font-size:14px;
      color: $primary;
      line-height:1.5;
    }
  }
  }
  .cart-page .empty [type="checkbox"]{
    display: none;
  }
  .cart-page .empty .check-label:before{
    display: none;
  }
  .icon-guanbi {
    font-size: 18px!important;
  }
</style>
