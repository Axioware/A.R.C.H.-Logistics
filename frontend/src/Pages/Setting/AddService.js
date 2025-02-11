import React, { useState, useEffect } from "react";
import GeneralField from '../../Components/General/GeneralField';
import GeneralButton from '../../Components/General/GeneralButton';
import FilterDropdown from '../../Components/General/FilterDropdown';
import NavPath from '../../Components/General/NavPath';
import PageHeading from '../../Components/Table_Components/PageHeading';
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";

const AddService = () => {
  const [formData, setFormData] = useState({
    service_name: "",
    service_charge: ""
  });

  const handleInputChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    const token = localStorage.getItem("access_token");
    console.log(token) // Fetch JWT token from local storage

    if (!token) {
      alert("Authentication error! Please log in.");
      return;
    }

    try {
      const response = await fetch("http://asad.localhost:8000/structures/api/services/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Service added successfully!");
        setFormData({ service_name: "", service_charge: "" }); // Reset form after successful submission
      } else {
        alert("Failed to add service.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while adding service.");
    }
  };

  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const styles = {
    mainContent: {
      padding: "10px 0px 50px 0px",
      // backgroundColor: "#f7f6f6"
    },
    form: {
      position: "relative",
      alignSelf: "flex-start",
      display: "grid",
      gridTemplateColumns: "1fr 1fr", // Two columns
      // gap: "35px",
      // marginLeft: "20px",
      // marginRight: "30px",
      marginTop: "35px"
    },
    buttonContainer: {
      alignSelf: "flex-end",
      display: "flex",
      flexDirection: "row",
      width: "250px",
      gap: "20px",
      marginTop: "20px",
      lineHeight: "40px",
      
    },
    headingContainer: {
      alignSelf: "flex-start",
      marginLeft: "20px",
      marginTop: "15px"
    }
  };

  return (
    <div>
      <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
      <div style={mainStyles.centerContent(isSidebarClosed)}>
        <div style={styles.mainContent}>
          <NavPath
            text={["Home", "Service", "Add Services"]}
            paths={["/home", "/service", "/add-service"]}
            text_color={[255, 255, 255]}
            background_color={[23, 23, 23]}
            hyperlink_size={[["10%", "55%"], ["40%", "50%"], ["4%", "4%"]]}
            width="100%"
            height="50px"
          />

          <div id="tableBackground" style={mainStyles.tableBackground}>
            <div id="headingContainer" style={styles.headingContainer}>
              <PageHeading text="Add Service" />
            </div>

            <form id="form" style={styles.form} onSubmit={handleSubmit}>
              <GeneralField
                label="Name"
                field_type="text"
                hint="Enter name of Service"
                required={true}
                name="service_name"
                func={(value) => handleInputChange(value, "service_name")}
                value={formData.service_name}
              />
              <GeneralField
                label="Service Charge"
                field_type="text"
                hint="Enter the Charge for Service"
                required={true}
                name="service_charge"
                func={(value) => handleInputChange(value, "service_charge")}
                value={formData.service_charge}
              />
               <div id="buttonContainer" style={styles.buttonContainer}>
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

export default AddService;
