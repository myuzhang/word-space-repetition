import React, { useState } from 'react'
import idoms from '../../data/idioms'

const Idom = () => {
  const randomIdomIndex = () => Math.floor(Math.random() * Math.floor(idoms.length))
  const [idiom, setIdiom] = useState(idoms[randomIdomIndex()])

  const handleNext = () => {
    setIdiom(idoms[randomIdomIndex()])
  }

  return (
    <div className="ribbon color">
      <button onClick={handleNext}>New Idiom</button>
      <div>
        <p className="left-text">Idiom: <span className="idiom-value">{idiom.idiom}</span></p>
        <p className="left-text">Meaning: <span className="idiom-value">{idiom.meanging}</span> 👈 used {idiom.usage}</p>
      </div>
    </div>
  )
}

export default Idom