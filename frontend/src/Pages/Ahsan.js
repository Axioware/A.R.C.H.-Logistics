import React, { useState, useEffect } from "react";
import NavBarWithSidebar from '../Components/General/TopSideNavBar';
import archlogo from '../Assets/Images/logo1.png';
import NavPath from '../Components/General/NavPath';

export default function AllUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Track sidebar state

  const totalPages = 5;

  const loadingFunction = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5;
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
      }, 2000);
    });
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

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
    container: {
      display: "flex",
      height: "100vh",
    },
    sidebar: {
      width: isSidebarOpen ? "250px" : "60px",
      transition: "width 0.25s ease",
      backgroundColor: "rgb(42, 77, 107)",
      height: "100vh",
    },
    mainContent: {
      flex: 1,
      padding: "20px",
      transition: "margin-left 0.25s ease",
      marginLeft: isSidebarOpen ? "250px" : "60px",
    },
    button: {
      marginBottom: "20px",
      padding: "10px 20px",
      backgroundColor: "#007BFF",
      color: "#FFF",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  const headings = ["Name", "Age", "City"];

  return (
    <div>
      {/* Sidebar */}
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
          sidebar_width="250px"
          sidebar_height="100vh"
          toggleSidebar_func={toggleSidebar}
          isSidebarOpen_p = {isSidebarOpen}
        />
      </div>

      {/* Main content area */}
      <div style={styles.mainContent}>

        <NavPath
          text={["Home", "User Management", "All Users"]}
          paths={["/home", "/user_management", "/all_users"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          hyperlink_size={[["10%", "55%"], ["40%", "50%"], ["4%", "4%"]]}
          width="110%"
          height="50px"
        />
      </div>
    </div>
  );
}
