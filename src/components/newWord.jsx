import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewWord } from '../store/actions/wordAction'
import { increaseTotalWords, increaseTodaysWords} from '../store/actions/statisticAction'

const NewWord = () => {
  const [word, setWord] = useState('')
  const dispatch = useDispatch()

  const handleChange = e => {
    setWord(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (word) {
      const trimedWord = word.trim()
      if (trimedWord.length > 0) {
        dispatch(addNewWord(trimedWord))
        dispatch(increaseTotalWords())
        dispatch(increaseTodaysWords())
      }
    }
    setWord('')
  }

  return (
    <>
      <div className="newWord-wrapper">
        <form onSubmit={handleSubmit}>
          <label htmlFor="newWord">Add New Word:</label>
          <input className="input-text" type="text" id="newWord" value={word} onChange={handleChange} placeholder="Please enter here"/>
          <input className="round-button" type="submit" value="➕"/>
        </form>
      </div>
    </>
  )
}

export default NewWord