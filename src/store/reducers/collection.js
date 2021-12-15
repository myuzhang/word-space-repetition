import {ADD_COLLECTION, DELETE_COLLECTION, UPDATE_COLLECTION, CHOOSE_COLLECTION} from '../../const'
import { getCurrentCollection } from '../../utils'

export function collection(state = {type:'', collection: getCurrentCollection()}, action) {
  switch(action.type) {
    case ADD_COLLECTION:
      return {
        type: action.type,
        collection: action.payload
      }
    case DELETE_COLLECTION:
      return {
        type: action.type,
        collection: action.payload
      }
    case UPDATE_COLLECTION:
      return {
        type: action.type,
        collection: action.payload
      }
    default:
      return state
  }
}

export function currentCollection(state = getCurrentCollection(), action) {
  switch(action.type) {
    case CHOOSE_COLLECTION:
      return {...action.payload}
    default:
      return state
  }
}