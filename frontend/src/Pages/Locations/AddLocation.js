import React, { useState, useEffect } from "react";
import GeneralField from "../../Components/General/GeneralField";
import GeneralButton from "../../Components/General/GeneralButton";
import NavPath from "../../Components/General/NavPath";
import PageHeading from "../../Components/Table_Components/PageHeading";
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";
import DropDown from "../../Components/General/DropDown";

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

  useEffect(() => {
    console.log(warehouses);
    console.log(selectedWarehouseName)
    const selectedWarehouse = warehouses.find((w) => w.warehouse_name === selectedWarehouseName.value);
    if (selectedWarehouse) {
      setSelectedWarehouseId(selectedWarehouse.warehouse_id);
      console.log("Selected Warehouse ID:", selectedWarehouse.warehouse_id);
    } else {
      setSelectedWarehouseId(null);
      console.log("No warehouse selected");
    }
  }, [selectedWarehouseName])

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
        console.log("Fetched Warehouses:", data.results);
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchWarehouses();
  }, [token]);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/locations/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch locations");

        const data = await response.json();
        console.log("Fetched Locations:", data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, [token]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Location Name:", locationName);
    console.log("Location Type:", locationType);
    console.log("Selected Warehouse ID:", selectedWarehouseId);

    if (!locationName.trim() || !locationType.trim() || !selectedWarehouseId) {
      alert("All fields are required!");
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
        alert("Location added successfully!");
        setLocationName("");
        setLocationType("");
        setSelectedWarehouseId(null);
      } else {
        alert("Failed to add location!");
      }
    } catch (error) {
      console.error("Error adding location:", error);
    }
  };

  return (
    <div>
      <SideBar
        sidebar_state={isSidebarClosed}
        set_sidebar_state={setIsSidebarClosed}
      />
      <div style={mainStyles.centerContent(isSidebarClosed)}>
        <div style={{ padding: "10px 0px 50px 0px" }}>
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

          <div id="tableBackground" style={mainStyles.tableBackground}>
            <div id="headingcontainer" style={{ marginLeft: "-750px", marginTop: "15px" }}>
              <PageHeading text="Add Location" />
            </div>

            <form
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gap: "20px",
                marginLeft: "20px",
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
                width="230px"
                onSelect={setSelectedWarehouseName}
              />
              <div
                style={{
                  alignSelf: "flex-end",
                  display: "flex",
                  flexDirection: "row",
                  width: "250px",
                  gap: "20px",
                  marginTop: "100px",
                  lineHeight: "40px",
                }}
              >
                <GeneralButton
                  text="Cancel"
                  width="100px"
                  height="100%"
                  button_color={["230", "230", "230"]}
                  text_color={["0", "0", "0"]}
                />
                <GeneralButton text="Add" type="submit" width="100px" height="100%" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
