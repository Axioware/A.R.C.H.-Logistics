import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavPath from '../../Components/General/NavPath';
import TableContent from '../../Components/Table_Components/TableContent';
import TableTop from '../../Components/Table_Components/TableTop';
import fetchData from '../../utils/fetch_data';
import AddButton from '../../Components/Table_Components/AddButton';
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import FilterOptionsTransaction from "../../Components/Filter/FilterOptionsTransaction"
// import React, { useState, useEffect } from "react";
// import { useLocation } from 'react-router-dom';
// import NavPath from '../../Components/General/NavPath';
// import TableContent from '../../Components/Table_Components/TableContent';
// import AddButton from '../../Components/Table_Components/AddButton';
// import SideBar from '../../Components/General/Sidebar';
// import mainStyles from "../../Assets/CSS/styles";
import EditIcon from '../../Components/Icons/EditIcon';
import PageHeading from '../../Components/Table_Components/PageHeading';
import SearchBar from '../../Components/Table_Components/SearchBar';
import FilterButton from '../../Components/Table_Components/FilterButton';
import FilterOptionsUserManagement from '../../Components/Filter/FilterOptionUserManagement';
import Pagination from '../../Components/Table_Components/Pagination';
import Dollar from "../../Components/Icons/DollarIcon";
// import LargeModal from "../../Components/Modals/SuccessModal";
import { FaTrash } from "react-icons/fa";


export default function All_Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setclearance] = useState(1);
  const BASE_URL = `http://${process.env.REACT_APP_TENANT_NAME}/users/api/users/`;
  const [warehouses, setWarehouses] = useState('');
   const [search, setSearch] = useState('');
    const [modalData, setModalData] = useState({ isOpen: false, title: "", content: "" });
  

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const tdStyle = {
    maxWidth: "150px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    padding: "15px"
  };

  const table_function = () => {
    return data.map((row, index) => (
      <tr key={index}>
        <td style={tdStyle} title={row.id}>{row.id}</td>
        <td style={tdStyle} title={row.username}>{row.username}</td>
        <td style={tdStyle} title={row.first_name}>{row.first_name}</td>
        <td style={tdStyle} title={row.last_name}>{row.last_name}</td>
        <td style={tdStyle} title={row.email}>{row.email}</td>
        <td style={tdStyle} title={row.phone}>{row.phone}</td>
        <td style={tdStyle} title={row.state}>{row.state}</td>
        <td style={tdStyle} title={row.city}>{row.city}</td>
        <td style={tdStyle} title={row.zip}>{row.zip}</td>
        <td style={tdStyle} title={row.address}>{row.address}</td>
        <td style={tdStyle} title={row.llc_name}>{row.llc_name}</td>
        <td style={tdStyle} title={row.billing_type}>{row.billing_type}</td>
        <td style={tdStyle} title={row.role}>{row.role}</td>
        <td style={{ display: "flex", justifyContent: "flex-end", gap: "10px", padding: "15px" }}>
          <Dollar path={`set-rates/?id=${row.id}`} />
          <EditIcon path={`add-user/${row.id}`} />
          <FaTrash
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleDelete(row.id, index)}
          />
        </td>
      </tr>
    ));
  };

  const table_width_function = () => {
      return (
        <colgroup>
          <col style={{ width: "3%" }} />   {/* ID */}
          <col style={{ width: "7%" }} />   {/* Username */}
          <col style={{ width: "7%" }} />   {/* First Name */}
          <col style={{ width: "7%" }} />   {/* Last Name */}
          <col style={{ width: "10%" }} />  {/* Email */}
          <col style={{ width: "7%" }} />   {/* Phone */}
          <col style={{ width: "7%" }} />   {/* State */}
          <col style={{ width: "7%" }} />   {/* City */}
          <col style={{ width: "5%" }} />   {/* ZIP */}
          <col style={{ width: "7%" }} />   {/* Address */}
          <col style={{ width: "7%" }} />   {/* LLC Name */}
          <col style={{ width: "7%" }} />   {/* Billing Type */}
          <col style={{ width: "7%" }} />   {/* Role */}
          <col style={{ width: "7%" }} />   {/* Actions */}
        </colgroup>
      );
    };
  

  const [billingType, setBillingType] = useState('All');
  const [userStatus, setUserStatus] = useState('All');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();

  const getData = async () => {
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

  const handleDelete = async (userId, index) => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${BASE_URL}${userId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        setData(prevData => prevData.filter((_, i) => i !== index));
        setModalData({
          isOpen: true,
          title: "Success",
          content: userId ? "User Deleted Successfully! :)" : "User Deleted successfully! :)",
        });
      } else {
        setModalData({
          isOpen: true,
          title: "Failed",
          content: userId ? "Error deleting user" : "Error deleting user",
        });
      }
    } catch (error) {
      setModalData({
        isOpen: true,
        title: "Failed",
        content: userId ? "Error deleting user" : "Error deleting user",
      });
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

  const handleReset = () => {
    setBillingType('All');
    setUserStatus('All');
  };

  const handleApply = () => {
    console.log("Filters applied:", { billingType, userStatus });
  };

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
          text={["Home",  "Transaction"]}
          paths={["/home", "/transaction"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="100%"
          height="50px"
        />

        <div style={mainStyles.tableBackground}>
          <div style={styles.buttonContainer}>
            <AddButton
                         text="Transaction"
                         text_color={[255, 255, 255]}  
                         path='/transaction'
                         background_color="black"     
                       />
                       <AddButton
                         text="Invoice"
                         text_color={[0, 0, 0]}       
                         path='/invoices'
                         background_color="white"    
                       />
                     
          </div>

          <div style={mainStyles.tableTopContainer}>
              <PageHeading text={'All Users'} width="auto" />
              <div style={mainStyles.rowContainer}>
                <FilterButton
                  text="+ Filter By"
                  content={
                    <FilterOptionsUserManagement 
                      setbill={setBillingType} 
                      setware={setWarehouses} 
                      billing={billingType} 
                      ware={warehouses}
                    />
                  }
                />
                <SearchBar hint="Search..." setSearch={setSearch} width="300px" height="53px" />
              </div>
            </div>
            <div style={{ overflowX: "auto", width: "100%" }}>
              <div style={{ minWidth: "1500px" }}>
                <TableContent
                  table_headings={[
                    'ID', 'Username', 'First Name', 'Last Name', 'Email',
                    'Phone', 'State', 'City', 'ZIP', 'Address', 'LLC Name', 'Billing Type', 'Role', 'Actions'
                  ]}
                  last_column={true}
                  loading={loading}
                  success={success}
                  prev_button={handlePrev}
                  next_button={handleNext}
                  fetchData={getData}
                  data={data}
                  table_width_function={table_width_function}
                  table_function={table_function}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </div>
            </div>
            <Pagination
              current_page={currentPage || 0}
              total_pages={totalPages || 0}
              success={true}
              onNext={handleNext}
              onPrev={handlePrev}
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
    justifyContent: 'flex-start', // Align buttons to the left
    width: '100%',              // Ensure it takes up the full available width
  },
};

const addButtonStyles = {
  addButton: {
    color: 'white', 
    backgroundColor: 'black', 
    width: 'auto',
    height: 'auto',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '1rem',
    textAlign: 'center',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.1)',
  },
  addButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: 'black',
    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
  },
};
