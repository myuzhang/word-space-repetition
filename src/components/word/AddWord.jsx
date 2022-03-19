import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from 'nanoid'
import action from '../../store/actions'
import { addWordToLocalStorage, getDateInDigit, getCurrentCollection } from '../../utils'
import baseStyle from '../../Base.module.css'
import { INPUT_MAX_LENGTH } from '../../const';

export default function AddWord() {
  const [word, setWord] = useState('')
  const [collection, setCollection] = useState(getCurrentCollection())
  const currentCollection = useSelector(state => state.currentCollection)
  const dispatch = useDispatch()

  const handleChange = e => {
    setWord(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (word) {
      const trimedWord = word.trim()
      if (trimedWord.length > 0) {
        const newWord = {
          id: nanoid(),
          collectionId: collection.id,
          value: trimedWord,
          count: 0,
          date: getDateInDigit()
        }
        const added = addWordToLocalStorage(newWord)
        if (added) {
          dispatch(action.addWord(newWord))
          dispatch(action.increaseTotalWordCount(1))
          dispatch(action.increaseCollectionWordCount(1))
        }
      }
    }
    setWord('')
  }

  useEffect(() => {
    setCollection(currentCollection)
  }, [currentCollection])

  return (
    <div className={baseStyle.newItemContainer}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="addWord">New word:</label>
        <input className={baseStyle.inputText} type="text" id="addWord" value={word} onChange={handleChange} placeholder="Add word" maxLength={INPUT_MAX_LENGTH}/>
        <input className={baseStyle.roundButton} type="submit" value="➕"/>
      </form>
    </div>
  )
}