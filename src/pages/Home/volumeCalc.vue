<template>
  <div class="volumeCalc-page" v-title="'材积计算'">
    <ul class="result">
      <li>
        <span>累计数量：</span>
        <span><b>800</b>根</span>
      </li>
      <li>
        <span>累计材积：</span>
        <span><b>100.00</b>立</span>
      </li>
      <li>
        <span>累计总价：</span>
        <span><b>800.00</b>元</span>
      </li>
    </ul>
    <p class="info clearfix">
      <span>原木L:2-10m,D:14-220cm;</span>
      <span>小径原木L:2-10m,D:4-13cm</span>
      <span>短原木L:0.5-1.9m,D:8-100cm;</span>
      <span>长原木L:10.1-30m,D:4-250cm</span>
    </p>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">长度：</span>
        </div>
        <input maxlength="5" v-model="length" placeholder="请输入长度0.5-30m" type="text" class="mint-field-core">
        米
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">直径：</span>
        </div>
        <input maxlength="3" v-model="diameter" placeholder="请输入检尺径4-250cm" type="tel" class="mint-field-core">
        厘米
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">数量：</span>
        </div>
        <input maxlength="8" v-model="quantity" placeholder="请输入数量" type="tel" class="mint-field-core">
        根
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">单价：</span>
        </div>
        <input maxlength="8" v-model="price" placeholder="请输入单价" type="tel" class="mint-field-core">
        元/立
      </div>
    </a>
    <ul class="table" v-if="list.length>0">
      <li>
        <span>序号</span>
        <span>长度(m)</span>
        <span>直径(cm)</span>
        <span>数量(根)</span>
        <span>材积(立)</span>
        <span>总价(元)</span>
      </li>
      <mt-cell-swipe v-for="(value,index) in list" :key="index" :right="[{
        content: '删除',
        style: { background: 'red', color: '#fff' },
        handler: () => remove(index)
      }]">
        <li>
          <span>{{index+1}}</span>
          <span>10</span>
          <span>10</span>
          <span>40</span>
          <span>6.800</span>
          <span>680.00</span>
        </li>
      </mt-cell-swipe>
    </ul>
    <div style="height:80px;"></div>
    <div class="bottomBtn">
      <button class="left" @click="clear();">清空</button>
      <button class="right" @click="add();">累加计算</button>
    </div>
  </div>
</template>

<script>
import { MessageBox,Toast } from 'mint-ui'
export default {
  data () {
    return {
      list:['','','','','',''],    //累加计算
      length:'',
      diameter:'',
      quantity:'',
      price:''
    }
  },
  methods: {
    remove(pkid) {
      setTimeout(()=>{
        MessageBox.confirm('确定删除该条记录?').then(action => {
          this.list.splice(pkid,1);
        }).catch(action=>{});
      },50)
    },
    add() {
      if (!this.validate()) {
        return;
      }
    },
    clear() {
      this.list = [];
    },
    validate() {
      if(this.length == '') {
        Toast({
          message: '请输入长度',
          position: 'bottom',
          duration: 1500
        });
        return false;
      }
      if (!/^[0-9]+\d*$/.test(this.length)) {
        Toast({ message: "长度输入不合法",position:'bottom', during: 1500 });
        return false;
      }
      if(Number(this.length)<0.5 || Number(this.length)>30) {
        Toast({
          message: '长度为0.5-30m',
          position: 'bottom',
          duration: 1500
        });
        return false;
      }
      if(this.diameter == '') {
        Toast({
          message: '请输入直径',
          position: 'bottom',
          duration: 1500
        });
        return false;
      }
      if (!/^[0-9]+\d*$/.test(this.diameter)) {
        Toast({ message: "直径输入不合法",position:'bottom', during: 1500 });
        return false;
      }
      if(Number(this.diameter)<4 || Number(this.diameter)>250) {
        Toast({
          message: '检尺径4-250cm',
          position: 'bottom',
          duration: 1500
        });
        return false;
      }
      if(this.quantity == '') {
        Toast({
          message: '请输入数量',
          position: 'bottom',
          duration: 1500
        });
        return false;
      }
      if (!/^[0-9]+\d*$/.test(this.quantity)) {
        Toast({ message: "数量输入不合法",position:'bottom', during: 1500 });
        return false;
      }
      if(this.price == '') {
        Toast({
          message: '请输入单价',
          position: 'bottom',
          duration: 1500
        });
        return false;
      }
      if (!/^[0-9]+\d*$/.test(this.price)) {
        Toast({ message: "单价输入不合法",position:'bottom', during: 1500 });
        return false;
      }
      return true;
    }
  }
}
</script>

<style lang="scss">
  .volumeCalc-page {
    .result  {
      background: #fff;
      margin: 15px;
      box-shadow: 5px 5px 5px #eee;
      li {
        @include fj;
        @include bb;
        padding: 0 10px;
        align-items: center;
        height: px2rem(95px);
        font-size: px2rem(34px);
        b {
          color: $primary;
          font-size: px2rem(42px);
          padding-right:5px;
        }
      }
    }
    .info {
      padding: 0 20px;
      margin-bottom: 15px;
      span {
        display: inline-block;
        width: 50%;
        float: left;
        color: #ff0000;
        font-size: px2rem(20px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .table {
      width: 100%;
      background: #fff;
      margin-top: 15px;
      font-size: px2rem(20px);
      .mint-cell-title {
        display: none;
      }
      .mint-cell {
        min-height: px2rem(60px);
      }
      .mint-cell-swipe-button  {
        line-height: px2rem(60px);
      }
      .mint-cell-wrapper {
        padding: 0;
      }
      li {
        width: 100vw;
        @include fj(space-around);
        line-height: px2rem(60px);
        span {
          font-size: px2rem(20px);
          color: #333;
          display: inline-block;
          width: calc(64% / 3);
          white-space: nowrap;
          text-align: center;
          &:nth-of-type(1),&:nth-of-type(2),&:nth-of-type(3) {
            width: 12%;
          }
        }
      }
    }
	 	@media only screen and (min-width:500px){
	    .bottomBtn{
	        max-width: $bodyWidth;
	    }
		}
    .bottomBtn {
      position: fixed;
      bottom: 0;
      left: 50%;
      width: 100%;
      transform: translateX(-50%);
      padding: 15px;
      background: #f5f5f5;
      button {
        font-size: px2rem(32px);
        line-height: px2rem(95px);
        color: #fff;
        border: none;
        &:nth-of-type(1) {
          background: #cccccc;
          width: 35%
        }
        &:nth-of-type(2) {
          background: $primary;
          width: 60%
        }
      }
    }
  }
</style>


