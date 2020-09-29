import React from 'react'
import idoms from '../data/idioms'

const Idom = () => {
  const randomIdomIndex = Math.floor(Math.random() * Math.floor(idoms.length))

  return (
    <div className="ribbon color">
      <p className="left-text">Idom: <span className="idiom-value">{idoms[randomIdomIndex].idiom}</span></p>
      <p className="left-text">Meaning: <span className="idiom-value">{idoms[randomIdomIndex].meanging}</span> 👈 used {idoms[randomIdomIndex].usage}</p>
  </div>
  )
}

export default Idom