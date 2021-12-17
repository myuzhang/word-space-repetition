import {
  INCREASE_TOTAL_WORD_COUNT,
  DECREASE_TOTAL_WORD_COUNT,
  UPDATE_TOTAL_WORD_COUNT,
  INCREASE_COLLECTION_WORD_COUNT,
  DECREASE_COLLECTION_WORD_COUNT,
  UPDATE_CURRENT_COLLECTION_WORD_COUNT,
  SET_COLLECTION_WORD_COUNT } from '../../const'

export const increaseTotalWordCount = number => ({
  type: INCREASE_TOTAL_WORD_COUNT,
  payload: number,
})

export const decreaseTotalWordCount = number => ({
  type: DECREASE_TOTAL_WORD_COUNT,
  payload: number,
})

export const updateTotalWordCount = () => ({
  type: UPDATE_TOTAL_WORD_COUNT,
})

export const increaseCollectionWordCount = number => ({
  type: INCREASE_COLLECTION_WORD_COUNT,
  payload: number,
})

export const decreaseCollectionWordCount = number => ({
  type: DECREASE_COLLECTION_WORD_COUNT,
  payload: number,
})

export const updateCurrentCollectionWordCount = () => ({
  type: UPDATE_CURRENT_COLLECTION_WORD_COUNT,
})

export const setCollectionWordCount = collectionWordCount => ({
  type: SET_COLLECTION_WORD_COUNT,
  payload: collectionWordCount
})