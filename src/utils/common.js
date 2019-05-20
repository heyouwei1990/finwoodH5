import axios from 'axios'
import md5 from 'js-md5'
import { Indicator } from 'mint-ui'
import EXIF from 'exif-js';
import { Toast } from 'mint-ui';

const { debug, baseURL, appId, appSecret ,timeout } = window.config;

/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/**
 * 设置用户搜索记录
 */
const setHistory = (name, val) => {
  let max=10;   //最大限制10个
  if (!name) return;
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
  }

  let _list = [];
  if (window.localStorage.getItem('historyList') != null) {
    _list = window.localStorage.getItem(name).split(',');
  }

  if (_list == null) {
    _list = [];
  }
  if (_list && _list.length > 0) {
    var index = -1;
    var item;
    for (var i = 0; i < _list.length; i++) {
      item = _list[i];
      if (item == val) {
        index = i;
      }
    }
    if (index == -1) { //不存在，加到第一个位置上
      _list.unshift(val);
    } else { //存在，移动到首位
      _list.splice(index, 1);
      _list.unshift(val);
    }
    //最多十个
    if(_list.length>max) {
      _list=_list.slice(0,max);
    }
    let jsonstr = _list.join(',');
    window.localStorage.setItem(name, jsonstr);
  } else {
    _list = [];
    _list.push(val);
    let jsonstr = _list.join(',');
    window.localStorage.setItem(name, jsonstr);
  }
}





/**
 * 日志输出
 */
const log = (r)=> {
  if (!debug) {
    return;
  }
  if (typeof (r) == "object") {
    console.log(JSON.stringify(r));
  } else {
    console.log(r);
  }
}

/**
 * @description 调试用的时间戳
 * @author suwill
 * @param {none} 不需要参数
 * @example mklog()
 */
