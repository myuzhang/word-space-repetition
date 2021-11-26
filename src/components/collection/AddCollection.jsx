import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCollection } from '../../store/actions/collectionAction'
import { addCollectionToLocalStorage } from '../../utils'
import { nanoid } from 'nanoid'

 export default function AddCollection() {
  const [collection, setCollection] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()

    if (collection) {
      const trimedName = collection.trim()
      if (trimedName.length > 0) {        
        const newCollection = {
          id: nanoid(),
          name: trimedName
        }
        addCollectionToLocalStorage(newCollection)
        dispatch(addCollection(newCollection))
      }
    }
    setCollection('')
  }

  function handleChange(event) {
    setCollection(event.target.value)
  }

  return (
    <div className="bigSpace">
      <form onSubmit={handleSubmit}>
        <label htmlFor="newCollection">Add new collection:</label>
        <input className="input-text" type="text" id="newCollection" value={collection} onChange={handleChange} placeholder="Add collection"/>
        <input className="round-button" type="submit" value="➕"/>
      </form>
    </div>
  )
}
