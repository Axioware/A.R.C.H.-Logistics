import React, { useState, useEffect } from "react";
import NavBarWithSidebar from '../../Components/General/TopSideNavBar';
import NavPath from '../../Components/General/NavPath';
import archlogo from '../../Assets/Images/logo1.png';
import TableContent from '../../Components/Table_Components/TableContent';
import TableTop from '../../Components/Table_Components/TableTop';
import fetchData from '../../utils/fetch_data';
import AddButton from '../../Components/Table_Components/AddButton';

export default function All_Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchUsers = async () => {
    const url = `https://api.example.com/users?page=${currentPage}`;
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
    fetchUsers();
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
    container: {
      width: "95%",
      margin: "20px 0px 0px 0px", // Center horizontally
    },
    lightGreyBackground: {
      backgroundColor: '#f7f6f6',
      padding: '20px 0px 40px 60px',
      borderRadius: '8px',
      minHeight: '10vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '95%',
      margin: '20px 0px 0px 0px',
      boxShadow: '0 5px 55px rgba(0, 0, 0, 0.1)',
    },
  };

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
          ["Management", "Add Order", "Delete Order"],
          ["Inventory", "Add Item", "Delete Item"],
        ]}
        routes={[["/ahsan", "/app3"], ["/top1", "/top2"]]}
        sidebar_width="14%"
        sidebar_height="100vh"
        toggleSidebar_func={toggleSidebar}
        isSidebarOpen_p={isSidebarOpen}
      />

      <div style={styles.mainContent}>
        <NavPath
          text={["Home", "User Management"]}
          paths={["/home", "/users"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="95%"
          height="50px"
        />

        <div style={styles.container}>
          <AddButton
            text="Add User"
            text_color={[255, 255, 255]}
            
          />
        </div>

        <div style={styles.lightGreyBackground}>
          <TableTop heading_text={'All Users'} />
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
      </div>
    </div>
  );
}
