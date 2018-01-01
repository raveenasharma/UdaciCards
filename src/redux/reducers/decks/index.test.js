/* global describe, test, expect */
import deepFreeze from 'deep-freeze'
import initialState from './initial-state'
import decks from './'
import {
  CREATE_NEW_DECK,
  RENAME_DECK,
  DELETE_DECK,
  DELETE_ALL_DECKS,
  RESTORE_DEFAULT_DECKS,
  ADD_CARD_TO_DECK
} from '../../actions/decks/types'

describe('Deck reducer', () => {
  test('createNewDeck', () => {
    const state = deepFreeze({...initialState})
    const result = decks(state, {
      type: CREATE_NEW_DECK,
      payload: {name: 'Test Deck'}
    })
    expect(result).toMatchSnapshot()
  })

  test('renameDeck', () => {
    const state = deepFreeze({...initialState})
    const result = decks(state, {
      type: RENAME_DECK,
      payload: {name: 'React', newName: 'Test Deck'}
    })
    expect(result).toMatchSnapshot()
  })

  test('deleteDeck', () => {
    const state = deepFreeze({...initialState})
    const result = decks(state, {
      type: DELETE_DECK,
      payload: {name: 'React'}
    })
    expect(result).toMatchSnapshot()
  })

  test('deleteAllDecks', () => {
    const state = deepFreeze({...initialState})
    const result = decks(state, {type: DELETE_ALL_DECKS})
    expect(result).toMatchSnapshot()
  })

  test('restoreDefaultDecks', () => {
    const state = {}
    const result = decks(state, {type: RESTORE_DEFAULT_DECKS})
    expect(result).toMatchSnapshot()
  })

  test('addCardToDeck', () => {
    const state = deepFreeze({...initialState})
    const result = decks(state, {
      type: ADD_CARD_TO_DECK,
      payload: {
        deckName: 'React',
        card: {
          question: 'question',
          answer: 'answer'
        }
      }
    })
    expect(result).toMatchSnapshot()
  })
})
