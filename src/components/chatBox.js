import React, { useState } from 'react'

const goToRoom = (history, roomId) => {
  history.push(`/${roomId}`)
}

const list = [
  {
    senderId: 'me',
    message: 'Hello there'
  },
  {
    senderId: 'remote',
    message: 'Hey there'
  },
  {
    senderId: 'me',
    message: 'What is popping'
  },
  {
    senderId: 'remote',
    message: 'Nothing much'
  },
]


export function ChatBox({peer}) {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState(list)

  return (
  <div className="chatbox">
    <ul>
      {
        messageList.map(({senderId, message}, idx) => <li style={{color: senderId === 'me' ? 'greenyellow' : 'purple', marginLeft: senderId !== 'me' ? 'auto' : ''}} key={idx}>{message}</li>)
      }
    </ul>
    <form>
      <input type="text" value={message} placeholder="Enter message" onChange={(event) => {
        setMessage(event.target.value)
      }}/>
      <button onClick={(e) => {
        e.preventDefault()
        setMessage('')
        console.log(message)
      }}>Enter</button>
    </form>
  </div>)
}