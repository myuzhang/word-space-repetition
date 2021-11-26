import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import action from '../../store/actions';
import { updateCollectionToLocalStorage } from '../../utils';

export default function UpdateCollection({collection, setUpdateCollection}) {
  const [collenctionName, setCollectionName] = useState(collection.name)
  const dispatch = useDispatch()

  function handleChange(event) {
    setCollectionName(event.target.value)
  }

  function onKeyDown(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSubmit(event)
    }
  }

  function onBlur(event) {
    handleSubmit(event)
  }

  function handleSubmit(event) {
    const updatedCollection = {id: collection.id, name: event.target.value}
    setUpdateCollection({})
    updateCollectionToLocalStorage(updatedCollection)
    dispatch(action.updateCollection(updatedCollection))
  }

  return <input type="text" value={collenctionName} title="👉Press enter to confirm👈🏿" onChange={handleChange} onKeyDown={onKeyDown} onBlur={onBlur}></input>
}