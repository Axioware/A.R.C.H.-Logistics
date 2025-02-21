import React, { useState, useEffect } from "react";
import fetchData from '../utils/fetch_data';
import SideBar from '../Components/General/Sidebar';
import mainStyles from "../Assets/CSS/styles";
import EditIcon from "../Components/Icons/EditIcon";
import Dollar from "../Components/Icons/DollarIcon"
import Dash from "../Components/General/Dash"

export default function All_Users() {

  const [data, setData] = useState([{id: '1', name:'abc', email:'abc@gmail.com', role: 'client'},
    {id: '1', name:'abc', email:'abc@gmail.com', role: 'client'}]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setclearance] = useState(1);
  const [billingType, setBillingType] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [search, setSearch] = useState('');

  const [endpoint, setEndpoint] = useState('api/users/');

  useEffect(() => {
    // Construct query parameters
    const params = new URLSearchParams();
  
    if (billingType) params.append('billingType', billingType);
    if (userStatus) params.append('userStatus', userStatus);
    if (warehouse) params.append('warehouse', warehouse);
    if (search) params.append('search', search);
    if (currentPage) params.append('page', currentPage);
  
    // Set the updated endpoint
    setEndpoint(`api/users/${params.toString() ? '?' + params.toString() : ''}`);
    console.log('hello' + endpoint);
    getData();
  }, [billingType, userStatus, warehouse, search, currentPage]); // Dependencies to trigger the effect
  
  const table_function = () => {
    return data.map((row, index) => (
      <tr key={index}>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.role}</td>
        <div style={{display: "flex", flexDirection: "row"}}>
          <td style={{ display: "flex", padding: '15px 15px 15px 0px', marginLeft: "40px", justifyContent: "right"}}>
            <Dollar path={`set-rates/?id=${row.id}`}/>
          </td>
          <td style={{ display: "flex", padding: '15px 15px 15px 0px', justifyContent: "right"}}>
            <EditIcon path={`edit-user/?id=${row.id}`}/>
          </td>
        </div>
      </tr>
    ));
  };

  const table_width_function = () => {
    return (
      <colgroup>
        <col style={{ width: "10%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "30%" }} />
        <col style={{ width: "30%" }} />
        <col style={{ width: "10%" }} />  
      </colgroup>
    );
  };

  

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  // State for filters
  // const [billingType, setBillingType] = useState('All');
  // const [userStatus, setUserStatus] = useState('All');
  
  // State to toggle the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getData = async () => {
    const url = `https://api.example.com/${endpoint}`;
    const response = await fetchData(setLoading, setSuccess, url);

    if (response && response.error) {
      switch (response.error) {
        case 400:
          setErrorCode(401);
          break;
        case 401:
          setErrorCode(401);
          break;
        case 403:
          setErrorCode(403);
          break;
        case 500:
          setErrorCode(500);
          break;
        default:
          setErrorCode(response.error);
          break;
      }
    } else if (response) {
      setData(response);
      setErrorCode(null);
    }
  };

  useEffect(() => {
    // if (!mainFunctions.generalValidate()) {
      
    // } 
    // if (!mainFunctions.employeeValidate()) {

    // }
    // var data = mainFunctions.getUserData();
    // setclearance(data.clearance);
    getData();
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>

    <div>
      {clearance && (clearance === "1" || clearance === "2" || clearance === "3") ? (
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      ) : (
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      )}
      <div style={mainStyles.centerContent(isSidebarClosed)}>

      <Dash />
      </div>
    </div>
    </>
  );
}  
