import React from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const firstName: string = 'Samuel'
  const age: number = 25

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          The value <u>{firstName}</u> is of type:{' '}
          <code>{typeof firstName}</code>
        </p>
        <p>
          The value <u>{age}</u> is of type: <code>{typeof age}</code>
        </p>
      </header>
    </div>
  )
}

export default App
