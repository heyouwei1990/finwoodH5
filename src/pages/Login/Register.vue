<template>
  <div class="page-register" v-title="'注册'">
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>手机号</span>
        </div>
        <input v-model="phoneNumber" placeholder="请输入手机号" type="number" class="mint-field-core">
      </div>
    </a>
    <!--<a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>图片验证码</span>
        </div>
        <input v-model="imgCode" placeholder="请输入图片验证码" type="text" class="mint-field-core">
        <img class="img-code" :src="imgCodeSrc" @click="getCaptchaCode();" alt="">
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>手机验证码</span>
        </div>
        <input v-model="mobileCode" placeholder="请输入手机验证码" type="number" class="mint-field-core">
        <span class="get-code" @click="getVerifyCode();" v-show="!computedTime">获取验证码</span>
        <span class="get-code" v-show="computedTime">已发送({{computedTime}}s)</span>
      </div>
    </a>-->
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>设置密码</span>
        </div>
        <input v-model="passWord" placeholder="密码请设置8-20位字符" type="password" class="mint-field-core">
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text"><i class="required-mark">*</i>重复密码</span>
        </div>
        <input v-model="passWordAgain" placeholder="请再次输入密码" type="password" class="mint-field-core">
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
          <span class="mint-cell-text">推荐人</span>
        </div>
        <input v-model="inviter" placeholder="请输入推荐人" maxlength="100" type="text" class="mint-field-core">
      </div>
    </a>
    <a class="mint-cell mint-field">
      <div class="mint-cell-wrapper">
        <div class="deal">
          <v-checked ref="checked" @isCheck = "isCheck"><div class="agree-label">{{msg}}</div></v-checked>
          <span @click="showDeal();">《芬木网用户注册协议》</span>
        </div>
      </div>
    </a>
    <div class="greenBtn" @click="submit();">立即注册</div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="middle">
      <div class="popup">
        <h2>芬木网会员注册协议</h2>
        <p>
          《芬木网会员注册协议》（“本协议”或“会员注册协议”）适用于您使用芬木网技术平台所提供的所有芬木网技术平台服务。上海芬木网络科技发展有限公司将依据以下条款向您提供服务，请您仔细阅读并遵守。<br>
          <i></i>
          <span> 第一条 提示条款</span><br>
          1.您以任何方式登陆芬木网平台并使用芬木网平台服务即表示您已充分阅读、理解并同意接受第三方服务协议的约束。<br>
2.本协议内容包括协议正文、芬木网交易规则及所有芬木网已经发布或将来可能发布的与芬木网平台服务相关的各类规则、公告或通知（以下合称“规则”）。所有规则均为本协议不可分割的组成部分，与协议正文具有同等法律效力。<br>
3.芬木网有权根据业务需要不时地制订、补充、修改本协议和/或规则，并以网站公示的方式进行变更公告，无需另行单独通知您。变更后的第三方服务协议和/或规则一经在网站公布，立即或在公告明确的特定时间自动生效。若您在前述变更公告后继续使用芬木网平台服务的，即表示您已经阅读、理解并接受经修订的第三方服务协议和/或规则。若您不同意相关变更，应当立即停止使用芬木网平台。<br>
4.在本协议项下，您和芬木网单独称为“一方”，合称为“双方”。<br>
          <i></i>
          <span> 第二条 定义</span><br>
          1.芬木网技术平台服务：芬木网通过芬木网技术平台向您提供的与木材交易相关的支持服务。<br>
2.采购方：指在芬木网技术平台上进行木材采购。<br>
3.芬木网交易规则：指芬木网制定的针对您和第三方在芬木网技术平台上从事木材交易或其他有关事项时应遵守的规范。芬木网不时制订或修改的其他规范。<br>
4.芬木网交易服务：指由芬木网或芬木网委托的第三方为在芬木网技术平台进行木材交易的芬木网会员提供的款项代收代付的中介服务。<br>
          <i></i>
          <span>第三条 会员注册</span><br>
          1.申请成为芬木网会员应符合以下条件：<br>
