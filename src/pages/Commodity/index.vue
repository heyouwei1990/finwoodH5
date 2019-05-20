<template>
	<div class="publish-goods" v-title="'发布商品'">
    <collapse title="基础信息" :drop="true">
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper" @click="popup(0,'name')">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i class="required-mark">*</i>分类</span>
          </div>
          <input v-model="category" v-if="isEdit"  disabled placeholder="请选择" type="text" class="mint-field-core">
          <input v-model="category" v-if="!isEdit" style="color:#999" disabled placeholder="请选择" type="text" class="mint-field-core">
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </a>
      <autoComplete
        :title="'品种'"
        :dataList="slotsData[1]"
        :placeholder="'请输入品种'"
        :text.sync="varieties"
        :collect.sync="collect[1]"
      ></autoComplete>
      <a class="mint-cell mint-field" v-if="collect[0].pkid==1">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i class="required-mark">*</i>是否烘干</span>
          </div>
          <mt-radio
            class="radio-box"
            v-model="isDry"
            :options="isDryData">
          </mt-radio>
        </div>
      </a>
      <div class="upload">
        <i class="required-mark">*</i>添加图片（1~4张）<br>
        <ul class="file-list">
          <li class="file-box" v-for="(item,index) in uploadImg" :key="index">
            <input type="file" accept="image/*" multiple @change="upload($event,index);">
            <img v-lazy="item" alt="">
          </li>
        </ul>
      </div>
      <p class="perch"></p>
      <autoComplete
        :title="'产地'"
        :dataList="slotsData[2]"
        :placeholder="'请输入产地'"
        :text.sync="fromPlace"
        :collect.sync="collect[2]"
      ></autoComplete>
      <autoComplete
        custom="1"
        :title="'品牌'"
        :dataList="slotsData[3]"
        :placeholder="'请输入品牌'"
        :text.sync="brand"
        :collect.sync="collect[3]"
      ></autoComplete>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper" @click="popup(5,'abbrName')">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i class="required-mark">*</i>提货仓</span>
          </div>
          <input v-model="warehouse"  disabled placeholder="请选择仓库" type="text" class="mint-field-core">
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i class="required-mark">*</i>仓库地址</span>
          </div>
          <input v-if="collect[5]" :value="collect[5].address" disabled placeholder="请选择提货仓" type="text" class="mint-field-core">
        </div>
      </a>
      <autoComplete
        custom="1"
        :title="'详细地址'"
        :dataList="slotsData[7]"
        :placeholder="'请输入仓库详细地址'"
        :text.sync="warehouseDetail"
      ></autoComplete>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i class="required-mark">*</i>是否面议</span>
          </div>
          <mt-radio
            class="radio-box"
            v-model="isBargain"
            :options="isBargainData">
          </mt-radio>
        </div>
      </a>
      <a class="mint-cell mint-field" v-if="isBargain==0">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i class="required-mark">*</i>价格</span>
          </div>
          <input v-model="unitPrice" placeholder="" type="tel" maxlength="8" class="mint-field-core miniInput">&nbsp;—&nbsp;
          <input v-model="maxPrice" placeholder="" type="tel" maxlength="8" class="mint-field-core miniInput">
          <div class="mint-cell-title custom" @click="popup(6,'text')">
            <span class="mint-cell-text">单位</span>
          </div>
          <span @click="popup(6,'text')">{{unitPriceText}}&nbsp;</span>
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i class="required-mark">*</i>库存量</span>
          </div>
          <input v-model="maxSale" placeholder="请输入库存数量" maxlength="5" type="tel" class="mint-field-core">
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text"><i class="required-mark">*</i>规格</span>
          </div>
          <input v-model="size" placeholder="例：2-6cm*20-100cm*2-3m" type="text" class="mint-field-core">
        </div>
      </a>
    </collapse>
    <collapse :goBottom="true" title="更多信息" :drop="true">
      <a class="mint-cell mint-field" v-if="collect[0].pkid==2">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">{{mean}}</span>
          </div>
          <input v-model="meanSquare" :placeholder="'请输入'+mean"
                 maxlength="20" type="tel" class="mint-field-core">
          <div class="mint-cell-title custom">
            <span class="mint-cell-text"></span>
          </div>
          <span>{{unitPriceText}}&nbsp;</span>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper" @click="popup(4,'text')">
          <div class="mint-cell-title">
            <span class="mint-cell-text">等级</span>
          </div>
          <input v-model="grade" disabled placeholder="请选择等级" type="text" class="mint-field-core">
          <i class="iconfont icon-jiantouyou"></i>
        </div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">起售量</span>
          </div>
          <input v-model="minSale" placeholder="请输入起售数量" type="tel" maxlength="5" class="mint-field-core">
        </div>
      </a>
      <mt-field class="align-top" maxlength="500"
                label="产品简介" placeholder="请输入500字以内产品简介"
                max-length="500" type="textarea" rows="3" v-model="introduction"></mt-field>
    </collapse>
    <div class="bottomBtn">
      <button @click="save(1,false)" v-if="$route.query.status != 3">暂存</button>
      <button @click="saveBtn()" v-if="$route.query.status == 3">保存</button>
      <button @click="save(2,true)" v-if="$route.query.status != 1 && $route.query.status != 3">立即发布</button>
      <button @click="save(2,true)" v-if="$route.query.status == 1">提交审核</button>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <p class="confirm">
        <button class="left" @click="cancel();">取消</button>
        <button class="right" @click="affirm();">确认</button>
      </p>
      <mt-picker :slots="slots" :valueKey="valKey" @change="onValuesChange"></mt-picker>
    </mt-popup>
	</div>
