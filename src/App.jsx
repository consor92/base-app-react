import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './modules/Home'
import Students from './modules/Students'
import Layout from './modules/Layout'
import NotFound from './modules/NotFound'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="students" element={<Students />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
