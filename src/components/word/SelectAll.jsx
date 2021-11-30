import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import action from '../../store/actions'
import styles from './Word.module.css'
import MoveWordsModal from './MoveWordsModal';
import { deleteWordsFromLocalStorage } from '../../utils';

export default function SelectAll({checkboxes, setCheckboxes}) {
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  function openModal() {
    const moveWords = checkboxes.checkboxWords.filter(w => w.isChecked)
    const moveCount = moveWords.length
    if (moveCount > 0) {
      setModalOpen(true)
    }
  }

  function handleChange() {
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
      if (window.confirm(`⚠️ Are you sure you want to delete the word(s):\n${deleteWords.map(c => c.word.value + '\n').join("")}`)) {
        const words = deleteWords.map(c => c.word)
        deleteWordsFromLocalStorage(words)
        dispatch(action.deleteWords(words))
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
        {modalOpen && <MoveWordsModal modalOpen={modalOpen} setModalOpen={setModalOpen} checkboxes={checkboxes} setCheckboxes={setCheckboxes} />}
      </div>
    </div>
  )
}
