const createNewDeck = (state, action) => {
  const {name} = action.deck
  return {
    ...state,
    [name]: {
      title: name,
      questions: []
    }
  }
}

export default createNewDeck
