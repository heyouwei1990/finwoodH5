<template>
  <div class="counter-component">
    <div class="counter-btn" @click="minus();"></div>
    <div class="counter-show">
      <input type="number" v-model="quantity" @keyup="fixNumber();">
    </div>
    <div class="counter-btn" @click="add();"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        quantity:this.min
      }
    },
    props: {
      max: {
        type: Number,
        default: 100
      },
      min: {
        type: Number,
        default: 1
      }
    },
    watch: {
      quantity () {
        this.$emit('on-change', this.quantity)
      }
    },
    methods: {
      changeNum() {
        return this.quantity;
      },
      fixNumber () {
        let fix
        if (typeof this.quantity === 'string') {
          fix = Number(this.quantity.replace(/\D/g, ''))
        }
        else {
          fix = this.quantity
        }
        if (fix < this.min) {
          fix = this.min
        }
        if (fix > this.max) {
          fix = this.max
        }
        this.quantity = fix
      },
      minus () {
        if (this.quantity <= this.min) {
          this.quantity=this.min;
          return;
        }
        if (this.quantity > this.max) {
          this.quantity=this.max;
        }else {
          this.quantity --;
        }
      },
      add () {
        if (this.quantity >= this.max) {
          this.quantity=this.max;
          return;
        }
        if (this.quantity < this.min) {
          this.quantity=this.min;
        }else {
          this.quantity ++;
        }
      }
    }
  }
</script>

<style scoped>
  .counter-component {
    position: relative;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
  }
  .counter-show {
    float: left;
  }
  .counter-show input {
    height: 23px;
    line-height: 23px;
    width: 30px;
    outline: none;
    text-align: center;
    border:0;
    background-color: transparent;
  }
  .counter-btn {
    border: 1px solid #eee;
    float: left;
    height: 24px;
    width: 28px;
    /*line-height: 22px;
    text-align: center;*/
    cursor: pointer;
    background-color: #fff;
    position: relative;
  }
  .counter-btn:before{
    content: '';
    position: absolute;
    left:50%;
    top:50%;
    width: 10px;
    height:1px;
    background-color: #666;
    transform: translate(-50%, -50%);
  }
  .counter-btn:nth-last-child(1):after{
    content: '';
    position: absolute;
    left:50%;
    top:50%;
    height: 10px;
    width:1px;
    background-color: #666;
    transform: translate(-50%, -50%);
  }
  .counter-btn:active {
    background: #F5F5F5;
  }

</style>
