import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Omer from './Pages/Omer';
import Moiz from './Pages/Moiz';
import Asad from './Pages/Asad';
import Login from './Pages/Authentication/Login';
import ForgotPassword from './Pages/Authentication/ForgotPassword';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/moiz" element={<Moiz />} />
        <Route path="/asad" element={<Asad />} />
        <Route path="/omer" element={<Omer />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> 
      </Routes>
    </Router>
  );
}
export default App;