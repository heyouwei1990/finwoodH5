import { Toast } from 'mint-ui';
import wx from 'weixin-js-sdk';
import app from './common';

/**
 * 微信分享
 */

const share = (data = {})=> {
  let ua = window.navigator.userAgent.toLowerCase();
  if(ua.indexOf('micromessenger') <= 1)return;
  app.post('social/wxjsapisign',{
    url:data.signUrl
  },(r)=> {
    wx.config({
      debug:false,
      appId:r.result.appId,
      timestamp:r.result.timestamp,
      nonceStr:r.result.nonce,
      signature:r.result.sign,
      jsApiList:r.result.jsapi
    });
    let obj=[];
    let self=this;
    for(let i= 0;i<r.result.jsapi.length;i++) {
      let shareType;
      switch(i) {
        case 0:
          shareType = 'onMenuShareTimeline';
          break;
        case 1:
          shareType = 'onMenuShareAppMessage';
          break;
        case 2:
          shareType = 'onMenuShareQQ';
          break;
        case 3:
          shareType = 'onMenuShareQZone';
          break;
      }
      obj.push({
        title : data.title,
        desc : data.desc,
        link : data.link,
        imgUrl : data.imgUrl,
        success: function() {
          app.post('data/pageshare',{
            url:data.dataShareUrl,
            shareTypeName:shareType,
            wechatOpenid:data.unionid,
            source:3,
            token:data.token
          },(r)=>{
            Toast({
              message:'分享成功',
              position: 'bottom',
              during:1500
            });
          })
        }
      })
    }
    wx.ready(()=>{
      wx.onMenuShareTimeline(obj[0]);
      wx.onMenuShareAppMessage(obj[1]);
      wx.onMenuShareQQ(obj[2]);
      wx.onMenuShareQZone(obj[3]);
    });
  })
}

export default {
  share
}
