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
import FilterOptionsInventory from "../../Components/Filter/FilterOptionsInventory"
import Pagination from '../../Components/Table_Components/Pagination';
import Dollar from "../../Components/Icons/DollarIcon";
import LargeModal from "../../Components/Modals/SuccessModal";
import { FaTrash } from "react-icons/fa";

const roleClearanceMap = {
  1: "Manager",
  2: "VA",
  3: "Prep-Team",
  4: "Client"
};


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
  const [modalData, setModalData] = useState({ isOpen: false, title: "", content: "" });

  const BASE_URL = `http://${process.env.REACT_APP_TENANT_NAME}/users/api/users/`;
  const [endpoint, setEndpoint] = useState(BASE_URL);
  const location = useLocation();

  // Consolidated useEffect: build endpoint and call getData once.
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
    getData(newEndpoint);
  }, [location.pathname, billingType, warehouses, search, currentPage, clearanceLevel]);

  // Table row mapping with inline truncation style.
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

  // DELETE handler.
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

  // Adjust colgroup to match the columns.
  const table_width_function = () => {
    return (
      <colgroup>
        <col style={{ width: "23%" }} />   {/* ID */}
        <col style={{ width: "23%" }} />   {/* Username */}
        <col style={{ width: "23%" }} />   {/* First Name */}
        <col style={{ width: "23%" }} />   {/* Last Name */}
        <col style={{ width: "8%" }} />  {/* Email */}
      </colgroup>
    );
  };

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch data function.
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

      if (res.status === 403) {
        setModalData({
          isOpen: true,
          title: "Access Denied",
          content: "You do not have permission to access this resource.",
        });
        setErrorCode(403);
        return;
      }

      const response = await res.json();

      if (res.ok && response.results) {
        const formattedData = response.results.map(user => ({
          ...user,
          role: roleClearanceMap[user.clearance_level] || "", 
        }));

        setData(formattedData);
        setTotalPages(Math.ceil(response.count / 10));
      } else {
        setErrorCode(res.status);
      }
    } catch (error) {
      setModalData({
        isOpen: true,
        title: "Failed",
        content:  "Error Fetching Data",
      });
      setErrorCode(500);
    } finally {
      setLoading(false);
    }
  };

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

  // Inline truncation style with padding.
  const tdStyle = {
    maxWidth: "150px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    padding: "15px"
  };

  return (
    <>
      <div>
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
        <div style={mainStyles.centerContent(isSidebarClosed)}>
          <NavPath text={["Home", "All inventory"]} paths={["/home", "/all-inventory"]} />
          
          
          <AddButton 
          text="Add Inventory" 
          path='/add-inventorys' 
          width="130px"
          />
          <div style={mainStyles.tableBackground}>
            <div style={mainStyles.tableTopContainer}>
              <PageHeading text={'All Inventory'} width="auto" />
              <div style={mainStyles.rowContainer}>
                <FilterButton
                  text="+ Filter By"
                  content={
                    <FilterOptionsInventory
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
                  table_headings={['ID', 'Name', 'Email', 'Role', '']}
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
        {modalData.isOpen && (
        <LargeModal
          isOpen={modalData.isOpen}
          title={modalData.title}
          content={modalData.content}
          onClose={() => setModalData({ isOpen: false, title: "", content: "" })}
          onSave={() => setModalData({ isOpen: false, title: "", content: "" })}
        />
      )}
      </div>
    </>
  );
}
