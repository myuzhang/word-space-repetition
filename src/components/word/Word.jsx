import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import action from '../../store/actions'
import { deleteWordsFromLocalStorage, getDateInString, getWordSegment, getWordConfirmation, getWordMemeoryTimes, updateWordConfirmation, updateWordSegment } from '../../utils'
import UpdateWordModal from './UpdateWordModal'
import styles from './Word.module.css'
import baseStyles from '../../Base.module.css'
import classNames from 'classnames'

export default function Word({ wordWithCheckbox, checkboxes, setCheckboxes}) {
  const dispatch = useDispatch()
  const [confirm, setConfirm] = useState(getWordConfirmation(wordWithCheckbox.word))
  const [modalOpen, setModalOpen] = useState(false)
  const [isSegment, setIsSegment] = useState(getWordSegment(wordWithCheckbox.word))

  const hightlight = useRef('');

  const handleToggle = () => {
    updateWordConfirmation(wordWithCheckbox.word, !confirm)
    setConfirm(!confirm)
  }

  const handleDelete = () => {
    if (window.confirm(`⚠️ Are you sure you want to delete this word -> ${wordWithCheckbox.word.value}`)) {
      deleteWordsFromLocalStorage([wordWithCheckbox.word])
      dispatch(action.deleteWord(wordWithCheckbox.word))
      dispatch(action.decreaseTotalWordCount(1))
      dispatch(action.decreaseCollectionWordCount(1))
    }
  }

  const handleHighlightWord = () => {
    dispatch(action.highlightWord(wordWithCheckbox.word))
    const elements = document.getElementsByName('word')
    for(const element of elements) {
      element.style.color = ""
      element.style.fontWeight = ""
      element.style.fontStyle = ""
    }
    hightlight.current.style.color = "black"
    hightlight.current.style.fontWeight = "bold"
    hightlight.current.style.fontStyle = "italic"
    
  }

  const handleSegmentLine = () => {
    updateWordSegment(wordWithCheckbox.word, !isSegment)
    setIsSegment(!isSegment)
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
      <div className={classNames({[styles.wordText]: true, [styles.segment]: isSegment})} name={wordWithCheckbox.word.value} style={{backgroundColor: wordWithCheckbox.word.backgroundColor || ""}}>
        <input checked={wordWithCheckbox.isChecked} onChange={handleCheckboxClick} type="checkbox" name="word" id="word"/>
        <label htmlFor="word">
          <a className={classNames({[baseStyles.tooltip]: !!wordWithCheckbox.word.lastVisit})} data-text={`Last visited @ ${getDateInString(wordWithCheckbox.word.lastVisit)}`} href={`https://www.google.com/search?q=${wordWithCheckbox.word.value}+definition`} name="word" ref={hightlight} target="_blank" rel="noopener noreferrer">{wordWithCheckbox.word.value}</a>
        </label>
      </div>
      <div>
        <button onClick={handleHighlightWord} title="📓 Show meaning in the dictionary"><span role="img" aria-label="red textbook">📕</span></button>
        <button onClick={handleSegmentLine} title="🚧 Mark a segment line"><span role="img" aria-label="mark">🚧</span></button>
        {checkboxes.showAll ? 
        <button title="🧠 shows how many times have you memorized"><span role="img" aria-label="thumbs up">{getWordMemeoryTimes(wordWithCheckbox.word)}</span></button>
        :
        <button onClick={handleToggle} title="🧠 Click on it if you can remember the word and it won't display after you click 7 times on different day"><span role="img" aria-label="thumbs up">{confirm? '👍' : '🎯'}</span></button>
        }
        <button onClick={openModal} title="🖋 Modify the word"><span role="img" aria-label="gear">✍️</span></button>
        {modalOpen && <UpdateWordModal word={wordWithCheckbox.word} modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
        <button onClick={handleDelete} title="⚠️ Remove the word from the list"><span role="img" aria-label="trash bin">🗑</span></button>
      </div>
    </div>
  )
}