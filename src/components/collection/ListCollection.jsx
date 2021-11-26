import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import className from 'classnames'
import styles from './Collection.module.css'
import baseStyles from '../../Base.module.css'
import { getCollections } from '../../utils'
import DeleteButton from './DeleteButton'
import Updatebutton from './UpdateButton'
import SelectCollection from './SelectCollection'

export default function ListCollection() {
  const [collections, setCollections] = useState([])
  const [currentCollection, setCurrentCollection] = useState('default')
  const [updateCollection, setUpdateCollection] = useState({})
  const collectionState = useSelector(state => state.collection)

  useEffect(() => { 
    const collections = getCollections()
    const dropdown = collections.filter(c => c.name !== currentCollection)
    setCollections(dropdown)
  }, [collectionState, currentCollection])

  return (
    <div className={className(styles.navDropdown, baseStyles.bigSapce)}>
      <nav id="choose-collection" role="navigation">
        <ul>
          <li>Current Collection: <b>{currentCollection}</b>
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
