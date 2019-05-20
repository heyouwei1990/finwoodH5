<template>
  <div class="supply-page" v-title="'供货详情'">
    <h3 class="sec-hd">求购信息</h3>
    <ul class="input-list">
      <li>
        <label>品种</label>
        <span class="val-txt">小斑马</span>
      </li>
      <li>
        <label>数量</label>
        <span class="val-txt">10立方米</span>
      </li>
      <li>
        <label>交货地</label>
        <span class="val-txt">张家港</span>
      </li>
      <li>
        <label>意向价格</label>
        <span class="val-txt">4500元/m³</span>
      </li>
      <li>
        <label>联系人</label>
        <span class="val-txt">张杰</span>
      </li>
      <li>
        <label>产品用途</label>
        <span class="val-txt">家具</span>
      </li>
      <li>
        <label>其他要求</label>
        <div class="demand">希望北美才等级为特级</div>
      </li>
    </ul>
    <h3 class="sec-hd">供货信息</h3>
    <ul class="input-list">
      <li>
        <label>立方数</label>
        <span class="val-txt">10m³</span>
      </li>
      <li>
        <label>单价</label>
        <span class="val-txt">4500元/m³</span>
      </li>
      <li>
        <label>联系人</label>
        <span class="val-txt">李四</span>
      </li>
      <li>
        <label>其他说明</label>
        <div class="demand">尽快下单还有库存</div>
      </li>
    </ul>
    <h3 class="sec-hd">联系客服</h3>
    <ul class="input-list">
      <li>
        <label>联系电话</label>
        <span class="val-txt">021-12345667</span>
        <a href="tel:021-12345667" class="small-btn-green">联系客服</a>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {

  }
</script>

<style scoped lang="scss">
  @import "src/styles/components/inputList";

</style>
