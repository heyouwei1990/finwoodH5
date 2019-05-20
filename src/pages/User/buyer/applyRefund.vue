<template>
	<div class="page" v-title="'申请退款'">
		<a class="mint-cell mint-field" @click="openMenu();">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">退款原因</span>
        </div>
        <input readonly='readonly' v-model="cause" placeholder="请选择" type="text" class="mint-field-core">
        <i class="iconfont icon-jiantouyou"></i>
      </div>
    </a>
    <mt-field label="退款金额" placeholder="请输入退款金额" v-model="refundSum"></mt-field>
    <mt-field label="退款说明" placeholder="请输入退款说明"></mt-field>
    <div class="greenBtn" @click="submit();">提交申请</div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <p class="confirm">
        <button class="left" @click="cancel();">取消</button>
        <button class="right" @click="cancel();">确认</button>
      </p>
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
	</div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      cause: null, //退款原因
      refundSum: 23000, //退款金额
      popupVisible: false, //显示弹出框
      slots: [
        {
          flex: 1,
          values: ["七天无理由", "不要了", "不买了"]
        }
      ]
    };
  },
  mounted () {
    app.preventDefault();
  },
  methods: {
    openMenu() {
      this.popupVisible = true;
    },
    //取消选择
    cancel() {
      this.popupVisible = false;
    },
    async onValuesChange(picker, values) {
      if (picker.getValues()[0]) {
        this.cause = picker.getValues()[0];
      }
    },
    //提交申请
    submit() {
      MessageBox.confirm("是否提交申请？", "芬木提示")
        .then(action => {
          this.$router.push({ path: "/submitsuccess" });
        })
        .catch(action => {});
    }
  }
};
</script>

<style scoped lang="scss">
.mint-popup {
  width: 100%;
}
.confirm {
  height: px2rem(60px);
  button {
    width: px2rem(110px);
    height: px2rem(60px);
    background-color: transparent;
    border: none;
    font-size: 14px;
    &:nth-of-type(1) {
      color: #333;
    }
    &:nth-of-type(2) {
      color: $primary;
    }
  }
}
</style>