a) 您必须是一家位于中国的合法成立并有效存在的企业；<br>
b) 具备法律法规规定的与木材销售相关的经营资质；<br>
c) 法律法规要求的其他资质。<br>
2.您应当根据芬木网的要求，按相应页面的提示及时、准确、真实、完整地提供您的资料，包括但不限于您的法定名称、电话号码、身份证号、营业执照及芬木网要求提供的其它证照或文件，并及时进行更新。如芬木网有合理理由怀疑您提供的资料错误、不实、过时或不完整的，芬木网有权停止向您提供芬木网技术平台服务，芬木网对此不承担任何责任，您将承担因此产生的任何直接或间接损失及不利后果。<br>
3.您通过芬木网技术平台递交注册申请并上传证明文件后，芬木网客服人员将在1个工作日内完成人工审核并向您告知审核结果，如遇法定节假日，则相应顺延。<br>
4.您的注册申请被芬木网审核通过后，您即成为芬木网平台的普通会员，有权使用芬木网提供的芬木网技术平台服务。<br>
          <i></i>
          <span>第四条 承诺与保证</span><br>
          成为芬木网普通会员后，您可以进一步申请注册为认证企业资质或个人实名。认证企业资质享受芬木网提供的交易服务，包括但不限于优先推广、参加芬木网平台营销活动、金融服务等。申请成为认证企业资质的，应在线递交申请。<br>
1.您向芬木网承诺并保证，在注册时及整个协议期限内：<br>
a) 您是依据中国法律合法设立、有效存续并良好运营的企业；<br>
b) 您拥有所有必需的法定资质、权利、能力和授权签订本协议并履行相应义务，授予本协议项下的权利、许可和授权，并已获得为经营您的业务依法所需的所有许可、批准和执照；<br>
c) 芬木网平台上销售的木材必须满足国家和行业的强制标准，以及芬木网不时制订或修改的木材质量要求<br>
d) 您以及您的代理人将在您履行本协议项下义务和行使权利过程中遵守所有适用的法律。<br>
          <i></i>
          <span>第五条 交易和结算</span><br>
          1.您同意通过芬木网平台展示、推广和销售您的木材，并不可撤销地同意使用芬木网交易服务进行芬木网平台上的一切木材交易。芬木网交易服务包括以下内容：<br>
a) 待收款项：是指其他芬木网会员向您支付的各类款项。为避免疑义，前述款项将以T+0的方式进入您在芬木网指定支付通道上开通的会员虚拟账户，用于您提现或向其他芬木网会员支付款项；<br>
b) 待付款项：是指您将款项支付给您指定的其他芬木网会员。您可通过您在芬木网指定支付通道上开通的会员虚拟账户向其他芬木网会员付款；<br>
c) 提现功能：在芬木网指定支付通道上开通的会员虚拟账户进行提现，请您同意并理解，基于您提供的账户所属银行不同，您提取资金的到账时间将会存在差异。<br>
2.您不可撤销地授权芬木网：<br>
a) 根据芬木网交易规则，从您的芬木网指定支付通道上开通的会员虚拟账户中直接扣除您应支付给芬木网（补偿款或其他）的任何款项；<br>
b) 有权根据行政或司法裁决、芬木网关于芬木网平台交易纠纷的处理规范将您芬木网会员账户中的全部或部分资金支付给其他交易方。<br>
3.您同意并遵守芬木网或芬木网委托的第三方为芬木网交易服务制订或修改的所有规则，并在芬木网或芬木网委托的第三方的要求下另行签订有关芬木网交易服务的书面协议。<br>
4.如果芬木网有合理理由认为，您与本协议有关的任何行为和/或行动可能导致争议﹑费用支出或其他主张，芬木网有权延迟汇款并冻结您在芬木网指定支付通道上开通的会员虚拟账户中的资金，直至对您与本协议有关的行为和/或行动进行的调查完成之日。<br>
5.作为一项安全措施，芬木网有权，但无义务，对芬木网平台上的任何交易的价值或金额、在一定期间内所有交易的累积价值或金额、或每天或其他时段的交易次数设置交易限制。就下列情况，芬木网不对您承担责任：<br>
a) 如果芬木网不进行某一超过芬木网出于安全原因而设定的限制的交易或支付；<br>
b) 如果芬木网允许采购方在交易开始后由于不能继续使用芬木网平台或服务而退出某一交易。<br>
          <i></i>
          <span>第六条 许可</span><br>
          1.您授予芬木网及其关联方免费的、非独占的、永久的、不可撤销的权利和许可，对任何以及全部您的资料进行使用、复制、演示、展示、分发、改编、修改、重新排版、制作衍生作品以及商业化或非商业化，并可再许可前述权利。<br>
          <i></i>
          <span>第七条 免责声明与一般豁免</span><br>
          1.在法律允许的最大范围内，您以及您的关联方放弃要求，同时芬木网以及芬木网的关联方免于承担：<br>
