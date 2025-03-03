import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";
import DropDown from "../../Components/General/DropDown";
import LargeModal from "../../Components/Modals/SuccessModal";

const roleClearanceMap = {
  1: "Manager",
  2: "VA",
  3: "Prep-Team",
  4: "Client"
};

const reverseRoleClearanceMap = {
  "Manager": 1,
  "VA": 2,
  "Prep-Team": 3,
  "Client": 4
};

const AddUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // If present, we're editing

  // Set initial form state
  const [UserData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    role: "",
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

  const [warehousesList, setWarehousesList] = useState([]);
  const [errors, setErrors] = useState({});
  const [modalData, setModalData] = useState({ isOpen: false, title: "", content: "" });

  const validateFields = () => {
    let newErrors = {};
    if (!UserData.username) newErrors.username = "Username is required.";
    if (!UserData.password && !userId) newErrors.password = "Password is required."; // For editing, you might not require re-entering password.
    if (!UserData.first_name) newErrors.first_name = "First name is required.";
    if (!UserData.role) newErrors.role = "Role is required.";
    if (UserData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(UserData.email)) {
      newErrors.email = "Invalid email format.";
    }
    return newErrors;
  };

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  // Fetch existing user data if in edit mode
  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        const token = localStorage.getItem("access_token");
        try {
          const response = await fetch(
            `http://${process.env.REACT_APP_TENANT_NAME}/users/api/users/${userId}/`,
            {
              method: "GET",
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 403) {
            setModalData({
              isOpen: true,
              title: "Access Denied",
              content: "You do not have permission to access this resource.",
            });
          }
          
          if (response.ok) {
            const data = await response.json();

            setUserData(prev => ({
              ...prev,
              username: data.user_data.username || "",
              first_name: data.user_data.first_name || "",
              last_name: data.user_data.last_name || "",
              phone: data.user_data.phone || "",
              password: "",
              role: roleClearanceMap[data.user_data.clearance_level] || "",  
              llc_name: data.user_data.llc_name || "",
              tax_id: data.user_data.tax_id || "",
              email: data.user_data.email || "",
              email2: data.user_data.email2 || "",
              address: data.user_data.address || "",
              billing_type: data.user_data.billing_type || "",
              city: data.user_data.city || "",
              state: data.user_data.state || "",
              zip: data.user_data.zip || "",
              warehouse: data.user_data.warehouses.map(id => {
                const warehouseObj = warehousesList.find(w => w.warehouse_id === id);
                return warehouseObj ? warehouseObj.warehouse_name : null;
              }).filter(name => name !== null)
            }));
          } else {
            console.error("Failed to fetch user data.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [userId, warehousesList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Convert role name to clearance level ID before sending to the API
    const formData = {
      ...UserData,
      clearance_level: reverseRoleClearanceMap[UserData.role] || "",  // ✅ Convert role to clearance level ID
    };

    // Determine URL and HTTP method based on mode (add or edit)
    const url = userId
      ? `http://${process.env.REACT_APP_TENANT_NAME}/users/api/users/${userId}/`
      : `http://${process.env.REACT_APP_TENANT_NAME}/users/api/users/`;
    const method = userId ? "PUT" : "POST";
    
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // ✅ Send converted data
      });

      if (response.status === 403) {
        setModalData({
          isOpen: true,
          title: "Access Denied",
          content: "You do not have permission to access this resource.",
        });
      }

      const data = await response.json();

      if (response.ok) {
        setModalData({
          isOpen: true,
          title: "Success",
          content: userId ? "User updated successfully!" : "User added successfully!",
        });
      } else {
        setModalData({
          isOpen: true,
          title: "Error",
          content: data.message || (userId ? "Failed to update user." : "Failed to add user."),
        });
      }
    } catch (error) {
      setModalData({
        isOpen: true,
        title: "Error",
        content: userId ? "Failed to update user. Please try again." : "Failed to add user. Please try again.",
      });
      console.error("Error:", error);
    }
  };

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

        if (response.status === 403) {
          setModalData({
            isOpen: true,
            title: "Access Denied",
            content: "You do not have permission to access this resource.",
          });
        }

        if (response.ok) {
          const data = await response.json();
          setWarehousesList(data.results);
        } else {
          setModalData({
            isOpen: true,
            title: "error",
            content: "Failed to fetch warehouse details. Please try again.",
          });
        }
      } catch (error) {
        setModalData({
          isOpen: true,
          title: "error",
          content: "Failed to fetch warehouse details. Please try again.",
        });
      }
    };

    fetchWarehouses();
  }, []);

  const handleSelectWarehouse = (selectedOptions) => {
    const selectedWarehouses = selectedOptions.map(option => {
      const warehouse = warehousesList.find(w => w.warehouse_name === option);
      return warehouse ? warehouse.warehouse_id : null;
    }).filter(id => id !== null);

    setUserData(prev => ({ ...prev, warehouse: selectedWarehouses }));
  };

  const handleSelectBillingType = (billingType) => {
    setUserData(prev => ({ ...prev, billing_type: billingType || "" }));
  };

  const handleSelectClearanceLevel = (selectedOption) => {
    setUserData(prev => ({ ...prev, clearance_level: roleClearanceMap[selectedOption] || "" }));
  };


  return (
    <div>
      <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />

      <div style={mainStyles.centerContent(isSidebarClosed)}>
        <div style={styles.mainContent}>
          <div style={{ marginBottom: '60px' }}>
            <NavPath
              text={userId ? ['Home', 'All Users', 'Edit User'] : ['Home', 'All Users', 'Add User']}
              paths={['/home', '/users', '/add-user']}
              text_color={[255, 255, 255]}
              background_color={[23, 23, 23]}
              hyperlink_size={[['10%', '55%'], ['40%', '50%'], ['4%', '4%']]}
              width="100%"
              height="50px"
            />
          </div>

          <div style={mainStyles.AddInputBackground}>
          <div style={{ marginTop: '20px', marginLeft: '60px', marginBottom: '10px' }}>
            <PageHeading text="Add User" text_color={[0, 0, 0]} width="100%" height="auto" />
          </div>
            <form id="form" style={styles.form} onSubmit={handleSubmit}>
              <DropDown
                label="Role"
                data={["Manager", "VA", "Prep-Team", "Client"]}
                onSelect={handleSelectClearanceLevel}
                width="300px"
                height="50px"
                required={true}
                value={UserData.role}
              />
              <DropDown 
                label="Warehouse"
                data={warehousesList.map(w => w.warehouse_name)}
                onSelect={handleSelectWarehouse}
                width="300px"
                height="50px"
                multi={true}
                value={UserData.warehouse}
              />
              <DropDown 
                label="Billing Type"
                data={["Daily", "Monthly", "Bi-Monthly"]}
                onSelect={handleSelectBillingType}
                width="300px"
                height="50px"
                value={UserData.billing_type}
              />
              <GeneralField label="Username" name="username" field_type="text" hint="Enter Username" value={UserData.username} required={true} func={handleChange} style={{ width: 'auto', height: '50px' }}/>
              <GeneralField label="First Name" name="first_name" field_type="text" hint="First Name (e.g., John)" value={UserData.first_name} func={handleChange} required={true} style={{ width: '300px', height: '50px' }}/>
              <GeneralField label="Last Name" name="last_name" field_type="text" hint="Last Name (e.g., Doe)" value={UserData.last_name} func={handleChange} style={{ width: '300px', height: '50px' }}/>
              <GeneralField label="Password" name="password" field_type="password" hint="********" value={UserData.password} func={handleChange} required={!userId} style={{ width: '300px', height: '50px' }}/>
              <GeneralField label="Phone" name="phone" field_type="tel" hint="Phone number (e.g., +1 (275) 432-345)" value={UserData.phone} func={handleChange} style={{ width: '300px', height: '50px' }}/>
              <GeneralField label="Primary Email" name="email" field_type="email" hint="Email address" value={UserData.email} func={handleChange} style={{ width: '300px', height: '50px' }}/>
              <GeneralField label="Secondary Email" name="email2" field_type="email" hint="Email address" value={UserData.email2} func={handleChange} style={{ width: '300px', height: '50px' }}/>
              <GeneralField label="Address" name="address" field_type="text" hint="Full address" value={UserData.address} func={handleChange} style={{ width: '300px', height: '50px' }}/>
              <GeneralField label="City" name="city" field_type="text" hint="City (e.g., Stafford)" value={UserData.city} func={handleChange} style={{ width: '300px', height: '50px' }}/>
              <GeneralField label="State" name="state" field_type="text" hint="State (e.g., Texas)" value={UserData.state} func={handleChange} style={{ width: '300px', height: '50px' }}/>
              <GeneralField label="Zip Code" name="zip" field_type="text" hint="Zip code" required={true} value={UserData.zip} func={handleChange} style={{ width: '300px', height: '50px' }}/>
              <GeneralField label="LLC Name" name="llc_name" field_type="text" hint="Enter Company name" required={true} value={UserData.llc_name} func={handleChange} style={{ width: '300px', height: '50px' }}/>
              <GeneralField label="Tax ID" name="tax_id" field_type="text" hint="Tax ID" required={true} value={UserData.tax_id} func={handleChange} style={{ width: '300px', height: '50px' }}/>
            </form>
            <div id="buttonContainer" style={styles.buttonContainer}>
                <GeneralButton text="Cancel" width="100px" height="100%" button_color={["230", "230", "230"]} text_color={["0", "0", "0"]} />
                <GeneralButton text="Add" type="submit" width="100px" height="100%" />
              </div>
          </div>
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
};

