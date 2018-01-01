import {ADD_CARD_TO_DECK} from './types'
export const addCardToDeck = data => {
  return {type: ADD_CARD_TO_DECK, data}
}

export default addCardToDeck
