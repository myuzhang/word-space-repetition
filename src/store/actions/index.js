import {addCollection, deleteCollection, updateCollection, chooseCollection} from './collectionAction'
import {increaseTotalWordCount, decreaseTotalWordCount, updateTotalWordCount, increaseCollectionWordCount, decreaseCollectionWordCount, updateCurrentCollectionWordCount,   setCollectionWordCount } from './statisticAction'
import {addWord, deleteWord, deleteWords, updateWord, highlightWord} from './wordAction'
import {displayRecallWords, hideRecallWords} from './recallAction'

const action = {
  addCollection, deleteCollection, updateCollection, chooseCollection,
  increaseTotalWordCount, decreaseTotalWordCount, updateTotalWordCount, increaseCollectionWordCount, decreaseCollectionWordCount, updateCurrentCollectionWordCount, setCollectionWordCount,
  addWord, deleteWord, deleteWords, updateWord, highlightWord,
  displayRecallWords, hideRecallWords
}

export default action