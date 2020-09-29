import { deleteOneWordFromLocalStorage, saveOneWordToLocalStorage, updateWordToLocalStorage } from '../../utils'

export const newWordReducer = (state = {}, action) => {
  if (action.type === 'addNewWord') {
    saveOneWordToLocalStorage(action.payload)
    return action.payload
  }
  return state
}

export const deleteWordReducer = (state = {}, action) => {
  if (action.type === 'deleteWord') {
    deleteOneWordFromLocalStorage(action.payload)
    return action.payload
  }
  return state
}

export const updateOldWordReducer = (state = {}, action) => {
  if (action.type === 'updateOldWord') {
    updateWordToLocalStorage(action.payload)
    return action.payload
  }
  return state
}

export const highlightWordReducer = (state = {}, action) => {
  if (action.type === 'highlightWord') {
    return action.payload
  }
  return state
}