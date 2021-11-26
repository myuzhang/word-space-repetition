import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import action from '../../store/actions'
import { updateWordDate } from '../../utils'
import UpdateWord from './UpdateWord'
import styles from './Word.module.css'

export default function Word({ word }) {
  const dispatch = useDispatch()
  const [confirm, setConfirm] = useState('🎯')
  const [again, setAgain] = useState('⏰')
  const [modalOpen, setModalOpen] = useState(false)

  const hightlight = useRef('');

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
      dispatch(action.deleteWord(word))
      dispatch(action.decreaseTotalWords())
      dispatch(action.decreaseTodayWords())
      dispatch(action.decreaseCollectionWords())
    }
  }

  const handleHighlightWord = () => {
    dispatch(action.highlightWord(word))
    const elements = document.getElementsByClassName(styles.wordText)
    for(const element of elements) {
      element.style.backgroundColor = ""
    }
    hightlight.current.style.backgroundColor = "yellow"
  }

  const openModal = () => {
    setModalOpen(true)
  }

  return (
    <div className={styles.wordContainer}>
      <div className={styles.wordText} name={word.value} ref={hightlight} title="🌏 Click the word to open the meaning by Google in new tab">
        <a href={`https://www.google.com/search?q=${word.value}+definition`} target="_blank" rel="noopener noreferrer">{word.value}</a>
      </div>
      <div>
        <button onClick={handleHighlightWord} title="📓 Show meaning in the dictionary"><span role="img" aria-label="red textbook">📕</span></button>
        <button onClick={handleConfirm} title="🧠 Click on it if you can know the meaning and it won't show after you click 7 times on another day"><span role="img" aria-label="thumbs up">{confirm}</span></button>
        <button onClick={handleAgain} title="⏳ Click on it if you don't know the meaning and the word will still stay in the list"><span role="img" aria-label="thinking face">{again}</span></button>
        <button onClick={openModal} title="🖋 Modify the word"><span role="img" aria-label="gear">✍️</span></button>
        {modalOpen && <UpdateWord word={word} modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
        <button onClick={handleDelete} title="⚠️ Remove the word from the list"><span role="img" aria-label="trash bin">🗑</span></button>
      </div>
    </div>
  )
}