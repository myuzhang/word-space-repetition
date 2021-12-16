import React, { useState } from 'react'
import idoms from '../../data/idioms'
import styles from './Idiom.module.css'

const Idom = () => {
  const randomIdomIndex = () => Math.floor(Math.random() * Math.floor(idoms.length))
  const [idiom, setIdiom] = useState(idoms[randomIdomIndex()])
  const [idiomText, setIdiomText] = useState('Learn Idiom')
  const [isDisplay, setIsDisplay] = useState(false)

  const toggleIdiom = () => {
    if (idiomText === 'Learn Idiom') {
      setIdiomText('Close Idiom')
      setIsDisplay(true)
    } else {
      setIdiomText('Learn Idiom')
      setIsDisplay(false)
    }
  }

  const handleNext = () => {
    setIdiom(idoms[randomIdomIndex()])
  }

  return (
    <div className={styles.idiomWrapper}>
      <button className={styles.idiomButton} onClick={toggleIdiom}><strong>{idiomText}</strong></button>
      <button className={isDisplay ? styles.idiomButton : styles.hide} onClick={handleNext}><strong>New Idiom</strong></button>
      <div className={isDisplay ? styles.ribbon : styles.hide}>
        <p className={styles.idiomText}>Idiom: <span className="text-green">{idiom.idiom}</span></p>
        <p className={styles.idiomText}>Meaning: <span className="text-green">{idiom.meanging}</span> 👈 used {idiom.usage}</p>
      </div>
    </div>
  )
}

export default Idom