import { nanoid } from 'nanoid'
import { getDateInDigit } from '../../utils'
import {ADD_WORD, DELETE_WORD, DELETE_WORDS, UPDATE_WORD, HIGHLIGHT_WORD } from '../../const'

export const addWord = word => ({
  type: ADD_WORD,
  payload: {
    id: nanoid(),
    collectionId: word.collectionId,
    value: word.value,
    count: 0,
    date: getDateInDigit()
  }
})

export const deleteWord = word => ({
  type: DELETE_WORD,
  payload: word
})

export const deleteWords = words => ({
  type: DELETE_WORDS,
  payload: words
})

export const updateWord = word => ({
  type: UPDATE_WORD,
  payload: word
})

export const highlightWord = word => ({
  type: HIGHLIGHT_WORD,
  payload: word
})