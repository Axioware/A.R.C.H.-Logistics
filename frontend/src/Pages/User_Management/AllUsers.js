import React, { useState, useEffect } from "react";
import NavBarWithSidebar from '../../Components/General/TopSideNavBar';
import NavPath from '../../Components/General/NavPath';
import archlogo from '../../Assets/Images/logo1.png';
import TableContent from '../../Components/Table_Components/TableContent';
import TableTop from '../../Components/Table_Components/TableTop';
import fetchData from '../../utils/fetch_data';
import AddButton from '../../Components/Table_Components/AddButton';
import SideBar from '../../Components/General/sidebartest';
import mainStyles from "../../Assets/CSS/styles";

export default function All_Users() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");

    // If it's null, default to true; otherwise, parse it as a boolean
    return storedState === null ? true : JSON.parse(storedState);
  });

  // State for filters
  const [billingType, setBillingType] = useState('All');
  const [userStatus, setUserStatus] = useState('All');
  
  // State to toggle the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchUsers = async () => {
    const url = `https://api.example.com/users?page=${currentPage}&billingType=${billingType}&userStatus=${userStatus}`;
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
  }, [currentPage, billingType, userStatus]);

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

  // Handle Reset and Apply for filters
  const handleReset = () => {
    setBillingType('All');
    setUserStatus('All');
  };

  const handleApply = () => {
    console.log("Filters applied:", { billingType, userStatus });
  };

  // Toggle dropdown visibility on filter button click
  const toggleDropdown = () => {
    console.log("Dropdown toggled");
    setIsDropdownOpen(!isDropdownOpen);
  };

  const styles = {
    mainContent: {
    },
    container: {
      width: "100%",
      margin: "20px 0px 0px 0px",
    },
  };

  return (
    <div>
      <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed}/>
      <div style={mainStyles.mainContent(isSidebarClosed)}>
      <div style={styles.mainContent}>
        <NavPath
          text={["Home", "User Management"]}
          paths={["/home", "/users"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="100%"
          height="50px"
        />

        <div style={styles.container}>
          <AddButton
            text="Add User"
            text_color={[255, 255, 255]}
          />
        </div>

        <div style={mainStyles.tableBackground}>
          <TableTop
            heading_text={'All Users'}
            search_function={fetchUsers}
            filter_function={() => {}}   
            filters={(
              <>
                <button onClick={toggleDropdown}>Filter</button>

                {isDropdownOpen && (
                  <div style={{ display: "flex", flexDirection: "column", marginTop: "10px", border: "1px solid black", backgroundColor: "white" }}>
                    <select
                      value={billingType}
                      onChange={(e) => setBillingType(e.target.value)}
                      style={{ width: "150px", height: "40px", marginBottom: "10px" }}
                    >
                      <option value="All">All Billing Types</option>
                      <option value="Daily">Daily</option>
                      <option value="Bimonthly">Bimonthly</option>
                      <option value="Monthly">Monthly</option>
                    </select>

                    <select
                      value={userStatus}
                      onChange={(e) => setUserStatus(e.target.value)}
                      style={{ width: "150px", height: "40px", marginBottom: "10px" }}
                    >
                      <option value="All">All User Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>

                    <button onClick={handleReset} style={{ padding: "10px", backgroundColor: "gray", color: "white" }}>Reset</button>
                    <button onClick={handleApply} style={{ padding: "10px", backgroundColor: "green", color: "white" }}>Apply</button>
                  </div>
                )}
              </>
            )}
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
      </div>
      </div>
    </div>
  );
}  
