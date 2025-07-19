import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css'

function App() {
 
  return (
    <>
   <BrowserRouter>
   <Navbar />
   <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/contact" element={<Contact />} />
   </Routes>
       <Footer /> 
   </BrowserRouter>
    </>
  )
}

export default App
