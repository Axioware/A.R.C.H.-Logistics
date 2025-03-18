import React, { useState, useEffect } from "react";
import NavPath from '../../Components/General/NavPath';
import TableContent from '../../Components/Table_Components/TableContent';
import TableTop from '../../Components/Table_Components/TableTop';
import fetchData from '../../utils/fetch_data';
import AddButton from '../../Components/Table_Components/AddButton';
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import filterOptionUser from "../../Components/Filter/FilterOptionUserManagement";
import { FaTrash } from "react-icons/fa";
import LargeModal from "../../Components/Modals/SuccessModal";
import EditIcon from '../../Components/Icons/EditIcon';

export default function All_Locations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setClearance] = useState(1);
  const [modalData, setModalData] = useState({ isOpen: false, title: "", content: "" });

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const token = localStorage.getItem("access_token");

  const getData = async () => {
    const url = `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/locations/?page=${currentPage}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setLoading(true);
    try {
      if (!response.ok) {
        setErrorCode(response.status);
        setSuccess(false);
      } else {
        const json = await response.json();
        console.log("Fetched data from API:", json);
        const formatted = (json.results || json).map(loc => ({
          id: loc.location_id,
          name: loc.location_name,
          type: loc.location_type,
          warehouse: loc.warehouse_name || (loc.warehouse?.warehouse_name ?? "N/A"),
        }));
        console.log("Formatted data:", formatted);
        setData(formatted);
        setTotalPages(json.total_pages || 1);
        setSuccess(true);
        setErrorCode(null);
      }
    } catch (err) {
      console.error("Error fetching locations:", err);
      setErrorCode(500);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, index) => {
    const url = `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/locations/${id}/`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setData(prevData => prevData.filter((_, i) => i !== index));
      setModalData({
        isOpen: true,
        title: "Success",
        content: `Location with ID ${id} deleted successfully! :)`,
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

  const renderTableRows = () => {
    return data.map((row, index) => (
      <tr key={index}>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.type}</td>
        <td>{row.warehouse}</td>
        <td>
        <EditIcon path={`add-location/${row.id}`} />
            <FaTrash
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDelete(row.id, index)}
            />
          </td>
      </tr>
    ));
  };
  const getTableWidth = () => {
    // return (
    //   <colgroup>
    //     <col style={{ width: "7%" }} />
    //     <col style={{ width: "9%" }} />
    //     <col style={{ width: "11%" }} />
    //     <col style={{ width: "7%" }} />
    //   </colgroup>
    // );
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
          text={["Home", "All Location"]}
          paths={["/home", "/locations"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="100%"
          height="50px"
        />

        <AddButton
          text="Add Location"
          text_color={[255, 255, 255]}
          path='/add-location'
        />

        <div style={mainStyles.tableBackground}>
          <TableTop
            heading_text={'All Location'}
            search_function={getData}
            filter_function={() => {}}   
            content={filterOptionUser}
          />

          <TableContent
            table_headings={['ID', 'Name', 'Type', 'Warehouse', 'Actions']}
            last_column={true}
            loading={loading}
            success={success}
            prev_button={handlePrev}
            next_button={handleNext}
            fetchData={getData}
            data={data}
            currentPage={currentPage}
            totalPages={totalPages}
            table_function={renderTableRows}
            table_width_function={getTableWidth}      
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