function mklog() {
  var date = new Date(); //新建一个事件对象
  var month = date.getMonth() + 1; //获取月份
  var strDate = date.getDate(); //获取日期
  var sh = date.getHours(); //获取时
  var sm = date.getMinutes(); //获取分
  var ss = date.getSeconds(); //获取秒
  if (month >= 1 && month <= 9) { //判断月份
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (sh >= 0 && sh <= 9) {
    sh = "0" + sh;
  }
  if (sm >= 0 && sm <= 9) {
    sm = "0" + sm;
  }
  if (ss >= 0 && ss <= 9) {
    ss = "0" + ss;
  }
  var ms = date.getMilliseconds();
  if (ms >= 10 && ms <= 100) {
    ms = '0' + ms;
  } else if (ms >= 0 & ms <= 9) {
    ms = '00' + ms;
  }
  var currentdate = `20${date.getYear() - 100}-${month}-${strDate} ${sh}:${sm}:${ss}`;
  return currentdate;
}

/**
 * 字典排序
 */
function dic(value,type) {
  let sdic = Object.keys(value).sort();
  let _arr = {};
  for (let i in sdic) {
    if(type){
      if(value[sdic[i]] != null){
        _arr[sdic[i]] = value[sdic[i]];
      }
    }else {
      _arr[sdic[i]] = value[sdic[i]];
    }
  }
  return _arr;
}


/**
 * axios封装
 */
function apiAxios(method, url = '', params, callback, type,self) {
  let data = JSON.stringify({
    'bizParams': dic(params),
    'sysParams': {
      'appId': appId,
      'appSecret': appSecret,
      'timestamp': mklog(),
      'sign': md5(appId + JSON.stringify(dic(params,true)) + appSecret)
    }
  });
  //log(appId + JSON.stringify(dic(params,true)) + appSecret)
  log(`${mklog()}【AJAX:-->】【M=${url}】【P=${data}】`);
  if (type) {
    Indicator.open('加载中...');
  }
  axios({
    method: method,
    baseURL: baseURL,
    url: url,
    data: method === 'POST' ? data : null,
    params: method === 'GET' ? data : null,
    withCredentials: true,
    timeout: timeout,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
  .then(function (res) {
    if (res.data.code == 0) {
      log(`${mklog()}【M=${url}】【接口响应：】${JSON.stringify(res.data, null, 4)}`);
      callback && callback(res.data);
    }else if(res.data.code == 101) {
      //登录超时
      self.$router.push({path:'/login'});
    }else if(res.data.message == 'token不能为空') {
      self.$router.push('/login');
    } else {
      Toast({
        message: res.data.message,
        position: 'bottom',
        duration: 1500
      });
      log(`${mklog()}【M=${url}】【接口提示：】 ${res.data.message}`);
    }
    if(self) {
      setTimeout(()=>{
        self.time=0;
      },500)
    }
    Indicator.close();
  })
  .catch(function (err) {
    log(`${mklog()}【M=${url}】【错误原因：】 ${err}`);
    if(debug){
      Toast({
        message: `【M=${url}】【错误原因：】 ${err}`,
        position: 'bottom',
        duration: 1500
      });
    }
    if(self) {
      setTimeout(()=>{
        self.time=0;
      },500)
    }
    Indicator.close();
  });
}

const get = (url, params, callback, type, self)=> {
  return apiAxios('GET', url, params, callback, type,self);
};
const post = (url, params, callback, type, self)=> {
  return apiAxios('POST', url, params, callback, type,self);
};


const upload = (e, callback,type) => {
  let tag = e.target;
  let file = tag.files[0];
  if(!file){
    return;
  }
  let result = file.name.split(".");
  let suffix = result[result.length - 1];
  if(!/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(suffix)) {
    Toast({
      message: '图片格式不正确!请上传gif|jpg|jpeg|png格式',
      position: 'bottom',
      duration: 1500
    });
    return;
  }
  Indicator.open('图片上传中...');
  let uploadImg = null; //图片数据清零
  var Orientation;
  EXIF.getData(file, function () {
    Orientation = EXIF.getTag(file, "Orientation");
  });
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    var oReader = new FileReader();
    oReader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        var expectWidth = image.naturalWidth;
        var expectHeight = image.naturalHeight;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        if(type){
          if(expectWidth>expectHeight) {
            canvas.width = expectHeight;
            canvas.height = expectHeight;
            ctx.drawImage(this, -expectWidth/2+expectHeight/2, 0, expectWidth, expectHeight);
          }else {
            canvas.width = expectWidth;
            canvas.height = expectWidth;
            ctx.drawImage(this, 0, -expectHeight/2+expectWidth/2, expectWidth, expectHeight);
          }
        }else {
          canvas.width = expectWidth;
          canvas.height = expectHeight;
          ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
        }
        var base64 = null;
        //修复ios上传图片的时候 被旋转的问题
        if (Orientation != "" && Orientation != 1) {
          switch (Orientation) {
            case 6: //需要顺时针（向左）90度旋转
              rotateImg(this, "left", canvas);
              break;
            case 8: //需要逆时针（向右）90度旋转
              rotateImg(this, "right", canvas);
              break;
            case 3: //需要180度旋转
              rotateImg(this, "right", canvas); //转两次
              rotateImg(this, "right", canvas);
              break;
          }
        }
        base64 = canvas.toDataURL("image/jpeg", 0.8);
        let size = Math.floor(file.size / 1024 / 1024 * 100) / 100; //单位MB
        if (size > 1) {
          // imgScale(base64, 0.25);
          let img = new Image();
          let canvas = document.createElement("canvas");
          let cxt = canvas.getContext("2d");
          img.src = base64;
          img.onload = function () {
            //缩放后图片的宽高
            let width = img.naturalWidth * 0.25;
            let height = img.naturalHeight * 0.25;
            canvas.width = width;
            canvas.height = height;
            cxt.drawImage(this, 0, 0, width, height);
            uploadImg= canvas.toDataURL("image/jpeg");
            callback(uploadImg, suffix);
          };
        } else {
          uploadImg = base64;
          callback(uploadImg, suffix);
        }

      };
    };
    oReader.readAsDataURL(file);
  };
}


function rotateImg(img, direction, canvas) {
  //图片旋转
  var min_step = 0;
  var max_step = 3;
  if (img == null) return;
  var height = img.height;
  var width = img.width;
  var step = 2;
  if (step == null) {
    step = min_step;
  }
  if (direction == "right") {
    step++;
    step > max_step && (step = min_step);
  } else {
    step--;
    step < min_step && (step = max_step);
  }
  var degree = step * 90 * Math.PI / 180;
  var ctx = canvas.getContext("2d");
  switch (step) {
    case 0:
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);
      break;
    case 1:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, 0, -height);
      break;
    case 2:
      canvas.width = width;
      canvas.height = height;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, -height);
      break;
    case 3:
      canvas.width = height;
      canvas.height = width;
      ctx.rotate(degree);
      ctx.drawImage(img, -width, 0);
      break;
  }
}

