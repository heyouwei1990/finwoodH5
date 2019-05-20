<template>
  <div class="checkbox">
    <input type="checkbox" v-model="isCheck" :disabled="forbid">
    <div class="check-label">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      isCheck: false
    };
  },
  props: ["name", "row", "line",'forbid'],
  methods: {
    async cancel() {
      this.isCheck = false;
    }
  }
};
</script>

<style scoped lang="scss">
.checkbox {
  position: relative;
  display: inline-block;
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
  input:disabled + .check-label:before {
    background-color: #f8f8f8;
    border-color: #e4e4e4;
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
}
</style>
