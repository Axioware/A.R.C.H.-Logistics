import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams
import SideBar from '../../Components/General/Sidebar';
import NavPath from '../../Components/General/NavPath';
import PageHeading from "../../Components/Table_Components/PageHeading";
import mainStyles from "../../Assets/CSS/styles";
import GeneralButton from '../../Components/General/GeneralButton';
import LargeModal from "../../Components/Modals/SuccessModal";

export default function AddWarehouse() {
  const navigate = useNavigate();
  const { warehouseId } = useParams(); // If present, we're editing

  const [warehouseData, setWarehouseData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    phone: "",
    email: ""
  });

  const [errors, setErrors] = useState({});
  const [modalData, setModalData] = useState({ isOpen: false, title: "", content: "" });

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const validateFields = () => {
    let newErrors = {};
    // Add validation logic here
    return newErrors;
  };

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setWarehouseData({ ...warehouseData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (warehouseId) {
      const fetchWarehouseData = async () => {
        const token = localStorage.getItem("access_token");
        try {
          const response = await fetch(
            `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/warehouse/${warehouseId}/`,
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
            setWarehouseData(data);
          } else {
            console.error("Failed to fetch warehouse data.");
          }
        } catch (error) {
          console.error("Error fetching warehouse data:", error);
        }
      };
      fetchWarehouseData();
    }
  }, [warehouseId]);

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

    const url = warehouseId
      ? `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/warehouse/${warehouseId}/`
      : `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/warehouse/`;
    const method = warehouseId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(warehouseData),
      });

      const data = await response.json();

      if (response.ok) {
        setModalData({
          isOpen: true,
          title: "Success",
          content: warehouseId ? "Warehouse updated successfully!" : "Warehouse added successfully!",
        });
        if (!warehouseId) {
          setWarehouseData({
            warehouse_name: "",
            email: "",
            phone: "",
            address: "",
            country: "",
            city: "",
            state: "",
            zip_code: ""
          });
        }
      } else {
        setModalData({
          isOpen: true,
          title: "Error",
          content: data.message || "Failed to add/update warehouse.",
        });
      }
    } catch (error) {
      setModalData({
        isOpen: true,
        title: "Error",
        content: "Failed to add/update warehouse. Please try again.",
      });
      console.error("Error:", error);
    }
  };

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
            text={["Home", "Warehouse", warehouseId ? "Edit Warehouse" : "Add Warehouse"]}
            paths={["/home", "/warehouse", warehouseId ? `/edit-warehouse/${warehouseId}` : "/add-warehouse"]}
            width="100%"
            height="50px"
          />

          <div style={mainStyles.AddInputBackground}>
            <div className="table-top-container">
              <PageHeading
                text={warehouseId ? 'Edit Warehouse' : 'Add Warehouse'}
                width="auto" 
                height="auto"
                sidebar_width="5px"
                sidebar_height="35px"
              />
            </div>

            <form className="inventory-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div>
                  <label>Warehouse Name:</label>
                  <input
                    type="text"
                    name="warehouse_name"
                    value={warehouseData.warehouse_name}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Warehouse Name"
                  />
                  {errors.warehouse_name && <span className="error">{errors.warehouse_name}</span>}
                </div>
                <div>
                  <label>Country:</label>
                  <input
                    type="text"
                    name="country"
                    value={warehouseData.country}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Country"
                  />
                  {errors.country && <span className="error">{errors.country}</span>}
                </div>
                <div>
                  <label>State:</label>
                  <input
                    type="text"
                    name="state"
                    value={warehouseData.state}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter State"
                  />
                  {errors.state && <span className="error">{errors.state}</span>}
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>City:</label>
                  <input
                    type="text"
                    name="city"
                    value={warehouseData.city}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter City"
                  />
                  {errors.city && <span className="error">{errors.city}</span>}
                </div>
                <div>
                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={warehouseData.address}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Address"
                  />
                </div>
                <div>
                  <label>Zip Code:</label>
                  <input
                    type="number"
                    name="zip_code"
                    value={warehouseData.zip_code}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Zip Code"
                  />
                  {errors.zip_code && <span className="error">{errors.zip_code}</span>}
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={warehouseData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Email"
                  />
                </div>
                <div>
                  <label>Phone:</label>
                  <input
                    type="number"
                    name="phone"
                    value={warehouseData.phone}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="Enter Phone"
                  />
                </div>
              </div>
              
            </form>
            <div id="buttonContainer" style={styles.buttonContainer}>
                <GeneralButton text="Cancel" width="100px" height="100%" button_color={["230", "230", "230"]} text_color={["0", "0", "0"]} />
                <GeneralButton text={warehouseId ? "Update" : "Add"} type="submit" width="100px" height="100%" func={handleSubmit} />
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
 
};



