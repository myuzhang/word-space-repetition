import {
  INCREASE_TODAY_WORD_COUNT,
  DECREASE_TODAY_WORD_COUNT,
  INCREASE_TOTAL_WORD_COUNT,
  DECREASE_TOTAL_WORD_COUNT,
  INCREASE_COLLECTION_WORD_COUNT,
  DECREASE_COLLECTION_WORD_COUNT,
  SET_COLLECTION_WORD_COUNT } from '../../const'

export const increaseTotalWordCount = (number) => ({
  type: INCREASE_TOTAL_WORD_COUNT,
  payload: number,
})

export const decreaseTotalWordCount = (number) => ({
  type: DECREASE_TOTAL_WORD_COUNT,
  payload: number,
})

export const increaseTodayWordCount = (number) => ({
  type: INCREASE_TODAY_WORD_COUNT,
  payload: number,
})

export const decreaseTodayWordCount = (number) => ({
  type: DECREASE_TODAY_WORD_COUNT,
  payload: number,
})

export const increaseCollectionWordCount = (number) => ({
  type: INCREASE_COLLECTION_WORD_COUNT,
  payload: number,
})

export const decreaseCollectionWordCount = (number) => ({
  type: DECREASE_COLLECTION_WORD_COUNT,
  payload: number,
})

export const setCollectionWordCount = (collectionWordCount) => ({
  type: SET_COLLECTION_WORD_COUNT,
  payload: collectionWordCount
})