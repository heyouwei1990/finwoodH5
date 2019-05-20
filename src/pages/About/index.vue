<template>
	<div class="about" v-title="'关于我们'">
    <h2>公司简介</h2>
		<p class="indent">芬木网是由上海芬木网络科技发展有限公司运营的
    集木材线上交易、供应链金融、产业服务和大数据一
    体的数据智能木材供应链S2B平台。 </p>
    <p class="indent">平台依托国家林业产业化龙头企业标准木业集团、
    瀚达木业(国内最大的硬木供应商)和擅长赋能型投资
    的富慕资产(创始人也是线性资本联合创始人)共同发
    起组建。凭借木材行业30年专业经验和专家团队,打
    造木材供应链S2B平台，提供便捷交易和综合服务，
    优化木材供应链环节， 并运用数据智能和技术产品，
    提升行业效率，降低运营成本。平台发起林业专项债
    权基金，为木材企业提供债权融资，打通资产端和资
    金端桥梁，解决木材企业融资痛点。 </p>
    <p class="indent">芬木网将秉承诚信、创新、共赢的理念，持续为木
    材企业创造核心价值，通过科技引领木材行业整体进
    步，打造成为最有价值的木材服务平台。 </p>
    <img src="../../images/about/pic.png" alt="">
    <h2>核心团队</h2>
    <div class="team">
      <img src="../../images/about/avatar1.png" alt="">
      <h3>郑志平</h3>
      <h4>联合创始人、CEO</h4>
      <ul class="info-list">
        <li>木材行业8年管理经验</li>
        <li>其父郑文水先生从业30多年，标准木业集团董事长，莆田(中国)木业总商会会长，莆田工商联副主席</li>
        <li>其家族2016年进口20多亿木材</li>
        <li>上海外国语大学工商管理专业</li>
        <li>负责公司的日常运营</li>
      </ul>
    </div>
    <div class="team">
      <img src="../../images/about/avatar2.png" alt="">
      <h3>张川</h3>
      <h4>联合创始人、CSO</h4>
      <ul class="info-list">
        <li>富慕资产董事长</li>
        <li>线性资本联合创始人</li>
        <li>前阿里天猫高级总监</li>
        <li>前京东副总裁</li>
        <li>高礼研究院华东区导师团秘书长</li>
        <li>复旦经济学院客座教授</li>
        <li>在中、美等投资了50多家科技金融、大数据、企业服务、消费升级等公司</li>
        <li>负责团队组建、战略规划、融资投资</li>
      </ul>
    </div>
    <div class="team">
      <img src="../../images/about/avatar3.png" alt="">
      <h3>郑金明</h3>
      <h4>联合创始人、VP</h4>
      <ul class="info-list">
        <li>28年木材行业经验</li>
        <li>上海瀚达木业有限公司总裁</li>
        <li>莆田(中国)木业总商会执行会长</li>
        <li>熟悉全球木材业的运作、渠道、趋势等</li>
        <li>张家港市木材行业协会海外高级顾问</li>
        <li>负责外部资源对接</li>
      </ul>
    </div>
    <div class="team">
      <img src="../../images/about/avatar4.png" alt="">
      <h3>李勇</h3>
      <h4>CTO</h4>
      <ul class="info-list">
        <li>前找钢网技术总监，管理近200人技术团队</li>
        <li>前绿盒子网络技术首席架构师、前Staples中国高级架构师</li>
        <li>15年B2B、B2C技术架构及研发管理经验，熟悉一体化平台架构规划、设计、研发管理和落地</li>
        <li>西南石油大学机械设计及自动化</li>
        <li>负责产品技术管理</li>
      </ul>
    </div>
    <h2>企业文化</h2>
    <img src="../../images/about/culture.png" alt="">
    <h2>联系我们</h2>
    <p>公司总部：上海芬木网络科技发展有限公司</p>
    <p>客服电话：400 180 6255</p>
    <p>公司邮箱：business@finwood.cn</p>
    <p>微博账号：芬木科技FinWood</p>
    <p>公司地址：上海市闵行区沪闵路7866号莲花国际广场2号楼1501</p>
    <img src="../../images/about/map.png" alt="">
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
  .about {
    padding: 0 15px 15px 15px;
    background: #fff;
    min-height: 100vh;
    >h2 {
      font-weight: bolder;
      font-size: 18px;
      line-height:30px;
      text-align: center;
      border-bottom: 1px solid #eee;
      padding: 8px 0;
      margin-bottom: 10px;
      margin-top:30px;
    }
    >h2:nth-of-type(1){
      margin-top: 0;
    }
    >h2:nth-of-type(2){
      margin-bottom: 0;
    }
    >p {
      padding-bottom: px2rem(20px);
      font-size:14px;
      line-height:24px;
      color: #333;
    }
    .indent{
      text-indent: px2rem(56px);
    }
    >img {
      width: 100%;
      display: block;
    }
    .team {
      padding-top: 20px;
      img {
        width: 25vw;
        display: block;
        margin: 0 auto 10px auto;
      }
      h3,h4{
        font-weight: bold;
        font-size: 16px;
        text-align: center;
        line-height:1.5;
      }
      .info-list{
        margin-top: 10px;
        >li{
          padding-left:1em;
          font-size:14px;
          line-height:24px;
          position: relative;
          &:before{
            content: '';
            display: block;
            width: 5px;
            height:5px;
            border-radius: 50%;
            background-color: #333;
            position: absolute;
            left:0;
            top:12px;
            z-index:2;
            margin-top:-3px;
          }
        }
      }
    }
  }
</style>
