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
import AddUser from './Pages/User_Management/AddUser';
import EditLocation from './Pages/Locations/EditLocation';
import BoxContent from './Components/General/BoxContent';
import Spinner from "./Components/General/Spinner";


import BalanceSheet from './Pages/Balance_Sheet/BalanceSheet';
import Transaction from './Pages/Balance_Sheet/Transaction';
import Invoices from './Pages/Balance_Sheet/Invoices';
import Forbidden from './Components/Error_Components/Forbidden';
import RatesManagement from './Pages/Custom_Rates/RatesManagement';
import AllInventory from './Pages/Inventory/AllInventory';
import ByDateInventory from './Pages/Inventory/ByDateInventory';
import CombineInventory from './Pages/Inventory/CombineInventory';
import ActiveOrder from './Pages/Order/ActiveOrder';
import BoxesToBeShipped from './Pages/Order/BoxesToBeShipped';
import OrderDetails from './Pages/Order/OrderDetails';
import OrderHistory from './Pages/Order/OrderHistory';
import ViewTracking from './Pages/Order/ViewTracking';
import Bin from './Pages/Setting/Bin';
import Category from './Pages/Setting/Category';
import Service from './Pages/Setting/Service';


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
        <Route path="/content" element={<BoxContent />} />
        <Route path="/spinner" element={<Spinner />} />
        <Route path="/add-user" element={<AddUser />} />


        <Route path="/balance-sheet" element={<BalanceSheet />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/test" element={<Forbidden />} />
        <Route path="/rates-management" element={<RatesManagement />} />     
        <Route path="/all-items" element={<AllInventory />} />
        <Route path="/by-date-inventory" element={<ByDateInventory />} />
        <Route path="/inventory-overview" element={<CombineInventory />} />
        <Route path="/active-order" element={<ActiveOrder />} />
        <Route path="/boxes-to-be-shipped" element={<BoxesToBeShipped />} />     
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/view-tracking" element={<ViewTracking />} />
        <Route path="/bin" element={<Bin />} />
        <Route path="/category" element={<Category />} />
        <Route path="/service" element={<Service />} />
        
      </Routes>
    </Router>
  );
}
export default App;