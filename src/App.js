import React from 'react'
import './App.css'
import Statistics from './components/statistics/Statistics'
import AddWord from './components/word/AddWord'
import AddCollection from './components/collection/AddCollection'
import ListCollection from './components/collection/ListCollection'
import Content from './components/content/Content'
import Idom from './components/idiom/idiom'

export default function App() {
  return (
    <div className="App">
      <Statistics />
      <Idom />
      <div className="item-container">
        <AddWord />
        <AddCollection />
        <ListCollection />
      </div>
      <Content />
    </div>
  );
}