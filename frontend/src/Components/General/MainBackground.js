import React, { useState, useEffect } from "react";
import NavBarWithSidebar from '../../Components/General/TopSideNavBar'; // Corrected path for NavBarWithSidebar
import AddButton from '../../Components/Table_Components/AddButton';
import Table from '../../Components/Table_Components/Table'; // Include the Table component
import Pagination from '../../Components/Table_Components/Pagination'; // Include the Pagination component
import archlogo from '../../Assets/Images/logo1.png'; // Include your logo image
import HyperLink from '../../Components/General/HyperLink'; // HyperLink Component
import FilterButton from '../../Components/Table_Components/FilterButton'; // FilterButton Component
import MainBackground from '../../Components/General/MainBackground'; // MainBackground Component

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
    <div style={{ display: "flex" }}>
      {/* Top Sidebar with Navigation */}
      <NavBarWithSidebar
        background_color={[42, 77, 107]}
        text_color={[255, 255, 255]}
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
        sidebar_background_color={[42, 77, 107]}
        sidebar_text_color={[255, 255, 255]}
        selected_color={[56, 21, 90]}
        hover_color={[70, 100, 150]}
        expanded={[false, false, false]}
        sidebar_width="250px"
        sidebar_height="100vh"
        hamburger_color={[255, 255, 255]}
      />

      {/* Main content area */}
      <div style={{ flex: 1, padding: "20px", marginLeft: "250px" }}>
        {/* HyperLink Component */}
        <HyperLink
          text="Home"
          path="/all_users"
          text_color={[255, 255, 255]}
          background_color={[19, 53, 98]}
          hover_background_color={[40, 150, 180]}
          width="25%"
          height="5%"
        />

        {/* Filter Button */}
        <FilterButton
          text="+ Filter By"
          text_color={[255, 255, 255]} // White text color
          background_color={[30, 61, 89]} // Purple background
          class_name="my-custom-class" // Optional additional class name
          function={() => alert('Filter clicked!')} // Example function
          width="10%"
          height="7%"
        />

        {/* Main Background (Container) */}
        <MainBackground
          background_color={[0, 0, 255]}
          border_color={[0, 0, 0]}
          height="300px"
          width="100%"
        >
          {/* Add Button Component */}
          <AddButton
            buttonText="Add User"
            buttonIcon="https://via.placeholder.com/20"
            buttonFunction={() => alert('Add user clicked!')} // Example function for adding a user
          />
        </MainBackground>

        {/* Table and Pagination wrapped in the same div */}
        <div style={{ marginTop: "20px" }}>
          {/* Table Component */}
          <Table
            number_of_headings={headings.length}
            headings={headings}
            heading_background={[30, 61, 89]}
            heading_color={[255, 255, 255]}
            sort_function={() => {}}
            data={data}
            loading={loading}
            success={success}
            last_column={true}
            last_column_text="Details"
            last_column_icon="https://via.placeholder.com/20" // Replace with actual icon URL
            last_column_function={() => {}}
            handleRefresh={fetchData}
          />

          {/* Pagination Component */}
          <Pagination
            current_page={currentPage}
            total_pages={totalPages}
            text_color={[0, 0, 0]}
            button_text_color={[255, 255, 255]}
            button_background_color={[34, 53, 83]}
            width="100%"
            height="50px"
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      </div>
    </div>
  );
}
