import React, { useState } from 'react'
import idoms from '../../data/idioms'

const Idom = () => {
  const randomIdomIndex = () => Math.floor(Math.random() * Math.floor(idoms.length))
  const [idiom, setIdiom] = useState(idoms[randomIdomIndex()])

  const handleNext = () => {
    setIdiom(idoms[randomIdomIndex()])
  }

  return (
    <div className="ribbon">
      <button onClick={handleNext}><strong>New</strong></button>
      <div>
        <p className="left-text">Idiom: <span className="text-green">{idiom.idiom}</span></p>
        <p className="left-text">Meaning: <span className="text-green">{idiom.meanging}</span> 👈 used {idiom.usage}</p>
      </div>
    </div>
  )
}

export default Idom