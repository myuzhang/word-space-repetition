import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import action from '../../store/actions'
import styles from './Word.module.css'
import MoveWordsModal from './MoveWordsModal';
import { deleteWordsFromLocalStorage, shuffleArray } from '../../utils';

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

  function handleShuffle() {
    const checkboxWords = shuffleArray(checkboxes.checkboxWords)
    setCheckboxes({
      isAllSelected: checkboxWords.isAllSelected,
      checkboxWords
    })
  }

  function handleCount() {

  }

  function handleGoogleSearch() {
    const searchingWords = checkboxes.checkboxWords.filter(w => w.isChecked)
    if(searchingWords.length > 5) {
      if (!window.confirm(`👻 This will open ${searchingWords.length} new tabs to explain words via Google.\n\nAre you sure you want to open all of them?`)) {
        return
      }
    }
    searchingWords.forEach(w => {
      const newWindow = window.open(`https://www.google.com/search?q=${w.word.value}+definition`, w.word.value, 'noopener,noreferrer')
      console.log(w.word.value);
      
      if (newWindow) {
        newWindow.opener = null
      }
    })
  }

  return (
    <div className={styles.wordContainer}>
      <div className={styles.wordText}>
        <input type="checkbox" checked={checkboxes.isAllSelected} onChange={handleChange} name="all" id="all"/>
        <label className={styles.thick} htmlFor="all">Select All</label>
      </div>
      <div>
        <button onClick={handleCount} title="🧮 Show the number of selected words from the collection"><span role="img" aria-label="shuffle bin">🧮</span></button>
        <button onClick={handleGoogleSearch} title="🌏 Explain selected words by Google in new tab from the collection"><span role="img" aria-label="google search">🌐</span></button>
        <button onClick={handleShuffle} title="🔄 Shuffle all words from the collection"><span role="img" aria-label="shuffle bin">🔀</span></button>
        <button onClick={openModal} title="🖋 Move selected words to another collection"><span role="img" aria-label="gear">✍️</span></button>
        <button onClick={handleDelete} title="⚠️ Remove selected word from the collection"><span role="img" aria-label="trash bin">🗑</span></button>
        {modalOpen && <MoveWordsModal modalOpen={modalOpen} setModalOpen={setModalOpen} checkboxes={checkboxes} setCheckboxes={setCheckboxes} />}
      </div>
    </div>
  )
}
