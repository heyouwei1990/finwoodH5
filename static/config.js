/**
 * 配置测试环境和生产环境之间的切换
 *
 * debug调试，为true输入日志信息，生产环境为false
 * version:版本号，主要用于清除微信缓存
 * author:是否开启微信授权，生产环境为true
 * baseURL: 域名地址
 * timeout:超时时间
 * appId,appSecret:后端所需验证
 * routerMode: 路由模式
 *
 */

(function($) {
  $.debug = true;
  $.version = '1.310';
  $.author = false;
  $.timeout = 12000;
  $.baseURL = 'http://mapi.finwood.vip/';
  //$.baseURL = 'http://192.168.1.145:8080/finwood-api/';
  //$.baseURL = 'http://192.168.1.111:8080/finwood-api/';
  //$.baseURL = 'http://192.168.1.180:8080/finwood-api/';
  $.appId = '56FK32PW09Q73';
  $.appSecret = 'U6XJDcA004oDU96573FKlt580404t';
  $.routerMode = 'hash'; // hash || history
})(window.config = {});
