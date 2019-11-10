import React, { useEffect, useState } from 'react'
import './App.css'

const asciiChars =
  '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

const App = () => {
  const [encrypted, setEncrypted] = useState('')
  const [decrypted, setDecrypted] = useState('')

  useEffect(() => {
    console.log(asciiChars)
  }, [])

  const cypher = (cypherInput: string) => {
    let encrypted = ''
    for (let i = 0; i < cypherInput.length; i++) {
      const index = asciiChars.indexOf(cypherInput[i])
      const offset = 5
      let newIndex
      if (index + offset < asciiChars.length) {
        newIndex = index + offset
      } else {
        newIndex = index + offset - asciiChars.length
      }
      const newChar = asciiChars[newIndex]
      encrypted += newChar
    }
    return encrypted
  }

  const decypher = (cypheredInput: string) => {
    let decrypted = ''
    for (let i = 0; i < cypheredInput.length; i++) {
      const index = asciiChars.indexOf(cypheredInput[i])
      const offset = 5
      let newIndex
      if (index >= offset) {
        newIndex = index - offset
      } else {
        newIndex = asciiChars.length - (offset - index)
      }
      const newChar = asciiChars[newIndex]
      decrypted += newChar
    }
    return setDecrypted(decrypted)
  }

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const encrypted = cypher(newValue)
    setEncrypted(encrypted)
  }

  return (
    <div style={{ padding: 20 }}>
      <input
        style={{
          padding: 10,
          backgroundColor: '#282c34',
          color: 'darkgoldenrod',
        }}
        onChange={onChangeText}
      />
      <div style={{ marginTop: 20 }}>{encrypted}</div>
      <div
        style={{
          padding: 20,
          border: '2px dotted darkgoldenrod',
          cursor: 'pointer',
        }}
        onClick={() => decypher(encrypted)}
      >
        decrypt message
      </div>
      <div>{decrypted}</div>
    </div>
  )
}

export default App
