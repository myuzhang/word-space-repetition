import React, { useState } from 'react'
import styles from './Dictionary.module.css'

const Dictionary = ( {highlightWord} ) => {
  const [dictionary, setDictionary] = useState('Merriam')

  function handleSelectDict(event) {
    setDictionary(event.target.value)
  }

  return (
    <div className={styles.dictionaryWrapper}>
      <div>
        <button className={styles.squareButton} value="Merriam" id="Merriam" onClick={handleSelectDict}>Merriam</button>
        <button className={styles.squareButton} value="Dictionary" id="Dictionary" onClick={handleSelectDict}>Dictionary</button>
        <button className={styles.squareButton} value="Cambridge" id="Cambridge" onClick={handleSelectDict}>Cambridge</button>
        <button className={styles.squareButton} value="Synonyms" id="Synonyms" onClick={handleSelectDict}>SYN</button>
        <button className={styles.squareButton} value="Antonyms" id="Antonyms" onClick={handleSelectDict}>ANT</button>
      </div>
      {dictionary === 'Merriam' && <iframe src={`https://www.merriam-webster.com/dictionary/${highlightWord}`} title="Merriam"></iframe>}
      {dictionary === 'Dictionary' && <iframe src={`https://www.dictionary.com/browse/${highlightWord}`} title="Dictionary"></iframe>}
      {dictionary === 'Cambridge' && <iframe src={`https://dictionary.cambridge.org/dictionary/english/${highlightWord}`} title="Cambridge"></iframe>}
      {dictionary === 'Synonyms' && <iframe src={`https://www.wordhippo.com/what-is/another-word-for/${highlightWord}.html`} title="Synonyms"></iframe>}
      {dictionary === 'Antonyms' && <iframe src={`https://www.wordhippo.com/what-is/the-opposite-of/${highlightWord}.html`} title="Antonyms"></iframe>}
    </div>
  )
}
export default Dictionary