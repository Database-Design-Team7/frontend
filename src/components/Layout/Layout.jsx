import { useState } from 'react'
import Header from './Header'
import './Layout.css'

function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="app">
      <Header isLoggedIn={isLoggedIn} />
      <main className="main-content">
        {children}
        asdasd
      </main>
    </div>
  )
}

export default Layout

