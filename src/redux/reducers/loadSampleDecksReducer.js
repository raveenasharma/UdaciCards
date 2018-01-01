import initialState from './defaultState'

const restoreDefaultDecks = (state, action) => {
  return {...state, ...initialState}
}

export default restoreDefaultDecks
