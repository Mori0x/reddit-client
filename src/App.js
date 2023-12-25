import React from 'react';
import './App.css';
import Header from './components/Header/headerComponent';
import Home from './components/Home/Home'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
