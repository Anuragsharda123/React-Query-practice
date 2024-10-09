import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PostDetailRQ from './components/PostDetailRQ'
import PostRQ from './components/PostRQ'
import PaginatedQueries from './components/PaginatedQueries'
import InfiniteQueries from './components/InfiniteQueries'
import PostsRQ from './components/PostsRQ'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<PostRQ/>} />
        <Route path='/rq-posts' element={<PostsRQ/>} />
        <Route path='/:id' element={<PostDetailRQ/>} />
        <Route path='/paginated-fruits' element={<PaginatedQueries/>} />
        <Route path='/infinite-fruits' element={<InfiniteQueries/>} />
      </Routes>
    </Router>


    </>
  )
}

export default App
