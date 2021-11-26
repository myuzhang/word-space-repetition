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

  function handleSubmit(event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      const updatedCollection = {id: collection.id, name: event.target.value}
      setUpdateCollection({})
      updateCollectionToLocalStorage(updatedCollection)
      dispatch(action.updateCollection(updatedCollection))
    }
  }

  return <input type="text" value={collenctionName} title="👉Press enter to confirm👈🏿" onChange={handleChange} onKeyDown={handleSubmit}></input>
}