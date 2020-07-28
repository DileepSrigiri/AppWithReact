import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState('')

  const [usersList, setUsersList] = useState([])

  const fetchMessage = async () => {
    // Use Fetch API to fetch '/api' endpoint
    const message = await fetch('/api')
      .then(res => res.text()) // process incoming data
    // Update welcomeMessage state
    setWelcomeMessage(message)
  }

  useEffect(() => {
    fetchMessage()
  }, [])

  // Create async function for fetching users list
  const fetchUsers = async () => {
    const users = await fetch('/users/all')
      .then(res => res.json()) // Process the incoming data
    // Update usersList state
    setUsersList(users)
  }

  return (
    <div className="app">
      <header className="app-header">
        {/* Display welcome message */}
        <p>{welcomeMessage}</p>
        {/* Button to fetch users data */}
        <button onClick={fetchUsers}>Fetch users</button>
        {/* Display table of users after fetching users data */}
        {usersList.length > 0 && <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>}
      </header>
    </div>
  )
}

export default App;
