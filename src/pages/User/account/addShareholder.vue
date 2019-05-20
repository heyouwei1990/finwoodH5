<template>
  <div class="page-addShareholder" v-title="'新增股东信息'">
    <mt-field label="股东姓名" placeholder="请输入个人股东姓名或机构名称" v-model="shareholderName"></mt-field>
    <div @click="popup()">
      <mt-field label="股东类型" readonly v-model="shareholderType"><i class="iconfont icon-jiantouyou"></i></mt-field>
    </div>
    <mt-field v-if="shareholderTypeVal!=1" label="股东证件号" placeholder="请输入个人股东证件号" v-model="papersNum"></mt-field>
    <mt-field v-else label="股东证件号" placeholder="三证统一社会信用码，非三证营业执照号" v-model="papersNum"></mt-field>
    <div class="greenBtn">保存</div>
    <mt-popup
      class=""
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
  import { MessageBox } from "mint-ui"
  export default {
    data(){
      return{
        shareholderName:null,
        shareholderType:null,
        shareholderTypeVal:null,
        papersNum:null,
        popupVisible:false,
        valKey:'text',
        selected:null,
        slots:[
          {
            flex:1,
            defaultIndex: 0,
            values:[
              {
                value:0,
                text:'个人股东'
              },
              {
                value:1,
                text:'机构股东'
              }
            ]
          }
        ],
        back:false
      }
    },
    beforeRouteLeave (to, from, next) {
      if(this.back) {
        MessageBox.confirm('是否离开当前页面，已输入内容会丢失','芬木提示',{closeOnClickModal:false}).then(action => {
          next();
        }).catch(action=>{
          next(false);
        });
      }else {
        next();
      }
    },
    methods:{
      popup(){
        this.popupVisible=!this.popupVisible;
      },
      onValuesChange(picker, values) {
        this.selected=values;
      },
      cancel(){
        this.popupVisible=false;
      },
      affirm(){
        console.log(this.selected)
        this.shareholderType=this.selected[0].text;
        this.shareholderTypeVal=this.selected[0].value;
        this.popupVisible=false;
      },
    }
  }
</script>

<style lang="scss">
  .page-addShareholder{
    //该默认label字体16px为14px
    .mint-cell-wrapper {
      font-size: 14px;
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
  }
</style>
