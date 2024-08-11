import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/aksamedia/" Component={Login}/>
        <Route path="/aksamedia/home/" Component={Home}/>
      </Routes>  
    </Router>
  )
}

export default App
