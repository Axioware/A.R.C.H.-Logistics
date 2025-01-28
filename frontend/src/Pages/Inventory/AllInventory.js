import React, { useState, useEffect } from "react";
import NavPath from '../../Components/General/NavPath';
import TableContent from '../../Components/Table_Components/TableContent';
import TableTop from '../../Components/Table_Components/TableTop';
import fetchData from '../../utils/fetch_data';
import AddButton from '../../Components/Table_Components/AddButton';
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";

export default function All_Users() {
  const [data, setData] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", actions: "Edit/Delete" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "User", actions: "Edit/Delete" },
    { id: 3, name: "Michael Brown", email: "michael.brown@example.com", role: "Moderator", actions: "Edit/Delete" },
  ]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setclearance] = useState(1);

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  // State for filters
  const [billingType, setBillingType] = useState('All');
  const [userStatus, setUserStatus] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getData = async () => {
    const url = `https://api.example.com/users?page=${currentPage}&billingType=${billingType}&userStatus=${userStatus}`;
    const response = await fetchData(setLoading, setSuccess, url);
    if (response && response.error) {
      setErrorCode(response.error);
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

  const handleReset = () => {
    setBillingType('All');
    setUserStatus('All');
  };

  const handleApply = () => {
    console.log("Filters applied:", { billingType, userStatus });
  };

  const toggleDropdown = () => {
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
          text={["Home", "Inventory", "All Items"]}
          paths={["/home", "/users", "/all-items"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="100%"
          height="50px"
        />
        <AddButton text="All Items" text_color={[255, 255, 255]} path='/add-user' />
        <div style={mainStyles.tableBackground}>
          <TableTop
            heading_text={'All Items'}
            search_function={getData}
            filter_function={() => {}}
            sort_function={(column) => console.log(`Sorting by column: ${column}`)} // Dummy sort function
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
