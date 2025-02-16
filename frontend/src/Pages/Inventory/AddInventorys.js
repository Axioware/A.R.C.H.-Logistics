import React, { useState, useEffect } from "react";
import SideBar from '../../Components/General/Sidebar';
import NavPath from '../../Components/General/NavPath';
import PageHeading from "../../Components/Table_Components/PageHeading";
import mainStyles from "../../Assets/CSS/styles";
import fetchData from '../../utils/fetch_data';

export default function AddInventory() {
  const [data, setData] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientOptions, setClientOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setclearance] = useState(1);
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const fetchClients = async () => {
    const url = `https://api.example.com/api/clients/`;
    const response = await fetchData(setLoading, setSuccess, url);

    if (response && !response.error) {
      setClientOptions(response);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleClientChange = (event) => {
    setClientName(event.target.value);
  };

  return (
    <>
      <style>
        {`
          .form-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
          }

          .label {
            font-weight: bold;
            min-width: 120px;
          }

          .select-field {
            flex: 1;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
        `}
      </style>

      <div>
        <SideBar sidebar_state={isSidebarClosed} set_sidebar_state={setIsSidebarClosed} />
        <div style={mainStyles.centerContent(isSidebarClosed)}>
          <NavPath
            text={["Home", "Inventory", "Add Inventory"]}
            paths={["/home", "/inventory", "/add-inventorys"]}
            width="100%"
            height="50px"
          />

          <div style={mainStyles.tableBackground}>
            <div className="table-top-container">
              <PageHeading text="Add Inventory" />
            </div>

            <form className="inventory-form">
              <div className="form-row">
                <label className="label">Client Name:</label>
                <select value={clientName} onChange={handleClientChange} className="select-field">
                  <option value="">Select a client</option>
                  {clientOptions.map((client, index) => (
                    <option key={index} value={client.name}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
