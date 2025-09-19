import React from 'react'
import Navbar from './componetse/Navbar'
import Footer from './componetse/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Createnote from './pages/Createnote'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      <Navbar/>

      <main className='flex-grow container mx-auto p-4'>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Createnote />} />
      </Routes>
      </main>


      <Footer/>
    </div>
  )
}

export default App