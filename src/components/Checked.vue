<template>
  <div class="checked">
    <input @click="check()" v-model="isCheck" class="magic-checkbox" type="checkbox" name="layout" id="ty" checked="checked">
    <label for="ty"><slot></slot></label>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isCheck:true
      }
    },
    methods: {
      check() {
        this.$emit('isCheck',this.isCheck);
      },
      setTrue() {
        this.isCheck=true;
      }
    }
  }
</script>

<style scoped lang='scss'>
  .checked{
    display: inline-block;
  }
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    line-height: 140%;
  }

  @keyframes hover-color {
    from {
      border-color: #c0c0c0;
    }
    to {
      border-color: #999;
    }
  }

  .magic-radio,
  .magic-checkbox {
    position: absolute;
    display: none;
  }

  .magic-radio[disabled],
  .magic-checkbox[disabled] {
    cursor: not-allowed;
  }

  .magic-radio + label,
  .magic-checkbox + label {
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }

  .magic-radio + label:hover:before,
  .magic-checkbox + label:hover:before {
    animation-duration: 0.4s;
    animation-fill-mode: both;
    animation-name: hover-color;
  }

  .magic-radio + label:before,
  .magic-checkbox + label:before {
    position: absolute;
    top: 50%;
    left: 0;
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-top:-10px;
    content: '';
    border: 1px solid #999;
  }

  .magic-radio + label:after,
  .magic-checkbox + label:after {
    position: absolute;
    display: none;
    content: '';
  }

  .magic-radio[disabled] + label,
  .magic-checkbox[disabled] + label {
    cursor: not-allowed;
    color: #999;
  }

  .magic-radio[disabled] + label:hover, .magic-radio[disabled] + label:before, .magic-radio[disabled] + label:after,
  .magic-checkbox[disabled] + label:hover,
  .magic-checkbox[disabled] + label:before,
  .magic-checkbox[disabled] + label:after {
    cursor: not-allowed;
  }

  .magic-radio[disabled] + label:hover:before,
  .magic-checkbox[disabled] + label:hover:before {
    border: 1px solid #e4e4e4;
    animation-name: none;
  }

  .magic-radio[disabled] + label:before,
  .magic-checkbox[disabled] + label:before {
    border-color: #e4e4e4;
  }

  .magic-radio:checked + label:before,
  .magic-checkbox:checked + label:before {
    animation-name: none;
  }

  .magic-radio:checked + label:after,
  .magic-checkbox:checked + label:after {
    display: block;
  }

  .magic-radio + label:before {
    border-radius: 50%;
  }

  .magic-radio + label:after {
    top: 6px;
    left: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: $primary;
  }

  .magic-radio:checked + label:before {
    border: 1px solid $primary;
  }

  .magic-radio:checked[disabled] + label:before {
    border: 1px solid #c9e2f9;
  }

  .magic-radio:checked[disabled] + label:after {
    background: #c9e2f9;
  }

  .magic-checkbox + label:before {
    border-radius: 50%;
  }

  .magic-checkbox + label:after {
    top:50%;
    left: 7px;
    box-sizing: border-box;
    width: 6px;
    height: 12px;
    margin-top:-7px;
    transform: rotate(45deg);
    border-width: 2px;
    border-style: solid;
    border-color: #fff;
    border-top: 0;
    border-left: 0;
  }

  .magic-checkbox:checked + label:before {
  	border-radius: 50%;
    border: $primary;
    background: $primary;
  }

  .magic-checkbox:checked[disabled] + label:before {
  	border-radius: 50%;
    border: #c9e2f9;
    background: #c9e2f9;
  }
</style>
