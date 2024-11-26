import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Omer from './pages/Omer';
import Moiz from './pages/Moiz';
import Asad from './pages/Asad';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/moiz" element={<Moiz />} />
        <Route path="/asad" element={<Asad />} />
        <Route path="/omer" element={<Omer />} /> 
      </Routes>
    </Router>
  );
}
export default App;