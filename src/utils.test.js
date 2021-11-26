import { mergeWordsToLocalStorage, get, save } from './utils';

const storage = {
  words: [
    {id:"c-word",collectionId:"collection",value:"c-word",count:0,date:1},
    {id:"d-word",collectionId:"default",value:"d-word",count:0,date:2}
  ],
  collections:[
    {id:"collection",name:"collection"},
    {id:"default",name:"default"}]
  }

const mergeCollections = {
  collections: [
    {id:"merge",name:"merge"},
    {id: 'default', name: 'default'}
  ]
}

const mergeWords = {
  words: [
    {id:"c-word",collectionId:"collection-merge",value:"c-word",count:0,date:3},
    {id:"c-word-merge",collectionId:"collection-merge",value:"c-word-merge",count:0,date:4},
    {id:"n-word",collectionId:"new",value:"n-word",count:0,date:5},
    {id:"d-word",collectionId:"default",value:"d-word",count:0,date:6},
  ],
  collections: [
    {id:"collection-merge",name:"collection"},
    {id:"new",name:"new"},
    {id: 'default', name: 'default'}
  ]
}

test('storage', () => {
  save(storage)
  const Fromstorage = get()
  expect(JSON.stringify(Fromstorage)).toBe(JSON.stringify(storage))
  
});

test('merge collections', () => {
  save(storage)
  mergeWordsToLocalStorage(mergeCollections)
  const mergedStore = get()
  expect(mergedStore.collections.length).toBe(3)
});

test('merge words', () => {
  save(storage)
  mergeWordsToLocalStorage(mergeWords)
  const mergedStore = get()
  expect(mergedStore.words.length).toBe(4)
});

test('merge into empty', () => {
  mergeWordsToLocalStorage(mergeWords)
  const mergedStore = get()
  expect(mergedStore.collections.length).toBe(3)
  expect(mergedStore.words.length).toBe(4)
});