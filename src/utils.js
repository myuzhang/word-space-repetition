export const getTodaysWordsNumber = () => getTodayWords().length

export const getAllWordsNumber = () => getAllWords().length

export const getAllWords = () => {
  const storageWords = localStorage.getItem('Eng:Words')
  if (!storageWords) {
    return []
  }

  const wordList = JSON.parse(storageWords)
  if (wordList.length === 0) {
    return []
  }

  return wordList
}

export const getTodayWords = () => {
  const wordList = getAllWords()

  const todayDigit = getDateInDigit()
  const todayWords = wordList.filter(word => word.date <= todayDigit)
  
  return todayWords
}

export const deleteOneWordFromLocalStorage = word => {
  const storageWords = localStorage.getItem('Eng:Words')
  if (!storageWords) {
    return
  }

  const wordList = JSON.parse(storageWords)
  if (wordList.length === 0) {
    return
  }

  const leftWords = wordList.filter(w => w.value !== word.value)
  localStorage.setItem('Eng:Words', JSON.stringify(leftWords))
}

export const saveOneWordToLocalStorage = word => {
  const storageWords = localStorage.getItem('Eng:Words')
  if (!storageWords) {
    localStorage.setItem('Eng:Words', JSON.stringify([word]))
    return
  }

  const wordList = JSON.parse(storageWords)
  if (wordList.length === 0) {
    localStorage.setItem('Eng:Words', JSON.stringify([word]))
    return
  }

  const dupWords = wordList.filter(w => w.value === word.value)
  if (dupWords.length === 0) {
    localStorage.setItem('Eng:Words', JSON.stringify([word, ...wordList]))
  }
}

export const updateWordToLocalStorage = word => {
  const wordList = getAllWords()
  const foundWord = wordList.find(w => w.id === word.id)
  if (foundWord) {
    foundWord.value = word.value
    localStorage.setItem('Eng:Words', JSON.stringify(wordList))
  }
}

export const saveWordsToLocalStorage = todayWords => {
  if (!todayWords || todayWords.length === 0) {
    return
  }

  const storageWords = localStorage.getItem('Eng:Words')
  if (!storageWords) {
    localStorage.setItem('Eng:Words', JSON.stringify(todayWords))
    return
  }

  const wordList = JSON.parse(storageWords)
  if (wordList.length === 0) {
    localStorage.setItem('Eng:Words', JSON.stringify(todayWords))
    return
  }

  const todayDigit = getDateInDigit()
  console.log(wordList);
  
  const notTodayWords = wordList.filter(word => word.date !== todayDigit)
  const updatedWords = [...todayWords, ...notTodayWords]
  localStorage.setItem('Eng:Words', JSON.stringify(updatedWords))
}

export const getDateInDigit = (shiftDays = 0) => {
  const today = new Date()
  if (shiftDays !== 0) {
    today.setDate(today.getDate() + shiftDays)
  }
  const month = today.getMonth() + 1
  let monthLeadingZero = `${month}`
  if (month < 10) {
    monthLeadingZero = `0${month}`
  }
  return parseInt(`${today.getFullYear()}${monthLeadingZero}${today.getDate()}`, 10)
}

export const getIncreaseId = () => new Date().getTime()

export const updateWordDate = (word, increase) => {
  const storageWords = localStorage.getItem('Eng:Words')
  if (!storageWords) {
    return
  }

  const wordList = JSON.parse(storageWords)
  if (wordList.length === 0) {
    return
  }

  const foundWord = wordList.find(w => w.value === word.value)
  if (foundWord) {
    if (increase) {
      if (foundWord.times <= 7) {
        foundWord.times += 1
      }
    } else {
      if (foundWord.times > 0) {
        foundWord.times -= 1
      }
    }

    foundWord.date = foundWord.times > 7 ? getDateInDigit(30) : getDateInDigit(foundWord.times)
    localStorage.setItem('Eng:Words', JSON.stringify(wordList))
  }
}

export const saveToFile = () => handleSaveToPC(getAllWords())

export const restoreFromFile = (content) => saveWordsToLocalStorage(JSON.parse(content))

export const handleSaveToPC = jsonData => {
  const fileData = JSON.stringify(jsonData)
  const blob = new Blob([fileData], {type: "text/plain"})
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = 'LeoWords.json'
  link.href = url
  link.click()
}