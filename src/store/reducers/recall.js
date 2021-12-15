import {DISPLAY_RECALL_WORDS, HIDE_RECALL_WORDS } from '../../const'

export default function recall(state = false, action) {
  switch (action.type) {
    case DISPLAY_RECALL_WORDS:
      return true
    case HIDE_RECALL_WORDS:
      return false
    default:
      return state
  }
}