import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCollectionWordCount, getRecallWords, restoreFromFile, saveToFile } from '../../utils';
import styles from './Statistics.module.css'
import action from '../../store/actions'

export default function Statistics() {
  const [count, setCount] = useState({total: 0, collection: 0})
  const statistics = useSelector(state => state.statistics)
  const currentCollection = useSelector(state => state.currentCollection)
  const recallButton = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(currentCollection.id);
    
    const collectionWordCount = getCollectionWordCount(currentCollection.id)
    setCount(prevState => ({total: prevState.total, collection: collectionWordCount}))
  }, [currentCollection])

  useEffect(() => {
    console.log(statistics);
    
    setCount({total: statistics.totalwordCount, collection: statistics.collectionWordCount})
  }, [statistics])

  const handleSave = () => saveToFile()
  const handleRestore = e => {
    const fileList = e.target.files
    if (fileList.length > 0) {
      const file = fileList[0]
      const reader = new FileReader();
      reader.onload = (function(reader)
      {
          return function()
          {
              const content = reader.result
              restoreFromFile(content)
          }
      })(reader);

      reader.readAsText(file)
    }
  }

  function handleRecall(event) {
    const text = recallButton.current.innerText
    if (text.includes('Recall Words')) {
      recallButton.current.innerText = 'Back to Collection'
      dispatch(action.displayRecallWords())
    } else {
      recallButton.current.innerText = `Recall Words: ${getRecallWords().length}`
      dispatch(action.hideRecallWords())
    }
  }

  return (
    <div className={styles.statWrapper}>
      <p className={styles.compactLine}>Total Words: <strong> {count.total || '⏰'}</strong></p>
      <p className={styles.compactLine}>Collection Words: <strong>{count.collection || '⏰'}</strong></p>
      <button className={styles.compactLine} onClick={handleRecall} ref={recallButton}>Recall Words: {getRecallWords().length}</button>
      <div className={styles.fileAction}>
        <button onClick={handleSave}>Download My Words</button>
        <div className={styles.verticalSeparate}></div>
        <form>
          <label htmlFor="restoreFromFile"><strong>Apply your Wrods:</strong></label>
          <input type='file' id="restoreFromFile" accept=".json" onChange={handleRestore}></input> 
        </form>
      </div>
    </div>
  )
}
