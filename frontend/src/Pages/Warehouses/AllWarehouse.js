import React, { useState, useEffect } from "react";
import NavBarWithSidebar from '../../Components/General/TopSideNavBar';
import NavPath from '../../Components/General/NavPath';
import AddButton from '../../Components/Table_Components/AddButton';
import archlogo from '../../Assets/Images/logo1.png';
import TableContent from '../../Components/Table_Components/TableContent';
import TableTop from '../../Components/Table_Components/TableTop';

export default function AllUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    mainContent: {
      flex: 1,
      padding: "10px",
      transition: "margin-left 0.5s ease",
      marginLeft: isSidebarOpen ? "18%" : "4%",
    },
  };

  const headings = ["Name", "Age", "City"];

  return (
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
          ["Inventory", "Add Item", "Delete Item"],
          ["Management", "Add Order", "Delete Order"],
        ]}
        routes={[["/ahsan", "/app3"], ["/top1", "/top2"]]}
        sidebar_width="14%"
        sidebar_height="100vh"
        toggleSidebar_func={toggleSidebar}
        isSidebarOpen_p={isSidebarOpen}
      />

      {/* Main content area */}
      <div style={styles.mainContent}>
        <NavPath
          text={["Home","Setting","WareHouses"]}
          paths={["/home", "/users"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="95%"
          height="50px"
        />


        <TableTop />

        <TableContent 
            tableheadings = {['llc name', 'first_name']}
            loading={true}
            success={false}
            last_column={true}
        />
      </div>
    </div>
  );
}
