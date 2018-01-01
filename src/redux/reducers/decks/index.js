import {
  CREATE_NEW_DECK,
  RENAME_DECK,
  DELETE_DECK,
  DELETE_ALL_DECKS,
  RESTORE_DEFAULT_DECKS,
  ADD_CARD_TO_DECK
} from '../../actions/decks/types'
import addCardToDeck from './reducer.addCardToDeck'
import createNewDeck from './reducer.createNewDeck'
import deleteAllDecks from './reducer.deleteAllDecks'
import deleteDeck from './reducer.deleteDeck'
import renameDeck from './reducer.renameDeck'
import restoreDefaultDecks from './reducer.restoreDefaultDecks'

export default function decks (state = {}, action) {
  switch (action.type) {
    case CREATE_NEW_DECK:
      return createNewDeck(state, action)
    case RENAME_DECK:
      return renameDeck(state, action)
    case DELETE_DECK:
      return deleteDeck(state, action)
    case DELETE_ALL_DECKS:
      return deleteAllDecks(state, action)
    case RESTORE_DEFAULT_DECKS:
      return restoreDefaultDecks(state, action)
    case ADD_CARD_TO_DECK:
      return addCardToDeck(state, action)
    default:
      return state
  }
}
