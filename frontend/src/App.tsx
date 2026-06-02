// React import not required with new JSX transform
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import './App.css'

import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Notes from './pages/Notes'
import TestSeries from './pages/TestSeries'
import FreeResources from './pages/FreeResources'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Purchase from './pages/Purchase'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/tests" element={<TestSeries />} />
          <Route path="/resources" element={<FreeResources />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
