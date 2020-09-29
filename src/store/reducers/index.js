import { combineReducers } from 'redux'
import { totalWordsReducer, todayWordsReducer } from './statisticReducer'
import { newWordReducer, deleteWordReducer, highlightWordReducer, updateOldWordReducer } from './wordReducer'

export default combineReducers({
  totalWords: totalWordsReducer,
  todaysWords: todayWordsReducer,
  newWord: newWordReducer,
  deleteWord: deleteWordReducer,
  updateOldWord: updateOldWordReducer,
  highlightWord: highlightWordReducer
})