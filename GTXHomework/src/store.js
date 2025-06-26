import { createStore } from 'vuex'

export default createStore({
    state () { // store data from app
        return {
            userId: null,
            profiles:{
        
            }
    }
  },
  mutations: { // methods that change data in the state -- commit mutations

    setUserId(state, userId){
        state.userId = userId 
    },

    setProfile(state, { userId, profile }) {
      state.profiles[userId] = profile
    }
  },
  actions: { // Can do async things like reach out to an api before changing data in state -- dispatch actions

    // action to add profile information, payload to add multiple arguments
    saveProfile({ commit }, payload) {
      // payload: { userId, profileData }
      commit('setProfile', payload)
    }
  },
  //retrieves profile information
  getters: {
    getProfile: (state) => (userId) => {
      return state.profiles[userId] || {}
    }
  }
})
