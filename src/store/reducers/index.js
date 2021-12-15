import { combineReducers } from 'redux'
import statistics from './statistic'
import word from './word'
import { collection, currentCollection } from './collection'
import recall from './recall'

export default combineReducers({
  statistics,
  word,
  collection,
  currentCollection,
  recall
})