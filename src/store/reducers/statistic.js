import { getCollectionWordCount, getTodayWordCount, getTotalWordCount} from '../../utils'
import {
  INCREASE_TODAY_WORD_COUNT,
  DECREASE_TODAY_WORD_COUNT,
  SET_COLLECTION_WORD_COUNT,
  INCREASE_TOTAL_WORD_COUNT,
  DECREASE_TOTAL_WORD_COUNT,
  INCREASE_COLLECTION_WORD_COUNT,
  DECREASE_COLLECTION_WORD_COUNT } from '../../const'

export default function statistics (
  state = {
        collectionWordCount: getCollectionWordCount('default'),
        todayWordCount: getTodayWordCount(),
        totalwordCount: getTotalWordCount()},
    action) {
  switch(action.type) {
    case INCREASE_COLLECTION_WORD_COUNT:
      return {
        ...state,
        collectionWordCount: state.collectionWordCount + action.payload
      }
    case DECREASE_COLLECTION_WORD_COUNT:
      return {
        ...state,
        collectionWordCount: state.collectionWordCount - action.payload
      }
    case SET_COLLECTION_WORD_COUNT:
        return {
          ...state,
          collectionWordCount: action.payload
        } 
    case INCREASE_TODAY_WORD_COUNT:
      return {
        ...state,
        todayWordCount: state.todayWordCount + action.payload
      }    
    case DECREASE_TODAY_WORD_COUNT:
      return {
        ...state,
        todayWordCount: state.todayWordCount - action.payload
      }    
    case INCREASE_TOTAL_WORD_COUNT:
      return {
        ...state,
        totalwordCount: state.totalwordCount + action.payload
      }    
    case DECREASE_TOTAL_WORD_COUNT:
      return {
        ...state,
        totalwordCount: state.totalwordCount - action.payload
      }
      default:
        return state
  }
}
