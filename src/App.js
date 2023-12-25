import React from 'react';
import './App.css';
import Header from './components/Header/headerComponent';
import Home from './components/Home/Home'
import Subreddits from './components/Subreddits/Subreddits';

function App() {
  return (
    <>
      <Header />
      <main>
        <Home />
      </main>
      <aside>
        <Subreddits />
      </aside>
    </>
  );
}

export default App;