a) 对本协议、本协议项下的服务以及预期交易的任何陈述与保证，包括对适销性、适用于特定目的或不侵权的任何默示担保；<br>
b) 基于交易过程、协议履行或交易惯例产生的默示担保；<br>
c) 任何义务、责任、权利、主张或侵权救济，不论其是否由于芬木网的疏忽产生。芬木网不保证芬木网平台所包含的功能和服务将满足您的要求，或是随时可用、及时、安全、不间断或无错误的，芬木网也不对任何服务中断承担责任，包括但不限于系统崩溃或其他可能影响任何交易的接收、处理、验收、完成、配送或结算的中断。<br>
2.如果您与采购方就您的产品产生争议，则您和采购方都不应向芬木网提出与此争议相关的任何形式和性质的主张、要求和损害赔偿（包括实际损害和间接损害）。<br>
          <i></i>
          <span>第八条 税务问题</span><br>
          1.您将自行负责并承担您因在芬木网平台进行交易而产生的所有税费。<br>
2.您根据本协议应向芬木网支付的任何费用均已包含所有的应纳税额。尽管如前所述，如果税务机关要求芬木网支付了任何税款，您应当立即向芬木网返还该笔已经垫付的款项。<br>
          <i></i>
          <span>第九条 保密义务</span><br>
          1.在您使用服务的过程中，您可能收到有关芬木网或其服务的不为公众所知悉的信息（“保密信息”），包括但不限于芬木网交易信息。您同意：<br>
a) 所有保密信息均为芬木网的独占财产；<br>
b) 您仅在使用服务的合理必要的范围内使用保密信息，并保证接触保密信息的人知悉并遵守本条规定的保密义务；<br>
c) 您不能将保密信息向除上述规定外的任何个人、公司或其他第三方披露；<br>
d) 您将采取一切合理措施来保护保密信息，使其不被以非经本协议明确允许的方式使用或披露。非经芬木网事先书面同意，您不得以任何方式（包括在您的宣传材料中）发布有关芬木网平台服务的任何公开声 明，或使用芬木网的名称、商标或标识。<br>
          <i></i>
          <span>第十条 向第三方转让权利和义务</span><br>
          1.未经芬木网的事先书面同意，您不得将本协议项下的权利义务转让给任何第三方。<br>
          <i></i>
          <span>第十一条 违约</span><br>
          1.一方不履行本协议义务或者履行本协议义务不符合约定或违反陈述与保证条款的，给对方造成损失的，损失赔偿额应当相当于因违约所造成的损失，包括协议履行后可以获得的利益，但不得超过违约一方订立合同时预见到或者应当预见到的因违反本协议可能造成的损失。<br>
2.下列事项发生时，芬木网有权立即终止本协议，并要求您赔偿芬木网遭受的损失。<br>
a) 散布对芬木网平台的非法或不实言论；<br>
b )利用芬木网平台从事违法犯罪活动。<br>
          <i></i>
          <span>第十二条 不可抗力</span><br>
          1.芬木网不对因不可预见、不能避免、无法克服的原因、事件或其他因素导致的任何迟延或未能履行本协议下的任何义务而承担责任。<br>
          <i></i>
          <span>第十三条 您和芬木网关系</span><br>
          1.本协议并不导致您和芬木网之间产生任何合伙、合资、代理、特许权使用、销售代表或雇佣关系。您无权代表芬木网发出或接受任何要约或承诺。您不能在您的网站或任何其他场所做出任何与本条规定相冲突的声明。<br>
