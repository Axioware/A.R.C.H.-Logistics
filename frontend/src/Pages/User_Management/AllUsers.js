import React, { useState, useEffect } from "react";
import NavBarWithSidebar from '../../Components/General/TopSideNavBar';
import NavPath from '../../Components/General/NavPath';
import archlogo from '../../Assets/Images/logo1.png';
import TableContent from '../../Components/Table_Components/TableContent';
import TableTop from '../../Components/Table_Components/TableTop';
import fetchData from '../../utils/fetch_data'
import AddButton from '../../Components/Table_Components/AddButton';
// import PageHeading from '../../Components/Table_Components/PageHeading';
// import SessionExpired from '../../Components/Modals/SessionExpired';

export default function All_Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state

  const fetchUsers = async () => {
    const url = `https://api.example.com/users?page=${currentPage}`;  // Example URL
    const response = await fetchData(setLoading, setSuccess, url);
    console.log(response.error)
    
    if (response && response.error) {
      switch (response.error) {
        case 400:
          // Do nothing for 400 (Bad Request)
          setErrorCode(401);
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
    fetchUsers();
  }, [currentPage]);  // Call on currentPage change

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

  const styles = {
    mainContent: {
      flex: 1,
      padding: "10px",
      transition: "margin-left 0.5s ease",
      marginLeft: isSidebarOpen ? "18%" : "4%",
    },
    lightGreyBackground: {
      backgroundColor: '#f7f6f6',  // Light grey color
      padding: '20px 0px 40px 60px',
      borderRadius: '8px',  // Rounded corners
      minHeight: '10vh',  // Ensure the div takes up at least a small height
      display: 'flex',  // Make sure the div is a flex container
      flexDirection: 'column', // Stack child elements vertically
      justifyContent: 'center', // Center content vertically
      alignItems: 'center', // Center content horizontally
      width: '95%',  // Match width to NavPath
      margin: '20px 0px 0px 0px',  // Center horizontally and add spacing
      boxShadow: '0 5px 55px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow for better visuals
    
    },
  };
  

  return (
      /* Sidebar */
    <div>
      <NavBarWithSidebar
        text_color={[255, 255, 255]}
        logo={archlogo}
        company_name="A.R.C.H Labs"
        username="Owner"
        icons={[
          "https://via.placeholder.com/20",
          "https://via.placeholder.com/20",
          "https://via.placeholder.com/20",
        ]}
        names={[
          ["User Management", "All User", "Add User"],
          ["Management", "Add Order", "Delete Order"],
          ["Inventory", "Add Item", "Delete Item"],
        ]}
        routes={[["/ahsan", "/app3"], ["/top1", "/top2"]]}
        sidebar_width="14%"
        sidebar_height="100vh"
        toggleSidebar_func={toggleSidebar}
        isSidebarOpen_p = {isSidebarOpen}
      />
     
      {/* Main content area */}
      <div style={styles.mainContent}>
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
          

          <div style={styles.lightGreyBackground}>
  <TableTop heading_text={'All Users'} />
  <TableContent
    table_headings={['abd', 'hello', 'hello', 'bye', 'what', 'the', 'hell', 'is', 'wrong', 'with', 'me', 'world']}
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


        
       
      </div>
      {/* {errorCode === 401 && <SessionExpired
          heading_text="Session Expired"
          body_text="Your session has expired. Please log in again."
          button_text="Login"
          button_function={() => console.log("Logging in...")}
      />} */}
      </div>
  );
}



 {/* <TableTop 
          heading_text={'All Users'} 
          />

        <TableContent 
        table_headings = {['abd', 'hello', 'hello', 'bye', 'what', 'the', 'hell', 'is', 'wrong', 'with', 'me', 'world']}
        last_column = {true}
        loading={loading}
        success={success}
        prev_button={handlePrev}
        next_button={handleNext}
        fetchData={fetchUsers}
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
         /> */}
