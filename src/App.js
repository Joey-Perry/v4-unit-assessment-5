import React from 'react';
import routes from './routes';
import Nav from './Components/Nav/Nav';
import './App.css';

function App() {
  return (
    <>
      <Nav />
      { routes }
    </>
  )
};

export default App;
