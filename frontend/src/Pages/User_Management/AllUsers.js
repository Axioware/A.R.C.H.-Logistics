import React, { useState, useEffect } from "react";
import NavBarWithSidebar from '../../Components/General/TopSideNavBar'; // Corrected path for NavBarWithSidebar
import AddButton from '../../Components/Table_Components/AddButton';
import Table from '../../Components/Table_Components/Table'; // Include the Table component
import Pagination from '../../Components/Table_Components/Pagination'; // Include the Pagination component
import archlogo from '../../Assets/Images/logo1.png'; // Include your logo image
import NavPath from '../../Components/General/NavPath';  // Import NavPath component
import MainBackground from '../../Components/General/MainBackground';
import TableContent from '../../Components/Table_Components/TableContent';
import PageHeading from '../../Components/Table_Components/PageHeading';
import TableTop from '../../Components/Table_Components/TableTop';



export default function AllUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 5; // Example total pages for pagination

  // Simulate API request to fetch user data
  const loadingFunction = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; // Simulate random success or failure
        if (success) {
          resolve([
            { Name: 'Alice', Age: 25, City: 'New York' },
            { Name: 'Bob', Age: 30, City: 'Los Angeles' },
            { Name: 'Charlie', Age: 22, City: 'Chicago' },
            { Name: 'David', Age: 28, City: 'San Francisco' },
            { Name: 'Eva', Age: 26, City: 'Boston' },
          ]);
        } else {
          reject('Failed to load data');
        }
      }, 2000); // Simulate 2-second delay
    });
  };

  useEffect(() => {
    fetchData(); // Initial data load
  }, [currentPage]); // Trigger data load when the page changes

  // Function to fetch data
  const fetchData = () => {
    setLoading(true);
    loadingFunction()
      .then((data) => {
        setData(data);
        setSuccess(true);
      })
      .catch(() => {
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle Next and Prev buttons for pagination
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

  const headings = ['Name', 'Age', 'City'];

  return (
    // <MainBackground
    //   background_color={[34, 255, 255]} // Set background color as white
    //   border_color={[200, 200, 200]} // Light gray border color
    //   height="100%"
    //   width="100%"
    // />,
      <div style={{ display: "flex" }}>
        {/* Top Sidebar with Navigation */}
        <NavBarWithSidebar
          background_color={[23, 23, 23]}
          text_color={[230, 230, 230]}
          logo={archlogo}
          company_name="A.R.C.H Labs"
          company_name_color={[255, 255, 255]}
          username="Owner"
          username_color={[255, 255, 255]}
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
          routes={[['/app2', '/app3'], ['/top1', '/top2']]}
          sidebar_background_color={[23, 23, 23]}
          sidebar_text_color={[230, 230, 230]}
          selected_color={[230, 230, 230]}
          hover_color={[230, 230, 230]}
          expanded={[false, false, false]}
          sidebar_width="250px"
          sidebar_height="100vh"
          hamburger_color={[255, 255, 255]}
        />

      

        {/* Main content area */}
        <div style={{ flex: 1, padding: "20px", marginLeft: "250px" }}>
          {/* NavPath Component for Breadcrumb */}
          <NavPath
            text={['Home', 'User Management', 'All Users']}
            paths={['/home', '/user_management', '/all_users']}
            text_color={[255, 255, 255]}
            background_color={[23, 23, 23]}
            hyperlink_size={[['10%', '55%'], ['40%', '50%'], ['4%', '4%']]}
            width="110%"
            height="50px"
          />

          {/* Add Button Component
          // <AddButton 
          //   text="Add User"
          //   path="https://via.placeholder.com/20"
          //   buttonFunction={() => alert('Add user clicked!')} // Example function for adding a user
          //   width="13%"
          //   height="47px"
          //   text_color={[255, 255, 255]}
          // /> */}


          <div>

            <PageHeading
        text="All User"
        text_color={[255, 255, 255]} // White text color
        sidebar_color={[30, 61, 89]} // Sidebar color
        width="60%" // Adjust width as needed
        height="100px" // Adjust height as needed
      />

          <TableTop
           />

          {/* Add TableContent */}
          <TableContent
           />

          </div>  
        </div>
          
      </div>
      
  );
}
