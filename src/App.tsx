import React, { useEffect, useState } from 'react'
import './App.css'
import Message from './Message'

const asciiChars =
  '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

const App = () => {
  const [encrypted, setEncrypted] = useState('')
  const [decrypted, setDecrypted] = useState('')
  const [key, setKey] = useState()
  const [messages, setMessages] = useState()

  useEffect(() => {
    console.log(asciiChars)
  }, [])

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

  // @ts-ignore
  const randomDecypher = ({ message, key }) => {
    let decrypted = ''
    console.log(message, key)
    for (let i = 0; i < message.length; i++) {
      const index = asciiChars.indexOf(message[i])
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
    return decrypted
  }

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    const encrypted = randomCypher(newValue)
    console.log(encrypted)
    setEncrypted(encrypted.encrypted)
    setKey(encrypted.key)
  }

  const sendMessage = () => {
    const newMessage = {
      message: encrypted,
      key,
    }
    const currentMessages = messages ? [...messages] : []
    currentMessages.push(newMessage)
    setMessages(currentMessages)
    setEncrypted('')
    setKey(undefined)
  }

  console.log(messages)

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
        onClick={sendMessage}
      >
        send
      </div>
      <div>{decrypted}</div>
      {messages &&
        messages.map((m: any) => {
          console.log(m)
          return (
            // @ts-ignore
            <Message
              decypher={randomDecypher}
              message={m.message}
              key={m.message} // react list key
              decryptKey={m.key}
            />
          )
        })}
    </div>
  )
}

export default App
