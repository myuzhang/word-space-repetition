import React, { useState } from 'react'
import styles from './Content.module.css'
import WordList from '../word/WordList'
import Dictionary from '../dictionary/Dictionary'

export default function Content() {
  const [highlightWord, setHighlightWord] = useState()

  return (
    <div className={styles.contentContainer}>
      <WordList setHighlightWord={setHighlightWord}/>
      <Dictionary highlightWord={highlightWord}/>
    </div>
  )
}
