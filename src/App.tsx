import React, { useEffect, useState } from 'react'
import './App.css'

const asciiChars =
  '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

const App = () => {
  const [encrypted, setEncrypted] = useState('')
  const [decrypted, setDecrypted] = useState('')
  const [key, setKey] = useState()

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

  const randomCypher = (input: string) => {
    const randomOffsets: number[] = []
    let encrypted = ''
    for (let i = 0; i < input.length; i++) {
      const index = asciiChars.indexOf(input[i])
      const offset = Math.floor(Math.random() * asciiChars.length)
      randomOffsets.push(offset)
      let newIndex
      if (index + offset < asciiChars.length) {
        newIndex = index + offset
      } else {
        newIndex = index + offset - asciiChars.length
      }
      const newChar = asciiChars[newIndex]
      encrypted += newChar
    }
    return {
      encrypted,
      key: randomOffsets,
    }
  }

  const randomDecypher = (input: string) => {
    let decrypted = ''
    console.log(input, key)
    for (let i = 0; i < input.length; i++) {
      const index = asciiChars.indexOf(input[i])
      const offset = key[i]
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
    const encrypted = randomCypher(newValue)
    console.log(encrypted)
    setEncrypted(encrypted.encrypted)
    setKey(encrypted.key)
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
          margin: 10,
          border: '2px dotted darkgoldenrod',
          cursor: 'pointer',
        }}
        onClick={() => randomDecypher(encrypted)}
      >
        decrypt message
      </div>
      <div>{decrypted}</div>
    </div>
  )
}

export default App