// import React, { useState, useEffect } from "react";
// import GeneralField from '../../Components/General/GeneralField';
// import GeneralButton from '../../Components/General/GeneralButton';
// import NavPath from '../../Components/General/NavPath';
// import PageHeading from '../../Components/Table_Components/PageHeading';
// import mainStyles from "../../Assets/CSS/styles";
// import SideBar from "../../Components/General/Sidebar";
// import LargeModal from "../../Components/Modals/SuccessModal";
// import { useNavigate, useParams } from "react-router-dom";

// const AddWarehouse = () => {
//   const navigate = useNavigate();
//   const { warehouseId } = useParams(); // If present, we're editing

//   const [warehouseData, setWarehouseData] = useState({
//     warehouse_name: "",
//     address: "",
//     city: "",
//     state: "",
//     country: "",
//     zip_code: "",
//     phone: "",
//     email: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [modalData, setModalData] = useState({ isOpen: false, title: "", content: "" });

//   const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
//     const storedState = localStorage.getItem("sidebarclosed");
//     return storedState === null ? true : JSON.parse(storedState);
//   });

//   const validateFields = () => {
//     let newErrors = {};
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     setErrors({ ...errors, [e.target.name]: "" });
//     setWarehouseData({ ...warehouseData, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//       if (warehouseId) {
//         const fetchWarehouseData = async () => {
//           const token = localStorage.getItem("access_token");
//           try {
//             const response = await fetch(
//               `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/warehouse/${warehouseId}/`,
//               {
//                 method: "GET",
//                 headers: {
//                   "Authorization": `Bearer ${token}`,
//                   "Content-Type": "application/json",
//                 },
//               }
//             );
  
//             if (response.status === 403) {
//               setModalData({
//                 isOpen: true,
//                 title: "Access Denied",
//                 content: "You do not have permission to access this resource.",
//               });
//             }
            
//             if (response.ok) {
//               const data = await response.json();
//               setWarehouseData(data);
//             } else {
//               console.error("Failed to fetch user data.");
//             }
//           } catch (error) {
//             console.error("Error fetching user data:", error);
//           }
//         };
//         fetchWarehouseData();
//       }
//     }, [warehouseId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateFields();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     const url = warehouseId
//       ? `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/warehouse/${warehouseId}/`
//       : `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/warehouse/`;
//     const method = warehouseId ? "PUT" : "POST";

//     try {
//       const response = await fetch(url, {
//         method: method,
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(warehouseData), 
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setModalData({
//           isOpen: true,
//           title: "Success",
//           content: "Warehouse added successfully!",
//         });
//         setWarehouseData({
//           warehouse_name: "",
//           email: "",
//           phone: "",
//           address: "",
//           country: "",
//           city: "",
//           state: "",
//           zip_code: ""
//         });
//       } else {
//         setModalData({
//           isOpen: true,
//           title: "Error",
//           content: data.message || "Failed to add warehouse.",
//         });
//       }
//     } catch (error) {
//       setModalData({
//         isOpen: true,
//         title: "Error",
//         content: "Failed to add warehouse. Please try again.",
//       });
//       console.error("Error:", error);
//     }
//   };




// const styles = {
//   mainContent: {
//     padding: "10px 0px 50px 0px",
//     backgroundColor:'f7f6f6',
// },

// form: {
//     position:'relative',
//     alignSelf:'flex-start',
//     display: 'grid',
//     gridTemplateColumns: '1fr 1fr 1fr 1fr',
//     gap: '20px', 
//     marginLeft:'20px',
//     marginRight:'30px',
//     gap:'20px',
//     marginTop:'35px',
// },

// select: {

//   marginLeft:"40px",
//   marginTop:"10px",
// },

// buttonContainer: {
//     // border: '2px solid black',
//     alignSelf:'flex-end',
//     display: 'flex',
//     flexDirection: 'row',
//     width:'250px',
//     gap: '20px',
//     marginTop: '20px',
//     lineHeight:'40px',
// },
// headingcontainer:{
//   alignSelf: 'flex-start',
//   // border: '2px solid purple',
//   marginLeft:'20px',
//   marginTop:'15px',

// },

// PageHeading:{
//   marginLeft:'10px',
//   marginTop:'25px',  
// },

// RoleContainer: {
//   alignSelf: 'flex-end',
//   marginTop:'10px',  
//   marginLeft:"10px",
// },

// label: {
//   marginTop:'10px',  
//   marginLeft:"20px",
//   display:'block',
//   fontWeight:'700px',
// },

// select: {
//   marginTop:'15px',  
//   marginLeft:"10px",
//   display:'block',
//   width:'260px',
//   height:'45px',
//   borderRadius:'10px',
//   border: '1px solid lightgrey',
//   boxShadow: '1px 1px 1px 1px lightgrey',
// },
// };

// export default AddWarehouse;
