import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import action from '../../store/actions'
import styles from './Word.module.css'
import MoveWords from './MoveWordsModal';

export default function SelectAll({checkboxes, setCheckboxes}) {
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  function openModal() {
    setModalOpen(true)
  }

  function handleChange() {
    console.log('select all:', checkboxes);
    
    const newState = !checkboxes.isAllSelected
    setCheckboxes({
      isAllSelected: newState,
      checkboxWords: checkboxes.checkboxWords.map(cw => ({word: cw.word, isChecked: newState}))
    })
  }

  function handleDelete() {
    const deleteWords = checkboxes.checkboxWords.filter(w => w.isChecked)
    const deleteCount = deleteWords.length
    if (deleteCount > 0) {
      if (window.confirm(`⚠️ Are you sure you want to delete this word:\n${deleteWords.map(c => c.word.value + '\n').join("")}`)) {
        dispatch(action.deleteWords(deleteWords.map(c => c.word)))
        dispatch(action.decreaseTotalWordCount(deleteCount))
        dispatch(action.decreaseTodayWordCount(deleteCount))
        dispatch(action.decreaseCollectionWordCount(deleteCount))
      }
    }
  }

  return (
    <div className={styles.wordContainer}>
      <div className={styles.wordText}>
        <input type="checkbox" checked={checkboxes.isAllSelected} onChange={handleChange} name="all" id="all"/>
        <label className={styles.thick} htmlFor="all">Select All</label>
      </div>
      <div className={styles.padRight}>
        <button className={styles.toRight} onClick={handleDelete} title="⚠️ Remove selected word from the collection"><span role="img" aria-label="trash bin">🗑</span></button>
        <button className={styles.toRight} onClick={openModal} title="🖋 Move selected words to another collection"><span role="img" aria-label="gear">✍️</span></button>
        {modalOpen && <MoveWords />}
      </div>
    </div>
  )
}
