import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import NavPath from '../../Components/General/NavPath';
import TableContent from '../../Components/Table_Components/TableContent';
import AddButton from '../../Components/Table_Components/AddButton';
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import EditIcon from '../../Components/Icons/EditIcon';
import PageHeading from '../../Components/Table_Components/PageHeading';
import SearchBar from '../../Components/Table_Components/SearchBar';
import FilterButton from '../../Components/Table_Components/FilterButton';
import FilterOptionsUserManagement from '../../Components/Filter/FilterOptionUserManagement';
import Pagination from '../../Components/Table_Components/Pagination';
import Dollar from "../../Components/Icons/DollarIcon"
import { FaTrash } from "react-icons/fa";
// import mainStyles from "../../Assets/CSS/styles";

export default function All_Users() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorCode, setErrorCode] = useState(null);
  const [clearanceLevel, setClearanceLevel] = useState('');
  const [billingType, setBillingType] = useState('');
  const [warehouses, setWarehouses] = useState('');
  const [search, setSearch] = useState('');

  const BASE_URL = `http://${process.env.REACT_APP_TENANT_NAME}/users/api/users/`;
  const [endpoint, setEndpoint] = useState(BASE_URL);
  const location = useLocation();

  // Build the endpoint: Always include page, filters only on Users page.
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage) params.append('page', currentPage);
    if (location.pathname === "/users") {
      if (clearanceLevel) params.append('clearance_level', clearanceLevel);
      if (billingType) params.append('billing_type', billingType);
      if (warehouses) params.append('warehouses', warehouses);
      if (search) params.append('search', search);
    }
    const queryString = params.toString() ? `?${params.toString()}` : "";
    const newEndpoint = `${BASE_URL}${queryString}`;
    setEndpoint(newEndpoint);
    console.log('Updated endpoint:', newEndpoint);
    getData(newEndpoint);
  }, [location.pathname, billingType, warehouses, search, currentPage, clearanceLevel]);

  // Map all fields except is_active
  const table_function = () => {
    return data.map((row, index) => (
      <tr key={index}>
        <td>{row.id}</td>
        <td>{row.username}</td>
        <td>{row.first_name}</td>
        <td>{row.last_name}</td>
        <td>{row.email}</td>
        <td>{row.tax_id}</td>
        <td>{row.phone}</td>
        <td>{row.state}</td>
        <td>{row.city}</td>
        <td>{row.zip}</td>
        <td>{row.clearance_level}</td>
        <td>{row.last_logout}</td>
        <td>{row.date_created}</td>
        <td>{row.email2}</td>
        <td>{row.address}</td>
        <td>{row.llc_name}</td>
        <td>{row.billing_type}</td>
        <td>{Array.isArray(row.warehouses) ? row.warehouses.join(", ") : row.warehouses}</td>
        <td style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <Dollar path={`set-rates/?id=${row.id}`} />
          <EditIcon path={`edit-user/?id=${row.id}`} />
        </td>
        <td>{row.role}</td>
        <div style={{display: "flex", flexDirection: "row"}}>
          <td style={{ display: "flex", padding: '15px 15px 15px 0px', marginLeft: "40px", justifyContent: "right"}}>
            <Dollar path={`set-rates/?id=${row.id}`}/>
          </td>
          <td style={{ display: "flex", padding: '15px 15px 15px 0px', justifyContent: "right"}}>
            <EditIcon path={`edit-user/?id=${row.id}`}/>
          </td>
          <td  style={{ display: "flex", padding: '20px 15px 15px 0px', justifyContent: "right"}}>
            <FaTrash style={{ ...styles.deleteIcon, margin: "0 auto" }} onClick={() => handleDelete(index)} />
           </td>
        </div>
      </tr>
    ));
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  // Adjust colgroup to match the new columns (19 columns: 18 data columns + 1 for actions)
  const table_width_function = () => {
    return (
      <colgroup>
        <col style={{ width: "3%" }} />   {/* ID */}
        <col style={{ width: "7%" }} />   {/* Username */}
        <col style={{ width: "7%" }} />   {/* First Name */}
        <col style={{ width: "7%" }} />   {/* Last Name */}
        <col style={{ width: "10%" }} />  {/* Email */}
        <col style={{ width: "5%" }} />   {/* Tax ID */}
        <col style={{ width: "7%" }} />   {/* Phone */}
        <col style={{ width: "7%" }} />   {/* State */}
        <col style={{ width: "7%" }} />   {/* City */}
        <col style={{ width: "5%" }} />   {/* ZIP */}
        <col style={{ width: "5%" }} />   {/* Clearance */}
        <col style={{ width: "7%" }} />   {/* Last Logout */}
        <col style={{ width: "7%" }} />   {/* Date Created */}
        <col style={{ width: "7%" }} />   {/* Email2 */}
        <col style={{ width: "7%" }} />   {/* Address */}
        <col style={{ width: "7%" }} />   {/* LLC Name */}
        <col style={{ width: "7%" }} />   {/* Billing Type */}
        <col style={{ width: "7%" }} />   {/* Warehouses */}
        <col style={{ width: "5%" }} />   {/* Actions */}
        <col style={{ width: "10%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "30%" }} />
        <col style={{ width: "28%" }} />
        <col style={{ width: "12%" }} />  
      </colgroup>
    );
  };

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch data from the API and update totalPages.
  const getData = async (url) => {
    setLoading(true);
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const response = await res.json();
      if (!res.ok) {
        switch (res.status) {
          case 400: setErrorCode(400); break;
          case 401: setErrorCode(401); break;
          case 403: setErrorCode(403); break;
          case 500: setErrorCode(500); break;
          default: setErrorCode(res.status); break;
        }
      } else if (response) {
        if (response.results) {
          setData(response.results);
          const pageSize = 10;
          setTotalPages(Math.ceil(response.count / pageSize));
        } else {
          setData(response);
        }
        setErrorCode(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorCode(500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(endpoint);
  }, [currentPage, endpoint]);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <>
      <div>
        {clearanceLevel && ([1, 2, 3].includes(Number(clearanceLevel))) ? (
          <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
        ) : (
          <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
        )}
        <div style={mainStyles.centerContent(isSidebarClosed)}>
          <NavPath text={["Home", "User Management"]} paths={["/home", "/users"]} />
          <AddButton text="Add User" path='/add-user' />
          <div style={mainStyles.tableBackground}>
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
                'ID', 'Username', 'First Name', 'Last Name', 'Email', 'Tax ID', 
                'Phone', 'State', 'City', 'ZIP', 'Clearance', 'Last Logout', 
                'Date Created', 'Email2', 'Address', 'LLC Name', 'Billing Type', 'Warehouses', 'Actions'
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
    </>
  );
}  


const styles = {
  td: {
    // padding: '20px',
    // textAlign: 'center'
  },
  deleteIcon: {
    color: 'red',
    cursor: 'pointer'
  }
};

