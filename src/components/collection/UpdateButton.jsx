import React from 'react'

export default function UpdateButton({collection, setUpdateCollection}) {

  function updateCollection() {
    if (collection.name === 'default') {
      window.confirm('⏹ You can\'t update default collection')
    } else {
      setUpdateCollection(collection)
    }
  }

  return <button title="👆Click to change collection name" onClick={updateCollection}><span role="img" aria-label="gear">✍️</span></button>
}