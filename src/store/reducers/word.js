import {ADD_WORD, DELETE_WORD, UPDATE_WORD, HIGHLIGHT_WORD} from '../../const'

export default function word(state = {type:'', word:{}}, action) {
  switch(action.type) {
    case ADD_WORD:
      return {
        type: action.type,
        word: action.payload
      }
    case DELETE_WORD:
      return {
        type: action.type,
        word: action.payload
      }
    case UPDATE_WORD:
      return {
        type: action.type,
        word: action.payload
      }
    case HIGHLIGHT_WORD:
      return {
        type: action.type,
        word: action.payload
      }
    default:
      return state
  }
}