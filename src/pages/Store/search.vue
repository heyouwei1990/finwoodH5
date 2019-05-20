<template>
  <div class="page" v-title="'搜索'">
    <searchbox></searchbox>
    <div class="search-bd">
      <div class="search-hot">
        <h3>热门搜索</h3>
        <span @click="searchWords(item)" class="search-word" v-for="item in hotList" :key="item.id">
          {{item}}
        </span>
      </div>
      <hr>
      <div class="search-history">
        <div class="flex">
          <h3>历史搜索</h3>
          <span v-if="historyList.length>0" class="iconfont icon-lajitong" @click="clearHistorey()"></span>
        </div>
        <span @click="searchWords(item)" class="search-word" v-for="item in historyList" :key="item.id">
          {{item}}
        </span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Popup , MessageBox } from 'mint-ui'
  import Searchbox from '@/components/searchbox'
  import { mapGetters, mapActions } from 'vuex'
  import app from '../../utils/common'

  export default {
    data () {
      return {
        hotList:[''],
        historyList:[]
      }
    },
    components: {
      Searchbox
    },
    computed: {
			...mapGetters([
        'getSearch',
        'getSearchPage'
      ])
    },
    created () {
      if(window.localStorage.getItem('historyList') == null) {
        this.historyList=[];
      }else {
        this.historyList=window.localStorage.getItem('historyList').split(',');
      }
    },
    mounted(){
      this.dataInit();
    },
    methods: {
      async dataInit(){
        app.post('/product/hotsearchkey',{},(r)=>{
          this.hotList=r.result;
        })
      },
      ...mapActions([
        'setSearch'
      ]),
      //热门搜索和历史搜索
      searchWords(item){
        this.setSearch(item);
        app.setHistory('historyList',item);
        app.removeStore('storeSelected');
        if(this.getSearchPage == -1) {
          this.$router.go(this.getSearchPage);
        }else {
          this.$router.push({path:this.getSearchPage});
        }
      },
      async clearHistorey(){
        //清空历史搜索
        MessageBox.confirm('您是否确认清空历史记录？','芬木提示').then(action => {
          window.localStorage.removeItem('historyList');
          this.historyList=[];
        }).catch(action=>{});
      }
    }
  }
</script>

<style scoped lang="scss">
 	@media only screen and (min-width:500px){
    .search-bd{
        max-width: $bodyWidth;
    }
	}
  .search-bd {
    position: fixed;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding-top: px2rem(102px);
  }

  hr {
    border-top: 1px solid #eee;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .search-hot {
    width: 100%;
    padding: px2rem(20px) 0px 0px 15px;
    position: relative;
    overflow: hidden;
  }

  .search-hot > h3 {
    color: #333;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
  }

  .search-word {
    display: inline-block;
    min-width: 54px;
    max-width:28%;
    height: 20px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 14px;
    margin-right: 16px;
    background-color: #eee;
    color: #333;
    line-height: 20px;
    border-radius: 20px;
    text-align: center;
    margin-bottom: 16px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .search-history {
    padding-top: px2rem(20px);
    padding-left: 15px;
  }

  .search-history .flex {
    @include fj;
    align-items: center;
    margin-bottom: 10px;
    padding-right: 15px;
    line-height:30px;
    height:30px;
  }
  .search-history .icon-lajitong{
    width: 30px;
    height:30px;
    text-align: center;
    line-height:30px;
    font-size:16px;
    color: #999;
    vertical-align: middle;
  }
</style>
