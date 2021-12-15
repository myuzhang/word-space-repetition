import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCollection } from '../../store/actions/collectionAction'
import { addCollectionToLocalStorage } from '../../utils'
import { nanoid } from 'nanoid'
import baseStyle from '../../Base.module.css'
import { INPUT_MAX_LENGTH } from '../../const';

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
    <div className={baseStyle.bigSpace}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newCollection">Add new collection:</label>
        <input className={baseStyle.inputText} type="text" id="newCollection" value={collection} onChange={handleChange} placeholder="Add collection" maxLength={INPUT_MAX_LENGTH}/>
        <input className={baseStyle.roundButton} type="submit" value="➕"/>
      </form>
    </div>
  )
}
