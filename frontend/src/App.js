import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//Dummy Pages
import Omer from './Pages/Omer';
import Moiz from './Pages/Moiz';
import Asad from './Pages/Asad';
import Rauf from './Pages/Rauf';
import Ahsan from './Pages/Ahsan';

import Dashboard from './Pages/Dashboard';

//User Authentication
import Login from './Pages/Authentication/Login';
import ForgotPassword from './Pages/Authentication/ForgotPassword';
import ResetPassword from './Pages/Authentication/ResetPassword';
import Otp from './Pages/Authentication/Otp';

//User Management
import AllUsers from './Pages/User_Management/AllUsers';
import AddUser from './Pages/User_Management/AddUser';
import EditUser from './Pages/User_Management/EditUser';

//Warehouse Management
import AllWarehouse from './Pages/Warehouses/AllWarehouse';
import AddWarehouse from './Pages/Warehouses/AddWarehouse';
import EditWarehouse from './Pages/Warehouses/EditWarehouse';

//Location Management
import AddLocation from './Pages/Locations/AddLocation';
import AddLocation2 from './Pages/Locations/AddLocation2';
import EditLocation from './Pages/Locations/EditLocation';
import AllLocation from './Pages/Locations/AllLocation';

//Components
import Spinner from "./Components/General/Spinner";

//Payment Management
import BalanceSheet from './Pages/Balance_Sheet/BalanceSheet';
import Transaction from './Pages/Balance_Sheet/Transaction';
import Invoices from './Pages/Balance_Sheet/Invoices';
import InvoicesDetails from './Pages/Balance_Sheet/Invoicedetails';
import RatesManagement from './Pages/Custom_Rates/RatesManagement';

//Modals
import Forbidden from './Components/Error_Components/Forbidden';

//Inventory
import AllInventory from './Pages/Inventory/AllInventory';
import AddInventory from "./Pages/Inventory/AddInventory";
import AddInventorys from "./Pages/Inventory/AddInventorys";
import ByDateInventory from './Pages/Inventory/ByDateInventory';
import CombineInventory from './Pages/Inventory/CombineInventory';


//Orders
import ActiveOrder from './Pages/Order/ActiveOrder';
import PendingOrder from './Pages/Order/PendingOrder';
import OrderHistory from './Pages/Order/OrderHistory';
import OrderDetails from './Pages/Order/OrderDetails';
import AddDimension from './Pages/Order/AddDimension';
import AddOrder from './Pages/Order/AddOrder';

//Settings

import Category from './Pages/Setting/Category';
import Service from './Pages/Services/Service';
import AddService from './Pages/Services/AddService';
import Printers from './Pages/Setting/Printers';
import LabelFormat from './Pages/Setting/LabelFormat';

import SetRates from "./Pages/User_Management/SetRates";
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
    <>
    {/* <GlobalStyles /> */}
    <Router>  
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Dummy Pages */}
        <Route path="/moiz" element={<Moiz />} />
        <Route path="/asad" element={<Asad />} />
        <Route path="/omer" element={<Omer />} />
        <Route path="/rauf" element={<Rauf />} /> 
        <Route path="/ahsan" element={<Ahsan menuItems={menuItems} toggleExpand={toggleExpand}/>} />

        <Route path="/home" element={<Dashboard />} /> 

        {/* User Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Warehouse Management */}
        <Route path="/warehouses" element={<AllWarehouse menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/edit-warehouses" element={<EditWarehouse menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/add-warehouses" element={<AddWarehouse menuItems={menuItems} toggleExpand={toggleExpand}/>} />

        {/* Location Management */}
        <Route path="/add-location" element={<AddLocation menuItems={menuItems} toggleExpand={toggleExpand}/>} />  
        <Route path="/add-location2" element={<AddLocation2 menuItems={menuItems} toggleExpand={toggleExpand}/>} />  
        <Route path="/edit-location" element={<EditLocation menuItems={menuItems} toggleExpand={toggleExpand}/>} /> 
        <Route path="/locations" element={<AllLocation menuItems={menuItems} toggleExpand={toggleExpand}/>} />     
        
        {/* User_Management */}
        <Route path="/users" element={<AllUsers menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/add-user" element={<AddUser menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/edit-user" element={<EditUser menuItems={menuItems} toggleExpand={toggleExpand}/>} />

        {/* Components */}
        <Route path="/spinner" element={<Spinner />} />
        
        {/* Payment Section */}
        <Route path="/balance-sheets" element={<BalanceSheet menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/transactions" element={<Transaction menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/invoices" element={<Invoices menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/invoice-details" element={<InvoicesDetails menuItems={menuItems} toggleExpand={toggleExpand}/>} />

        {/* Settings */}
        <Route path="/custom-rates" element={<RatesManagement menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/services" element={<Service menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/add-service" element={<AddService menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/printers" element={<Printers menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/label-format" element={<LabelFormat menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        {/* <Route path="/category" element={<Category menuItems={menuItems} toggleExpand={toggleExpand}/>} /> */}
        <Route path="/set-rates" element={<SetRates menuItems={menuItems} toggleExpand={toggleExpand}/>} />

        {/* Modals */}
        <Route path="/test" element={<Forbidden />} />

        {/* Inventory  */}
        <Route path="/all-inventory" element={<AllInventory menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/add-inventory" element={<AddInventory menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/add-inventorys" element={<AddInventorys menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        {/* <Route path="/by-date-inventory" element={<ByDateInventory menuItems={menuItems} toggleExpand={toggleExpand}/>} /> */}
        {/* <Route path="/inventory-overview" element={<CombineInventory menuItems={menuItems} toggleExpand={toggleExpand}/>} /> */}


        {/* Orders */}
        <Route path="/active-order" element={<ActiveOrder menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/pending-order" element={<PendingOrder menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/completed-orders" element={<OrderHistory menuItems={menuItems} toggleExpand={toggleExpand}/>} />
        <Route path="/order-details" element={<OrderDetails />} />
        <Route path="/add-dimension" element={<AddDimension />} />
        <Route path="/add-order" element={<AddOrder />} />
        {/* <Route path="/boxes-to-be-shipped" element={<BoxesToBeShipped />} />      */}
        {/* <Route path="/view-tracking" element={<ViewTracking menuItems={menuItems} toggleExpand={toggleExpand}/>} /> */}

        
      </Routes>
    </Router>
    </>
  );
}
export default App;