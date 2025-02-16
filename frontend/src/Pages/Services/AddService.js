import React, { useState, useRef } from "react";
import GeneralField from "../../Components/General/GeneralField";
import GeneralButton from "../../Components/General/GeneralButton";
import NavPath from "../../Components/General/NavPath";
import PageHeading from "../../Components/Table_Components/PageHeading";
import mainStyles from "../../Assets/CSS/styles";
import SideBar from "../../Components/General/Sidebar";
import DropDown2 from "../../Components/General/DropDown2";
import DropDown from "../../Components/General/DropDown";

const AddService = () => {
  const [formData, setFormData] = useState({
    service_name: "",
    service_charge: "",
  });
  const [selectedOption, setSelectedOption] = useState("");

  const formRef = useRef(null); // Reference for the form

  const handleInputChange = (value, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    const token = localStorage.getItem("access_token"); // Fetch JWT token from local storage

    if (!token) {
      alert("Authentication error! Please log in.");
      return;
    }
    console.log(formData)
    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_TENANT_NAME}/structures/api/services/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Service added successfully!");
        setFormData({ service_name: "", service_charge: "" }); // Reset form after success
      } else {
        alert(result.message || "Failed to add service.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while adding service.");
    }
  };

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // Properly trigger form submission
    }
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
      position: "relative",
      alignSelf: "flex-start",
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr", // Two columns
      gap: "50px",
      marginLeft: "20px",
      marginRight: "30px",
      marginTop: "35px",
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
      marginTop: "15px",
    },
  };

  return (
    <div>
      <SideBar
        sidebar_state={isSidebarClosed}
        set_sidebar_state={setIsSidebarClosed}
      />
      <div style={mainStyles.centerContent(isSidebarClosed)}>
        <div style={styles.mainContent}>
          <NavPath
            text={["Home", "Service", "Add Services"]}
            paths={["/home", "/service", "/add-service"]}
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
            <div id="headingContainer" style={styles.headingContainer}>
              <PageHeading text="Add Service" />
            </div>

            <form id="form" style={styles.form} onSubmit={handleSubmit} ref={formRef}>

            {/* <div className="flex justify-center items-center h-screen bg-gray-100"> */}
              {/* <DropDown2
                options={["Option 1", "Option 2", "Option 3"]}
                selected={selectedOption}
                onChange={setSelectedOption}
              /> */}
            {/* </div> */}

            <DropDown data={['FBA', 'FBM', 'Storage', "Other"]} label={'Category'} required={true} width={'230px'} onSelect={setSelectedOption}/>

              <GeneralField
                label="Name"
                field_type="text"
                hint="Bundling"
                required={true}
                name="service_name"
                func={(e) => handleInputChange(e.target.value, e.target.name)}
                value={formData.service_name}
              />
              <GeneralField
                label="Service Charge"
                field_type="text"
                hint="$13.0"
                required={true}
                name="service_charge"
                func={(e) => handleInputChange(e.target.value, e.target.name)}
                value={formData.service_charge}
              />
            </form>

            <div id="buttonContainer" style={styles.buttonContainer}>
              <GeneralButton
                text="Cancel"
                width="100px"
                height="100%"
                button_color={["230", "230", "230"]}
                text_color={["0", "0", "0"]}
              />
              <GeneralButton
                text="Add"
                width="100px"
                height="100%"
                func={handleExternalSubmit} // Fixed button submission
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
