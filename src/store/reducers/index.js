import { combineReducers } from 'redux'
import statistics from './statistic'
import word from './word'
import { collection, currentCollection } from './collection'

export default combineReducers({
  statistics,
  word,
  collection,
  currentCollection
})