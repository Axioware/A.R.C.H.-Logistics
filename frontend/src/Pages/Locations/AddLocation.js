import React, { useState, useEffect } from "react";
import GeneralField from "../../Components/General/GeneralField";
import GeneralButton from "../../Components/General/GeneralButton";
import NavPath from "../../Components/General/NavPath";
import PageHeading from "../../Components/Table_Components/PageHeading";
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";
import DropDown from "../../Components/General/DropDown";
import LargeModal from "../../Components/Modals/SuccessModal";

const AddLocation = () => {
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [selectedWarehouseName, setSelectedWarehouseName] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [locationType, setLocationType] = useState("");
  const [modalData, setModalData] = useState({ isOpen: false, title: "", content: "" });

  useEffect(() => {
    if (selectedWarehouseName) {
      const selectedWarehouse = warehouses.find(
        (w) => w.warehouse_name === selectedWarehouseName.value
      );
      if (selectedWarehouse) {
        setSelectedWarehouseId(selectedWarehouse.warehouse_id);
      } else {
        setSelectedWarehouseId(null);
      }
    }
  }, [selectedWarehouseName, warehouses]);

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

  // Handle form submission
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

    try {
      const response = await fetch(
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

      if (response.ok) {
        setModalData({
          isOpen: true,
          title: "Success",
          content: "Location added successfully!",
        });
        setLocationName("");
        setLocationType("");
        setSelectedWarehouseId(null);
      } else {
        setModalData({
          isOpen: true,
          title: "Error",
          content: "Failed to add location!",
        });
      }
    } catch (error) {
      console.error("Error adding location:", error);
      setModalData({
        isOpen: true,
        title: "Error",
        content: "Error adding location. Please try again.",
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

          /* Increase the width of input fields */
          input {
            width: 80%; /* Make input fields take full width of their container */
          }
        `}
      </style>
      <div>
        <SideBar
          sidebar_state={isSidebarClosed}
          set_sidebar_state={setIsSidebarClosed}
        />
        <div style={mainStyles.centerContent(isSidebarClosed)}>
          <div style={{ marginBottom: '50px' }}>
            <NavPath
              text={["Home", "All Locations", "Add Location"]}
              paths={["/home", "/all-location", "/add-location"]}
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
                  text={'Add Location'}
                  width="auto" 
                  height="auto"
                  sidebar_width="5px"
                  sidebar_height="35px"
                />
              </div>

              <form
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "10px",
                  marginLeft: "50px",
                  marginRight: "30px",
                  marginTop: "35px",
                }}
                onSubmit={handleSubmit}
              >
                <GeneralField
                  label="Name"
                  field_type="text"
                  hint="Enter location name"
                  required={true}
                  func={(e) => setLocationName(e.target.value)}
                />
                <GeneralField
                  label="Type"
                  field_type="text"
                  hint="Select the type of location"
                  required={true}
                  func={(e) => setLocationType(e.target.value)}
                />
                <DropDown
                  data={warehouses.map((w) => w.warehouse_name)}
                  multi={false}
                  label="Warehouse"
                  required={true}
                  width="90%"
                  onSelect={setSelectedWarehouseName}
                />
                <div
                  style={{
                    alignSelf: "flex-end",
                    display: "flex",
                    flexDirection: "row",
                    width: "70%",
                    gap: "10px",
                    marginTop: "100px",
                    lineHeight: "40px",
                    '@media (max-width: 768px)': {
                      flexDirection: 'column',
                      gap: '10px',
                    },
                  }}
                >
                  <GeneralButton
                    text="Cancel"
                    width="50%"
                    height="40px"
                    button_color={["230", "230", "230"]}
                    text_color={["0", "0", "0"]}
                  />
                  <GeneralButton text="Add" type="submit" width="50%" height="40px" />
                </div>
              </form>
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
    </>
  );
};

export default AddLocation;