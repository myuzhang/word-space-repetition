import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { TwitterPicker } from 'react-color'
import action from '../../store/actions'
import styles from './Word.module.css'
import MoveWordsModal from './MoveWordsModal';
import { deleteWordsFromLocalStorage, getTodayWordsByCollectionId, getWordsByCollectionId, shuffleArray, updateWordsBackgroundColor } from '../../utils';

export default function SelectAll({checkboxes, setCheckboxes}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [openPalette, setOpenPalette] = useState(false)
  const [isAllWords, setIsAllWords] = useState(false)
  const [color, setColor] = useState('#fff')
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
        dispatch(action.decreaseCollectionWordCount(deleteCount))
      }
    }
  }

  function handleAllWords() {
    const toggle = !isAllWords
    setIsAllWords(toggle)
    let words
    if (toggle) {
      words = getWordsByCollectionId(checkboxes.checkboxWords[0].word.collectionId)
    } else {
      words = getTodayWordsByCollectionId(checkboxes.checkboxWords[0].word.collectionId)
    }
    setCheckboxes({
      isAllSelected: false,
      checkboxWords: words.map(w => ({isChecked: false, word: w})),
      showAll: toggle
    })
  }

  function handleShuffle() {
    const checkboxWords = shuffleArray(checkboxes.checkboxWords)
    setCheckboxes({
      isAllSelected: checkboxWords.isAllSelected,
      checkboxWords
    })
  }

  function handlePalette() {
    setOpenPalette(true)
  }

  function cancelColorPicker() {
    setOpenPalette(false)
  }

  function confirmColorPicker() {
    setOpenPalette(false)
    updateWordsBackgroundColor(checkboxes.checkboxWords.filter(cw => cw.isChecked).map(cw => cw.word), color)
    setCheckboxes({
      isAllSelected: checkboxes.isAllSelected,
      checkboxWords: checkboxes.checkboxWords.map(cw => {
        if(cw.isChecked) {
          cw.word.backgroundColor = color
        }
        return cw
      })
    })
  }
  
  function resetColorPicker() {
    setOpenPalette(false)
    updateWordsBackgroundColor(checkboxes.checkboxWords.filter(cw => cw.isChecked).map(cw => cw.word), undefined)
    setCheckboxes({
      isAllSelected: checkboxes.isAllSelected,
      checkboxWords: checkboxes.checkboxWords.map(cw => {
        if(cw.isChecked) {
          cw.word.backgroundColor = undefined
        }
        return cw
      })
    })
  }
  
  function changeColor(color) {
    setColor(color.hex)
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
      {openPalette && 
        (
          <div className={styles.colorPickerContainer} >
            <TwitterPicker color={color} onChangeComplete={changeColor} />
            <div className={styles.threeColumns}>
              <button className={styles.pointButton} onClick={cancelColorPicker}>Cancel</button>
              <button className={styles.pointButton} onClick={resetColorPicker}>Reset</button>
              <button className={styles.pointButton} onClick={confirmColorPicker}>Confirm</button>
            </div>
          </div>
        )}
        <button onClick={handleAllWords} title="🎛 Toggle to show all words"><span role="img" aria-label="toggle words">{isAllWords? '🔑' : '🔒'}</span></button>
        <button onClick={handlePalette} title="🎨 Change color for selected words from the collection"><span role="img" aria-label="palette">🎨</span></button>
        <button onClick={handleGoogleSearch} title="🌏 Explain selected words by Google in new tab from the collection"><span role="img" aria-label="google search">🌐</span></button>
        <button onClick={handleShuffle} title="🔄 Shuffle all words from the collection"><span role="img" aria-label="shuffle bin">🔀</span></button>
        <button onClick={openModal} title="🖋 Move selected words to another collection"><span role="img" aria-label="gear">✍️</span></button>
        <button onClick={handleDelete} title="⚠️ Remove selected word from the collection"><span role="img" aria-label="trash bin">🗑</span></button>
        {modalOpen && <MoveWordsModal modalOpen={modalOpen} setModalOpen={setModalOpen} checkboxes={checkboxes} setCheckboxes={setCheckboxes} />}
      </div>
    </div>
  )
}
