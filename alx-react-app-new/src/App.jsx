import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage'
import Header from "./components/Header"
import Footer from "./components/Footer"
import MainContent from "./components/MainContent"
import UserProfile from "./components/UserProfile"
import Button from './components/Test'
import Counter from './components/Counter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Counter />
      <WelcomeMessage />
      <MainContent />
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <Button />
      <Footer />
    </>
  )
}

export default App
