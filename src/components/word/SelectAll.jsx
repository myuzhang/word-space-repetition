import React, { useState } from 'react'
import styles from './Word.module.css'
import MoveWords from './MoveWords';

export default function SelectAll({isAllSelected, setIsAllSelected, setWordsWithCheckbox}) {
  const [modalOpen, setModalOpen] = useState(false)

  function openModal() {
    setModalOpen(true)
  }

  function handleClick() {
    const newState = !isAllSelected
    setWordsWithCheckbox(prevWordsWithCheckbox =>
      prevWordsWithCheckbox.map(pw => ({word: pw.word, isChecked: newState})))
    setIsAllSelected(newState)
  }

  function handleDelete() {}

  console.log('select-all');
  
  return (
    <div className={styles.wordContainer}>
      <div className={styles.wordText}>
        <input type="checkbox" checked={isAllSelected} onClick={handleClick} name="all" id="all"/>
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