</template>

<script>
import { MessageBox, Toast } from "mint-ui"
import app from "../../utils/common"
import Vue from "vue"
import { mapGetters } from "vuex"
import autoComplete from "../../components/autoComplete"
import Collapse from "../../components/collapse"

export default {
  computed: {
    ...mapGetters([
      "getToken"
    ])
  },
  components: {
    autoComplete,
    Collapse
  },
  data() {
    return {
      mean:'平均方',
      old_product:{},
      old_images:[],
      old_productItem:{},
      category: "", //分类
      varieties: "", //品种
      isDryData:[
        {
          label:'干板',
          value:'1'
        },
        {
          label:'湿板',
          value:'0'
        }
      ],
      isDry:'1',   //是否烘干
      fromPlace: "", //产地
      warehouse: "", //提货仓
      isBargainData:[
        {
          label:'是',
          value:'1'
        },
        {
          label:'否',
          value:'0'
        },
      ],
      isBargain:'0',   //是否面议
      unitPriceText: "", //计价单位
      unitPrice: "", //单价
      maxPrice:"", //最大单价
      maxSale: 999, //库存量
      size:'', //规格
      meanSquare:'',    //平均方
      brand: "", //品牌
      grade: "", //等级
      minSale: 1, //起售量
      introduction:'',  //产品简介
      imgShowPath:null,
      uploadImg: [
        require("../../images/upload/uploadImg.png"),
        require("../../images/upload/uploadImg.png"),
        require("../../images/upload/uploadImg.png"),
        require("../../images/upload/uploadImg.png")
      ],
      shopImg: [], //api所需图片地址
      slots: [
        {
          flex: 1,
          defaultIndex: 0,
          values: []
        }
      ],
      valKey: null,
      collect: [{
        pkid:1
      }],
      slotsData: [],
      popupVisible: false, //显示弹出框
      selected: null, //选中值
      selectIndex: null, //当前选中索引
      goodsId: this.$route.query.pkid==null?0:Number(this.$route.query.pkid), //pkid
      isEdit:true,
      warehouseDetail:''  //仓库详细地址
    };
  },
  mounted() {
    this.dataInit();
    app.preventDefault();
  },
  methods: {
    onValuesChange(picker, value) {
      this.selected = value;
    },
    //上传图片
    async upload(e, index) {
      app.upload(e, (url, suffix) => {
        let base64 = url.split(",");
        app.post("file/upload",{
            suffix: suffix,
            type: 2,
            image: base64[base64.length - 1],
            isThumb:1
          },r => {
            Vue.set(this.uploadImg, index, url);
            Vue.set(this.shopImg, index, r.result);
          }
        );
      },true);
    },
    //弹出层
    popup(index, key) {
      event.target.blur();
      this.slots[0].values = this.slotsData[index].data;
      if(key){
        this.valKey = key;
      }
      this.popupVisible = true;
      this.selectIndex = index;
    },
    cancel() {
      this.popupVisible = false;
    },
    //确认
    affirm() {
      switch (this.selectIndex) {
        case 0:
          this.category = this.selected[0]["name"];
          this.collect[0] = this.selected[0];
          break;
        case 1:
          this.varieties = this.selected[0]["text"];
          this.collect[1] = this.selected[0];
          break;
        case 2:
          this.fromPlace = this.selected[0]["text"];
          this.collect[2] = this.selected[0];
          break;
        case 3:
          this.brand = this.selected[0]["text"];
          this.collect[3] = this.selected[0];
          break;
        case 4:
          this.grade = this.selected[0]["text"];
          this.collect[4] = this.selected[0];
          break;
        case 5:
          this.warehouse = this.selected[0]["abbrName"];
          this.collect[5] = this.selected[0];
          break;
        case 6:
          this.unitPriceText = this.selected[0]["text"];
          this.collect[6] = this.selected[0];
          if(this.collect[6].value == 2) {
            this.mean = '平均重量';
          }else {
            this.mean = '平均方';
          }
          break;
        default:
      }
      this.popupVisible = false;
    },
    //初始化数据
    dataInit() {
      for(let i=0;i<14;i++) {
        this.slotsData.push({
          data: []
        });
      }
      app.post("/product/editproduct",{
          token: this.getToken,
          pkid: this.goodsId
        },res => {
          //品牌国内加工置顶操作
          for(let i=0;i<res.result.relationVB.length;i++) {
            if(res.result.relationVB[i].text == '国内加工') {
              let value = res.result.relationVB[i];
              res.result.relationVB.splice(i,1);
              res.result.relationVB.unshift(value);
              break;
            }
          }

          this.old_product=res.result.product;
          this.old_productItem=res.result.productItem;
          this.old_images=res.result.images;
          //分类选项
          this.slotsData[0].data = res.result.lstCategory;
          this.category = this.slotsData[0].data[0]["name"]; //默认板材
          this.collect[0] = this.slotsData[0].data[0];
          //品种选项
          this.slotsData[1].data = res.result.relationCV;
          //产地选项
          this.slotsData[2].data = res.result.relationVO;
          //品牌选项
          this.slotsData[3].data = res.result.relationVB;
          //等级选项
          this.slotsData[4].data = res.result.relationVG;
          //提货仓选项
          this.slotsData[5].data = res.result.lstWarehouse;
          this.warehouse = this.slotsData[5].data[0].abbrName;    //默认提货仓库
          this.collect[5] = this.slotsData[5].data[0];
          //计量单位选项
          this.slotsData[6].data = res.result.lstUnit;
          this.unitPriceText = this.slotsData[6].data[0]["text"]; //默认计量单位
          this.collect[6] = this.slotsData[6].data[0];
          //仓库地址
          let lstShopRegion = [];
          for(let i of res.result.lstShopRegion) {
            lstShopRegion.push({
              text:i.warehousePosition
            })
          }
          this.slotsData[7].data = lstShopRegion;

          //如果有pkid
          if (this.goodsId!=0) {
            //赋值
            let goodsInfo = res.result.product;
            let item = res.result.productItem;
            if(item.salesPrice===0 && item.salesPriceUpper===0) {
              this.isBargain = '1';
            }else {
              if(item.salesPrice!==0) {
                this.unitPrice = item.salesPrice;
              }
              if(item.salesPriceUpper!==0) {
                this.maxPrice = item.salesPriceUpper;
              }
            }
            this.minSale = goodsInfo.minimumOrderQuantity;
            this.maxSale = item.stockQuantity;
            this.imgShowPath=res.result.imgShowPath;
            this.size = item.specification;
            this.shopImg=[];
            this.warehouseDetail = goodsInfo.warehousePosition;

            if(goodsInfo.categoryName != null&&goodsInfo.categoryName != '') {
              this.isEdit=false;
            }
            this.meanSquare = item.meanSquare;
            this.introduction = goodsInfo.introduction;

            for (let i = 0; i < res.result.images.length; i++) {
              Vue.set(this.uploadImg, i, this.imgShowPath+res.result.images[i].thumbPath);
              this.shopImg.push(res.result.images[i].actualPath);
            }
            for (let i = 0; i < this.slotsData[0]["data"].length; i++) {
              //获取分类
              if (goodsInfo.categoryId == this.slotsData[0]["data"][i]["pkid"]) {
                this.collect[0] = this.slotsData[0]["data"][i];
                this.category = this.collect[0]["name"];
              }
            }
            for (let i = 0; i < this.slotsData[1]["data"].length; i++) {
              //获取品种
              if (goodsInfo.varietyId == this.slotsData[1]["data"][i]["value"]) {
                this.collect[1] = this.slotsData[1]["data"][i];
                this.varieties = this.collect[1]["text"];
              }
            }
            for (let i = 0; i < this.slotsData[2]["data"].length; i++) {
              //获取产地
              if (goodsInfo.originId == this.slotsData[2]["data"][i]["value"]) {
                this.collect[2] = this.slotsData[2]["data"][i];
                this.fromPlace = this.collect[2]["text"];
              }
            }
            for (let i = 0; i < this.slotsData[3]["data"].length; i++) {
              //获取品牌
              if (goodsInfo.brandId == this.slotsData[3]["data"][i]["value"]) {
                this.collect[3] = this.slotsData[3]["data"][i];
                this.brand = this.collect[3]["text"];
              }
            }
            for (let i = 0; i < this.slotsData[4]["data"].length; i++) {
              //获取等级
              if (goodsInfo.gradeId == this.slotsData[4]["data"][i]["value"]) {
                this.collect[4] = this.slotsData[4]["data"][i];
                this.grade = this.collect[4]["text"];
              }
            }
            for (let i = 0; i < this.slotsData[5]["data"].length; i++) {
              //获取提货仓
              if (
                goodsInfo.warehouseId == this.slotsData[5]["data"][i]["pkid"]
              ) {
                this.collect[5] = this.slotsData[5]["data"][i];
                this.warehouse = this.collect[5]["abbrName"];
              }
            }
            for (let i = 0; i < this.slotsData[6]["data"].length; i++) {
              //获取计量单位
              if (goodsInfo.unit == this.slotsData[6]["data"][i]["value"]) {
                this.collect[6] = this.slotsData[6]["data"][i];
                this.unitPriceText = this.collect[6]["text"];
              }
            }
            if(this.collect[6].value == 2) {
              this.mean = '平均重量';
            }else {
              this.mean = '平均方';
            }
          }
        },false,this);
    },
    //上架商品保存
    async saveBtn() {
      if(this.collect[1] && this.collect[1]["value"] != this.old_product.varietyId) {
        await this.msg();
        return;
      }
      if(this.shopImg.length != this.old_images.length) {
        await this.msg();
        return;
      }
      let type =false;
      for(let i=0 ;i< this.shopImg.length;i++) {
        if(this.shopImg[i] != this.old_images[i].actualPath) {
          type=true;
        }
      }
      if(type) {
        await this.msg();
        return;
      }
      if(this.collect[2] && this.collect[2]["value"] != this.old_product.originId) {
        await this.msg();
        return;
      }
      if(this.collect[3] && this.collect[3]["value"] != this.old_product.brandId) {
        await this.msg();
        return;
      }
      if(this.collect[4] && this.collect[4]["value"] != this.old_product.gradeId) {
        await this.msg();
        return;
      }
      if(this.collect[6] && this.collect[6]["value"] != this.old_product.unit) {
        await this.msg();
        return;
      }
      this.save(1,false);
    },
    msg() {
      setTimeout(()=>{
        MessageBox.confirm('商品即将下架，重新提交审核！','芬木提示').then(action => {
          this.save(2,true,'商品已下架');
        }).catch(action=>{});
      },50)
    },
    //暂存或者提交
    save(type,pullOn,msg) {
      let imageUrls=[];
      for(var i=0;i<this.shopImg.length;i++){
        if (this.shopImg[i] != null) {
          imageUrls.push(this.shopImg[i]);
        }
      }
      if(pullOn) {
        if (this.category === "") {
          Toast({ message: "请选择分类",position:'bottom', during: 1000 });
          return;
        }
        if (this.varieties === "") {
          Toast({ message: "请输入品种",position:'bottom', during: 1000 });
          return;
        }
        if (this.shopImg.length == 0) {
          Toast({ message: "请上传商品图片",position:'bottom', during: 1000 });
          return;
        }
        if (this.fromPlace === "") {
          Toast({ message: "请输入产地",position:'bottom', during: 1000 });
          return;
        }
        if(this.brand === "") {
          Toast({ message: "请输入品牌",position:'bottom', during: 1000 });
          return;
        }
        if (this.warehouse === "") {
          Toast({ message: "请选择提货仓",position:'bottom', during: 1000 });
          return;
        }
        if (this.warehouseDetail === "") {
          Toast({ message: "请输入详细地址",position:'bottom', during: 1000 });
          return;
        }
        if(this.isBargain==0) {
          if(this.unitPrice === '' && this.maxPrice === '') {
            Toast({ message: "请填写价格",position:'bottom', during: 1000 });
            return;
          }
          if (this.unitPrice !== ''&&!/^[0-9]+\d*$/.test(this.unitPrice)) {
            Toast({ message: "最小价格应大于等于0",position:'bottom', during: 1000 });
            return;
          }
          if (this.maxPrice !== ''&&!/^[0-9]+\d*$/.test(this.maxPrice)) {
            Toast({ message: "最大价格应大于等于0",position:'bottom', during: 1000 });
            return;
          }
          if(this.unitPrice !== ''&&this.maxPrice !== '' && Number(this.unitPrice)>Number(this.maxPrice)) {
            Toast({ message: "价格区间输入不合法",position:'bottom', during: 1000 });
            return;
          }
        }
        if (this.maxSale === "") {
          Toast({ message: "请填写库存量",position:'bottom', during: 1000 });
          return;
        }
        if (!/^[0-9]+(.[0-9]{1,3})?$/.test(this.maxSale)) {
          Toast({ message: "库存量大于0可保留三位小数",position:'bottom', duration: 1000 });
          return;
        }
        if(this.size === "") {
          Toast({ message: "请填写规格",position:'bottom', during: 1000 });
          return;
        }

        if (this.minSale != ""&&!/^[1-9]+\d*$/.test(this.minSale)) {
          Toast({ message: "起售量为正整数",position:'bottom', during: 1000 });
          return;
        }
        //起售量不得大于库存量
        if (parseInt(this.minSale)>parseInt(this.maxSale)){
          Toast({
            message:'起售量不得大于库存量',
            position:'bottom',
            during:'1500'
          })
          return;
        }
        if(this.collect[0].pkid==2) {
          if (this.meanSquare !== "" &&!/^[1-9]+\d*$/.test(this.meanSquare)) {
            Toast({ message: this.mean+"为正整数",position:'bottom', during: 1000 });
            return;
          }
        }
      }
      app.post("/product/save",{
          saveType:type,
          token: this.getToken,
          productId: Number(this.goodsId),
          categoryId: this.collect[0]?Number(this.collect[0]["pkid"]):null,
          varietyId: this.collect[1]?Number(this.collect[1]["value"]):null,
          varietyName: this.collect[1]?this.collect[1]["text"]:'',
          originId: this.collect[2]?Number(this.collect[2]["value"]):null,
          originName: this.collect[2]?this.collect[2]["text"]:'',
          brandId: this.collect[3]?Number(this.collect[3]["value"]):0,
          brandName: this.brand,
          gradeId: this.collect[4]?Number(this.collect[4]["value"]):null,
          gradeName: this.collect[4]?this.collect[4]["text"]:'',
          warehouseId: this.collect[5]?Number(this.collect[5]["pkid"]):null,
          warehousePosition:this.warehouseDetail,
          salesPrice: this.isBargain==1?0:Number(this.unitPrice),
          salesPriceUpper: this.isBargain==1?0:Number(this.maxPrice),  //最大价格
          unit: this.collect[6]?Number(this.collect[6]["value"]):null,
          specification:this.size, //规格
          minimumOrderQuantity: Number(this.minSale),
          stockQuantity: Number(this.maxSale),
          imageUrls: imageUrls,
          isDry:Number(this.isDry),  //是否烘干(0:否，1:是)
          meanSquare:this.collect[0].pkid==2?this.meanSquare:null,  //平均方
          introduction:this.introduction
        },res => {
          this.goodsId = res.result.effect;
          if (pullOn && !msg) {
            app.post("/product/pullon",{
                token: this.getToken,
                productIds: [this.goodsId]
              },res => {
                this.$router.push({ path: "/issuesuccess" });
              }
            );
          } else {
            Toast({
              message: msg || "保存成功",
              position: 'bottom',
              during: 1500,
            });
            if(msg) {
              this.dataInit();
            }
          }
        },false,this);
     }
  }
};
</script>

