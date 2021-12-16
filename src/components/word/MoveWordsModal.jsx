import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import className from 'classnames'
import action from '../../store/actions'
import { getCollections, getCurrentCollection, moveWordsToCollection } from '../../utils'
import styles from './Word.module.css'

export default function MoveWordsModal({modalOpen, setModalOpen, checkboxes, setCheckboxes}) {
  let subtitle
  const dispatch = useDispatch()
  const [selectCollection, setSelectCollection] = useState('')
  const [collections, setCollections] = useState([getCurrentCollection()])
  const collectionState = useSelector(state => state.collection)

  useEffect(() => {
    setCollections(getCollections())
  }, [collectionState])

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }
 
  function closeModal() {
    setModalOpen(false)
  }

  function handleSelectCollection (event) {
    setSelectCollection(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const targetCollectionId = event.target[0].value
    const currentCollectionId = checkboxes.checkboxWords[0].word.collectionId
    if (currentCollectionId === targetCollectionId) {
      return
    }
    const movingWords = checkboxes.checkboxWords.filter(cw => cw.isChecked).map(cw => cw.word)
    
    moveWordsToCollection(movingWords, targetCollectionId)
    const leftWord = checkboxes.checkboxWords.filter(cw => !cw.isChecked)
    dispatch(action.decreaseCollectionWordCount(movingWords.length))
    dispatch(action.updateTotalWordCount())
    setCheckboxes({
      isAllSelected: checkboxes.isAllSelected,
      checkboxWords: leftWord,
    })
    closeModal()
  }

  return (
    <Modal
      isOpen={modalOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className={styles.modalContainer}
      contentLabel="Move Words"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit your word:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="moveWord">Moving below words to another collection <span role="img" aria-label="writing hand">✍️</span>:</label>
        <div className={styles.moveWord}>{checkboxes.checkboxWords.filter(cw => cw.isChecked).map(cw => cw.word.value).join(', ')}</div>
        <select name="collections" id="collections" onChange={handleSelectCollection} value={selectCollection}>
          {collections && collections.length > 0 && collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input className={className(styles.rightSubmit, styles.pointButton)} type="submit" value="Update"/>
      </form>
    </Modal>
  )
}
