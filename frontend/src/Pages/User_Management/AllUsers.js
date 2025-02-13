import React, { useState, useEffect } from "react";
import NavPath from '../../Components/General/NavPath';
import TableContent from '../../Components/Table_Components/TableContent';
import TableTop from '../../Components/Table_Components/TableTop';
import fetchData from '../../utils/fetch_data';
import AddButton from '../../Components/Table_Components/AddButton';
import SideBar from '../../Components/General/Sidebar';
import mainStyles from "../../Assets/CSS/styles";
import filterOptionUser from "../../Components/Filter/FilterOptionUserManagement";
import EditIcon from "../../Components/Icons/EditIcon";
import PageHeading from "../../Components/Table_Components/PageHeading";
import SearchBar from "../../Components/Table_Components/SearchBar";
import FilterButton from "../../Components/Table_Components/FilterButton";
import FilterOptionsUserManagement from "../../Components/Filter/FilterOptionUserManagement";

export default function All_Users() {

  const [data, setData] = useState([{id: '1', name:'abc', email:'abc@gmail.com', role: 'client'},
    {id: '1', name:'abc', email:'abc@gmail.com', role: 'client'}]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setclearance] = useState(1);
  const [billingType, setBillingType] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [search, setSearch] = useState('');

  const [endpoint, setEndpoint] = useState('api/users/');

  useEffect(() => {
    // Construct query parameters
    const params = new URLSearchParams();
  
    if (billingType) params.append('billingType', billingType);
    if (userStatus) params.append('userStatus', userStatus);
    if (warehouse) params.append('warehouse', warehouse);
    if (search) params.append('search', search);
  
    // Set the updated endpoint
    setEndpoint(`api/users/${params.toString() ? '?' + params.toString() : ''}`);
    console.log('hello' + endpoint);
  }, [billingType, userStatus, warehouse, search]); // Dependencies to trigger the effect
  

  // const filteredUsers = filterOptionUser(billing={billingType}, user={userStatus}, ware={warehouse}, setbill={setBillingType}, setuser={setUserStatus}, setware={setWarehouse});

  const table_function = () => {
    return data.map((row, index) => (
      <tr key={index}>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.role}</td>
        <td style={{ display: "flex", padding: '15px 15px 15px 0px', marginRight:"15px", justifyContent: "right"}}>
      <EditIcon path={`edit-user/?id=${row.id}`}/>
    </td>

      </tr>
    ));
  };

  const table_width_function = () => {
    return (
      <colgroup>
        <col style={{ width: "10%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "30%" }} />
        <col style={{ width: "30%" }} />
        <col style={{ width: "10%" }} />  
      </colgroup>
    );
  };

  

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  // State for filters
  // const [billingType, setBillingType] = useState('All');
  // const [userStatus, setUserStatus] = useState('All');
  
  // State to toggle the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  useEffect(() => {
    // if (!mainFunctions.generalValidate()) {
      
    // } 
    // if (!mainFunctions.employeeValidate()) {

    // }
    // var data = mainFunctions.getUserData();
    // setclearance(data.clearance);
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
    <>
    <style>
        {`
          .table-top-container {
            display: flex;
            justify-content: space-between; /* Space between heading and buttons */
            align-items: center; /* Align items vertically */
            width: 95%;
            margin: 20px auto 20px 30px; /* Add margin to the right */
            flex-wrap: wrap; /* Allow items to wrap on smaller screens */
          }

          .row-container1 {
            display: flex;
            justify-content: flex-end; /* Align buttons to the right */
            align-items: center;
            gap: 20px; /* Add spacing between FilterButton and SearchBar */
          }

          .page-heading {
            flex-grow: 1; /* Allow the heading to take up space on the left */
          }
        `}
      </style>

    <div>
      {clearance && (clearance === "1" || clearance === "2" || clearance === "3") ? (
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      ) : (
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      )}
      <div style={mainStyles.centerContent(isSidebarClosed)}>

        <NavPath
          text={["Home", "User Management"]}
          paths={["/home", "/users"]}
          text_color={[255, 255, 255]}
          background_color={[23, 23, 23]}
          width="100%"
          height="50px"
        />

        <AddButton
          text="Add User"
          text_color={[255, 255, 255]}
          path='/add-user'
        />

        <div style={mainStyles.tableBackground}>
          {/* <TableTop
            heading_text={'All Users'}
            search_function={getData}
            // filter_function={() => {}}   
            // content={<filterOptionUser billing={billingType} user={userStatus} ware={warehouse} setbill={setBillingType} setuser={setUserStatus} setware={setWarehouse}/>}
          /> */}

          <div className="table-top-container">
              <PageHeading
                text={'jhdjsahdja'}
                text_color={[0, 0, 0]} // Black text color
                sidebar_color={[0, 0, 0]} // Black sidebar color
                width="auto" // Auto width to align properly
                height="auto" // Auto height
                sidebar_width="5px" // Increased sidebar width for visibility
                sidebar_height="35px" // Set sidebar height explicitly
              />
      
              <div className="row-container1">
                <FilterButton
                  text="+ Filter By"
                  text_color={[255, 255, 255]} // White text color
                  background_color={[23, 23, 23]} // Dark background
                  // function={filter_function} // Function to call on button click
                  content={<FilterOptionsUserManagement setbill={setBillingType} setuser={setUserStatus} setware={setWarehouse} user={userStatus} billing={billingType} ware={warehouse}/>}
                  width="150px" // Set width explicitly
                  height="50px" // Set height explicitly
                />
      
                <SearchBar
                  hint="Search..."
                  field_color={[255, 255, 255]} // White background
                  // setSearch={se}
                  // function={search_function} // Function to call on search
                  width="300px" // Set width explicitly
                  height="50px" // Set height for input field
                />
            </div>
          </div>


          <TableContent
            table_headings={['ID', 'Name', 'Email', 'Role']}
            last_column={true}
            loading={loading}
            success={success}
            prev_button={handlePrev}
            next_button={handleNext}
            fetchData={getData}
            data={data}
            table_width_function={table_width_function}
            table_function = {table_function}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
    </>
  );
}  
