import React from 'react'
import { useDispatch } from 'react-redux';
import action from '../../store/actions'
import UpdateCollection from './UpdateCollection'
import {setCurrentCollectionById} from '../../utils';

export default function SelectCollection({collection, updateCollection, setUpdateCollection, setCurrentCollection}) {
  const dispatch = useDispatch()

  function selectCollection() {
    setCurrentCollectionById(collection.id)
    setCurrentCollection({...collection})
    dispatch(action.chooseCollection(collection))
  }

  return (
    <>
    {collection.id && updateCollection.id && collection.id === updateCollection.id ? 
      <UpdateCollection collection={collection} setUpdateCollection={setUpdateCollection}/> : 
      <div onClick={selectCollection}>{collection.name}</div>}
    </>
  )

}