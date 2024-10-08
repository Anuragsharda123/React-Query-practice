import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PostDetailRQ from './components/PostDetailRQ'
import PostRQ from './components/PostRQ'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<PostRQ/>} />
        <Route path='/:id' element={<PostDetailRQ/>} />
      </Routes>
    </Router>


    </>
  )
}

export default App
