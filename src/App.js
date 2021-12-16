import React from 'react'
import './App.css'
import Statistics from './components/statistics/Statistics'
import AddWord from './components/word/AddWord'
import AddCollection from './components/collection/AddCollection'
import ListCollection from './components/collection/ListCollection'
import Content from './components/content/Content'
import Idom from './components/idiom/idiom'
import styles from './App.module.css'
import baseStyles from './Base.module.css'

export default function App() {
  return (
    <div className={styles.appContainer}>
      <Statistics />
      <div className={baseStyles.scrollThenSticky}>
        <div className={styles.fourColumns}>
          <Idom />
          <AddWord />
          <AddCollection />
          <ListCollection />
        </div>
        <Content />
      </div>
    </div>
  );
}