import Vue from 'vue'
import Vuex from 'vuex'

import User from './modules/user'
import Search from './modules/search'
import SuccessStutas from './modules/successStutas'
import selectAddress from './modules/selectAddress'
import GlobalInfo from './modules/globalInfo'

Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
    User,
    Search,
    SuccessStutas,
    selectAddress,
    GlobalInfo
	}
})