<style lang="scss">
@import "src/styles/components/upload";
.publish-goods {
  font-size: 14px;
  padding-bottom: 60px;
  .mint-cell:last-child,.mint-cell-wrapper .mint-cell-wrapper{
    background-image: none;
  }
  .mint-cell-wrapper .mint-cell{
    background-color: transparent;
    min-height: 40px;
  }
  .miniInput {
    //background: #f5f5f5;
    padding: 5px;
  }
  .mint-cell-wrapper {
    //该默认label字体16px为14px
    font-size: 14px;
  }
  .collapse-components .collapse-dt{
    height:px2rem(108px);
  }
  .collapse-title{
    font-weight:500;
  }
  .flex-cell {
    display: flex;
    flex: 1;
    align-items: center;
    min-width: 10px;
  }
  .mint-button::after {
    background: $primary;
  }
  .mint-cell-text i {
    font-style: normal;
    color: $danger;
  }
  .mint-field-core {
    font-size: 14px;
  }
  .mint-radiolist {
    @include fj;
    position: absolute;
    align-items: center;
    left: 21%;
    height:100%;
    top:0;
  }
  .mint-radio-input:checked + .mint-radio-core {
    background: $primary;
    border-color: $primary;
  }
  .mint-radiolist .mint-cell-title {
    width: auto;
  }
  .perch {
    height: px2rem(20px);
  }
  .mint-cell-wrapper > .mint-cell-title:nth-child(2) {
    width: 80px;
  }
  .mt-checkbox {
    width: auto !important;
    white-space: nowrap;
    box-sizing: border-box;
    .mint-checkbox-core {
      border-radius: 2px;
    }
  }
  .mint-popup {
    width: 100%;
  }
  .confirm {
    height: px2rem(60px);
    button {
      width: px2rem(110px);
      height: px2rem(60px);
      font-size: 14px;
      border: none;
      background-color: transparent;
      &:nth-of-type(1) {
        color: #333;
      }
      &:nth-of-type(2) {
        color: $primary;
      }
    }
  }
  .custom {
    width: auto;
    margin-right: px2rem(15px);
    position: relative;
    top: -1px;
  }
  .unit-txt{
    width: 3em;
    text-align: right;
    white-space:nowrap;
  }
  .size-label {
    width: px2rem(150px);
  }
  .input {
    width: px2rem(100px);
    height: 22px;
    line-height: 20px;
    padding: 0 px2rem(15px);
    border: 1px solid #dcdcdc;
    border-radius: 2px;
  }
  /*.right {*/
  /*position: absolute;*/
  /*right: 10px;*/
  /*}*/
 	@media only screen and (min-width:500px){
    .bottomBtn{
        max-width: $bodyWidth;
    }
	}
  .bottomBtn {
    @include fj;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    height: 50px;
    width: 100%;
    button {
      width: 100%;
      border: none;
      color: #fff;
      font-size: 16px;
      background: $danger;
    }
    button:nth-last-of-type(2) {
      background: #d2d2d2;
    }
    button:nth-last-of-type(1) {
      background: $danger;
    }
  }
  .align-top .mint-cell-wrapper{
    align-items: flex-start;
  }
}
</style>
