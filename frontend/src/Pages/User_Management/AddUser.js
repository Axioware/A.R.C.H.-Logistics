import React, { useState } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";

const AddUser = () => {
  const [clearance, setClearance] = useState(1);
  const [role, setRole] = useState("Client");
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    role: "Client",
    llc_name: "",
    tax_id: "",
    email2: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    console.log("Role selected:", selectedRole);

    if (selectedRole === "Client") {
      setClearance(4);
    } else if (selectedRole === "VA's") {
      setClearance(2);
    } else if (selectedRole === "Prep-Team") {
      setClearance(3);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed: ${name} = ${value}`);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form...");
  
    const requestBody = { ...formData, clearance_level: clearance };
    console.log("Request Body:", requestBody);
  
    fetch("http://127.0.0.1:8000/users/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      console.log("Response Status:", response.status);
      return response.json().then(data => ({ status: response.status, data }));
    })
    .then(({ status, data }) => {
      console.log("Response Data:", data);
      if (status >= 200 && status < 300) {
        alert("User added successfully!");
      } else {
        alert("Failed to add user: " + JSON.stringify(data));
      }
    })
    .catch(error => {
      console.error("Error while making request:", error);
      alert("An error occurred while adding the user.");
    });
  };
  
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const styles = {
    mainContent: {
      padding: "10px 0px 50px 0px",
    },
    form: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr', 
      gap: '20px', 
      marginLeft: '20px',
      marginTop: '35px',
      marginRight: '100px',
    },
    select: {
      marginTop: '15px',  
      marginLeft: "10px",
      display: 'block',
      width: '260px',
      height: '45px',
      borderRadius: '10px',
      border: '1px solid lightgrey',
      boxShadow: '1px 1px 1px 1px lightgrey',
    },
    buttonContainer: {
      alignSelf: 'flex-end',
      display: 'flex',
      flexDirection: 'row',
      width: '250px',
      gap: '20px',
      marginTop: '20px',
      lineHeight: '40px',
    },
    headingcontainer: {
      marginLeft: '20px',
      marginTop: '15px',
    },
    PageHeading: {
      marginLeft: '10px',
      marginTop: '20px',
    },
    RoleContainer: {
      alignSelf: 'flex-start',
      marginTop: '10px',
      marginLeft: "10px",
    },
    label: {
      marginTop: '10px',
      marginLeft: "20px",
      display: 'block',
      fontWeight: '700px',
    },
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
              <select name="Dropdown" id="Dropdown" style={styles.select} onChange={handleRoleChange} value={role}>
                <option value="Client">Client</option>
                <option value="Prep-Team">Prep-Team</option>
                <option value="VA's">VA's</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            <form id="form" style={styles.form} onSubmit={handleSubmit}>
              <GeneralField label="LLC Name" field_type="text" hint="Enter Company name" required={true} name="llc_name" onChange={handleInputChange} />
              <GeneralField label="First Name" field_type="text" hint="First Name (e.g., John)" name="first_name" onChange={handleInputChange} />
              <GeneralField label="Last Name" field_type="text" hint="Last Name (e.g., Doe)" name="last_name" onChange={handleInputChange} />
              <GeneralField label="Phone" field_type="tel" hint="Phone number (e.g., +1 (275) 432-345)" name="phone" onChange={handleInputChange} />
              <GeneralField label="Address" field_type="text" hint="Full address" name="address" onChange={handleInputChange} />
              <GeneralField label="Country" field_type="text" hint="Country (e.g., USA)" name="country" onChange={handleInputChange} />
              <GeneralField label="State" field_type="text" hint="State (e.g., Texas)" name="state" onChange={handleInputChange} />
              <GeneralField label="City" field_type="text" hint="City (e.g., Stafford)" name="city" onChange={handleInputChange} />
              <GeneralField label="Zip Code" field_type="text" hint="Zip code" required={true} name="zip" onChange={handleInputChange} />
              <GeneralField label="Email" field_type="email" hint="Email address (e.g., example@mail.com)" name="email" onChange={handleInputChange} />
              <GeneralField label="Alternate Email" field_type="email" hint="Alternate Email address (e.g., example@mail.com)" name="email2" onChange={handleInputChange} />
              <GeneralField label="Tax ID" field_type="text" hint="Tax ID/EIN (e.g., 123456)" required={true} name="tax_id" onChange={handleInputChange} />
              <GeneralField label="Password" field_type="text" hint="Enter Password" name="password" onChange={handleInputChange} />
              <GeneralField label="Retype Password" field_type="text" hint="Re-Type Password" name="retype_password" onChange={handleInputChange} />
            </form>
            <div id="buttonContainer" style={styles.buttonContainer}>
              <GeneralButton text="Cancel" width="100px" height="100%" button_color={["230", "230", "230"]} text_color={["0", "0", "0"]} />
              <GeneralButton text="Add" type="submit" width="100px" height="100%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
