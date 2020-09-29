import React, { useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { updateOldWord } from '../store/actions/wordAction'

const UpdateWord = (props) => {
  var subtitle
  const dispatch = useDispatch()
  const [modalIsOpen,setIsOpen] = useState(false)
  const [word, setWord] = useState(props.word.value)

  const openModal = () => {
    setIsOpen(true)
  }
 
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'
  }
 
  const closeModal = () => {
    setIsOpen(false)
  }

  const handleChange = e => {
    setWord(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (word) {
      const trimedWord = word.trim()
      if (trimedWord) {
        dispatch(updateOldWord({
          id: props.word.id,
          value: trimedWord,
          times: props.word.times,
          date: props.word.date
        }))
      }
    }
    setIsOpen(false)
  }

  return (
    <>
        <button onClick={openModal}><span role="img" aria-label="gear">⚙️</span></button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          className="modal-wrapper"
          contentLabel="Update Word"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit your word:</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="updateWord">Original Word <span role="img" aria-label="writing hand">✍️</span>:</label>
            <input className="input-update" type="text" id="updateWord" value={word} onChange={handleChange}/>
            <input className="right-submit point-button" type="submit" value="Update"/>
          </form>
        </Modal>
      </>
  )
}

export default UpdateWord