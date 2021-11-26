import {addCollection, deleteCollection, updateCollection, chooseCollection} from './collectionAction'
import {increaseTotalWords, decreaseTotalWords, increaseTodayWords, decreaseTodayWords, increaseCollectionWords, decreaseCollectionWords, setCollectionWords } from './statisticAction'
import {addWord, deleteWord, updateWord, highlightWord} from './wordAction'

const action = {
  addCollection, deleteCollection, updateCollection, chooseCollection,
  increaseTotalWords, decreaseTotalWords, increaseTodayWords, decreaseTodayWords, increaseCollectionWords, decreaseCollectionWords, setCollectionWords,
  addWord, deleteWord, updateWord, highlightWord
}

export default action