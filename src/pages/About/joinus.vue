<template>
	<div class="joinus" v-title="'加入我们'">
    <img src="../../images/about/join.png" alt="">
    <div class="jobInfo" v-for="(item,index) in list" :key="index">
      <h2>{{item.jobName}}</h2>
      <h3>岗位职责</h3>
      <ol>
        <li v-for="(value,Index) in item.statement" :key="Index">
          {{Index+1}}、{{value}}
        </li>
      </ol>
      <h3>任职要求</h3>
      <ol>
        <li v-for="(value,Index) in item.requirements" :key="Index">
          {{Index+1}}、{{value}}
        </li>
      </ol>
    </div>
	</div>
</template>

<script>
	export default {
    data () {
      return {
        list:[{
          jobName:'业务经理（张家港）',
          statement:[
            "收集目标客户的信息资料和数据分析",
            "熟练掌握公司相关产品业务和市场竞争力",
            "根据市场营销计划完成公司交付的任务",
            "协助完成客户相关业务的售前售后服务"
          ],
          "requirements":[
            "有责任心，吃苦耐劳，执行力强，能较好地完成公司制定的目标",
            "有团队合作精神，善于挑战，能承受相应的工作压力",
            "能有效的反映辖区市场信息，制定相应计划",
            "木材行业3年以上工作经验，有客户资源者优先"
          ]
        },{
          jobName:'客服专员',
          statement:[
            "负责客户的业务咨询、信息查询及疑难问题的解答工作",
            "接听并处理相关客户问题，收集用户建议，优化客户服务质量",
            "协调处理与其它部门的沟通与问题反馈",
            "在服务客户同时为公司创造更大价值，使客户满意"
          ],
          "requirements":[
            "大专以上学历，普通话标准，声音甜美，口齿清晰，具备良好的沟通、应变和判断能力",
            "客户服务工作、呼叫中心、电子商务或在线支付等工作经验者优先",
            "熟练电脑操作及办公软件使用，打字速度快",
            "具有良好的客户服务意识，工作耐心细致，具备良好的心理素质及抗压能力",
            "性格开朗，责任心强，具备较强的敬业精神和良好的团队合作精神"
          ]
        },{
          jobName:'新媒体运营专员',
          statement:[
            "负责微信公众账号和微信社群的日常运营和维护，为公司整体品牌传播和营销服务",
            "制定并实施清晰的用户互动策略，增加粉丝数量，粉丝活跃度和忠诚度",
            "跟进公司需求，策划并执行微媒体热门话题营销",
            "跟踪微信推广效果，分析数据并反馈，总结经验，建立有效运营手段提升用户活跃度，增加粉丝数量",
            "负责与公司官网等线上线下活动相配合",
            "与外部有价值的平台或资源寻求合作，聚集人气，扩大影响力"
          ],
          "requirements":[
            "专科以上学历，有微信等新媒体运营相关工作经验者优先",
            "市场营销、广告、电子商务、新闻、中文等专业优先",
            "热爱新媒体行业和自媒体运营，熟悉微信、微博、领英等互联网平台",
            "对移动互联网发展和时下热点高度关注，思维活跃、有创意、有较强的文字编辑能力",
            "有独立策划、实施新媒体活动的能力",
            "积极主动，责任心强，有良好的团队意识",
            "能服从领导安排，及时完成领导交给的工作"
          ]
        },{
          jobName:'人事经理',
          statement:[
            "建立健全公司的人力资源管理体系",
            "建立人员招聘制度并组织实施",
            "建立劳动关系管理制度，规范人事用工手续",
            "负责建立公司薪酬体系，合理控制人力成本",
            "负责公司的企业文化建设",
            "编制并实施年度培训计划"
          ],
          "requirements":[
            "本科及以上学历，人力资源管理、工商管理专业，有5年左右相关经验者优先",
            "具备人力资源管理的全模块知识",
            "具备较强文字功底、表达能力及人际沟通能力",
            "责任心强，亲和力佳，具备良好团队管理与领导力"
          ]
        },{
          jobName:'网络运营主管',
          statement:[
            "负责网站或者移动客户端产品的运营，完善运营管理制度，优化运营流程，提升运营效率",
            "对用户体验、业务流程等进行全面的分析并提出改进建议",
            "负责日常运营数据的整理、统计、分析和管理，制定运营日、周、月报表",
            "负责收集市场和行业信息，分析竞争对手"
          ],
          "requirements":[
            "本科及以上学历，3年以上B2B电商平台运营管理经验",
            "熟练掌握B2B电商的在线交易、撮合交易等前后台操作管理流程，擅长数据分析",
            "具备优秀的沟通能力、团队协作能力、统筹能力和执行力",
          ]
        },{
          jobName:'金融风控主管',
          statement:[
            "负责公司供应链金融业务风险控制管理体系",
            "负责项目的尽职调查、数据采集、信用管理、风险预警和风险处置",
            "制定和完善授信政策、准入规则、贷后管理及催收策略",
            "负责组织事前风险审核、事中风险控制、事后风险检查",
            "关注经济金融政策研究，形成风险管理建议供管理层决策"
          ],
          "requirements":[
            "统招本科及以上学历，法律、财务、金融、经管类等相关专业",
            "5年以上互联网金融、供应链金融等金融机构的风险管理经验",
            "具有较强的风险分析与指标设计能力以及风险识别、评估、监控等技能",
            "深入了解互联网信贷模式下的风险策略构建方法及应用",
            "思维缜密、原则性强、正直，高度的责任心与敬业精神"
          ]
        },{
          jobName:'法务主管',
          statement:[
            "负责公司各类业务合同的起草、修订和审核",
            "根据业务需要，制定、修改业务所需的合同模板及标准合同",
            "接受业务部门法律咨询，协助解决法律问题及纠纷",
            "研究行业政策出具法务意见函，并有针对性地开展内部法律培训",
            "日常法律事务处理及上级领导交办的其他工作"
          ],
          "requirements":[
            "全日制法律本科及以上学历，3年以上互联网公司法务工作经验",
            "熟悉金融行业相关法律事务，拥有互联网金融、银行以及投融资从业经验者优先",
            "熟悉合同法、金融行业等相关法律法规，有法律职业资格证书",
            "具备各类法律事务的逻辑判断和分析能力",
            "具有较强的分析、处理、应变及独立解决法律问题的能力"
          ]
        },{
          jobName:'运营专员',
          statement:[
            "收集目标客户的信息资料和数据分析",
            "熟练掌握公司相关产品业务和市场竞争力",
            "根据市场营销计划完成公司交付的任务",
            "负责协助完成客户相关业务的售前售后服务"
          ],
          "requirements":[
            "本科及以上学历，市场营销相关专业",
            "有责任心，吃苦耐劳，执行力强，能较好地完成公司制定的目标",
            "有团队合作精神，善于挑战，能承受相应的工作压力",
            "能有效的反映辖区市场信息，制定相应计划",
            "2年以上面对实体企业工作经验，有木材行业销售经验或客户资源者优先"
          ]
        },{
          jobName:'客户经理',
          statement:[
            "收集目标客户的信息资料和数据分析",
            "熟练掌握公司相关产品业务和市场竞争力",
            "根据市场营销计划完成公司交付的任务",
            "负责协助完成客户相关业务的售前售后服务",
          ],
          "requirements":[
            "本科及以上学历，市场营销相关专业",
            "有责任心，吃苦耐劳，执行力强，能较好地完成公　　司制定的目标",
            "有团队合作精神，善于挑战，能承受相应的工作压力",
            "能有效的反映辖区市场信息，制定相应计划",
            "2年以上面对实体企业工作经验，有木材行业销售经验或客户资源者优先"
          ]
        },{
          jobName:'JAVA高级架构师',
          statement:[
            "负责公司战略级产品线技术架构设计和研发落地（场景丰富，机会好）",
            "负责基础技术框架开发及落地",
            "负责解决研发过程中的关键技术问题",
            "制定相应的架构设计和开发规范并落地"
          ],
          "requirements":[
            "5年以上Java互联网项目研发经验，Java功底扎实，熟悉服务化架构设计和开发，有大型互联网项目技术架构设计及落地经验",
            "熟悉Linux、Docker、MySQL、NOSQL、Spring MVC、Spring Boot、Spring Cloud、Dubbo、及常用基础中间件、分布式解决方案及其原理",
            "优秀的分析、架构设计和文档编写能力",
            "有较强的技术实施能力和创新能力，热爱技术，对技术有不懈的追求",
            "良好的抽象思维和逻辑思维能力，独立分析问题和解决问题的能力",
            "具备良好的沟通协作能力、团队合作精神"
          ]
        },{
          jobName:'JAVA开发工程师',
          statement:[
            "参与B2B电商平台、供应链、CRM、金融等相关产品的需求分析、系统设计及评审等工作",
            "根据开发规范与流程完成产品模块的详细设计、开发编码、单元测试以及技术文档编写工作",
            "完善和修正现有系统的故障和缺陷",
            "新技术的预研、难题攻关、小型项目的管理",
          ],
          "requirements":[
            "本科及以上学历，计算机相关专业毕业，3年以上互联网web开发经验",
            "具有良好的面向对象理念，熟悉设计模式、领域模型",
            "熟悉Spring MVC、iBatis、Dubbo、Spring Boot、Spring Cloud等框架和技术",
            "熟悉常见的基础中间件、分布式解决方案及其原理"
          ]
        }]
      }
    }
	}
</script>

<style lang="scss">
  .joinus {
    background: #fff;
    min-height: 100vh;
    padding-bottom: 50px;
    img {
      width: 100%;
      display: block;
    }
    .jobInfo {
      padding: 0 15px;
      h2 {
        font-size: px2rem(38px);
        color: $primary;
        font-weight: bolder;
        margin: px2rem(60px) 0 0 0;
      }
      h3 {
        font-weight: bolder;
        margin-top: px2rem(24px);
      }
      li {
        line-height: 1.5;
      }
    }
  }
</style>