2.本协议在您与芬木网之间不产生排他性合作关系。本协议所明示、提及或暗示的任何内容均不得被认为或解释为授予除本协议各方之外的任何人本协议项下或与本协议有关的任何合法或正当的权利、救济或诉求。本协议及其项下所有陈述、保证、约定、条件和条款仅为芬木网、您以及采购方的利益而制定。在您和芬木网之间，您将对与所有与使用第三方服务或您允许芬木网代表您使用的内容负责，包括符合适用的使用条款。<br>
          <i></i>
          <span>第十四条 协议期限</span><br>
          1.本协议有效期为您申请注册芬木网会员之日起一年。协议届满后，经双方协商一致，可延期一年。<br>
2.芬木网保留立即停止任何交易、阻止或限制访问服务，或采取其他行动的权利，以限制访问或提供任何不准确的产品陈列、任何不适当归类的产品、任何违法产品，或任何被所适用的法律所禁止的其他产品。<br>
          <i></i>
          <span>第十五条 法律适用和争议解决</span><br>
          1.本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律（但不包括其冲突法规则）。如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。<br>
2.如双方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，双方同意向芬木网住所地具有管辖权的一审法院提起诉讼。<br>
          </p>
        <button @click="agree();">已阅读并同意</button>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import Checked from "../../components/Checked";
import { Toast } from "mint-ui";
import { mapGetters, mapActions } from "vuex";
import app from "../../utils/common";
import md5 from 'js-md5'

