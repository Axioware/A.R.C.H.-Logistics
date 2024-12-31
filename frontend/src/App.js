import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Omer from './Pages/Omer';
import Moiz from './Pages/Moiz';
import Asad from './Pages/Asad';
import Rauf from './Pages/Rauf';
import Ahsan from './Pages/Ahsan';
import Login from './Pages/Authentication/Login';
import ForgotPassword from './Pages/Authentication/ForgotPassword';
import ResetPassword from './Pages/Authentication/ResetPassword';
import Otp from './Pages/Authentication/Otp';
import AllUsers from './Pages/User_Management/AllUsers';
import AllWarehouse from './Pages/Warehouses/AllWarehouse';
import AddWarehouse from './Pages/Warehouses/AddWarehouse';
import EditWarehouse from './Pages/Warehouses/EditWarehouse';
import AddLocation from './Pages/Locations/AddLocation';
import EditLocation from './Pages/Locations/EditLocation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/moiz" element={<Moiz />} />
        <Route path="/asad" element={<Asad />} />
        <Route path="/omer" element={<Omer />} />
        <Route path="/rauf" element={<Rauf />} /> 
        <Route path="/ahsan" element={<Ahsan />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/warehouses" element={<AllWarehouse />} />
        <Route path="/edit-warehouses" element={<EditWarehouse />} />
        <Route path="/add-warehouses" element={<AddWarehouse />} />
        <Route path="/add-location" element={<AddLocation />} />  
        <Route path="/edit-location" element={<EditLocation />} />      
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/users" element={<AllUsers />} />
      </Routes>
    </Router>
  );
}
export default App;