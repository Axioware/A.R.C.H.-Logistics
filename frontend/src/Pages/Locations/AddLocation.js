import React, { useState, useEffect } from "react";
import GeneralField from "../../Components/General/GeneralField";
import GeneralButton from "../../Components/General/GeneralButton";
import NavPath from "../../Components/General/NavPath";
import PageHeading from "../../Components/Table_Components/PageHeading";
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";
import DropDown from "../../Components/General/DropDown";
import LargeModal from "../../Components/Modals/SuccessModal";
import { useParams, useNavigate } from "react-router-dom";

const AddLocation = () => {
  const { locationId } = useParams();  // Get locationId from URL
  const navigate = useNavigate();

  const [locationName, setLocationName] = useState("");  
  const [locationType, setLocationType] = useState("");  
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);  
  const [selectedWarehouseName, setSelectedWarehouseName] = useState(null);  
  const [warehouses, setWarehouses] = useState([]);  
  const [modalData, setModalData] = useState({ isOpen: false, title: "", content: "" });
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });  


useEffect(() => {
    if (locationId) {
      // If editing, fetch the existing location details
      const fetchLocationDetails = async () => {
        try {
          const response = await fetch(
            `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/locations/${locationId}/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch location details");
          const data = await response.json();
          setLocationName(data.location_name);
          setLocationType(data.location_type);
          setSelectedWarehouseId(data.warehouse_id);
          setSelectedWarehouseName({ label: data.warehouse_name, value: data.warehouse_name });
        } catch (error) {
          console.error("Error fetching location details:", error);
        }
      };

      fetchLocationDetails();
    }
  }, [locationId]);

  const token = localStorage.getItem("access_token");

  // Fetch warehouses
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await fetch(
          `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/warehouse/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch warehouses");
        const data = await response.json();
        setWarehouses(data.results || []);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, [token]);

  // Handle form submission (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!locationName.trim() || !locationType.trim() || !selectedWarehouseId) {
      setModalData({
        isOpen: true,
        title: "Error",
        content: "All fields are required!",
      });
      return;
    }

    const payload = {
      location_name: locationName.trim(),
      location_type: locationType.trim(),
      warehouse_id: selectedWarehouseId,
    };
    console.log("Submitting payload:", payload);

    try {
      let response;
      if (locationId) {
        // Edit existing location
        response = await fetch(
          `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/locations/${locationId}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
      } else {
        // Add new location
        response = await fetch(
          `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/locations/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
      }

      if (response.ok) {
        setModalData({
          isOpen: true,
          title: "Success",
          content: locationId ? "Location updated successfully!" : "Location added successfully!",
        });
        setLocationName("");
        setLocationType("");
        setSelectedWarehouseId(null);
        setSelectedWarehouseName(null);

        if (!locationId) {
          // Redirect to locations page after adding
          navigate("/all-location");
        }
      } else {
        setModalData({
          isOpen: true,
          title: "Error",
          content: locationId ? "Failed to update location!" : "Failed to add location!",
        });
      }
    } catch (error) {
      console.error("Error handling location submission:", error);
      setModalData({
        isOpen: true,
        title: "Error",
        content: "Error processing location. Please try again.",
      });
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

          .dimension-container {
            display: flex;
            gap: 10px;
            width: 70%;
          }

          .dimension-input {
            width: calc(33.33% - 7px) !important;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          .add-another-button {
            margin-top: 10px;
            padding: 8px 16px;
            color: grey;
            border: none;
            cursor: pointer;
            background: none;
            margin: 10px 0px 0px 50px;
          }

          .add-another-buttons {
            margin-top: 10px;
            padding: 0px 16px;
            color: grey;
            border: none;
            cursor: pointer;
            background: none;
          }

          .remove-dimension-button {
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            background-color: #ff6b6b;
            color: white;
            border: none;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 14px;
          }

          .remove-dimension-button:hover {
            background-color: #ff3d3d;
          }

          .radio-container {
            display: flex;
            align-items: center;
            margin-top: 8px;
          }

          .radio-label {
            display: flex;
            align-items: center;
            margin-right: 20px;
          }

          .radio-input {
            margin-right: 5px;
          }

          .bundle-product-container {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 20px;
          }

          .bundle-product-container .input-field {
            width: 100%;
          }

          .bundle-product-container .add-another-button {
            margin: 0;
            align-self: flex-end;
          }
        `}
      </style>
    <div>
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
        <div style={mainStyles.centerContent(isSidebarClosed)}>
          <NavPath
            text={["Home", "All Locations", locationId ? "Edit Location" : "Add Location"]}
            paths={["/home", "/locations", locationId ? "/edit-location" : "/add-location"]}
            text_color={[255, 255, 255]}
            background_color={[23, 23, 23]}
            hyperlink_size={[
              ["10%", "55%"],
              ["40%", "50%"],
              ["4%", "4%"],
            ]}
            width="100%"
            height="50px"
          />

          <div style={mainStyles.AddInputBackground}>
            <div className="table-top-container">
              <PageHeading
                text={locationId ? 'Edit Location' : 'Add Location'}
                width="auto"
                height="auto"
                sidebar_width="5px"
                sidebar_height="35px"
              />
            </div>

            <form className="inventory-form">
              <div className="form-grid">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    className="input-field"
                    placeholder="Enter Name"
                  />
                </div>
                <div>
                  <label>Type</label>
                  <select
                    value={locationType}
                    onChange={(e) => setLocationType(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Select a type</option>
                    <option value="Bin">Bin</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label>Warehouse</label>
                  <select
                    value={selectedWarehouseId || ""}
                    onChange={(e) => {
                      const warehouseId = parseInt(e.target.value);
                      const warehouse = warehouses.find(w => w.warehouse_id === warehouseId);
                      setSelectedWarehouseId(warehouseId);
                      setSelectedWarehouseName(warehouse ? { label: warehouse.warehouse_name, value: warehouse.warehouse_name } : null);
                    }}
                    className="select-field"
                  >
                    <option value="">Select a warehouse</option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                        {warehouse.warehouse_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>

            <div id="buttonContainer" style={styles.buttonContainer}>
              <GeneralButton text="Cancel" width="100px" height="100%" button_color={["230", "230", "230"]} text_color={["0", "0", "0"]} />
              <GeneralButton text={locationId ? "Update" : "Add"} type="button" width="100px" height="100%" func={handleSubmit} />
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
    </>
  );
};



const styles = {
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
    marginTop: "50px",
    marginRight: "100px",
  },
};

export default AddLocation;
