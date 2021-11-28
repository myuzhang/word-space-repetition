import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getWordsByCollectionId, deleteWordFromLocalStorage, updateWordToLocalStorage } from '../../utils'
import {ADD_WORD, DELETE_WORD, UPDATE_WORD, HIGHLIGHT_WORD, DELETE_COLLECTION} from '../../const'
import Word from '../word/Word';
import SelectAll from '../word/SelectAll'

export default function WordList({ setHighlightWord }) {
  const [wordsWithCheckbox, setWordsWithCheckbox] = useState([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const wordState = useSelector(state => state.word)
  const collectionState = useSelector(state => state.collection)
  const currentCollection = useSelector(state => state.currentCollection)

  useEffect(() => {
    const words = getWordsByCollectionId(currentCollection.id)
    setWordsWithCheckbox(words.map(w => ({word: w, isChecked:false})))
    setIsAllSelected(false)
  }, [currentCollection])

  useEffect(() => {
    if (collectionState.type === DELETE_COLLECTION && currentCollection.id === 'default') {
      setWordsWithCheckbox(prevWordsWithCheckbox => {
        const words = getWordsByCollectionId(currentCollection.id)
        const wordsMovedToDefault = words.filter(w => !prevWordsWithCheckbox.some(prev => prev.word.id === w.id))
        const wordsMovedToDefaultWithCheckbox = wordsMovedToDefault.map(w => ({word: w, isChecked:false}))
        return [...prevWordsWithCheckbox, ...wordsMovedToDefaultWithCheckbox]
      })
    }
  }, [collectionState, currentCollection.id])

  useEffect(() => {
    if (wordState.type === ADD_WORD) {
      setWordsWithCheckbox(prevWordsWithCheckbox => {
        const found = prevWordsWithCheckbox.find(w => w.word.value === wordState.word.value)
        if (found) {
          return prevWordsWithCheckbox
        }
      return [{word: wordState.word, isChecked: false}, ...prevWordsWithCheckbox]
    })
  }

    if (wordState.type === DELETE_WORD) {
      deleteWordFromLocalStorage(wordState.word)
      setWordsWithCheckbox(prevWordsWithCheckbox =>
        prevWordsWithCheckbox.filter(w => w.word.value !== wordState.word.value))
    }

    if (wordState.type === UPDATE_WORD) {
      if (wordState.word && wordState.word.value) {
        setWordsWithCheckbox(prevWordsWithCheckbox => {
          const foundWord = prevWordsWithCheckbox.find(w => w.word.id === wordState.word.id)
          let needToMoveCollection = false
          if (foundWord) {
            foundWord.value = wordState.word.value
            if (foundWord.collectionId !== wordState.word.collectionId) {
              needToMoveCollection = true
            }
          }
          if (needToMoveCollection) {
            return prevWordsWithCheckbox.filter(w => w.word.id !== wordState.word.id)
          }
          return [...prevWordsWithCheckbox]
        })
        updateWordToLocalStorage(wordState.word)
      }
    }

    if (wordState.type === HIGHLIGHT_WORD) {
      setHighlightWord(wordState.word.value)
    }
    
  }, [setHighlightWord, wordState])

  console.log('wordlist', wordsWithCheckbox);
  

  return (
    <div>
      <ul className={StyleSheet.wordList}>
        {wordsWithCheckbox.length === 0 ?
        <p><span role="img" aria-label="grinning">😅</span> There is no word in this collection: <em>{currentCollection.name}</em></p> :
        <>
          <SelectAll
            isAllSelected={isAllSelected}
            setIsAllSelected={setIsAllSelected}
            setWordsWithCheckbox={setWordsWithCheckbox}
          />
          {wordsWithCheckbox.map(wordWithCheckbox =>
            wordWithCheckbox.word.value && 
            <li key={wordWithCheckbox.word.id}>
              <Word 
                wordWithCheckbox={wordWithCheckbox}
                wordsWithCheckbox={wordsWithCheckbox}
                setWordsWithCheckbox={setWordsWithCheckbox}
                setIsAllSelected={setIsAllSelected}
            />
            </li>)}
        </>
        }
      </ul>
    </div>
  )
}
