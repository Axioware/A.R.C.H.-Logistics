import React, { useState } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";

const AddWarehouse = () => {
  const [warehouseData, setWarehouseData] = useState({
    warehouse_name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    state: "",
    zip_code: ""
  });

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const handleChange = (e) => {
    setWarehouseData({ ...warehouseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", warehouseData);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("You are not authorized. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/warehouse/`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(warehouseData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Warehouse added successfully!");
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
      } else {
        alert(`Error: ${data.message || "Failed to add warehouse."}`);
      }
    } catch (error) {
      alert("Failed to add warehouse. Please try again.");
    }
  };

  return (
    <div>
      <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      <div style={mainStyles.centerContent(isSidebarClosed)}>
        <div style={{ padding: "10px 0px 50px 0px", backgroundColor: "f7f6f6" }}>
          <NavPath
            text={["Home", "Warehouses", "Add Warehouse"]}
            paths={["/home", "/warehouses", "/add-warehouses"]}
            text_color={[255, 255, 255]}
            background_color={[23, 23, 23]}
            hyperlink_size={[["10%", "55%"], ["40%", "50%"], ["4%", "4%"]]}
            width="100%"
            height="50px"
          />

          <div id="tableBackground" style={mainStyles.tableBackground}>
            <div style={{ alignSelf: "flex-start", marginLeft: "20px", marginTop: "15px" }}>
              <PageHeading text="Add Warehouse" />
            </div>

            <form style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "20px", marginLeft: "20px", marginRight: "30px", marginTop: "35px" }} onSubmit={handleSubmit}>
              <GeneralField label="Name" field_type="text" hint="Enter warehouse name" name="warehouse_name" value={warehouseData.warehouse_name} func={handleChange} />
              <GeneralField label="Country" field_type="text" hint="Country (e.g., USA)" name="country" value={warehouseData.country} func={handleChange} />
              <GeneralField label="State" field_type="text" hint="State (e.g., Texas)" name="state" value={warehouseData.state} func={handleChange} />
              <GeneralField label="City" field_type="text" hint="City (e.g., Stafford)" name="city" value={warehouseData.city} func={handleChange} />
              <GeneralField label="Address" field_type="text" hint="Full address" name="address" value={warehouseData.address} func={handleChange} />
              <GeneralField label="Zip Code" field_type="text" hint="Zip code" name="zip_code" value={warehouseData.zip_code} func={handleChange} />
              <GeneralField label="Email" field_type="email" hint="Email address (e.g., example@mail.com)" name="email" value={warehouseData.email} func={handleChange} />
              <GeneralField label="Phone" field_type="tel" hint="Phone number (e.g., +1 275-432-345)" name="phone" value={warehouseData.phone} func={handleChange} />

              <div style={{ alignSelf: "flex-end", display: "flex", flexDirection: "row", width: "250px", gap: "20px", marginTop: "20px", lineHeight: "40px" }}>
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


const styles = {
  mainContent: {
    padding: "10px 0px 50px 0px",
    backgroundColor:'f7f6f6',
},

form: {
    position:'relative',
    alignSelf:'flex-start',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr', // Two columns
    gap: '20px', // Space between fields
    // border: '2px solid red',
    marginLeft:'20px',
    marginRight:'30px',
    gap:'20px',
    marginTop:'35px',
},

select: {

  marginLeft:"40px",
  marginTop:"10px",
},

buttonContainer: {
    // border: '2px solid black',
    alignSelf:'flex-end',
    display: 'flex',
    flexDirection: 'row',
    width:'250px',
    gap: '20px',
    marginTop: '20px',
    lineHeight:'40px',
},
headingcontainer:{
  alignSelf: 'flex-start',
  // border: '2px solid purple',
  marginLeft:'20px',
  marginTop:'15px',

},

PageHeading:{
  marginLeft:'10px',
  marginTop:'25px',  
},

RoleContainer: {
  alignSelf: 'flex-end',
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

export default AddWarehouse;
