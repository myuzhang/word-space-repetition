import React from 'react'
import { useSelector } from 'react-redux'
import { saveToFile, restoreFromFile } from '../utils';

const Statistic = () => {
  const todaysWords = useSelector(state => state.todaysWords)
  const totalWords = useSelector(state => state.totalWords)

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
      <div className="stat-wrapper">
        <p className="compact-line">Today's Task Words: <strong>{todaysWords || '⏰'}</strong></p>
        <p className="compact-line" >My Total Words: <strong> {totalWords || '⏰'}</strong></p>
        <div className="file-action">
          <button onClick={handleSave}>Download My Words</button>
          <div className="vertical-separate"></div>
          <form>
            <label htmlFor="restoreFromFile"><strong>Restore:</strong></label>
            <input type='file' id="restoreFromFile" accept=".json" onChange={handleRestore}></input> 
          </form>
        </div>
      </div>
    </>
  )
}

export default Statistic