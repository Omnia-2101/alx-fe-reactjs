import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
import apiData from './services/githubService'
import Greeting from './components/Greeting'
import Search from './components/Search'


function App() {



  return (
    <BrowserRouter>
        <h1>Hello world</h1>
        <Greeting />
        <Search />
        <Routes>
          {/* <Route path='' element={}/> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App
