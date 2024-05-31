import React, { useEffect, useState } from 'react'

export function ChatBox({peer, remoteMessage}) {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message) return
    setMessageList(prev => [...prev, {senderId: 'me', message}])
    peer.send(message)
    setMessage('')
  }

  useEffect(() => {
    const messages = [...messageList, {senderId: 'remote', message: remoteMessage}]
    setMessageList(messages)
  }, [remoteMessage])

  return (
  <div className="chatbox">
    <ul>
      {
        messageList
        .map(({senderId, message}, idx) => (
          <li 
            style={{
              color: senderId === 'me' ? 'greenyellow' : 'purple', 
              marginLeft: senderId !== 'me' ? 'auto' : ''}} 
              key={idx}
            >
            {message}
          </li>))
      }
    </ul>
    <form onSubmit={handleSubmit}>
      <input type="text" value={message} placeholder="Enter message" onChange={(event) => {
        setMessage(event.target.value)
      }}/>
      <button type='submit'>Enter</button>
    </form>
  </div>)
}