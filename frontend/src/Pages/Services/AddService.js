import React, { useState, useEffect } from "react";
import Select from 'react-select';
import SideBar from '../../Components/General/Sidebar';
import NavPath from '../../Components/General/NavPath';
import PageHeading from "../../Components/Table_Components/PageHeading";
import mainStyles from "../../Assets/CSS/styles";
import fetchData from '../../utils/fetch_data';
import GeneralButton from '../../Components/General/GeneralButton';

// Custom styles for react-select dropdown
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: state.isFocused ? `0 0 0 1px rgb(14, 116, 144)` : 'none',
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
      color: 'black',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black', // Always black text for selected value
  }),
  menu: (provided) => ({
    ...provided,
    border: '1px solid rgb(14, 116, 144)',
  }),
};

export default function SetRates() {
  const [data, setData] = useState([]);
  const [clientName, setClientName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setclearance] = useState(1);
  const [billingType, setBillingType] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [search, setSearch] = useState('');
  const [endpoint, setEndpoint] = useState('api/users/');
  const [bundledItem, setBundledItem] = useState("no");
  const [Category, setCategory] = useState('');
  const [Name, setName] = useState('');
  const [ServiceCharge, setServiceCharge] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });
 
  const [CategoryOptions, setServicesOptions] = useState([
    { value: "FBA", label: "FBA" },
    { value: "FBM", label: "FBM" },
    { value: "Storage", label: "Storage" },
    { value: "Other", label: "Other" },
  ]);

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.value);
  };

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
      color: 'black', // Always black text
      '&:hover': {
        backgroundColor: 'rgba(14, 116, 144, 0.8)',
        color: 'white', // Always black text on hover
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
            padding: 0px;
            margin-top: 12px;
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
        {clearance && (clearance === "1" || clearance === "2" || clearance === "3") ? (
          <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
        ) : (
          <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
        )}
        <div style={mainStyles.centerContent(isSidebarClosed)}>
        <div style={{ marginBottom: '60px' }}>
          <NavPath
            text={["Home", "Service", "Add Service"]}
            paths={["/home", "/service", "/add-service"]}
            width="100%"
            height="50px"
          />
           </div>

          <div style={mainStyles.AddInputBackground}>
            <div className="table-top-container">
              <PageHeading
                text={'Add Service'}
                width="auto" 
                height="auto"
                sidebar_width="5px"
                sidebar_height="35px"
              />
            </div>

            <form className="inventory-form">
                <>
                  <div className="form-grid">
                    <div>
                    <label>Category:</label>
                      <Select
                        value={CategoryOptions.find(option => option.value === Category)}
                        onChange={handleCategoryChange}
                        options={CategoryOptions}
                        className="select-fields"
                        placeholder="Select a Category"
                        styles={customStyles} 
                      />
                    </div>
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                        placeholder="Enter Name"
                      />
                    </div>
                    <div>
                      <label>Service Charge:</label>
                      <input
                        type="text"
                        value={ServiceCharge}
                        onChange={(e) => setServiceCharge(e.target.value)}
                        className="input-field"
                        placeholder="Enter Service Charge"
                      />
                    </div>
                  </div>
                </>
            </form>
            <div id="buttonContainer" style={styles.buttonContainer}>
                <GeneralButton text="Cancel" width="100px" height="100%" button_color={["230", "230", "230"]} text_color={["0", "0", "0"]} />
                <GeneralButton text="Add" type="submit" width="100px" height="100%" />
              </div>
          </div>
        </div>
      </div>
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
    marginTop: "40px",
    marginRight: "100px",
  },
};