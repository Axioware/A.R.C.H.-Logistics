import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Select from 'react-select';
import SideBar from '../../Components/General/Sidebar';
import NavPath from '../../Components/General/NavPath';
import PageHeading from "../../Components/Table_Components/PageHeading";
import mainStyles from "../../Assets/CSS/styles";
import fetchData from '../../utils/fetch_data';
import GeneralButton from '../../Components/General/GeneralButton';
import LargeModal from "../../Components/Modals/SuccessModal";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #ccc',
    borderRadius: '4px',
    '&:hover': {
      borderColor: 'rgb(14, 116, 144)',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'rgb(14, 116, 144)' : 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: 'rgba(14, 116, 144, 0.8)',
      color: 'white',
    },
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'black',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    ':hover': {
      backgroundColor: 'rgba(14, 116, 144, 0.8)',
      color: 'white',
    },
  }),
};

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

export default function AddUser() {
  const navigate = useNavigate(); // Initialize navigate

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
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const validateFields = () => {
    let newErrors = {};
    if (!UserData.username) newErrors.username = "Username is required.";
    if (!UserData.password) newErrors.password = "Password is required.";
    if (!UserData.first_name) newErrors.first_name = "First name is required.";
    if (!UserData.role) newErrors.role = "Role is required.";
    if (UserData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(UserData.email)) {
      newErrors.email = "Invalid email format.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setUserData({ ...UserData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login"); // Use navigate here
      return;
    }

    const formData = {
      ...UserData,
      clearance_level: reverseRoleClearanceMap[UserData.role] || "",
    };

    const url = `http://${process.env.REACT_APP_TENANT_NAME}/users/api/users/`;
    const method = "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
          content: "User added successfully!",
        });
      } else {
        setModalData({
          isOpen: true,
          title: "Error",
          content: data.message || "Failed to add user.",
        });
      }
    } catch (error) {
      setModalData({
        isOpen: true,
        title: "Error",
        content: "Failed to add user. Please try again.",
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

  const roleOptions = [
    { value: 'Manager', label: 'Manager' },
    { value: 'VA', label: 'VA' },
    { value: 'Prep-Team', label: 'Prep-Team' },
    { value: 'Client', label: 'Client' },
  ];

  const billingtypeOptions = [
    { value: 'Daily', label: 'Daily' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'Bimonthly', label: 'Bimonthly' },
  ];

  return (
    <>
      <style>
        {`
          .table-top-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 95%;
            margin: 30px auto 20px 50px;
            flex-wrap: wrap;
          }

          .row-container1 {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 20px;
          }

          .page-heading {
            flex-grow: 1;
          }

          .input-field, .select-fields {
            width: 70%;
            padding: px;
            margin-top: 5px;
            border: 0px solid #ccc;
            border-radius: 4px;
          }

           .input-field, .select-field {
            width: 70%;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .form-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-top: 20px;
            position: relative;
            margin: 20px 0px 0px 50px;
          }

          .form-grid label {
            display: block;
            margin-bottom: 5px;
          }

        `}
      </style>

      <div>
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
        <div style={mainStyles.centerContent(isSidebarClosed)}>
          <NavPath
            text={["Home", "All User", "Add User"]}
            paths={["/home", "/inventory", "/add-inventorys"]}
            width="100%"
            height="50px"
          />

          <div style={mainStyles.AddInputBackground}>
            <div className="table-top-container">
              <PageHeading
                text={'Add User'}
                width="auto" 
                height="auto"
                sidebar_width="5px"
                sidebar_height="35px"
              />
            </div>

            <form className="inventory-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <label>Role:</label>
                  <Select
                    value={roleOptions.find(option => option.value === UserData.role)}
                    onChange={(selectedOption) => setUserData({ ...UserData, role: selectedOption.value })}
                    options={roleOptions}
                    className="select-fields"
                    placeholder="Select a Role"
                    styles={customStyles}
                  />
                </div>
                <div>
                  <label>Warehouse:</label>
                  <Select
                    value={warehousesList.find(option => option.value === UserData.warehouse)}
                    onChange={(selectedOptions) => handleSelectWarehouse(selectedOptions)}
                    options={warehousesList.map(warehouse => ({ value: warehouse.warehouse_id, label: warehouse.warehouse_name }))}
                    className="select-fields"
                    placeholder="Select a warehouse"
                    styles={customStyles}
                    isMulti
                  />
                </div>
                <div>
                  <label>Billing Type:</label>
                  <Select
                    value={billingtypeOptions.find(option => option.value === UserData.billing_type)}
                    onChange={(selectedOption) => setUserData({ ...UserData, billing_type: selectedOption.value })}
                    options={billingtypeOptions}
                    className="select-fields"
                    placeholder="Select a Billing Type"
                    styles={customStyles}
                  />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={UserData.username}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Username"
                  />
                  {errors.username && <span className="error">{errors.username}</span>}
                </div>
                <div>
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="first_name"
                    value={UserData.first_name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter First Name"
                  />
                  {errors.first_name && <span className="error">{errors.first_name}</span>}
                </div>
                <div>
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="last_name"
                    value={UserData.last_name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Last Name"
                  />
                  {errors.last_name && <span className="error">{errors.last_name}</span>}
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={UserData.password}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Password"
                  />
                  {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div>
                  <label>Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={UserData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Phone"
                  />
                </div>
                <div>
                  <label>Primary Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={UserData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Primary Email"
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Secondary Email:</label>
                  <input
                    type="email"
                    name="email2"
                    value={UserData.email2}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Secondary Email"
                  />
                </div>
                <div>
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={UserData.address}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Address"
                  />
                </div>
                <div>
                  <label>City:</label>
                  <input
                    type="text"
                    name="city"
                    value={UserData.city}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter City"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>State:</label>
                  <input
                    type="text"
                    name="state"
                    value={UserData.state}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter State"
                  />
                </div>
                <div>
                  <label>Zip Code:</label>
                  <input
                    type="text"
                    name="zip"
                    value={UserData.zip}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Zip Code"
                  />
                </div>
                <div>
                  <label>LLC Name:</label>
                  <input
                    type="text"
                    name="llc_name"
                    value={UserData.llc_name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter LLC Name"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Tax ID:</label>
                  <input
                    type="text"
                    name="tax_id"
                    value={UserData.tax_id}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Tax ID"
                  />
                </div>
              </div>
            </form>
            <div id="buttonContainer" style={styles.buttonContainer}>
              <GeneralButton text="Cancel" width="100px" height="100%" button_color={["230", "230", "230"]} text_color={["0", "0", "0"]} />
              <GeneralButton text="Add" type="submit" width="100px" height="100%" func={handleSubmit} />
            </div>
          </div>
        </div>
      </div>

      <LargeModal
        isOpen={modalData.isOpen}
        title={modalData.title}
        content={modalData.content}
        onClose={() => setModalData({ ...modalData, isOpen: false })}
      />
    </>
  );
}

const styles = {
  buttonContainer: {
    alignSelf: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: '250px',
    textAlign: 'right',
    gap: '20px',
    lineHeight: '40px',
    marginTop: "20px",
    marginRight: "100px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '35%',
  },
  modalTitle: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bolder",
    color: "#333",
    textAlign: 'center'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttonContainers: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    padding: '8px 10px ',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    marginTop: "14px",
  },
  confirmButton: {
    backgroundColor: 'rgb(14, 116, 144)',
    color: 'white',
    border: '1px solid rgb(14, 116, 144)',
    padding: '8px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s',
    marginTop: "14px",
  },
  error: {
    color: 'red',
    fontSize: '12px',
    marginBottom: '10px',
    display: 'block',
  },
};