//验证姓名
const isName= name => {
  //if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(name)) {
  if (name.length>10) {
    Toast({
      message: "姓名不合法！",
      position: "bottom",
      duration: 1500
    });
    return false;
  }
  return true;
}

//验证正整数
const isuInteger= (num) => {
  if (!/^[1-9]+\d*$/.test(num)) {
    Toast({
      message: "请输入正整数！",
      position: "bottom",
      duration: 1500
    });
    return false;
  }
  return true;
}


//验证码身份证号码
const isCardID= sId => {
  let aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} ;
  let iSum = 0;
  let info = "";
  if (!/^\d{17}(\d|x)$/i.test(sId)){
    Toast({
      message: '您输入的身份证长度或格式错误',
      position: "bottom",
      duration: 1500
    });
    return false;
  }
  sId = sId.replace(/x$/i, "a");
  if (aCity[parseInt(sId.substr(0, 2))] == null) {
    Toast({
      message: '您的身份证地区非法',
      position: "bottom",
      duration: 1500
    });
    return false;
  }
  let sBirthday =
    sId.substr(6, 4) +
    "-" +
    Number(sId.substr(10, 2)) +
    "-" +
    Number(sId.substr(12, 2));
  var d = new Date(sBirthday.replace(/-/g, "/"));
  if (
    sBirthday !=
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
  ) {
    Toast({
      message: '身份证上的出生日期非法',
      position: "bottom",
      duration: 1500
    });
    return false;
  }
  for (var i = 17; i >= 0; i--)
    iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
  if (iSum % 11 != 1) {
    Toast({
      message: '您输入的身份证号非法',
      position: "bottom",
      duration: 1500
    });
    return false;
  }
  //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
  return true;
}

//验证手机或者固话
const isPhone= e =>{
  let integer1 = /^1\d{10}$/;
  let integer2 = /^0\d{2,3}-?\d{7,8}$/;;
  if(!integer1.test(e)&&!integer2.test(e)){
    Toast({
      message: "号码格式不正确!",
      position: "bottom",
      duration: 1500
    });
    return false;
  }
  return true;
}

//验证邮箱
const isEmail= e=> {
  let szReg=/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
  if(!szReg.test(e)){
    Toast({
      message: "邮箱格式不正确!",
      position: "bottom",
      duration: 1500
    });
    return false;
  }
  return true;
}

/**
 * 计算密码强度
 *
 * @param password
 * @returns
 */
const computePassword= password => {
	var Modes = 0;
	for (let i = 0; i < password.length; i++) {
		Modes |= CharMode(password.charCodeAt(i));
	}
	return bitTotal(Modes);

  function CharMode(iN) {
    if (iN >= 48 && iN <= 57)// 数字
      return 1;
    if (iN >= 65 && iN <= 90) // 大写字母
      return 2;
    if ((iN >= 97 && iN <= 122) || (iN >= 65 && iN <= 90))
      // 大小写
      return 4;
    else
      return 8; // 特殊字符
  }

  function bitTotal(num) {
    let modes = 0;
    for (let i = 0; i < 4; i++) {
      if (num & 1)
        modes++;
      num >>>= 1;
    }
    if(modes==2 || modes==3){
      return 2
    }else if(modes==4) {
      return 3;
    }else {
      return modes;
    }
  }
}

const preventDefault = ()=> {
  if(document.getElementsByClassName('picker-slot-center')) {
    document.getElementsByClassName('picker-slot-center')[0].addEventListener('touchmove',function(e){
      e.preventDefault();
    })
    document.getElementsByClassName('confirm')[0].addEventListener('touchmove',function(e){
      e.preventDefault();
    })
  }
}

export default {
  log,
  get,
  post,
  setHistory,
  upload,
  setStore,
  getStore,
  removeStore,
  isName,
  isCardID,
  isPhone,
  isEmail,
  isuInteger,
  computePassword,
  preventDefault
}
