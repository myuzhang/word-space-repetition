import { getTodaysWordsNumber, getAllWordsNumber} from '../../utils'

export const totalWordsReducer = (state = getAllWordsNumber(), action) => {
  if (action.type === 'increaseTotalWords' || action.type === 'decreaseTotalWords') {
    return state + action.payload
  }
  return state
}

export const todayWordsReducer = (state = getTodaysWordsNumber(), action) => {
  if (action.type === 'increaseTodaysWords' || action.type === 'decreaseTodaysWords') {
    return state + action.payload
  }
  return state
}
