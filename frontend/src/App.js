import React, { useState } from "react";
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
import test from './Assets/Images/SearchIcon.png'
import test2 from './Assets/Images/user-solid.svg'


function App() {
  const [menuItems, setMenuItems] = useState([
    {
      name: "Dashboard",
      icon: test2,
      route: "/dashboard",
      expanded: false,
      subItems: [
        { name: "Sub Item 1", route: "/dashboard/sub1"},
        { name: "Sub Item 2", route: "/dashboard/sub2"},
      ],
    },
    {
      name: "Users",
      icon: test2,
      route: "/settings",
      expanded: false,
      subItems: null,
    },
    {
      name: "Orders",
      icon: test2,
      route: "/settings",
      expanded: false,
      subItems: null,
    },
    {
      name: "Settings",
      icon: test2,
      route: "",
      expanded: false,
      subItems: [
        { name: "Custom Rates", route: "/custom-rates"},
        { name: "Servies", route: "/services"},
      ],
    },
  ]);

  // Toggles the expanded state of a menu item
  const toggleExpand = (index) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item, i) =>
        i === index ? { ...item, expanded: !item.expanded } : item
      )
    );
  };
  return (
    <Router>  
      <Routes>
        {/* <Route path="/moiz" element={<Moiz />} /> */}
        <Route path="/asad" element={<Asad />} />
        <Route path="/omer" element={<Omer />} />
        <Route path="/rauf" element={<Rauf />} /> 
        <Route path="/ahsan" element={<Ahsan menuItems={menuItems} toggleExpand={toggleExpand}/>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/warehouses" element={<AllWarehouse menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/edit-warehouses" element={<EditWarehouse menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/add-warehouses" element={<AddWarehouse menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/add-location" element={<AddLocation menuItems={menuItems} toggleExpand={toggleExpand}/>} />  
        <Route path="/edit-location" element={<EditLocation menuItems={menuItems} toggleExpand={toggleExpand}/>} />      
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/users" element={<AllUsers menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/content" element={<BoxContent />} />
        <Route path="/spinner" element={<Spinner />} />
        <Route path="/add-user" element={<AddUser menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/balance-sheet" element={<BalanceSheet menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/transaction" element={<Transaction menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/invoices" element={<Invoices menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/test" element={<Forbidden />} />
        <Route path="/rates-management" element={<RatesManagement menuItems={menuItems} toggleExpand={toggleExpand}/>} />     
        <Route path="/all-items" element={<AllInventory menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/by-date-inventory" element={<ByDateInventory menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/inventory-overview" element={<CombineInventory menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/active-order" element={<ActiveOrder menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        {/* <Route path="/boxes-to-be-shipped" element={<BoxesToBeShipped />} />      */}
        {/* <Route path="/order-details" element={<OrderDetails />} /> */}
        <Route path="/order-history" element={<OrderHistory menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/view-tracking" element={<ViewTracking menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/bin" element={<Bin menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/category" element={<Category menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/service" element={<Service menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        
      </Routes>
    </Router>
  );
}
export default App;