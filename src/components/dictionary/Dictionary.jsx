import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getWordsByCollectionId, deleteWordFromLocalStorage, updateWordToLocalStorage } from '../../utils'
import {ADD_WORD, DELETE_WORD, UPDATE_WORD, HIGHLIGHT_WORD, DELETE_COLLECTION} from '../../const'
import Word from '../word/Word';

const Dictionary = () => {
  const [words, setWords] = useState([])
  const [highlightWord, setHighlightWord] = useState()
  const [dict, setDict] = useState('Merriam')
  const wordState = useSelector(state => state.word)
  const collectionState = useSelector(state => state.collection)
  const currentCollection = useSelector(state => state.currentCollection)

  useEffect(() => {
    setWords(getWordsByCollectionId(currentCollection.id))
  }, [currentCollection])

  useEffect(() => {
    if (collectionState.type === DELETE_COLLECTION && currentCollection.id === 'default') {
      setWords(getWordsByCollectionId(currentCollection.id))
    }
  }, [collectionState, currentCollection.id])

  useEffect(() => {
    if (wordState.type === ADD_WORD) {
      setWords(words => {
        const dupWord = words.filter(w => w.value === wordState.word.value)
        if (dupWord.length === 0) {
          return [wordState.word, ...words]
        }
        return words
      })
    }

    if (wordState.type === DELETE_WORD) {
      deleteWordFromLocalStorage(wordState.word)
      setWords(words => words.filter(w => w.value !== wordState.word.value))
    }

    if (wordState.type === UPDATE_WORD) {
      if (wordState.word && wordState.word.value) {
        setWords(words => {
          const foundWord = words.find(w => w.id === wordState.word.id)
          let needToMoveCollection = false
          if (foundWord) {
            foundWord.value = wordState.word.value
            if (foundWord.collectionId !== wordState.word.collectionId) {
              needToMoveCollection = true
            }
          }
          if (needToMoveCollection) {
            return words.filter(w => w.id !== wordState.word.id)
          }
          return [...words]
        })
        updateWordToLocalStorage(wordState.word)
      }
    }

    if (wordState.type === HIGHLIGHT_WORD) {
      setHighlightWord(wordState.word.value)
    }
    
  }, [wordState])

  const handleSelectDict = e => {
    setDict(e.target.value)
  }

  return (
    <div className="scroll-then-fix">
      <div className="content-wrapper">
        <ul className="word-list">
          {words && words.length === 0 ?
          <p><span role="img" aria-label="grinning">😅</span> There is no word in this collection: <em>{currentCollection.name}</em></p> :
          words.map(word => word.value && <li key={word.id}><Word word={word}/></li>)}
        </ul>
        <div>
          <div>
            <button className="square-button" value="Merriam" id="Merriam" onClick={handleSelectDict}>Merriam</button>
            <button className="square-button" value="Dictionary" id="Dictionary" onClick={handleSelectDict}>Dictionary</button>
            <button className="square-button" value="Cambridge" id="Cambridge" onClick={handleSelectDict}>Cambridge</button>
            <button className="square-button" value="Synonyms" id="Synonyms" onClick={handleSelectDict}>Synonyms</button>
          </div>
          {dict === 'Merriam' && <iframe src={`https://www.merriam-webster.com/dictionary/${highlightWord}`} title="Merriam"></iframe>}
          {dict === 'Dictionary' && <iframe src={`https://www.dictionary.com/browse/${highlightWord}`} title="Dictionary"></iframe>}
          {dict === 'Cambridge' && <iframe src={`https://dictionary.cambridge.org/dictionary/english/${highlightWord}`} title="Cambridge"></iframe>}
          {dict === 'Synonyms' && <iframe src={`https://www.wordhippo.com/what-is/another-word-for/${highlightWord}.html`} title="Synonyms"></iframe>}
          {dict === 'Antonyms' && <iframe src={`https://www.wordhippo.com/what-is/the-opposite-of/${highlightWord}.html`} title="Antonyms"></iframe>}
        </div>
      </div>
    </div>
  )
}
export default Dictionary