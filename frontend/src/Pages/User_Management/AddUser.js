import React, { useState, useEffect } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";
import DropDown from "../../Components/General/DropDown";

const AddUser = () => {
  const [UserData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    clearance_level: [],
    llc_name: "",
    tax_id: "",
    email2: "",
    address: "",
    billing_type: "",
    city: "",
    state: "",
    zip: "",
    warehouses: []
  });

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const handleChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', UserData);

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/users/`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(UserData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("User added successfully!");
        setUserData({
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
          clearance_level: [],
          llc_name: "",
          tax_id: "",
          email2: "",
          address: "",
          billing_type: "",
          city: "",
          state: "",
          zip: "",
          warehouses: []
        });
      } else {
        alert(`Error: ${data.message || "Failed to add User."}`);
      }
    } catch (error) {
      alert("Failed to add User. Please try again.");
      console.error("Error:", error);
    }
  };

  const [warehousesList, setWarehousesList] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  useEffect(() => {
    const fetchWarehouses = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        alert("You are not authorized. Please log in.");
        return;
      }

      try {
        const response = await fetch(
          `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/warehouse/`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setWarehousesList(data.results);
        } else {
          alert("Failed to fetch warehouse details. Please try again.");
        }
      } catch (error) {
        alert("Failed to fetch warehouse details. Please try again.");
        console.error("Error fetching warehouse:", error);
      }
    };

    fetchWarehouses();
  }, []);

  const handleSelectWarehouse = (warehouseName) => {
    const selected = warehousesList.find(w => w.name === warehouseName);
    if (selected) {
      setUserData({ ...UserData, warehouses: [selected.id] });
      setSelectedWarehouse(warehouseName);
    }
  };

  return (
    <div>
      <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />

      <div style={mainStyles.centerContent(isSidebarClosed)}>
        <div style={styles.mainContent}>
          <NavPath
            text={['Home', 'All User', 'Add User']}
            paths={['/home', '/users', '/add-user']}
            text_color={[255, 255, 255]}
            background_color={[23, 23, 23]}
            hyperlink_size={[['10%', '55%'], ['40%', '50%'], ['4%', '4%']]}
            width="100%"
            height="50px"
          />

          <div id="tableBackground" style={mainStyles.tableBackground}>
            <div id="headingcontainer" style={styles.headingcontainer}>
              <PageHeading text="Add User" />
            </div>

            <div id="RoleContainer" style={styles.RoleContainer}>
              <label htmlFor="Dropdown" style={styles.label}>Role</label>
              <select name="Dropdown" id="Dropdown" style={styles.select}>
                <option value="Manager">Client</option>
                <option value="VA">Prep-Team</option>
                <option value="Prep-Team">VA's</option>
                <option value="Client">Others</option>
              </select>
            </div>

            <form id="form" style={styles.form} onSubmit={handleSubmit}>
              <DropDown 
                label="Warehouse"
                data={warehousesList.map(w => w.warehouse_name)}
                onSelect={handleSelectWarehouse}
                width="330px"
                height="45px"
              />
              <GeneralField label="LLC Name" field_type="text" hint="Enter Company name" required={true}/>
              <GeneralField label="First Name" field_type="text" hint="First Name (e.g., John)" />
              <GeneralField label="Last Name" field_type="text" hint="Last Name (e.g., Doe)" />
              <GeneralField label="Phone" field_type="tel" hint="Phone number (e.g., +1 (275) 432-345)" />
              <GeneralField label="Address" field_type="text" hint="Full address" />
              <GeneralField label="City" field_type="text" hint="City (e.g., Stafford)" />
              <GeneralField label="State" field_type="text" hint="State (e.g., Texas)" />
              <GeneralField label="Zip Code" field_type="text" hint="Zip code" required={true}/>
              <GeneralField label="Email" field_type="email" hint="Email address" />
              <div id="buttonContainer" style={styles.buttonContainer}>
                <GeneralButton text="Cancel" width="100px" height="100%" button_color={["230", "230", "230"]} text_color={["0", "0", "0"]} />
                <GeneralButton text="Add" type="submit" width="100px" height="100%" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
// Styles Object
const styles = {
  mainContent: {
    padding: "10px 0px 50px 0px",
},

form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr', // Two columns
    gap: '20px', // Space between fields
    // border: '2px solid white',
    marginLeft:'20px',
    marginTop:'35px',
    marginRight:'100px',
    alignSelf:'flex-start',
},

select: {

  marginLeft:"40px",
  marginTop:"10px",
},

buttonContainer: {
  // border: '2px solid white',
  alignSelf:'flex-end',
  display: 'flex',
  flexDirection: 'row',
  width:'250px',
  gap: '20px',
 
  lineHeight:'40px',
  marginTop:"100px",
},

headingcontainer:{
  alignSelf: 'flex-start',
  // border: '2px solid purple',
  marginLeft:'20px',
  marginTop:'15px',
},

PageHeading:{
  marginLeft:'10px',
  marginTop:'20px',  
},

RoleContainer: {
  alignSelf: 'flex-start',
  marginTop:'10px',  
  marginLeft:"10px",
},

label: {

  marginTop:'10px',  
  marginLeft:"20px",
  display:'block',
  fontWeight:'700px',
},

select: {
  marginTop:'15px',  
  marginLeft:"10px",
  display:'block',
  width:'260px',
  height:'45px',
  borderRadius:'10px',
  border: '1px solid lightgrey',
  boxShadow: '1px 1px 1px 1px lightgrey',
},
};

export default AddUser;

