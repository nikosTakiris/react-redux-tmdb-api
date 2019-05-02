import React from 'react';
import Header from './components/Header';
import Search from './components/Search';
import './App.scss';


function App() {
  return (
    <div className="App">
    <Header />
    <div className="main">
    <Search />

    </div>
    </div>
  );
}

export default App;
