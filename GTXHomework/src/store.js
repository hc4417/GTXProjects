import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
        // Create state object to store profiles
        userId: null,
        profiles:{
        
        }
    }
  },
  mutations: {
    // Create mutation through which store objects can be added/changed

    setUserId(state, userId){
        state.userId = userId 
    },

    setProfile(state, { userId, profile }) {
      state.profiles[userId] = profile
    }
  },
  actions: {
    // action to add profile information, payload to add multiple arguments
    addNewProfile({ commit }, payload) {
      // payload: { userId, profileData }
      commit('addProfile', payload)
    }
  },
  //retrieves profile information
  getters: {
    getProfile: (state) => (userId) => {
      return state.profiles[userId] || {}
    }
  }
})

export default store
