import {
  INCREASE_TODAY_WORD,
  DECREASE_TODAY_WORD,
  INCREASE_TOTAL_WORD,
  DECREASE_TOTAL_WORD,
  INCREASE_COLLECTION_WORD,
  DECREASE_COLLECTION_WORD,
  SET_COLLECTION_WORD } from '../../const'

export const increaseTotalWords = () => ({
  type: INCREASE_TOTAL_WORD,
})

export const decreaseTotalWords = () => ({
  type: DECREASE_TOTAL_WORD,
})

export const increaseTodayWords = () => ({
  type: INCREASE_TODAY_WORD,
})

export const decreaseTodayWords = () => ({
  type: DECREASE_TODAY_WORD,
})

export const increaseCollectionWords = () => ({
  type: INCREASE_COLLECTION_WORD,
})

export const decreaseCollectionWords = () => ({
  type: DECREASE_COLLECTION_WORD,
})

export const setCollectionWords = (collectionWordCount) => ({
  type: SET_COLLECTION_WORD,
  payload: collectionWordCount
})