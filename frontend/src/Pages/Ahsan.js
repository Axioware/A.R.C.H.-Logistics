import React, { useState, useEffect } from "react";
import NavBarWithSidebar from '../Components/General/TopSideNavBar';
import archlogo from '../Assets/Images/logo1.png';
import NavPath from '../Components/General/NavPath';
import TableContent from '../Components/Table_Components/TableContent';
import TableTop from '../Components/Table_Components/TableTop';
import fetchData from '../utils/fetch_data'
import SessionExpired from '../Components/Modals/SessionExpired';
// import Forbidden from '../Components/Error/Forbidden';
// import ServerError from '../Components/Error/ServerError';
import SideBar from '../Components/General/sidebartest';
import AddButton from '../Components/Table_Components/AddButton';
import mainStyles from "../Assets/CSS/styles";

export default function Ahsan({
}
) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const [isSidebarClosed, setIsSidebarClosed] = useState(true); // Track sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state
  const [currenturl, setCurrentUrl] = useState('https://127.0.0.1:8000/users');
  const [baseurl, setBaseUrl] = useState('https://127.0.0.1:8000/users');


  const fetchUsers = async (urls) => {
    const url = `${urls}?page=${currentPage}`;  // Example URL
    const response = await fetchData(setLoading, setSuccess, url);
    console.log(response.error)
    
    if (response && response.error) {
      switch (response.error) {
        case 400:
          // Do nothing for 400 (Bad Request)
          setErrorCode(400);
          break;
    
        case 401:
          setErrorCode(401);  // Unauthorized
          break;
    
        case 403:
          setErrorCode(403);  // Forbidden
          break;
    
        case 500:
          setErrorCode(500);  // Internal Server Error
          break;
    
        default:
          setErrorCode(response.error);  // Handle other errors (fallback)
          break;
      }
      console.error('Error fetching data:', response.message);
    } else if (response) {
      setData(response);  // Update data for successful fetch
      setErrorCode(null);  // Clear error if successful
    }
  };

  useEffect(() => {
    fetchUsers(currenturl);
  }, [currentPage]);  // Call on currentPage change


  function handleSearch(text) {
    const searchParam = `search=${encodeURIComponent(text)}`;

    if (currenturl.includes('search')) {
      console.log(currenturl);
      return 
    }
    else {
      if (currenturl.includes('?')) {
        // If URL already has query parameters, append with '&'
        setCurrentUrl(`${currenturl}&${searchParam}`);
      } else {
        // If no query parameters, start with '?'
        setCurrentUrl(`${currenturl}?${searchParam}`);
      }
      console.log(currenturl);
  }
  }

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);  // Toggle between true and false
  };

  function resetUrl() {
    setCurrentUrl(`${baseurl}`);
  }

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };



  return (
    <>
    
    <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed}/>
    <div style={mainStyles.mainContent(isSidebarClosed)}>
      
        <NavPath
              text={["Home", "User Management"]}
              paths={["/home", "/users"]}
              text_color={[255, 255, 255]}
              background_color={[23, 23, 23]}
              width="95%"
              height="50px"
        />

              <AddButton
                text="Add User"
                text_color={[255, 255, 255]}
              />
    
           
              <TableTop
                heading_text={'All Users'}
                search_function={fetchUsers}
                filter_function={() => {}}   
                // filters={(
                //   <>
                //     <button onClick={toggleDropdown}>Filter</button>
    
                //     {isDropdownOpen && (
                //       <div style={{ display: "flex", flexDirection: "column", marginTop: "10px", border: "1px solid black", backgroundColor: "white" }}>
                //         <select
                //           value={billingType}
                //           onChange={(e) => setBillingType(e.target.value)}
                //           style={{ width: "150px", height: "40px", marginBottom: "10px" }}
                //         >
                //           <option value="All">All Billing Types</option>
                //           <option value="Daily">Daily</option>
                //           <option value="Bimonthly">Bimonthly</option>
                //           <option value="Monthly">Monthly</option>
                //         </select>
    
                //         <select
                //           value={userStatus}
                //           onChange={(e) => setUserStatus(e.target.value)}
                //           style={{ width: "150px", height: "40px", marginBottom: "10px" }}
                //         >
                //           <option value="All">All User Status</option>
                //           <option value="Active">Active</option>
                //           <option value="Inactive">Inactive</option>
                //         </select>
    
                //         <button onClick={handleReset} style={{ padding: "10px", backgroundColor: "gray", color: "white" }}>Reset</button>
                //         <button onClick={handleApply} style={{ padding: "10px", backgroundColor: "green", color: "white" }}>Apply</button>
                //       </div>
                //     )}
                //   </>
                // )}
              />
    
              <TableContent
                table_headings={['ID', 'Name', 'Email', 'Role', 'Actions']}
                last_column={true}
                loading={loading}
                success={success}
                prev_button={handlePrev}
                next_button={handleNext}
                fetchData={fetchUsers}
                data={data}
                currentPage={currentPage}
                totalPages={totalPages}
              />
    </div>
  </>
  );
}
