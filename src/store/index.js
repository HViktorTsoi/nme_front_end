import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    changeLoadingStatus: (state, ldStatus) => {
      state.loading = ldStatus
    }
  },
  actions: {
    setLoadingStatus: ({ commit }, ldStatus) => {
      // 设置加载状态
      commit('changeLoadingStatus', ldStatus)
    }
  }
})
