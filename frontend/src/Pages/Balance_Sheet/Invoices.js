import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavPath from '../../Components/General/NavPath';
import TableContent from '../../Components/Table_Components/TableContent';
import TableTop from '../../Components/Table_Components/TableTop';
import fetchData from '../../utils/fetch_data';
import AddButton from '../../Components/Table_Components/AddButton';
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import FilterOptionsInvoices from "../../Components/Filter/FilterOptionsInvoices";

export default function All_Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setClearance] = useState(1);

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  // State for filters
  const [billingType, setBillingType] = useState('All');
  const [userStatus, setUserStatus] = useState('All');
  
  // State to toggle the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get the current location from react-router
  const location = useLocation();

  const getData = async () => {
    const url = `https://api.example.com/users?page=${currentPage}&billingType=${billingType}&userStatus=${userStatus}`;
    const response = await fetchData(setLoading, setSuccess, url);

    if (response && response.error) {
      switch (response.error) {
        case 400:
          setErrorCode(400);
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

  return (
    <div>
      {clearance && (clearance === "1" || clearance === "2" || clearance === "3") ? (
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      ) : (
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      )}
      <div style={mainStyles.centerContent(isSidebarClosed)}>
        <NavPath
          text={["Home", "Balance Sheet", "Invoice"]}
          paths={["/home", "/balance-sheet", "/invoices"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="100%"
          height="50px"
        />

        <div style={mainStyles.tableBackground}>
          <div style={styles.buttonContainer}>
            <AddButton
              text="Transaction"
              text_color={[255, 255, 255]}  // White text color
              path='/transaction'
              // background_color="black"     // Black background color
              style={addButtonStyles.addButton}
            />
            <AddButton
              text="Invoice"
              text_color={[0, 0, 0]}       // Black text color
              path='/invoices'
              background_color="white"     // White background color
              style={addButtonStyles.addButton}
            />
          </div>

          <TableTop
            heading_text={'Invoices'}
            search_function={getData}
            filter_function={() => {}}   
            content={FilterOptionsInvoices}
          />

          <TableContent
            table_headings={['Invoice ID', 'LLC Name', 'Amount', 'Date Created', 'Payment Date', 'Actions']}
            last_column={true}
            loading={loading}
            success={success}
            prev_button={handlePrev}
            next_button={handleNext}
            fetchData={getData}
            data={data}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}

// CSS Styles
const styles = {
  buttonContainer: {
    display: 'flex',            // Align children horizontally
    gap: '10px',                // Add spacing between buttons
    marginBottom: '20px',       // Optional margin for spacing
    // justifyContent: 'flex-start', // Align buttons to the left
    width: '100%',              // Ensure it takes up the full available width
  },
};

// Add the CSS for the AddButton component
const addButtonStyles = {
  addButton: {
    color: 'white', // default text color
    backgroundColor: 'black', // default background color
    width: 'auto',
    height: 'auto',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1rem',
    textAlign: 'center',
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // boxSizing: 'border-box',
    // transition: 'all 0.3s ease',
    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)',
    
  },
  addButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: 'black',
    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
  },
};
