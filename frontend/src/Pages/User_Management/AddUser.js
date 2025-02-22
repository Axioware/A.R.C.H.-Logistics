import React, { useState, useEffect } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";
import DropDown from "../../Components/General/DropDown";
import LargeModal from "../../Components/Modals/SuccessModal";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  const [UserData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    clearance_level: null,
    llc_name: "",
    tax_id: "",
    email: "",
    email2: "",
    address: "",
    billing_type: "",
    city: "",
    state: "",
    zip: "",
    warehouse: []
  });

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }
    console.log(UserData);
    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_TENANT_NAME}/users/api/users/`,
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
        setModalState({
          isOpen: true,
          title: "Success",
          content: "User added successfully!",
        });

        setUserData({
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
          clearance_level: null,
          llc_name: "",
          tax_id: "",
          email2: "",
          address: "",
          billing_type: "",
          city: "",
          state: "",
          zip: "",
          warehouse: null
        });
      } else {
        setModalState({
          isOpen: true,
          title: "Error",
          content: data.message || "Failed to add user.",
        });
      }
    } catch (error) {
      setModalState({
        isOpen: true,
        title: "Error",
        content: "Failed to add user. Please try again.",
      });
      console.error("Error:", error);
    }
  };

  const [warehousesList, setWarehousesList] = useState([]);

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

  const handleSelectWarehouse = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      console.error("No warehouse selected");
      return;
    }
  
    // Extract warehouse IDs from the selected options
    const selectedWarehouses = selectedOptions.map(option => {
      const warehouse = warehousesList.find(w => w.warehouse_name === option);
      return warehouse ? warehouse.warehouse_id : null;
    }).filter(id => id !== null); // Remove any null values
  
    setUserData(prev => ({ ...prev, warehouse: selectedWarehouses }));
  };

  const handleSelectBillingType = (billingType) => {
    if (!billingType || !billingType.value) {
      console.error("Invalid billing type selected");
      return;
    }
  
    setUserData(prev => ({ ...prev, billing_type: billingType.value }));
  };

  const handleSelectClearanceLevel = (selectedOption) => {
    if (!selectedOption || !selectedOption.value) {
      console.error("Invalid role selection");
      return;
    }
  
    const roleClearanceMap = {
      "Manager": "1",
      "VA": "2",
      "Prep-Team": "3",
      "Client": "4"
    };
  
    const clearanceLevel = roleClearanceMap[selectedOption.value] || ""; 
    
    setUserData(prev => ({ 
      ...prev, 
      clearance_level: clearanceLevel 
    }));
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

            <form id="form" style={styles.form} onSubmit={handleSubmit}>
              <DropDown
                label="Clearance Level"
                data = {["Manager", "VA", "Prep-Team", "Client"]}
                onSelect={handleSelectClearanceLevel}
                width="230px"
                height="45px"
                required={true}
              />
              <DropDown 
                label="Warehouse"
                data={warehousesList.map(w => w.warehouse_name)}
                onSelect={handleSelectWarehouse}
                width="230px"
                height="45px"
                multi={true}
              />
              <DropDown 
                label="Billing Type"
                data={["Daily", "Monthly", "Bi-Monthly"]}
                onSelect={handleSelectBillingType}
                width="230px"
                height="45px"
              />
              <GeneralField label="Username" name="username" field_type="text" hint="Enter Username" value={UserData.username} required={true} func={handleChange}/>
              <GeneralField label="First Name" name="first_name" field_type="text" hint="First Name (e.g., John)" value={UserData.first_name} func={handleChange} required={true}/>
              <GeneralField label="Last Name" name="last_name" field_type="text" hint="Last Name (e.g., Doe)" value={UserData.last_name} func={handleChange}/>
              <GeneralField label="Password" name="password" field_type="password" hint="********" value={UserData.password} func={handleChange} required={true}/>
              <GeneralField label="Phone" name="phone" field_type="tel" hint="Phone number (e.g., +1 (275) 432-345)" value={UserData.phone} func={handleChange}/>
              <GeneralField label="Primary Email" name="email" field_type="email" hint="Email address" value={UserData.primary_email} func={handleChange} />
              <GeneralField label="Secondary Email" name="email2" field_type="email" hint="Email address" value={UserData.email} func={handleChange} />
              <GeneralField label="Address" name="address" field_type="text" hint="Full address" value={UserData.address} func={handleChange}/>
              <GeneralField label="City" name="city" field_type="text" hint="City (e.g., Stafford)" value={UserData.city} func={handleChange}/>
              <GeneralField label="State" name="state" field_type="text" hint="State (e.g., Texas)" value={UserData.state} func={handleChange}/>
              <GeneralField label="Zip Code" name="zip" field_type="text" hint="Zip code" required={true} value={UserData.zip} func={handleChange}/>
              <GeneralField label="LLC Name" name="llc_name" field_type="text" hint="Enter Company name" required={true} value={UserData.llc_name} func={handleChange}/>
              <GeneralField label="Tax ID" name="tax_id" field_type="text" hint="Tax ID" required={true} value={UserData.tax_id} func={handleChange}/>

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

