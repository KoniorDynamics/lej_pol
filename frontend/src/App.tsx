import React from 'react';
import logo from './logo.svg';
import './App.css';
import Wrapper from "./components/web-wrapper/web-wrapper";

function App() {
  return (
    <Wrapper app={(() => {
      return (
          <div>Zajebiście</div>
      )
    })()}></Wrapper>
  );
}

export default App;
