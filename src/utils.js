export const getTodayWordCount = () => getTodayWords().length

export const getTotalWordCount = () => getWords().length

export const getCollectionWordCount = collectionId => getWordsByCollectionId(collectionId).length

export const getDefaultCollection = () => ({id: 'default', name: 'default'})

export const initStorage = () => addCollectionToLocalStorage(getDefaultCollection())

export const getWords = () => get().words

export const getWordsByCollectionId = collectionId =>
  getWords().filter(w => w.collectionId === collectionId)

export const getTodayWords = () => {
  const words = getWords()
  const todayDigit = getDateInDigit()
  const todayWords = words.filter(word => word.date <= todayDigit)
  
  return todayWords
}

export const getCollections = () => get().collections

export const addWordToLocalStorage = word => {
  const storage = get()
  if (storage.words.length === 0) {
    storage.words = [word]
    save(storage)
    return true
  }

  const found = storage.words.find(w => w.id === word.id)
  if (!found) {
    storage.words.unshift(word)
    save(storage)
    return true
  }
  return false
}

export const deleteWordFromLocalStorage = word => {
  const storage = get()
  if (storage.words.length === 0) {
    return
  }
console.log(word);

  storage.words = storage.words.filter(w => w.id !== word.id)
  save(storage)
}

export const updateWordToLocalStorage = word => {
  const storage = get()
  const { words } = storage
  const foundWord = words.find(w => w.id === word.id)
  if (foundWord) {
    foundWord.value = word.value
    foundWord.collectionId = word.collectionId
    save(storage)
  }
}

export const mergeWordsToLocalStorage = merge => {
  if (!merge) {
    return
  }

  const storage = get()
  let { collections, words } = storage
  let { collections: mergeCollections, words: mergeWords } = merge

  // merge collection by name
  if (mergeCollections && mergeCollections.length !== 0) {
    if (collections.length !== 0) {
      mergeCollections.forEach(mc => {
        const found = collections.find(c => c.name === mc.name)
        if (found) {
          if (mergeWords && mergeWords.length !== 0) {
            mergeWords = mergeWords.map(mw => {
              if (mw.collectionId === mc.id) {
                mw.collectionId = found.id
              }
              return mw
            })
          }
        }
        if (!found) {
          collections.push(mc)
        }
      })
    } else {
      storage.collections = mergeCollections
    }
    // always set default collection at the last position:
    const defaultCollection = storage.collections.find(c => c.name === 'default')
    storage.collections = storage.collections.filter(c => c.name !== 'default')
    storage.collections.push(defaultCollection)
  }

  // merge words
  if (mergeWords && mergeWords.length !== 0) {
    if (words.length !== 0) {
      mergeWords.forEach(mw => {
        const found = words.find(w => w.value === mw.value && w.collectionId === mw.collectionId)
        if (!found) {
          words.push(mw)
        }
      })
    } else {
      storage.words = mergeWords
    }
  }

  save(storage)
}

export const moveWordsFromCollectionToDefault = collection => {
  const storage = get()
  if (storage.collections.length === 0) {
    storage.collections = [getDefaultCollection()]
  }
  const { words } = storage
  if (words.length !== 0) {
    words.forEach(w => {
      if (w.collectionId === collection.id) {
        w.collectionId = 'default'
      }
    })
  }
  // dedupe merged words:
  storage.words = words.filter((word, position) => 
    words.findIndex(w => w.value === word.value && w.colleciontId === word.colleciontId) === position)

  save(storage)
}

export const addCollectionToLocalStorage = collection => {
  let storage = get()
  if (storage.collections.length === 0) {
    storage.collections = [collection]
    save(storage)
    return true
  }

  const found = storage.collections.find(c => c.name === collection.name)
  if (!found) {
    storage.collections.unshift(collection)
    save(storage)
    return true
  }
  return false
}

export const deleteCollectionFromLocalStorage = collection => {
  let storage = get()
  if (storage.collections.length === 0) {
    return
  }

  let needDefault = false
  storage.collections = storage.collections.filter(c => c.id !== collection.id)
  if (storage.words.length !== 0) {
    storage.words = storage.words.map(w => {
      if (w.collectionId === collection.id) {
        w.collectionId = 'default'
        needDefault = true
      }
      return w
    })
  }

  if (needDefault) {
    const found = storage.collections.find(c => c.id === 'default')
    if (!found) {
      storage.collections.push(getDefaultCollection())
    }
  }
  save(storage)
}

export const updateCollectionToLocalStorage = collection => {
  let storage = get()
  if (storage.collections.length === 0) {
    return
  }
  const { collections } = storage
  let found = false
  for (const i in collections) {
    if (collections[i].id === collection.id) {
       collections[i].name = collection.name;
       found = true
       break;
    }
  }

  if (!found) {
    return
  }

  save(storage)
}

export const getCollectionsFromLocalStorage = () => {
  const storage = get()
  if (storage.collections.length === 0) {
    return []
  }

  return storage.collections
}

export const getDateInDigit = (shiftDays = 0) => {
  const today = new Date()
  if (shiftDays !== 0) {
    today.setDate(today.getDate() + shiftDays)
  }
  const month = today.getMonth() + 1
  const date = today.getDate()
  let monthLeadingZero = `${month}`
  let dateLeadingZero = `${date}`
  if (month < 10) {
    monthLeadingZero = `0${month}`
  }
  if (date < 10) {
    dateLeadingZero = `0${date}`
  }
  return parseInt(`${today.getFullYear()}${monthLeadingZero}${dateLeadingZero}`, 10)
}

export const updateWordDate = (word, increase) => {
  const storage  = get()
  const { words } = storage

  if (words.length === 0) {
    return
  }

  const foundWord = words.find(w => w.value === word.value)
  foundWord.date = foundWord.count > 7 ? getDateInDigit(45) : getDateInDigit(foundWord.count)
  if (foundWord) {
    if (increase) {
      if (foundWord.count <= 7) {
        foundWord.count += 1
      }
    } else {
      if (foundWord.count > 0) {
        foundWord.count -= 1
      }
    }
    save(storage)
  }
}

export const saveToFile = () => {
  const fileData = JSON.stringify(get())
  const blob = new Blob([fileData], {type: "text/plain"})
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = 'MyWords.json'
  link.href = url
  link.click()
}

export const restoreFromFile = (content) => mergeWordsToLocalStorage(JSON.parse(content))

export function save(wordList) {
  localStorage.setItem('Eng:Words', JSON.stringify(wordList))
}

export function get() {
  const storageStream = localStorage.getItem('Eng:Words')
  if (!storageStream) {
    return {words:[], collections:[]}
  }

  const storage = JSON.parse(storageStream)

  if (!storage.words) {
    storage.words = []
  }
  if (!storage.collections) {
    storage.collections = []
  }
  return storage
}