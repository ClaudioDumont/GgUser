export default {
  'CHANGE_STEP' (state, newValue) {
    state.currentStep = newValue
  },

  'INCREMENT_STEP' (state) {
    if (state.currentStep < 4) {
      state.currentStep++
    }
  },

  'DECREMENT_STEP' (state) {
    if (state.currentStep > 0) {
      state.currentStep--
    }
  },

  'GO_BACK' (state) {
    state.currentStep = 2
  },

  'CHANGE_USER_APP_INFO' (state, payload) {
    state.userAppInfo = payload
  },

  'SET_REPOS_INFO' (state, repos) {
    state.reposGitInfo = repos
  },

  'SET_USER_INFO' (state, user) {
    state.userGitInfo = user
  }
}
