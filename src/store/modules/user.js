/**
 * 用户模块
 */
import app from '../../utils/common'
import {
  LOGIN,
  OUT_LOGIN,
  AUTHOR,
  SET_SELLER_TYPE
} from '../types.js'

const state = {
  token: app.getStore('token'),
  openid: app.getStore('openid'),
  unionid: app.getStore('unionid'),
  sellerType: app.getStore('sellerType') == null ?0:app.getStore('sellerType'), //卖家类型（0：买家，1：卖家管理员，2：卖家普通成员）
}

const getters = {
  getToken(state) {
    return state.token;
  },
  getOpenid(state) {
    return state.openid;
  },
  getUnionid(state) {
    return state.unionid;
  },
  getSellerType(state) {
    return state.sellerType;
  }
}

const actions = {
  login({commit,state},value) {
    commit(LOGIN,value);
  },
  outLogin({commit,state}) {
    commit(OUT_LOGIN);
  },
  author({commit,state},value) {
    commit(AUTHOR,value);
  },
  setSellerType({commit,state},value) {
    commit(SET_SELLER_TYPE,value);
  },
}

const mutations = {
  [LOGIN](state,value) {
    state.token = value;
    app.setStore('token',value);
  },
  [OUT_LOGIN](state) {
    window.config.author = false;
    state.token = null;
    state.openid = null;
    state.unionid = null;
    app.removeStore('token');
    app.removeStore('openid');
    app.removeStore('unionid');
  },
  [AUTHOR](state,value) {
    state.openid = value.openid;
    state.unionid = value.unionid;
    app.setStore('openid',value.openid);
    app.setStore('unionid',value.unionid);
  },
  [SET_SELLER_TYPE](state,value) {
    state.sellerType = value;
    app.setStore('sellerType',value);
  },
}

export default {
  state,
  actions,
  getters,
  mutations
}
