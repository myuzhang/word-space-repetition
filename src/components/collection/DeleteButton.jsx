import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteCollectionFromLocalStorage, moveWordsFromCollectionToDefault } from '../../utils'
import action from '../../store/actions'

export default function DeletionButton({collection}) {
  const dispatch = useDispatch()

  function deleteCollection() {
    if (collection.name === 'default') {
      window.confirm('⏹ You can\'t remove default collection')
    } else {
      if (window.confirm(`⚠️ Once the ${collection.name} collection has been removed, the words underneath will be moved into default collection`)) {
        moveWordsFromCollectionToDefault(collection)
        deleteCollectionFromLocalStorage(collection)
        dispatch(action.deleteCollection(collection.id))
      }
    }
  }

  return <button title="👆Click to delete collection" onClick={deleteCollection}><span role="img" aria-label="trash bin">🗑</span></button>
}