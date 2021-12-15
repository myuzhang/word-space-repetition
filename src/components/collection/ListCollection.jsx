import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import className from 'classnames'
import styles from './Collection.module.css'
import baseStyles from '../../Base.module.css'
import { getCollections, getCurrentCollection } from '../../utils'
import action from '../../store/actions'
import DeleteButton from './DeleteButton'
import Updatebutton from './UpdateButton'
import SelectCollection from './SelectCollection'

export default function ListCollection() {
  const [collections, setCollections] = useState([])
  const [currentCollection, setCurrentCollection] = useState(getCurrentCollection())
  const [updateCollection, setUpdateCollection] = useState({})
  const collectionState = useSelector(state => state.collection)
  const dispatch = useDispatch()

  useEffect(() => { 
    const collections = getCollections()
    const latestCurrent = collections.find(c => c.id === currentCollection.id)
    if (!latestCurrent) { // currentCollection was deleted, get the next available from store
      dispatch(action.chooseCollection(collections[0]))
      setCurrentCollection(collections[0])
    } else if (latestCurrent.name !== currentCollection.name) { // currentCollection was updated, update with latest
      dispatch(action.chooseCollection(latestCurrent))
      setCurrentCollection(latestCurrent)
    }
    const dropdown = collections.filter(c => c.name !== currentCollection.name)
    
    setCollections(dropdown)
  }, [collectionState, currentCollection, dispatch])

  return (
    <div className={className(styles.navDropdown, baseStyles.bigSapce)}>
      <nav id="choose-collection" role="navigation">
        <ul>
          <li>
            <div className={styles.flexSapceBetween}>
              <span className={styles.rightMargin}>Current Collection:</span>
              <span className={className(styles.rightMargin, styles.thick)}>
                <SelectCollection collection={currentCollection} updateCollection={updateCollection} setUpdateCollection={setUpdateCollection} setCurrentCollection={setCurrentCollection}/>
              </span>
              <Updatebutton collection={currentCollection} setUpdateCollection={setUpdateCollection}/>
              <DeleteButton collection={currentCollection}/>
            </div>
            <ul>
              {collections.length > 0 ? collections.map(c => 
                <li className={styles.listContainer} key={c.id}>
                  <SelectCollection collection={c} updateCollection={updateCollection} setUpdateCollection={setUpdateCollection} setCurrentCollection={setCurrentCollection}/>
                  <Updatebutton collection={c} setUpdateCollection={setUpdateCollection}/>
                  <DeleteButton collection={c}/>
                </li>
              ) : <li>Add your collection   </li>}              
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
