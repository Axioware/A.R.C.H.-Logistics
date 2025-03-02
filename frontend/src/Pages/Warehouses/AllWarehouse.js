import React, { useState, useEffect } from "react";
import NavPath from '../../Components/General/NavPath';
import TableContent from '../../Components/Table_Components/TableContent';
import TableTop from '../../Components/Table_Components/TableTop';
import fetchData from '../../utils/fetch_data';
import AddButton from '../../Components/Table_Components/AddButton';
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import { useLocation } from 'react-router-dom';
import filterOptionUser from "../../Components/Filter/FilterOptionUserManagement"
import LargeModal from "../../Components/Modals/SuccessModal";
import { FaTrash } from "react-icons/fa";
import EditIcon from '../../Components/Icons/EditIcon';

export default function AllWarehouse() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [search, setSearch] = useState('');
  const [modalData, setModalData] = useState({ isOpen: false, title: "", content: "" });

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });
  
  const BASE_URL = `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/warehouse/`;
  const [endpoint, setEndpoint] = useState(BASE_URL);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams();
      if (currentPage) params.append('page', currentPage);
      if (location.pathname === "/warehouse" && search) {
        params.append('search', search);
      }
      const queryString = params.toString() ? `?${params.toString()}` : "";
      const newEndpoint = `${BASE_URL}${queryString}`;
      setEndpoint(newEndpoint);
      await getData(newEndpoint); // Safe async call
    };
  
    fetchData();
  }, [location.pathname, search, currentPage]);

    const table_function = () => {
      return data.map((row, index) => (
        <tr key={index}>
          <td style={tdStyle} title={row.warehouse_id}>{row.warehouse_id}</td>
          <td style={tdStyle} title={row.warehouse_name}>{row.warehouse_name}</td>
          <td style={tdStyle} title={row.address}>{row.address}</td>
          <td style={tdStyle} title={row.city}>{row.city}</td>
          <td style={tdStyle} title={row.state}>{row.state}</td>
          <td style={tdStyle} title={row.country}>{row.country}</td>
          <td style={tdStyle} title={row.zip_code}>{row.zip_code}</td>
          <td style={tdStyle} title={row.phone}>{row.phone}</td>
          <td style={tdStyle} title={row.email}>{row.email}</td>
          <td style={{ display: "flex", justifyContent: "flex-end", gap: "10px", padding: "15px" }}>
            <EditIcon path={`add-warehouses/${row.warehouse_id}`} />
            <FaTrash
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(row.warehouse_id, index)}
            />
          </td>
        </tr>
      ));
    };

  // DELETE handler.
  const handleDelete = async (warehouseId, index) => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(`${BASE_URL}${warehouseId}/`, {
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
          content: warehouseId ? "Warehouse Deleted Successfully! :)" : "Warehouse Deleted successfully! :)",
        });
      } else {
        setModalData({
          isOpen: true,
          title: "Failed",
          content: warehouseId ? "Error deleting Warehouse" : "Error deleting Warehouse",
        });
      }
    } catch (error) {
      setModalData({
        isOpen: true,
        title: "Failed",
        content: warehouseId ? "Error deleting Warehouse" : "Error deleting Warehouse",
      });
    }
  };

  // Adjust colgroup to match the columns.
  const table_width_function = () => {
    return (
      <colgroup>
        <col style={{ width: "3%" }} />   
        <col style={{ width: "10%" }} />   
        <col style={{ width: "13%" }} />  
        <col style={{ width: "6%" }} />   
        <col style={{ width: "9%" }} />  
        <col style={{ width: "6%" }} />   
        <col style={{ width: "7%" }} />   
        <col style={{ width: "9%" }} />  
        <col style={{ width: "11%" }} /> 
        <col style={{ width: "7%" }} />   
      </colgroup>
    );
  };

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
        setData(response.results);
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
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const tdStyle = {
    maxWidth: "150px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    padding: "15px"
  };

  return (
    <div>
      <SideBar isSidebarClosed={isSidebarClosed} setIsSidebarClosed={setIsSidebarClosed} />
    <div style={mainStyles.centerContent(isSidebarClosed)}>

        <NavPath
          text={["Home", "All Warehouses"]}
          paths={["/home", "/warehouses"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="100%"
          height="50px"
        />

        <AddButton
          text="Add Warehouse"
          text_color={[255, 255, 255]}
          path='/add-warehouse'
          width="auto"
        />

        <div style={mainStyles.tableBackground}>
          <TableTop
            heading_text={'All Warehouse'}
            search_function={(query) => setSearch(query)}
            // filter_function={() => {}}   
            content={filterOptionUser}
          />

          <TableContent
            table_headings={['ID', 'Name', 'Address', 'City', 'State', 'Country', 'Zip Code', 'Phone', 'Email']}
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
  );
}  
