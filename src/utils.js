const trackingDates = [0, 1, 2, 3, 5, 8, 13, 21]

const maxTrack = trackingDates.length

export const getTodayWordCount = () => getTodayWords().length

export const getTotalWordCount = () => getWords().length

export const getCollectionWordCount = collectionId => getWordsByCollectionId(collectionId).length

export const getCurrentCollectionWordCount = () => getWordsByCollectionId(getCurrentCollection().id).length

export const getDefaultCollection = () => ({id: 'default', name: 'default'})

export const getCurrentCollection = () => {
  const storage = get()
  return getCollectionById(storage.currentCollectionId ?? 'default')
}

export const setCurrentCollectionId = collectionId => {
  const storage = get()
  if(getCollectionById(collectionId)) {
    storage.currentCollectionId = collectionId
    save(storage)
  }
}

export const initStorage = () => addCollectionToLocalStorage(getCurrentCollection())

export const getWords = () => get().words

export const getWordsByCollectionId = collectionId =>
  getWords().filter(w => w.collectionId === collectionId)

export const getTodayWords = () => {
  const words = getWords()
  const todayDigit = getDateInDigit()
  const todayWords = words.filter(word => 
    (word.count < maxTrack && word.date + trackingDates[word.count] <= todayDigit)
    || !word.lastVisit || word.lastVisit === todayDigit)
  
  return todayWords
}

export const getTodayWordsByCollectionId = collectionId => {
  const words = getWordsByCollectionId(collectionId)
  const todayDigit = getDateInDigit()
  const todayWords = words.filter(word => 
    (word.count < maxTrack && word.date + trackingDates[word.count] <= todayDigit)
    || !word.lastVisit || word.lastVisit === todayDigit)
  
  return todayWords
}

export const getRecallWords = () => getWords().filter(w => w.count >= maxTrack)

export const getCollections = () => get().collections

export const getCollectionById = id => getCollections().find(c => c.id = id)

export const getCollectionByName = name => getCollections().find(c => c.name = name)

export const addWordToLocalStorage = word => {
  const storage = get()
  if (storage.words.length === 0) {
    storage.words = [word]
    save(storage)
    return true
  }

  const found = storage.words.find(w => w.value === word.value && w.collectionId === word.collectionId)
  if (!found) {
    storage.words.unshift(word)
    save(storage)
    return true
  }
  return false
}

export const deleteWordsFromLocalStorage = words => {
  const storage = get()
  if (storage.words.length === 0 || !words || words.length === 0) {
    return
  }
  storage.words = storage.words.filter(sw => !words.some(w => w.id === sw.id))
  save(storage)
}

export const updateWordToLocalStorage = word => {
  const storage = get()
  const { words } = storage
  const foundWord = words.find(w => w.id === word.id)
  if (foundWord) {
    const duplicatedWordInTheSameCollectionIndex = 
      words.findIndex(w => w.value === word.value && w.collectionId === word.collectionId)
    if(duplicatedWordInTheSameCollectionIndex !== -1) {
      storage.words = words.filter(w => w.id !== foundWord.id)
    } else {
      foundWord.value = word.value
      foundWord.collectionId = word.collectionId
    }
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
    storage.collections = sortCollection(storage.collections)
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
    storage.collections = [getCurrentCollection()]
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

export const moveWordsToCollection = (movingWords, targetCollectionId) => {
  if (!movingWords || movingWords.length === 0 || !targetCollectionId) {
    return
  }

  const storage = get()
  const { collections, words } = storage
  const found = collections.find(c => c.id === targetCollectionId)
  if(found) {
    storage.words = words.map(w => {      
      const foundWord = movingWords.find(mw => mw.id === w.id)
      if(foundWord) {
        foundWord.collectionId = targetCollectionId
        return foundWord
      }
      return w
    })
  }

  // dedupe merged words:
  storage.words = storage.words.filter((word, position) => 
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
    storage.collections = sortCollection(storage.collections)
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
      storage.collections.push(getCurrentCollection())
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

export const getDateInString = dateInNumber => {
  const year = `${dateInNumber}`.substring(0, 4)
  const month = `${dateInNumber}`.substring(4, 6)
  const day = `${dateInNumber}`.substring(6, 8)
  const date = new Date(`${year}-${month}-${day}`)
  return date.toDateString()
}

export const isConfirmedToday = word => {
  const storage  = get()
  const { words } = storage

  if (words.length === 0) {
    return false
  }

  const foundWord = words.find(w => w.id === word.id)
  if (!foundWord) {
    return false
  }
  
  return foundWord.date + trackingDates[foundWord.count] > getDateInDigit()
}


export const updateWordDate = (word, increase) => {
  const storage  = get()
  const { words } = storage

  if (words.length === 0) {
    return
  }

  const foundWord = words.find(w => w.id === word.id)
  if (foundWord) {
    const todayDigit = getDateInDigit()
    foundWord.lastVisit = todayDigit
    if (increase) {
      if (foundWord.count < maxTrack) {
        const newCount = foundWord.count + 1
        if (foundWord.date + trackingDates[newCount] < todayDigit) {
          foundWord.date = todayDigit
        } else {
          foundWord.count = newCount
        }
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

export const save = storage => 
  localStorage.setItem('Eng:Words', JSON.stringify(storage))

export const get = () => {
  const storageStream = localStorage.getItem('Eng:Words')
  if (!storageStream) {
    return {currentCollectionId: 'default', words:[], collections:[getDefaultCollection()]}
  }

  const storage = JSON.parse(storageStream)

  if (!storage.words) {
    storage.words = []
  }
  if (!storage.collections) {
    storage.collections = [getDefaultCollection()]
  }
  if (!storage.currentCollectionId) {
    storage.currentCollectionId = 'default'
  }
  return storage
}

export const sortCollection = collection => collection.sort((a, b) => {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
})

export const shuffleArray = shufflingArray => {
  const array = [...shufflingArray]
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}