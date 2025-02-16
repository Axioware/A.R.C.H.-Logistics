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
  const [totalPages, setTotalPages] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [clearance, setclearance] = useState(1);
  const [billingType, setBillingType] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [search, setSearch] = useState('');
  const [endpoint, setEndpoint] = useState('api/users/');
  const [isSidebarClosed, setIsSidebarClosed] = useState(() => {
    const storedState = localStorage.getItem("sidebarclosed");
    return storedState === null ? true : JSON.parse(storedState);
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [chargeBy, setChargeBy] = useState('');
  const [dateAdded, setDateAdded] = useState('');
  const [location, setLocation] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const fetchClients = async () => {
    const url = `https://api.example.com/api/clients/`;
    const response = await fetchData(setLoading, setSuccess, url);

    if (response && response.error) {
      setErrorCode(response.error);
    } else if (response) {
      setClientOptions(response);
    }
  };

  useEffect(() => {
    getData();
    fetchClients();
  }, [currentPage]);

  const getData = async () => {
    const url = `https://api.example.com/${endpoint}`;
    const response = await fetchData(setLoading, setSuccess, url);

    if (response && response.error) {
      setErrorCode(response.error);
    } else if (response) {
      setData(response);
      setErrorCode(null);
    }
  };

  const handleClientChange = (event) => {
    setClientName(event.target.value);
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
            margin: 20px auto 20px 30px;
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
            width: 60%;
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
          }

          .form-grid label {
            display: block;
            margin-bottom: 5px;
          }

          .dimension-container {
            display: flex;
            gap: 10px;
            width: 60%;
            }

            .dimension-input {
            width: calc(33.33% - 7px) !important;
            padding: 8px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 4px;
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
          <NavPath
            text={["Home", "Inventory", "Add Inventory"]}
            paths={["/home", "/inventory", "/add-inventorys"]}
            width="100%"
            height="50px"
          />

          <div style={mainStyles.AddInputBackground}>
            <div className="table-top-container">
              <PageHeading
                text={'Add Inventory'}
                width="auto" 
                height="auto"
                sidebar_width="5px"
                sidebar_height="35px"
              />
            </div>

            <form className="inventory-form">
            <div className="form-grid">
                <div>
                    
              <label>Client Name:</label>
              <select 
                value={clientName} 
                onChange={handleClientChange} 
                className="select-field"
              >
                <option value="">Select a client</option>
                {clientOptions.map((client, index) => (
                  <option key={index} value={client.name}>
                    {client.name}
                  </option>
                ))}
              </select>
              </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Product:</label>
                  <select 
                    value={product} 
                    onChange={(e) => setProduct(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Select a product</option>
                    {/* Populate options dynamically if needed */}
                  </select>
                </div>
                <div>
                  <label>Product Name:</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="input-field"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label>Description:</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field"
                    placeholder="Enter description"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="input-field"
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <label>Category:</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Select a category</option>
                    {/* Populate options dynamically if needed */}
                  </select>
                </div>
                <div>
                  <label>Charge By:</label>
                  <select 
                    value={chargeBy} 
                    onChange={(e) => setChargeBy(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Select charge by</option>
                    <option value="weight">Weight</option>
                    <option value="unit">Unit</option>
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Date Added:</label>
                  <input
                    type="date"
                    value={dateAdded}
                    onChange={(e) => setDateAdded(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label>Warehouse:</label>
                  <select 
                    value={warehouse} 
                    onChange={(e) => setWarehouse(e.target.value)}
                    className="select-field"
                  >
                    <option value="">Select a warehouse</option>
                    {/* Populate options dynamically if needed */}
                  </select>
                </div>
                <div>
                  <label>Location:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-field"
                    placeholder="Enter location"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>Dimension:</label>
                  <div className="dimension-container">
                    <input
                      type="text"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="input-field"
                      placeholder="Length"
                    />
                    <input
                      type="text"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="input-field"
                      placeholder="Width"
                    />
                    <input
                      type="text"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="input-field"
                      placeholder="Height"
                    />
                  </div>
                </div>
                <div>
                  <label>Weight (lbs):</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="input-field"
                    placeholder="Enter weight"
                  />
                </div>
                <div>
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="input-field"
                    placeholder="Enter quantity"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
    
}