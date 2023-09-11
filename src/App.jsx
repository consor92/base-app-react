import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './modules/Home'
import Students from './modules/Students'
import Layout from './modules/Layout'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="students" element={<Students />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
