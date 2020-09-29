import React from 'react'
import './App.css'
import Statistic from './components/statistic'
import NewWord from './components/newWord'
import Content from './components/content'
import Idom from './components/idiom'

function App() {
  return (
    <div className="App">
      <Statistic />
      <Idom />
      <NewWord />
      <Content />
    </div>
  );
}

export default App;
