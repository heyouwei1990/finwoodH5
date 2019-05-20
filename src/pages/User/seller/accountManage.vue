<template>
    <div class="page-accountManage" v-title="'多账号管理'">
      <ul class="account-list">
        <li v-for="item in list" :key="item.bindPkid">
          <mt-cell-swipe
            :right="[{
            content:'删除',
            style:{
              background:'red',
              color:'#fff'
            },
            handler:()=>remove(item.bindPkid)
          }]">
            <div class="account-dl">
              <!--<div class="account-dt"><img src="../../../images/user/avatar.png" /></div>-->
              <div class="account-dd">
                <div class="top">
                  <div class="account-no">{{item.mobile}}</div>
                  <div class="account-title">{{item.name}}</div>
                </div>
                <!--<div class="account-mark">主账号</div>-->
              </div>
            </div>
          </mt-cell-swipe>
        </li>
      </ul>
      <router-link tag="div" :to="{path:'/accountEdit'}" class="greenBtn">添加新成员</router-link>
    </div>
</template>

<script type="text/ecmascript-6">
  import { MessageBox } from 'mint-ui'
  import { mapGetters } from "vuex"
  import app from "@/utils/common"
  export default {
    data(){
      return{
        list:[]
      }
    },
    computed: {
      ...mapGetters(["getToken"])
    },
    mounted () {
      this.dataInit();
    },
    methods:{
      dataInit() {
        app.post("member/listshopmember",{
          token:this.getToken
        },r=>{
          this.list = r.result;
        })
      },
      remove(pkid){
        setTimeout(()=>{
          MessageBox.confirm('您是否确认删除该成员？','芬木提示').then(action=>{
            app.post('member/shopmemberdel',{
              token:this.getToken,
              bindPkid:pkid
            },r=>{
              this.dataInit();
            })
          }).catch(action=>{});
        },50)
      }
    }
  }
</script>

<style lang="scss">
  .page-accountManage{
    .mint-cell-text{
      padding:0;
    }
    .mint-cell-swipe-button{
      padding:0 20px;
    }
    .account-list>li{
      border-bottom:1px solid $light;
    }
    .mint-cell-value{
      width: 100%;
    }
    .account-dl{
      @include fj();
      width: 100%;
      align-items: center;
      padding:px2rem(30px) 0;
      background-color: #fff;
    }
    .account-dt{
      width: px2rem(108px);
      height:px2rem(108px);
      border-radius: 50%;
      background-color: #eee;
      margin-right:px2rem(24px);
      overflow: hidden;
    }
    .account-dt>img{
      width: 100%;
      height:100%;
      border-radius: 50%;
    }
    .account-dd{
      flex: 1;
      .top{
        @include fj;
        font-size:14px;
        color: $dark;
        line-height:24px;
      }
    }
    .account-mark{
      color: #999;
      font-size:14px;
      line-height:24px;
    }
    .mint-cell-swipe-buttongroup{
      display: table;
    }
    .mint-cell-swipe-button{
      display: table-cell;
      vertical-align: middle;
    }
  }
</style>
