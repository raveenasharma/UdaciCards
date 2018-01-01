import {
    CREATE_NEW_DECK,
    DELETE_DECK,
    LOAD_SAMPLE_DECKS,
    ADD_CARD_TO_DECK
} from '../actions/types'
import addCardToDeck from './addCardToDeckReducer'
import createNewDeck from './createNewDeckReducer'
import deleteDeck from './deleteDeckReducer'
import loadSampleDecks from './loadSampleDecksReducer'

export default function decks (state = {}, action) {
    switch (action.type) {
        case CREATE_NEW_DECK:
            return createNewDeck(state, action)
        case DELETE_DECK:
            return deleteDeck(state, action)
        case LOAD_SAMPLE_DECKS:
            return loadSampleDecks(state, action)
        case ADD_CARD_TO_DECK:
            return addCardToDeck(state, action)
        default:
            return state
    }
}