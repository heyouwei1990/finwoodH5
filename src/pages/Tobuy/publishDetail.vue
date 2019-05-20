<template>
  <div class="page-publish" v-title="'求购详情'">
    <ul class="input-list">
      <li>
        <label>品种</label>
        <span class="val-txt">{{details.varietyName}}</span>
      </li>
      <li>
        <label>数量</label>
        <span class="val-txt">{{details.quantity}}{{$route.query.unitName}}</span>
      </li>
      <li>
        <label>交货地</label>
        <span class="val-txt">{{details.deliveryAddress}}</span>
      </li>
      <li v-if="details.purchasePrice !=0">
        <label>意向价格</label>
        <span class="val-txt">{{details.purchasePrice}}元</span>
      </li>
      <li v-if="details.purchasePrice ==0">
        <label>意向价格</label>
        <span class="val-txt">面议</span>
      </li>
      <!-- <li>
        <label>联系人</label>
        <span class="val-txt">{{details.contact}}</span>
      </li>
      <li>
        <label>联系电话</label>
        <span class="val-txt">{{details.mobile}}</span>
        <a :href="'tel:'+getGlobalInfo.serviceTel" class="small-btn-green">联系客服</a>
      </li> -->
      <li>
        <label>联系电话</label>
        <span class="val-txt">{{getGlobalInfo.serviceTel}}</span>
        <a :href="'tel:'+getGlobalInfo.serviceTel" class="small-btn-green">联系客服</a>
      </li>
      <!--<li>
        <label>产品用途</label>
        <span class="val-txt">家具</span>
      </li>-->
      <li>
        <label>其他要求</label>
        <div class="demand">{{details.details}}</div>
      </li>
    </ul>
    <router-link v-show="$route.query.status!='2'" :to="{path:'/supply',query:{pkid:$route.query.pkid}}" tag="div" class="greenBtn">我要供货</router-link>
  </div>
</template>

<script>
import app from '../../utils/common'
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        details:{
          varietyName:null,
        }
      }
    },
    mounted() {
      this.dataInit();
    },
    computed: {
			...mapGetters([
        'getGlobalInfo'
			])
    },
    methods: {
      async dataInit() {
        app.post('data/inquirydetail',{
          pkid:Number(this.$route.query.pkid)
        },(r)=> {
          this.details=r.result;
        },true)
      }
    }
  }
</script>

<style lang="scss">
  @import "src/styles/components/inputList";
</style>
