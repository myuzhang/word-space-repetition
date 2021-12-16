import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import action from '../../store/actions'
import className from 'classnames'
import { getCollections, getCurrentCollection } from '../../utils'
import styles from './Word.module.css';
import { INPUT_MAX_LENGTH } from '../../const';
import { updateWordToLocalStorage } from '../../utils'

export default function UpdateWordModal(props) {
  let subtitle
  const dispatch = useDispatch()
  const [word, setWord] = useState(props.word.value)
  const [collections, setCollections] = useState([getCurrentCollection()])
  const [selectCollection, setSelectCollection] = useState(props.word.collectionId)
  const collectionState = useSelector(state => state.collection)

  useEffect(() => {
    setCollections(getCollections())
  }, [collectionState])
 
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }
 
  const closeModal = () => {
    props.setModalOpen(false)
  }

  const handleChange = e => {
    setWord(e.target.value)
  }

  const handleSelectCollection = e => {
    setSelectCollection(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (e.target[0].value) {
      const trimedWord = e.target[0].value.trim()
      if (trimedWord) {
        if (trimedWord.toLowerCase() !== props.word.value.toLowerCase() ||
            e.target[1].value !== props.word.collectionId) {
              const updateWord = {
                id: props.word.id,
                collectionId: e.target[1].value,
                value: trimedWord,
                count: props.word.count,
                date: props.word.date
              }
              console.log(updateWord);
              
              updateWordToLocalStorage(updateWord)

              if (e.target[1].value !== props.word.collectionId) {
                dispatch(action.decreaseCollectionWordCount(1))
                dispatch(action.updateTotalWordCount())
              }
              dispatch(action.updateWord(updateWord))
        }
      }
    }
    closeModal()
  }

  return (
    <Modal
      isOpen={props.modalOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      ariaHideApp={false}
      className={styles.modalContainer}
      contentLabel="Update Word"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit your word:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="updateWord">Original Word <span role="img" aria-label="writing hand">✍️</span>:</label>
        <input className={styles.inputUpdate} type="text" id="updateWord" value={word} onChange={handleChange} maxLength={INPUT_MAX_LENGTH}/>
        <select name="collections" id="collections" onChange={handleSelectCollection} value={selectCollection}>
          {collections && collections.length > 0 && collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <input className={className(styles.rightSubmit, styles.pointButton)} type="submit" value="Update"/>
      </form>
    </Modal>
  )
}