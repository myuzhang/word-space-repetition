import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteWord, highlightWord } from '../store/actions/wordAction'
import { decreaseTotalWords, decreaseTodaysWords } from '../store/actions/statisticAction'
import { updateWordDate } from '../utils'
import UpdateWord from './updateWord'

const Word = ({ word }) => {
  const dispatch = useDispatch()
  const [confirm, setConfirm] = useState('🎯')
  const [again, setAgain] = useState('⏰')

  const handleConfirm = () => {
    if (confirm !== '👍') {
      setConfirm('👍')
      setAgain('⏰')
      updateWordDate(word, true)
    }
  }

  const handleAgain = () => {
    if (again !== '🛑') {
      setAgain('🛑')
      setConfirm('🎯')
      updateWordDate(word, false)
    }
  }

  const handleDelete = () => {
    if (window.confirm(`⚠️ Are you sure you want to delete this word -> ${word.value}`)) {
      dispatch(deleteWord(word))
      dispatch(decreaseTotalWords())
      dispatch(decreaseTodaysWords())
    }
  }

  const handleHighlightWord = () => {
    dispatch(highlightWord(word))
    const elements = document.getElementsByClassName('word-text')
    for(const element of elements) {
      element.style.backgroundColor = ""
    }
    document.getElementsByName(word.value)[0].style.backgroundColor = "yellow"
  }

  return (
    <div className="word-container">
      <div className="word-text" name={word.value}>
        {word.value}
      </div>
      <div>
        <button onClick={handleHighlightWord}><span role="img" aria-label="red textbook">📕</span></button>
        <button onClick={handleConfirm}><span role="img" aria-label="thumbs up">{confirm}</span></button>
        <button onClick={handleAgain}><span role="img" aria-label="thinking face">{again}</span></button>
        <UpdateWord word={word}/>
        <button onClick={handleDelete}><span role="img" aria-label="trash bin">🗑</span></button>
      </div>
    </div>
  )
}

export default Word