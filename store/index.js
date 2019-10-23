export const state = () => {
  return {
    user: null,
    snackbarObj: {
      snackbar: false,
      color: '',
      tips: ''
    }
  }
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user || null
  },
  SET_SNACKBAR(state, snackbar) {
    state.snackbarObj = snackbar || {
      snackbar: false,
      color: '',
      tips: ''
    }
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  loggedUser(state) {
    return state.user
  },
  snackbarObj(state) {
    return state.snackbarObj
  }
}
