import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getTodayWords } from '../utils'
import Word from './word';

const Content = () => {
  const [words, setWords] = useState([])
  const [dict, setDict] = useState('Merriam')
  const newWord = useSelector(state => state.newWord)
  const deleteWord = useSelector(state => state.deleteWord)
  const highlightWord = useSelector(state => state.highlightWord)
  const updateOldWord = useSelector(state => state.updateOldWord)

  useEffect(() => {
    setWords(getTodayWords())
  }, [])

  useEffect(() => {
    setWords(words => {
      const dupWord = words.filter(word => word.value === newWord.value)
      if (dupWord.length === 0) {
        return [...words, newWord]
      }
      return words
    })
  }, [newWord])

  useEffect(() => {
    setWords(words => words.filter(word => word.value !== deleteWord.value))
  }, [deleteWord])

  useEffect(() => {
    if (updateOldWord && updateOldWord.value) {
      setWords(words => {
        const foundWord = words.find(w => w.id === updateOldWord.id)
        foundWord.value = updateOldWord.value
        setWords(words)
      })
    }
  }, [updateOldWord])

  const handleSelectDict = e => {
    setDict(e.target.value)
  }

  return (
    <div className="content-wrapper">
      <ul >
        {words && words.length && words.map(word => word.value && <li key={word.value}><Word word={word}/></li>)}
      </ul>
      <div className="word-explain">
        <div>
          <button className="square-button" value="Merriam" id="Merriam" onClick={handleSelectDict}>Merriam</button>
          <button className="square-button" value="Dictionary" id="Dictionary" onClick={handleSelectDict}>Dictionary</button>
          <button className="square-button" value="Cambridge" id="Cambridge" onClick={handleSelectDict}>Cambridge</button>
          <button className="square-button" value="Synonyms" id="Synonyms" onClick={handleSelectDict}>Synonyms</button>
        </div>
        {dict === 'Merriam' && <iframe src={`https://www.merriam-webster.com/dictionary/${highlightWord.value}`} width="720" height="600" title="myFrame"></iframe>}
        {dict === 'Dictionary' && <iframe src={`https://www.dictionary.com/browse/${highlightWord.value}`} width="720" height="600" title="myFrame"></iframe>}
        {dict === 'Cambridge' && <iframe src={`https://dictionary.cambridge.org/dictionary/english/${highlightWord.value}`} width="720" height="600" title="myFrame"></iframe>}
        {dict === 'Synonyms' && <iframe src={`https://www.wordhippo.com/what-is/another-word-for/${highlightWord.value}.html`} width="720" height="600" title="myFrame"></iframe>}
        {dict === 'Antonyms' && <iframe src={`https://www.wordhippo.com/what-is/the-opposite-of/${highlightWord.value}.html`} width="720" height="600" title="myFrame"></iframe>}
      </div>
    </div>
  )
}
export default Content