import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import action from '../../store/actions'
import styles from './Word.module.css'

export default function WordRecall({word}) {
  const dispatch = useDispatch()

  const hightlight = useRef('');

  const handleHighlightWord = () => {
    dispatch(action.highlightWord(word))
    const elements = document.getElementsByClassName(styles.wordText)
    for(const element of elements) {
      element.style.backgroundColor = ""
    }
    hightlight.current.style.backgroundColor = "yellow"
  }

  return (
    <div className={styles.wordContainer}>
      <div className={styles.wordText} ref={hightlight} style={{backgroundColor: word.backgroundColor || ""}}>
        <a href={`https://www.google.com/search?q=${word.value}+definition`} target="_blank" rel="noopener noreferrer">{word.value}</a>
      </div>
      <div>
        <button onClick={handleHighlightWord} title="📓 Show meaning in the dictionary"><span role="img" aria-label="red textbook">📕</span></button>
      </div>
    </div>
  )
}