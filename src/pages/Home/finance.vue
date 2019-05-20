<template>
    <div class="page-finance" v-title="'芬木金融'">
      <div class="banner">
        <img class="banner" v-lazy="bannerUrl" alt="">
      </div>
      <ul class="apply-list">
        <li>
          <dl class="loan-item">
            <dt></dt>
            <dd class="loan-info">
              <h3>{{typeList[0].text}}</h3>
              <p>适合对象：持有现货</p>
              <p>额　　度：50-500万人民币</p>
              <p>利　　率：年化9-12%</p>
            </dd>
            <dd class="btn-apply" @click="apply(typeList[0].text,typeList[0].value)">立即申请</dd>
          </dl>
        </li>
        <li>
          <dl class="loan-item">
            <dt></dt>
            <dd class="loan-info">
              <h3>{{typeList[1].text}}</h3>
              <p>适合对象：持有提单</p>
              <p>额　　度：50-500万人民币</p>
              <p>利　　率：年化10-12%</p>
            </dd>
            <dd class="btn-apply" @click="apply(typeList[1].text,typeList[1].value)">立即申请</dd>
          </dl>
        </li>
        <li>
          <dl class="loan-item">
            <dt></dt>
            <dd class="loan-info">
              <h3>{{typeList[2].text}}</h3>
              <p>适合对象：信誉良好</p>
              <p>额　　度：10-100万人民币</p>
              <p>利　　率：年化11-15%</p>
            </dd>
            <dd class="btn-apply" @click="apply(typeList[2].text,typeList[2].value)">立即申请</dd>
          </dl>
        </li>
      </ul>
      <h2>快速灵活，安全保障</h2>
      <ul class="advantage-list">
        <li>
          <dl>
            <dt></dt>
            <dd>
              <h3>快速审批</h3>
              <p>在线审批</p>
              <p>3个工作日内到账</p>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt></dt>
            <dd>
              <h3>超低利息</h3>
              <p>7天免息贷款</p>
              <p>0压力还款</p>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt></dt>
            <dd>
              <h3>多种产品</h3>
              <p>产品额度灵活</p>
              <p>满足不同需求</p>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt></dt>
            <dd>
              <h3>期限灵活</h3>
              <p>适用30-180天</p>
              <p>自主选择</p>
            </dd>
          </dl>
        </li>
      </ul>
      <QuickNav/>
    </div>
</template>

<script>
    import app from '../../utils/common'
    import { mapGetters } from 'vuex'
    import QuickNav from '../../components//quickNav'

    export default {
      data(){
        return{
          bannerUrl:require('../../images/finance/banner.jpg'),
          loan:[],
        }
      },
      components: {
        QuickNav
      },
      computed: {
        ...mapGetters([
          'getToken',
          'getGlobalInfo'
        ]),
        typeList:function() {
          return this.getGlobalInfo.lstLoanType;
        }
      },
      methods: {
        apply(text,type) {
          // if(this.getToken == null) {
          //   this.$router.push('/login');
          // }else {
            this.$router.push({
              path:'/applyLoan',
              query: {
                text:text,
                type:type
              }
            });
          //}
        }
      }
    }
</script>

<style lang="scss">
  .page-finance{
    .banner{
      >img{
        display: block;
        width: 100%;
      }
    }
    .apply-list{
      background-color: #fff;
      margin-bottom:10px;
      >li{
        @include bb;
        padding:10px 15px;
        &:nth-child(1) dt{
          background: #f4f4f4 url(../../images/finance/ico1.png) no-repeat center;
          background-size: px2rem(120px);
        }
        &:nth-child(2) dt{
          background: #f4f4f4 url(../../images/finance/ico2.png) no-repeat center;
          background-size: px2rem(120px);
        }
        &:nth-child(3) dt{
          background: #f4f4f4 url(../../images/finance/ico3.png) no-repeat center;
          background-size: px2rem(120px);
        }
      }
    }
    .loan-item{
      @include fj('flex-start');
      position: relative;
      align-items: center;
      dt{
        width: px2rem(154px);
        height: px2rem(154px);
        border-radius: px2rem(7px);
        margin-right:10px;
      }
      .loan-info{
        h3{
          font-size:14px;
          color: #333;
          line-height:1.2;
          margin-bottom:6px;
        }
        p{
          font-size:12px;
          color: #333;
          line-height:22px;
          white-space:nowrap;
        }
      }
      .btn-apply{
        font-size:px2rem(28px);
        color: #fff;
        background-color: $primary;
        border-radius: px2rem(54px);
        height:px2rem(54px);
        width: px2rem(160px);
        line-height:px2rem(54px);
        text-align: center;
        white-space:nowrap;
        position: absolute;
        right: 0;
        top:50%;
        margin-top:px2rem(-27px);
      }
      @media only screen and (min-width: 375px){
        dt{
          margin-right:15px;
        }
        .loan-info{
          h3{
            font-size:16px;
          }
          p{
            font-size:14px;
          }
        }
      }
    }
    >h2{
      @include bb;
      background-color: #fff;
      height:44px;
      line-height:44px;
      font-size:16px;
      color: #333;
      text-align: center;
      padding:0 15px;
    }
    .advantage-list{
      margin-bottom:10px;
      background-color: #fff;
      overflow: hidden;
      li{
        float: left;
        width: 50%;
        border-bottom:1px solid #eee;
        padding:15px;
        padding-right:0;
        &:nth-child(even){
          border-left:1px solid #eee;
          padding-right:15px;
        }
        &:nth-child(1) dt{
          background: #f9aa32 url(../../images/finance/ico-advantage1.png) no-repeat center;
          background-size: px2rem(72px);
        }
        &:nth-child(2) dt{
          background: $primary url(../../images/finance/ico-advantage2.png) no-repeat center;
          background-size: px2rem(72px);
        }
        &:nth-child(3) dt{
          background: #44c1f0 url(../../images/finance/ico-advantage3.png) no-repeat center;
          background-size: px2rem(72px);
        }
        &:nth-child(4) dt{
          background: #ff6159 url(../../images/finance/ico-advantage4.png) no-repeat center;
          background-size: px2rem(72px);
        }
      }
      dl{
        @include fj('flex-start');
        align-items: center;
        dt{
          width: px2rem(100px);
          height:px2rem(100px);
          margin-right:10px;
          border-radius: px2rem(8px);
        }
        dd{
          flex: 1;
          min-width: 20px;
          overflow: hidden;
          h3{
            font-size:14px;
            color: #333;
            line-height:1.2;
            margin-bottom:6px;
          }
          p{
            font-size:12px;
            color: #666;
            line-height:20px;
            white-space:nowrap;
          }
        }
        @media only screen and (min-width: 375px){
          dt{
            margin-right:15px;
          }
          dd{
            h3{
              font-size:16px;
            }
            p{
              font-size:14px;
            }
          }
        }
      }
    }
  }
</style>
