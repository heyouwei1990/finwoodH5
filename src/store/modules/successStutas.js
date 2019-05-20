/**
 * 提交审核成功状态模块
 */
import {
	SET_VALUE
} from '../types.js'

const state = {
  page:null,
  title:null
}

const getters = {
	getPage(state) {
		return state.page;
  },
  getTitle(state) {
		return state.title;
	}
}

const actions = {
	setValue({commit,state},value) {
    commit(SET_VALUE,value);
	}
}

const mutations = {
	[SET_VALUE](state,value) {
    state.page = value.page;
    state.title = value.title;
	}
}

export default {
	state,
	actions,
	getters,
	mutations
}
