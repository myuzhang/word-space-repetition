import { getCollectionWordCount, getTodayWordCount, getTotalWordCount} from '../../utils'
import {
  INCREASE_TODAY_WORD,
  DECREASE_TODAY_WORD,
  SET_COLLECTION_WORD,
  INCREASE_TOTAL_WORD,
  DECREASE_TOTAL_WORD,
  INCREASE_COLLECTION_WORD,
  DECREASE_COLLECTION_WORD } from '../../const'

export default function statistics (
  state = {
        collectionWordCount: getCollectionWordCount('default'),
        todayWordCount: getTodayWordCount(),
        totalwordCount: getTotalWordCount()},
    action) {
  switch(action.type) {
    case INCREASE_COLLECTION_WORD:
      return {
        ...state,
        collectionWordCount: state.collectionWordCount + 1
      }
    case DECREASE_COLLECTION_WORD:
      return {
        ...state,
        collectionWordCount: state.collectionWordCount - 1
      }
    case SET_COLLECTION_WORD:
        return {
          ...state,
          collectionWordCount: action.payload
        } 
    case INCREASE_TODAY_WORD:
      return {
        ...state,
        todayWordCount: state.todayWordCount + 1
      }    
    case DECREASE_TODAY_WORD:
      return {
        ...state,
        todayWordCount: state.todayWordCount - 1
      }    
    case INCREASE_TOTAL_WORD:
      return {
        ...state,
        totalwordCount: state.totalwordCount + 1
      }    
    case DECREASE_TOTAL_WORD:
      return {
        ...state,
        totalwordCount: state.totalwordCount - 1
      }
      default:
        return state
  }
}
