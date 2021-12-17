import { getCurrentCollectionWordCount, getTotalWordCount} from '../../utils'
import {
  SET_COLLECTION_WORD_COUNT,
  INCREASE_TOTAL_WORD_COUNT,
  UPDATE_TOTAL_WORD_COUNT,
  DECREASE_TOTAL_WORD_COUNT,
  INCREASE_COLLECTION_WORD_COUNT,
  UPDATE_CURRENT_COLLECTION_WORD_COUNT,
  DECREASE_COLLECTION_WORD_COUNT } from '../../const'

export default function statistics (
  state = {
        collectionWordCount: getCurrentCollectionWordCount(),
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
    case UPDATE_CURRENT_COLLECTION_WORD_COUNT:
      return {
        ...state,
        collectionWordCount: getCurrentCollectionWordCount()
      }
    case SET_COLLECTION_WORD_COUNT:
      return {
        ...state,
        collectionWordCount: action.payload
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
    case UPDATE_TOTAL_WORD_COUNT:
      return {
        ...state,
        totalwordCount: getTotalWordCount()
      }
      default:
        return state
  }
}
