/**
 * 全局基础数据
 */
import app from '../../utils/common'
import {
  SET_GLOBAL_INFO
} from '../types.js'

const state = {
  globalInfo: JSON.parse(app.getStore('globalinfo'))
}

const getters = {
	getGlobalInfo(state) {
		return state.globalInfo;
  }
}

const actions = {
  setGlobalInfo({commit,state},value) {
    commit(SET_GLOBAL_INFO,value);
  }
}

const mutations = {
  [SET_GLOBAL_INFO](state,value) {
    state.globalInfo = value;
    app.setStore('globalinfo',JSON.stringify(value));
  }
}

export default {
	state,
	actions,
	getters,
	mutations
}
