/**
 * 商品搜索模块
 */
import {
  SEARCH_VALUE,
  PAGE_VALUE
} from '../types.js'

const state = {
  searchValue:'请输入品牌/品种/商家',
  searchPage:-1
}

const getters = {
	getSearch(state) {
		return state.searchValue;
  },
  getSearchPage(state) {
    return state.searchPage;
  }
}

const actions = {
	setSearch({commit,state},value) {
    if(value == null || value == '') {
      commit(SEARCH_VALUE,'请输入品牌/品种/商家');
    }else {
      commit(SEARCH_VALUE,value);
    }
  },
  setSearchPage({commit,state},value) {
    commit(PAGE_VALUE,value);
  }
}

const mutations = {
	[SEARCH_VALUE](state,value) {
		state.searchValue = value;
  },
  [PAGE_VALUE](state,value) {
    state.searchPage = value;
  }
}

export default {
	state,
	actions,
	getters,
	mutations
}
