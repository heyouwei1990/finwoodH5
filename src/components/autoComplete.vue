<template>
  <div class="autoComplete-component">
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>{{title}}</span>
        </div>
        <input @focus="focus" @blur="blur"
        v-model="currentValue"
        :placeholder="placeholder" type="text" class="mint-field-core">
      </div>
    </a>
    <ul class="result" v-if="matchList&&isShow">
      <li v-for="(item,index) in matchList" :key="index" @click="select(item)">
        {{item.text}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow:false,
      currentValue:'',
      matchList:[],
      isSelect:false
    }
  },
  props: ["custom","title","dataList","placeholder","text","collect"],
  watch: {
    currentValue(val,oldval) {
      if(val === oldval) {
        return;
      }
      this.isSelect = false;
      this.matchList = [];
      for (let item of this.dataList.data){
        if(String(item.text).toUpperCase().search(val.toUpperCase()) != -1 ||
        String(item.spell).toUpperCase().search(val.toUpperCase()) != -1){
            this.matchList.push(item);
        }
      }
    },
    text(val,oldval) {
      this.currentValue = val;
    }
  },
  methods: {
    select(value) {
      this.isSelect = true;
      this.currentValue = value.text;
      this.$emit('update:text', value.text);
      this.$emit('update:collect', value);
    },
    focus() {
      if(this.matchList.length == 0&&this.currentValue === '') {
        this.matchList = this.dataList.data;
      }
      this.isShow = true;
    },
    blur() {
      if(!this.isSelect) {
        if(this.custom) {
          this.$emit('update:text', this.currentValue);
        }else {
          this.currentValue = '';
        }
      }
      this.isShow = false;
    }
  }
}
</script>


<style lang="scss">
  .autoComplete-component {
    position: relative;
    .result {
      position: absolute;
      width: 100%;
      top: 48px;
      z-index: 999;
      background: #eee;
      max-height: 240px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      li {
        line-height: 48px;
        text-align: center;
        color: #2b2b2b;
      }
    }
  }
</style>

