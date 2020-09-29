import { getDateInDigit, getIncreaseId } from '../../utils'

export const addNewWord = word => ({
  type: 'addNewWord',
  payload: {
    id: getIncreaseId(),
    value: word,
    times: 0,
    date: getDateInDigit()
  }
})

export const deleteWord = word => ({
  type: 'deleteWord',
  payload: {
    id: 0,
    value: word.value,
    times: word.times,
    date: word.date
  }
})

export const updateOldWord = word => ({
  type: 'updateOldWord',
  payload: word
})

export const highlightWord = word => ({
  type: 'highlightWord',
  payload: word
})