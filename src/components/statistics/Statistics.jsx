import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCollectionWordCount, restoreFromFile, saveToFile } from '../../utils';
import styles from './Statistics.module.css'
import action from '../../store/actions'

export default function Statistics() {
  const statistics = useSelector(state => state.statistics)
  const currentCollection = useSelector(state => state.currentCollection)
  const dispatch = useDispatch()

  useEffect(() => {
    const collectionWordCount = getCollectionWordCount(currentCollection.id)
    dispatch(action.setCollectionWordCount(collectionWordCount))
  }, [currentCollection, dispatch])

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

  return (
    <>
      <div className={styles.statWrapper}>
        <p className={styles.compactLine}>Total Words: <strong> {statistics.totalwordCount || '⏰'}</strong></p>
        <p className={styles.compactLine}>Collection Words: <strong>{statistics.collectionWordCount || '⏰'}</strong></p>
        <p className={styles.compactLine}>Today Words: <strong> {statistics.todayWordCount || '⏰'}</strong></p>
        <div className={styles.fileAction}>
          <button onClick={handleSave}>Download My Words</button>
          <div className={styles.verticalSeparate}></div>
          <form>
            <label htmlFor="restoreFromFile"><strong>Apply your Wrods:</strong></label>
            <input type='file' id="restoreFromFile" accept=".json" onChange={handleRestore}></input> 
          </form>
        </div>
      </div>
    </>
  )
}
