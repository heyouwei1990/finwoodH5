/**
 * 选中地址模块
 */
import {
  SET_ADDRESS,
} from '../types.js'
import app from "../../utils/common"

const state = {
  selectAddress:null,
}

const getters = {
	getAddress(state) {
		return state.selectAddress;
  }
}

const actions = {
	setAddress({commit,state},value) {
    commit(SET_ADDRESS,value);
  },
}

const mutations = {
	[SET_ADDRESS](state,value) {
		state.selectAddress = value;
  }
}

export default {
	state,
	actions,
	getters,
	mutations
}
