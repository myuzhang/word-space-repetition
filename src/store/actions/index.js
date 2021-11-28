import {addCollection, deleteCollection, updateCollection, chooseCollection} from './collectionAction'
import {increaseTotalWordCount, decreaseTotalWordCount, increaseTodayWordCount, decreaseTodayWordCount, increaseCollectionWordCount, decreaseCollectionWordCount, setCollectionWordCount } from './statisticAction'
import {addWord, deleteWord, deleteWords, updateWord, highlightWord} from './wordAction'

const action = {
  addCollection, deleteCollection, updateCollection, chooseCollection,
  increaseTotalWordCount, decreaseTotalWordCount, increaseTodayWordCount, decreaseTodayWordCount, increaseCollectionWordCount, decreaseCollectionWordCount, setCollectionWordCount,
  addWord, deleteWord, deleteWords, updateWord, highlightWord
}

export default action