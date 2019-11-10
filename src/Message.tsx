import React, { useState, useEffect } from 'react'

const Message: React.FC = (props: any): any => {
  const [message, setMessage] = useState(props.message)
  const [isEncrypted, setIsEncrypted] = useState(true)

  useEffect(() => {
    if (isEncrypted === false) {
      const timeout = setTimeout(() => {
        reEncrypt()
      }, 5000)
    }
  }, [isEncrypted])

  const decrypt = () => {
    console.log('decrypt')
    const decrypted = props.decypher({
      message: props.message,
      key: props.decryptKey,
    })
    setMessage(decrypted)
    setIsEncrypted(false)
  }

  const reEncrypt = () => {
    console.log('reEncrypt')
    setMessage(props.message)
    setIsEncrypted(true)
  }
  return (
    // @ts-ignore
    <div onClick={isEncrypted ? () => decrypt() : () => reEncrypt()}>
      {message}
    </div>
  )
}

export default Message
