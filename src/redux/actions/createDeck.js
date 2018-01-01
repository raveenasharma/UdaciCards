import {CREATE_NEW_DECK} from './types'
const createNewDeck = deck => {
  return {type: CREATE_NEW_DECK, deck}
}

export default createNewDeck
