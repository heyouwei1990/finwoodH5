<template>
    <div class="page-enchashRecord" v-title="$route.query.title">
      <ul class="record-list">
        <li v-for="(item,index) in list" :key="index">
          <div class="item-left">
            <p>账户提现</p>
            <time>{{item.createdTime}}</time>
          </div>
          <div class="amount">-{{item.transAmount}}</div>
        </li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import app from '../../../utils/common'
  export default {
    data () {
      return {
        list:[]
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
      dataInit(){
        app.post('member/presentrecord',{
          token:this.getToken
        },r=>{
          this.list=r.result;
        },true,this);
      }
    }
  }
</script>

<style scoped lang="scss">
  .page-enchashRecord{
    .record-list{
      >li{
        @include bb;
        @include fj;
        width: 100%;
        padding:12px 15px;
        background-color: #fff;
        align-items: center;
      }
      .item-left{
        p{
          font-size:16px;
          color: #333;
          line-height:24px;
        }
        time{
          color: #999;
          font-size:14px;
          line-height:24px;
        }
      }
      .amount{
        font-size:16px;
        color: #333;
      }
    }
  }
</style>
