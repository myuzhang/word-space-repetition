import {ADD_WORD, DELETE_WORD, DELETE_WORDS, UPDATE_WORD, HIGHLIGHT_WORD} from '../../const'

export default function word(
  state = {
    addWord: {},
    deleteWord: {},
    deleteWords: [],
    updateWord: {},
    highlightWord: {}
  }, action) {
  switch(action.type) {
    case ADD_WORD:
      return {
        ...state,
        addWord: action.payload
      }
    case DELETE_WORD:
      return {
        ...state,
        deleteWord: action.payload
      }
    case DELETE_WORDS:
      return {
        ...state,
        deleteWords: action.payload
      }
    case UPDATE_WORD:
      return {
        ...state,
        updateWord: action.payload
      }
    case HIGHLIGHT_WORD:
      return {
        ...state,
        highlightWord: action.payload
      }
    default:
      return state
  }
}