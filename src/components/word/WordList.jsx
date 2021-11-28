import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getWordsByCollectionId, deleteWordFromLocalStorage, updateWordToLocalStorage } from '../../utils'
import {ADD_WORD, DELETE_WORD, UPDATE_WORD, HIGHLIGHT_WORD, DELETE_COLLECTION} from '../../const'
import Word from '../word/Word';
import SelectAll from '../word/SelectAll'

function checkIsAllSelected(checkboxWords) {
  return checkboxWords.every(w => w.isChecked)
}

export default function WordList({ setHighlightWord }) {
  const [checkboxes, setCheckboxes] = useState({isAllSelected: false, checkboxWords: []})
  const wordState = useSelector(state => state.word)
  const collectionState = useSelector(state => state.collection)
  const currentCollection = useSelector(state => state.currentCollection)

  useEffect(() => {
    const words = getWordsByCollectionId(currentCollection.id)
    setCheckboxes({isAllSelected: false, checkboxWords: words.map(w => ({word: w, isChecked:false}))})
  }, [currentCollection])

  useEffect(() => {
    if (collectionState.type === DELETE_COLLECTION && currentCollection.id === 'default') {
      setCheckboxes(prevCheckboxes => {
        const words = getWordsByCollectionId(currentCollection.id)
        const wordsMovedToDefault = words.filter(w => !prevCheckboxes.checkboxWords.some(prev => prev.word.id === w.id))
        if(wordsMovedToDefault.length > 0) {
          const wordsMovedToDefaultWithCheckbox = wordsMovedToDefault.map(w => ({word: w, isChecked:false}))
          return {
            isAllSelected: false,
            checkboxWords: [...prevCheckboxes.checkboxWords, ...wordsMovedToDefaultWithCheckbox.checkboxWords]          
          }
        }
        return prevCheckboxes
      })
    }
  }, [collectionState, currentCollection.id])

  useEffect(() => {
    if (wordState.type === ADD_WORD) {
      setCheckboxes(prevCheckboxes => {
        const found = prevCheckboxes.checkboxWords.find(c => c.word.value === wordState.word.value)
        if (found) {
          return prevCheckboxes
        }
      return {
        isAllSelected: false,
        checkboxWords: [{word: wordState.word, isChecked: false}, ...prevCheckboxes.checkboxWords]}
    })
  }

    if (wordState.type === DELETE_WORD) {
      deleteWordFromLocalStorage(wordState.word)
      setCheckboxes(prevCheckboxes => {
        const left = prevCheckboxes.checkboxWords.filter(w => w.word.value !== wordState.word.value)
        return {
          isAllSelected: checkIsAllSelected(left),
          checkboxWords: left
        }
      })
    }

    if (wordState.type === UPDATE_WORD) {
      if (wordState.word && wordState.word.value) {
        setCheckboxes(prevCheckboxWords => {
          const foundWord = prevCheckboxWords.checkboxWords.find(w => w.word.id === wordState.word.id)
          let needToMoveCollection = false
          if (foundWord) {
            foundWord.value = wordState.word.value
            if (foundWord.collectionId !== wordState.word.collectionId) {
              needToMoveCollection = true
            }
          }
          if (needToMoveCollection) {
            const left = prevCheckboxWords.checkboxWords.filter(w => w.word.id !== wordState.word.id)
            return {
              isAllSelected: checkIsAllSelected(left),
              checkboxWords: left
            }
          }
          return {
            isAllSelected: prevCheckboxWords.isAllSelected,
            checkboxWords: [...prevCheckboxWords]
          }
        })
        updateWordToLocalStorage(wordState.word)
      }
    }

    if (wordState.type === HIGHLIGHT_WORD) {
      setHighlightWord(wordState.word.value)
    }
    
  }, [setHighlightWord, wordState])

  return (
    <div>
      <ul className={StyleSheet.wordList}>
        {checkboxes.checkboxWords.length === 0 ?
        <p><span role="img" aria-label="grinning">😅</span> There is no word in this collection: <em>{currentCollection.name}</em></p> :
        <>
          <SelectAll checkboxes={checkboxes} setCheckboxes={setCheckboxes}/>
          {checkboxes.checkboxWords.map(wordWithCheckbox =>
            wordWithCheckbox.word.value && 
            <li key={wordWithCheckbox.word.id}>
              <Word wordWithCheckbox={wordWithCheckbox} checkboxes={checkboxes} setCheckboxes={setCheckboxes}/>
            </li>)}
        </>
        }
      </ul>
    </div>
  )
}