const styles = {
  mainContent: {
    padding: "10px 0px 50px 0px",
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr', // 4 columns
    gap: '20px 70px',
    marginLeft: '60px',
    marginTop: '35px',
    marginRight: '100px',
    alignSelf: 'flex-start',
    
  },

  buttonContainer: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: '250px',
    textAlign: 'right', // Ensure text & inline elements align
    gap: '20px',
    lineHeight: '40px',
    marginTop: "20px",
    marginRight: "100px",
  },
  headingcontainer: {
    alignSelf: 'flex-start',
    marginLeft: '20px',
    marginTop: '15px',
  },
  PageHeading: {
    marginLeft: '10px',
    marginTop: '20px',  
  },
  label: {
    marginTop: '10px',  
    marginLeft: "20px",
    display: 'block',
    fontWeight: '700px',
  },
  select: {
    marginTop: '15px',  
    marginLeft: "10px",
    display: 'block',
    width: '300px',
    height: '50px',
    borderRadius: '10px',
    border: '1px solid lightgrey',
    boxShadow: '1px 1px 1px 1px lightgrey',
  },
  mainContent: {
    padding: "10px 0px 50px 0px",
  },
  // form: {
  //   display: 'grid',
  //   gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Responsive grid
  //   gap: '20px',
  //   margin: '20px',
  // },
  // buttonContainer: {
  //   display: 'flex',
  //   justifyContent: 'flex-end',
  //   gap: '20px',
  //   margin: '20px',
  // },
  
};



// const styles = {
 
// };




export default AddUser;