export default {
  components: {
    "v-checked": Checked,
  },
  data() {
    return {
      imgCodeSrc: null,
      msg: "已阅读并同意",
      phoneNumber: null, //手机号
      imgCode: null, //图片验证码
      mobileCode: null, //短信验证码
      passWord: "", //密码
      passWordAgain: null,
      inviter:'', //推荐人
      computedTime: 0, //倒数记时
      checkStatus: true, //是否勾选协议
      popupVisible: false //是否显示协议
    };
  },
  computed: {
    ...mapGetters([
      'getOpenid',
      'getUnionid'
    ]),
    //判断手机号码
    rightPhoneNumber: function() {
      return /^1\d{10}$/gi.test(this.phoneNumber);
    }
  },
  mounted () {
    this.getCaptchaCode();
  },
  methods: {
    ...mapActions([
      "login"
    ]),
    //是否勾选协议
    isCheck(...isCheck) {
      this.checkStatus = !isCheck[0];
    },
    //显示协议
    showDeal() {
      this.popupVisible = true;
    },
    //同意协议
    agree() {
      this.popupVisible = false;
      this.$refs.checked.setTrue();
      this.checkStatus = true;
    },
    //获取验证码
    async getCaptchaCode() {
      app.post('common/verifyimg',{
        clientId:this.getUuid()
      },(r)=>{
        this.imgCodeSrc = `data:image/jpeg;base64,${r.result}`;
      })
    },
    //获取短信验证码
    async getVerifyCode() {
      if (!this.rightPhoneNumber) {
        Toast({
          message: "请输入正确的手机号",
          position: "bottom",
          duration: 1500
        });
        return;
      }
      if (this.imgCode == null) {
        Toast({
          message: "请输入图片验证码",
          position: "bottom",
          duration: 1500
        });
        return;
      }
      let index=0;
      if(index!=0) {
        return;
      }
      index=1;
      setTimeout(()=> {
        index=0;
      },1000)
      //发送短信验证码
      app.post('common/sendsms',{
        mobile:this.phoneNumber,
        imgCode:this.imgCode,
        clientId:this.getUuid()
      },(r)=>{
        Toast({
          message: "发送成功",
          position: "bottom",
          duration: 1500
        });
        this.computedTime = 60;
        this.timer = setInterval(() => {
          this.computedTime--;
          if (this.computedTime == 0) {
              clearInterval(this.timer);
          }
        }, 1000);
      })
    },
    //提交
    submit() {
      if (!this.rightPhoneNumber) {
        Toast({
          message: "请输入正确的手机号",
          position: "bottom",
          duration: 1500
        });
        return;
      }
      /*if (this.imgCode == null) {
        Toast({
          message: "请输入图片验证码",
          position: "bottom",
          duration: 1500
        });
        return;
      }
      if (this.mobileCode == null) {
        Toast({
          message: "请输入短信验证码",
          position: "bottom",
          duration: 1500
        });
        return;
      }*/
      if (this.passWord.length < 8 || this.passWord.length > 20) {
        Toast({
          message: "密码请设置8-20位字符",
          position: "bottom",
          duration: 1500
        });
        return;
      }
      if (this.passWord!=this.passWordAgain) {
        Toast({
          message: "两次密码输入不一致",
          position: "bottom",
          duration: 1500
        });
        this.passWord='';
        this.passWordAgain='';
        return;
      }
      if(!this.checkStatus) {
        Toast({
          message: "请同意芬木网用户注册协议",
          position: "bottom",
          duration: 1500
        });
        return;
      }
      app.post('member/register',{
        mobile:this.phoneNumber,
        //imgVerifyCode:this.imgCode,
        //smsVerifyCode:this.mobileCode,
        password:md5(this.passWord),
        pwdSafeLevel:app.computePassword(this.passWord),
        inviter:this.inviter,
        clientId:this.getUuid(),
        openid:this.getOpenid,
        unionid:this.getUnionid,
        socialType:this.getOpenid == null ? null:3
      },(r)=>{
        this.login(r.result);
        Toast({
          message: "注册成功！",
          position: "bottom",
          duration: 1000
        });
        setTimeout(()=>{
          this.$router.go(-2);
        },1000)
      })
    },
    //获取uuid
    getUuid() {
      let uuid=app.getStore('uuid');
      if(uuid==null) {
        uuid=this.uuid();
        app.setStore('uuid',uuid);
      }
      return uuid;
    },
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";
      var uuid = s.join("");
      return uuid;
    }
  }
};
</script>

<style scoped lang="scss">
 	@media only screen and (min-width:500px){
    .page-register{
        max-width: $bodyWidth;
    }
	}
.page-register {
  height: 100vh;
  width: 100%;
  transform: translateX(-50%);
  position: fixed;
  left: 50%;
  top: 0;
  background-color: #fff;
  .mint-cell-wrapper {
    //该默认label字体16px为14px
    font-size: 14px;
  }
  .agree-label {
    color: #666;
  }
  .get-code {
    width: px2rem(190px);
    font-size: 14px;
    color: $primary;
    height: 44px;
    line-height: 44px;
    border-left: 1px solid #eee;
    text-align: center;
    white-space: nowrap;
  }
  .img-code {
    width: px2rem(190px);
    max-height: 44px;
    align-self: flex-end;
    background-color: #f00;
  }
  .deal {
    span {
      color: $primary;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .mint-popup {
    width: 90%;
  }
  .popup {
    width: 100%;
    color: #666;
    text-align: left;
    padding: 0 px2rem(20px);
    h2 {
      text-align: center;
      font-size: #333;
      font-size: px2rem(32px);
      padding: px2rem(28px) 0;
    }
    p {
      font-size: px2rem(28px);
      padding-bottom: 0;
      max-height: 60vh;
      overflow-y: auto;
      i {
        display: block;
        height: px2rem(20px);
      }
    }
    span {
      font-size: px2rem(28px);
      color: #333;
    }
    button {
      display: block;
      width: 100%;
      text-align: center;
      background: #fff;
      border: none;
      border-top: 1px solid $light;
      line-height: px2rem(90px);
      font-size: px2rem(32px);
      color: $primary;
    }
  }
}
</style>
