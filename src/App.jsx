import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './pages/PrivateRoute';

const App = () => {
  return (
    <Router basename="/aksamedia">
      <Routes>
        <Route path="/aksamedia/" element={<Login />} />
        <Route path="/aksamedia/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;