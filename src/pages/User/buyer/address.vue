<template>
  <div class="page-address" v-title="'收货地址管理'">
    <div class="addressList" v-if="list[0].pkid!=null" v-for="(item,index) in list" :key="index">
      <div class="detail" @click="selectAddress(index);">
        {{item.consignee}}&nbsp;&nbsp;{{item.consigneeMobile}}
        <p>{{item.provinceName}}{{item.cityName}}{{item.address}}</p>
      </div>
      <div class="edit">
        <div class="checkbox">
          <input type="checkbox" v-model="item.isDefaultName">
          <div class="check-label" v-if="item.isDefault != 0">
            默认地址
          </div>
          <div class="check-label" v-if="item.isDefault == 0">
            设为默认
          </div>
          <div class="mark" @click="changeAddress(item.pkid,index);"></div>
        </div>
        <div class="editBtn">
          <span @click="$router.push({path:'/addAddress',query:{pkid:item.pkid,title:'编辑收货地址'}})"><i class="iconfont icon-bianji"></i> 编辑</span>
          <span @click="deletAddress(item.pkid);"><i class="iconfont icon-lajitong"></i> 删除</span>
        </div>
      </div>
    </div>
    <router-link tag="div" :to="{path:'/addAddress',query:{pkid:0,title:'添加收货地址'}}" class="greenBtn fixed-bottom">+ 添加收货地址</router-link>
    <div class="no-data" v-if="list.length==0">
      <div class="empty-img"></div>
      <p>您暂时没有收货地址</p>
      <router-link tag="div" :to="{path:'/addAddress',query:{pkid:0,title:'添加收货地址'}}" class="goto">快去设置吧</router-link>
    </div>
  </div>
</template>

<script>
  import { MessageBox, Toast } from "mint-ui";
  import { mapGetters, mapActions } from "vuex";
  import app from "../../../utils/common";
  export default {
    data() {
      return {
        list: [{pkid:null}]
      };
    },
    computed: {
      ...mapGetters([
        "getToken",
        "getAddress"
      ])
    },
    mounted() {
      this.dataInit();
    },
    methods: {
      ...mapActions([
        'setAddress'
      ]),
      //数据初始化
      async dataInit() {
        app.post(
          "member/listshoppingaddr",{
            token: this.getToken,
            pageIndex: 1
          },r => {
            if(r.result.list != null) {
              this.list = r.result.list;
              for(let i=0;i<this.list.length;i++) {
                if(this.list[i].isDefault==1){
                  this.list[i].isDefaultName=true;
                }else {
                  this.list[i].isDefaultName=false;
                }
              }
            }else {
              this.list=[];
            }
          },true,this);
      },
      //改变默认地址
      async changeAddress(pkid,index) {
        if(this.list[index].isDefault==1)return;
        app.post('member/setdefaultaddr',{
          token: this.getToken,
          pkid:pkid
        },(r)=>{
          Toast({
            message: '设置默认地址成功',
            position: 'bottom',
            duration: 1500
          });
          for(let i=0;i<this.list.length;i++){
            this.list[i].isDefault=0;
            this.list[i].isDefaultName=false;
          }
          this.list[index].isDefault=1;
          this.list[index].isDefaultName=true;
          //this.dataInit();
        },false,this)
      },
      //删除地址
      deletAddress(pkid) {
        MessageBox.confirm("您是否确认删除地址？", "芬木提示")
          .then(action => {
            app.post('member/delshoppingaddr',{
              token:this.getToken,
              pkid:pkid
            },(r)=>{
              Toast({
                message: '删除成功！',
                position: 'bottom',
                duration: 1500
              });
              if(this.getAddress !=null&&this.getAddress.pkid == pkid) {
                this.setAddress(null);
              }
              this.dataInit();
            },false,this)
          })
          .catch(action => {});
      },
      //选择地址
      selectAddress(index) {
        if(this.$route.query.select) {
          this.setAddress(this.list[index]);
          this.$router.go(-1);
        }
      }
    }
  };
</script>

<style lang="scss">
  .page-address {
    padding-bottom:44px;
    .addressList {
      background: #fff;
      padding: 0 15px;
      margin-bottom: 10px;
      .detail {
        font-size: 16px;
        padding: 14px 0;
        p {
          color: #666;
          font-size: 14px;
          @include bb;
          padding:10px 0;
        }
      }
    }
    .edit {
      @include fj;
      align-items: center;
      height: 24px;
      padding-bottom: 16px;
      font-size: 14px;
      color: #666;
      .editBtn {
        .iconfont{
          vertical-align: middle;
          margin-top:-3px;
        }
        .icon-lajitong{
          font-size:20px;
          height:20px;
          line-height:20px;
          margin-top:-5px;
        }
        span {
          color: #999;
          font-size: 14px;
          padding: 0 6px;
        }
      }
    }
    .checkbox {
      position: relative;
      display: inline-block;
      .mark {
        position: absolute;
        width: 150px;
        height: 40px;
        top: -10px;
        left:0;
        z-index: 9;
      }
    }
    input[type="checkbox"] {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 3;
    }
    .check-label {
      display: inline-block;
      position: relative;
      padding-left: 30px;
      &:before,
      &:after {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
      }
      &:before {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #e4e4e4;
        margin-top: -10px;
      }
    }
    input:checked + .check-label:before {
      background-color: $primary;
      border-color: $primary;
    }
    input:checked + .check-label:after {
      top: 50%;
      left: 8px;
      box-sizing: border-box;
      width: 6px;
      height: 12px;
      margin-top: -6px;
      transform: rotate(45deg);
      border-width: 2px;
      border-style: solid;
      border-color: #fff;
      border-top: 0;
      border-left: 0;
    }

	 	@media only screen and (min-width:500px){
	    .fixed-bottom{
	        max-width: $bodyWidth;
	    }
		}
    .fixed-bottom{
      position: fixed;
      left:50%;
      bottom:0;
      z-index:10;
      width: 100%;
      transform: translateX(-50%);
      height:44px;
      line-height:44px;
      font-size:16px;
      margin:0;
      border-radius: 0;
    }
    .no-data{
      position: absolute;
      left:0;
      top:0;
      z-index:2;
      width: 100%;
      height:100%;
      background-color: #fff;
      padding:px2rem(188px) 15px px2rem(88px);
      text-align: center;
      .empty-img{
        width: px2rem(233px);
        height:px2rem(233px);
        margin: 0 auto;
        background: url("../../../images/noStore.png") no-repeat;
        background-size: cover;
      }
      >p{
        font-size:16px;
        color: #666;
        line-height:1.5;
        margin-bottom:10px;
        margin-top:22px;
      }
      .goto{
        font-size:14px;
        color: $primary;
        line-height:1.5;
      }
    }
  }
</style>
