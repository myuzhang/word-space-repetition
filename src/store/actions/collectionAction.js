import {ADD_COLLECTION, DELETE_COLLECTION, UPDATE_COLLECTION, CHOOSE_COLLECTION } from '../../const'

export const addCollection = collection => ({
  type: ADD_COLLECTION,
  payload: {
    id: collection.id,
    name: collection.name,
  }
})

export const deleteCollection = collectionId => ({
  type: DELETE_COLLECTION,
  payload: {
    id: collectionId
  }
})

export const updateCollection = collection => ({
  type: UPDATE_COLLECTION,
  payload: {
    id: collection.id,
    name: collection.name,
  }
})

export const chooseCollection = collection => ({
  type: CHOOSE_COLLECTION,
  payload: {
    id: collection.id,
    name: collection.name
  }
})