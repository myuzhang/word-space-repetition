import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import action from '../../store/actions'
import { updateWordDate } from '../../utils'
import UpdateWordModal from './UpdateWordModal'
import styles from './Word.module.css'

export default function Word({ wordWithCheckbox, checkboxes, setCheckboxes}) {
  const dispatch = useDispatch()
  const [confirm, setConfirm] = useState('🎯')
  const [again, setAgain] = useState('⏰')
  const [modalOpen, setModalOpen] = useState(false)

  const hightlight = useRef('');

  const handleConfirm = () => {
    if (confirm !== '👍') {
      setConfirm('👍')
      setAgain('⏰')
      updateWordDate(wordWithCheckbox.word, true)
    }
  }

  const handleAgain = () => {
    if (again !== '🛑') {
      setAgain('🛑')
      setConfirm('🎯')
      updateWordDate(wordWithCheckbox.word, false)
    }
  }

  const handleDelete = () => {
    if (window.confirm(`⚠️ Are you sure you want to delete this word -> ${wordWithCheckbox.word.value}`)) {
      dispatch(action.deleteWord(wordWithCheckbox.word))
      dispatch(action.decreaseTotalWordCount(1))
      dispatch(action.decreaseTodayWordCount(1))
      dispatch(action.decreaseCollectionWordCount(1))
    }
  }

  const handleHighlightWord = () => {
    dispatch(action.highlightWord(wordWithCheckbox.word))
    const elements = document.getElementsByClassName(styles.wordText)
    for(const element of elements) {
      element.style.backgroundColor = ""
    }
    hightlight.current.style.backgroundColor = "yellow"
  }

  const openModal = () => {
    setModalOpen(true)
  }

  function handleCheckboxClick() {
    const newState = !wordWithCheckbox.isChecked
    const found = checkboxes.checkboxWords.findIndex(w => w.word.id === wordWithCheckbox.word.id)
    if (found !== -1) {
      checkboxes.checkboxWords[found].isChecked = newState
      const allChecked = checkboxes.checkboxWords.every(w => w.isChecked)
      setCheckboxes({
        isAllSelected: allChecked,
        checkboxWords: [...checkboxes.checkboxWords]
      })
    }

  }

  return (
    <div className={styles.wordContainer}>
      <div className={styles.wordText} name={wordWithCheckbox.word.value} ref={hightlight} title="🌏 Click the word to open the meaning by Google in new tab">
        <input checked={wordWithCheckbox.isChecked} onChange={handleCheckboxClick} type="checkbox" name="word" id="word"/>
        <label htmlFor="word">
          <a href={`https://www.google.com/search?q=${wordWithCheckbox.word.value}+definition`} target="_blank" rel="noopener noreferrer">{wordWithCheckbox.word.value}</a>
        </label>
      </div>
      <div>
        <button onClick={handleHighlightWord} title="📓 Show meaning in the dictionary"><span role="img" aria-label="red textbook">📕</span></button>
        <button onClick={handleConfirm} title="🧠 Click on it if you can know the meaning and it won't show after you click 7 times on another day"><span role="img" aria-label="thumbs up">{confirm}</span></button>
        <button onClick={handleAgain} title="⏳ Click on it if you don't know the meaning and the word will still stay in the list"><span role="img" aria-label="thinking face">{again}</span></button>
        <button onClick={openModal} title="🖋 Modify the word"><span role="img" aria-label="gear">✍️</span></button>
        {modalOpen && <UpdateWordModal word={wordWithCheckbox.word} modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
        <button onClick={handleDelete} title="⚠️ Remove the word from the list"><span role="img" aria-label="trash bin">🗑</span></button>
      </div>
    </div>
  )
}