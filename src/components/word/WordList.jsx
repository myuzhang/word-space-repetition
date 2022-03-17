import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getTodayWordsByCollectionId, deleteWordsFromLocalStorage, getRecallWords, getWordsByCollectionId } from '../../utils'
import {DELETE_COLLECTION} from '../../const'
// import Word from './Word'
import WordDragDrop from './WordDragDrop'
import SelectAll from '../word/SelectAll'
import styles from './Word.module.css'
import WordRecall from './WordRecall'
// import AddWordInline from './AddWordInline'

function checkIsAllSelected(checkboxWords) {
  return checkboxWords.every(w => w.isChecked)
}

export default function WordList({ setHighlightWord }) {
  const wordState = useSelector(state => state.word)
  const collectionState = useSelector(state => state.collection)
  const currentCollection = useSelector(state => state.currentCollection)
  const isInRecall = useSelector(state => state.recall)
  const [checkboxes, setCheckboxes] = useState(
    {isAllSelected: false, checkboxWords: getTodayWordsByCollectionId(currentCollection.id).map(w => ({word: w, isChecked:false}))})

  const hasWordsInCollection = getWordsByCollectionId(currentCollection.id).length > 0

  useEffect(() => {
    const words = getTodayWordsByCollectionId(currentCollection.id)
    setCheckboxes({isAllSelected: false, checkboxWords: words.map(w => ({word: w, isChecked:false}))})
  }, [currentCollection])

  useEffect(() => {
    if (collectionState.type === DELETE_COLLECTION && currentCollection.id === 'default') {
      setCheckboxes(prevCheckboxes => {
        const words = getTodayWordsByCollectionId(currentCollection.id)
        const wordsMovedToDefault = words.filter(w => !prevCheckboxes.checkboxWords.some(prev => prev.word.value === w.value))
        if(wordsMovedToDefault.length > 0) {
          const wordsMovedToDefaultWithCheckbox = wordsMovedToDefault.map(w => ({word: w, isChecked:false}))
          return {
            isAllSelected: false,
            checkboxWords: [...prevCheckboxes.checkboxWords, ...wordsMovedToDefaultWithCheckbox]          
          }
        }
        return prevCheckboxes
      })
    }
  }, [collectionState, currentCollection.id])

  useEffect(() => {
    setCheckboxes(prevCheckboxes => {
      const found = prevCheckboxes.checkboxWords.find(c => c.word.value === wordState.addWord.value)
      if (found) {
        return prevCheckboxes
      }
      return {
        isAllSelected: false,
        checkboxWords: [{word: wordState.addWord, isChecked: false}, ...prevCheckboxes.checkboxWords]
      }
    })
  }, [wordState.addWord])

  useEffect(() => {
    deleteWordsFromLocalStorage([wordState.deleteWord])
    setCheckboxes(prevCheckboxes => {
      const left = prevCheckboxes.checkboxWords.filter(w => w.word.value !== wordState.deleteWord.value)
      return {
        isAllSelected: checkIsAllSelected(left),
        checkboxWords: left
      }
    })
  }, [wordState.deleteWord])

  useEffect(() => {
    deleteWordsFromLocalStorage(wordState.deleteWords)
    setCheckboxes(prevCheckboxes => {
      const left = prevCheckboxes.checkboxWords.filter(cw => !wordState.deleteWords.some(dw => dw.value === cw.word.value))
      return {
        isAllSelected: checkIsAllSelected(left),
        checkboxWords: left
      }
    })
  }, [wordState.deleteWords])

  useEffect(() => {
    if (wordState.updateWord && wordState.updateWord.value) {
      setCheckboxes(prevCheckboxWords => {
        const foundCheckboxWord = prevCheckboxWords.checkboxWords.find(w => w.word.id === wordState.updateWord.id)
        let needToMoveCollection = false
        if (foundCheckboxWord) {
          foundCheckboxWord.word.value = wordState.updateWord.value
          if (foundCheckboxWord.word.collectionId !== wordState.updateWord.collectionId) {
            needToMoveCollection = true
          }
        }
        
        if (needToMoveCollection) {
          const left = prevCheckboxWords.checkboxWords.filter(w => w.word.id !== wordState.updateWord.id)
          return {
            isAllSelected: checkIsAllSelected(left),
            checkboxWords: left
          }
        }
        
        return {
          isAllSelected: prevCheckboxWords.isAllSelected,
          checkboxWords: [...prevCheckboxWords.checkboxWords]
        }
      })
    }
  }, [wordState.updateWord])

  useEffect(() => {
    setHighlightWord(wordState.highlightWord.value)
  }, [setHighlightWord, wordState.highlightWord])

  return (
    <div>
      { isInRecall ?
          getRecallWords().length === 0 ?
            <p><span role="img" aria-label="grinning">😅</span> There is no word to recall</p> :
              <ul className={styles.wordList}>
                {getRecallWords().map(word =>
                  word.value && 
                  <li key={word.id}>
                    <WordRecall word={word} />
                  </li>)}
              </ul>
          :
          !hasWordsInCollection ?
              <p><span role="img" aria-label="grinning">😅</span> There is no word in this collection: <em>{currentCollection.name}</em></p> :
              <>
                <SelectAll collectionId={currentCollection.id} checkboxes={checkboxes} setCheckboxes={setCheckboxes} />
                <div className={styles.wordList}>
                  <WordDragDrop checkboxWords={checkboxes.checkboxWords} checkboxes={checkboxes} setCheckboxes={setCheckboxes}/>
                </div>
                {/* <ul className={styles.wordList}>
                  {checkboxes.checkboxWords.map(wordWithCheckbox =>
                    wordWithCheckbox.word.value && 
                    <li key={wordWithCheckbox.word.id}>
                      <Word wordWithCheckbox={wordWithCheckbox} checkboxes={checkboxes} setCheckboxes={setCheckboxes}/>
                    </li>)}
                  <li key="addWordInline">
                    <AddWordInline />
                  </li>
                </ul> */}
              </>
      }
    </div>
  )
}
